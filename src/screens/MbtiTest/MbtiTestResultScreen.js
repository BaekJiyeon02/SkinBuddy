
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { colors, width, height, styleG } from '../../assets/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../../AuthProvider';
import axios from 'axios';
import mbtiData from '../../assets/mbtiResult.json';

/* ================ MBTI 결과 값 불러오기================  */

export default function MbtiTestResultScreen() {
  const navigation = useNavigation();
  const [doScore, setDoScore] = useState(null);
  const [rsScore, setRsScore] = useState(null);
  const [pnScore, setPnScore] = useState(null);
  const [wtScore, setWtScore] = useState(null);
  const [mbtiResult, setMbtiResult] = useState('');
  const { refreshMbti } = useContext(AuthContext);




  useFocusEffect( //탭 활성화 인식
    React.useCallback(() => {
      // 탭이 활성화될 때 실행되는 함수
      console.log('MBTI탭이 활성화되었습니다.');

      // 탭이 비활성화될 때 실행되는 함수
      return () => {
        refreshMbti();
      };
    }, [])
  );


  // 비동기 함수 호출을 관리하고 한 번만 실행
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const doResult = await AsyncStorage.getItem('doResult');
        const rsResult = await AsyncStorage.getItem('rsResult');
        const pnResult = await AsyncStorage.getItem('pnResult');
        const wtResult = await AsyncStorage.getItem('wtResult');

        if (doResult !== null) {
          setDoScore(parseFloat(doResult));
        }
        if (rsResult !== null) {
          setRsScore(parseFloat(rsResult));
        }
        if (pnResult !== null) {
          setPnScore(parseFloat(pnResult));
        }
        if (wtResult !== null) {
          setWtScore(parseFloat(wtResult));
        }
      } catch (error) {
        console.error('Failed to load scores:', error);
      }
    };

    fetchScores();
  }, []); // [] 의존성 배열이 비어 있으므로 컴포넌트 마운트 시 한 번만 실행

  // 각 점수에 대한 단어 계산 및 MBTI 결과 업데이트
  useEffect(() => {
    if (doScore !== null && rsScore !== null && pnScore !== null && wtScore !== null) {
      const doWord = doScore < 27 ? 'D' : 'O';
      const rsWord = rsScore < 31 ? 'R' : 'S';
      const pnWord = pnScore < 31 ? 'N' : 'P';
      const wtWord = wtScore < 41 ? 'T' : 'W';

      const mbtiWord = doWord + rsWord + pnWord + wtWord;
      setMbtiResult(mbtiWord);

      // 결과 업데이트
      updateResult(doScore, rsScore, pnScore, wtScore, mbtiWord);
    }
  }, [doScore, rsScore, pnScore, wtScore]);

  const mbtiList = mbtiData["DRNT"]["explain"]

  const updateResult = async (doScore, rsScore, pnScore, wtScore, mbtiWord) => {
    const updateMbtiURL = "http://52.79.237.164:3000/user/skin/bauman"

    const userId = await AsyncStorage.getItem('userId');


    const postData = {
      "userId": userId,
      "skinType": mbtiWord,
      "oilyScore": doScore,
      "resistanceScore": rsScore,
      "non_pigmentScore": pnScore,
      "tightScore": wtScore
    };


    axios.put(updateMbtiURL, postData)
      .then(response => {
        // 요청 성공 시 처리
        console.log('응답 데이터:', response.data);

        if (response.data['property'] === 200) {
          console.log(postData)
          console.log('MBTI 등록 성공');
          // 필요한 작업을 추가로 수행할 수 있습니다.
        } else {
          console.log('요청이 예상대로 성공하지 않았습니다:', response.data);
          // 예상치 못한 응답 데이터 처리
        }
      })
      .catch(error => {
        console.error('PUT 요청 실패:', error.message);
        console.error('에러 데이터:', error.response ? error.response.data : '응답 없음');
        console.error('요청 데이터:', postData);
        // 에러 처리 로직 추가 가능
      });

  }


  return (
    <View style={styles.container}>
      <View style={styles.paper}>
        <View style={styles.headTextArea}>
          <Text style={[styleG.textBold, { fontSize: width * 20, color: colors.gray }]}>당신은</Text>
        </View>
        <View style={styles.mbtiTextArea}>
          <Text style={[styleG.textBold, { fontSize: width * 60, color: colors.buttonBlue }]}>{mbtiResult}</Text>
        </View>
        <View style={styles.contentsArea}>
          <Text style={[styles.explainArea, styleG.textStyle]} >
            {mbtiList}
          </Text>
          <Text style={styles.avoidArea} >
          </Text>
          <Text style={styles.recommendArea} >
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    backgroundColor: colors.mbtiBackColor,
    height: height * 680,
    width: width * 400,
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'columm'
  },
  headTextArea: {
    width: width * 350,
    height: height * 80,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  mbtiTextArea: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: height * 100,
    width: width * 350,
    // backgroundColor: 'blue'

  },
  contentsArea: {
    backgroundColor: 'white',
    width: width * 350,
    height: height * 450,
    borderRadius: 15,
    borderColor: colors.darkGray,
    borderWidth: width * 3
  },
  explainArea:{

  }

});
