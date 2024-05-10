import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { colors, width, height, styleG } from '../../assets/globalStyles';
import BasicButton from '../../components/BasicButton'
import Subseperator from '../../components/Subseperator'
import { AuthContext } from '../../../AuthProvider';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function HistoryScreen() {

  const { userId } = useContext(AuthContext);
  const [loading, setLoading] =useState(false)

  const deleteResultUrl = "http://52.79.237.164:3000/user/skin/record/delete"
  const recordListUrl = 'http://52.79.237.164:3000/user/skin/record/list';
  const detailReturnUrl = 'http://52.79.237.164:3000/user/skin/record/select';

  const [list, setList] = useState([])
  const [scrollHeight, setScrollHeight]=useState(500)

  useFocusEffect(
    React.useCallback(() => {
      listReturn();
      console.log('탭 활성화')
      return () => {
        console.log('탭 비활성화')

      };
    }, [])
  );

  useEffect(() => {
    listReturn();
  }, [])

  const navigation = useNavigation();

  function listReturn() {

    const postData = {
      "userId": userId
    }
    axios.post(recordListUrl, postData)
      .then(response => {
        console.log('응답 데이터:', response.data);
        setList(response.data["list"]);
      })
      .catch(error => {
        console.error('에러 발생:', error);
      });
  }

  const deleteData = (recordId) => {
    console.log('응답:', recordId)

    if (!recordId) {
      console.error('recordId가 비어 있습니다.');
      return;
    }

    const postData = {
      'recordId': recordId,
    };
    axios.delete(deleteResultUrl, { data: postData })
      .then(response => {
        // 요청 성공 시 처리
        console.log('postData:', postData)
        console.log('응답:', response.data)
        if (response.data['property'] == 200) {
          console.log('진단기록 삭제됨')
        }
        else if (response.data['property'] == 301) {
          console.log('응답:', response.data)
          Alert.alert(
            response.data['message'],
            '',
            [
              { text: '확인' },
            ],
          );
        }
        else {
          Alert.alert(
            response.data['message'],
            '',
            [
              { text: '확인' },
            ],
          );
        }
      })
      .catch(error => {
        // 요청 실패 시 처리
        console.log(error)
      })

  }

  const goCamera = () => {
    navigation.navigate('카메라');
  }
  const goAlbum = () => {
    navigation.navigate('앨범');
  }

  const handlePress = (recordId, aiType, takeDay) => {

    const postData = {
      "userId": userId,
      "recordId" : recordId,
      "aiType": aiType
  }
    axios.post(detailReturnUrl, postData)
      .then(response => {
        console.log('응답 데이터!:', response.data);
        const res = response.data
        if(aiType=="AI 호전도 분석"){
          console.log(res)
          if(res.improvement=="처음으로 호전도 검사 서비스를 사용 하였으므로 과거 기록이 존재하지 않습니다"){
            console.log('1')
            navigation.navigate("ImprovementAnalysisResultScreen", { recordId: res.currentData.recordId, troubleTotal: res.currentData.troubleTotal, pastData: null, improvement :res.improvement, takeDay:takeDay, history:true });
          }
          else{
            console.log('2')
            console.log(res.pastData.troubleTotal)
            navigation.navigate("ImprovementAnalysisResultScreen", { recordId: res.currentData.recordId, troubleTotal: res.currentData.troubleTotal, pastData: res.pastData.recordId, pastTotal:res.pastData.troubleTotal, improvement :res.improvement,takeDay:takeDay, history:true });
          }
        }
        else if(aiType=="AI 트러블 분석"){

          navigation.navigate("AiTroubleResultScreen", { recordId: res.data.recordId, acneLevel:res.data.troubleType,takeDay:takeDay, history:true});
        }
      })
      .catch(error => {
        console.error('에러 발생:', error);
      }); 


  }

  if (loading) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>로딩 중...</Text>
        </View>
    );
}

  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={{ fontSize: width * 35, color: 'gray', width: width * 270, fontFamily: 'NanumSquareRoundEB' }}>과거 진단 기록</Text>
      </View>
      <Subseperator />
      <View style={styles.listArea}>
        {list.map((list, index) => (
          <TouchableWithoutFeedback key={index} onPress={() => handlePress(list.recordId, list.aiType, list.takeDay)}>
            <View style={{ marginBottom: width * 10 }}>
              <Subseperator type={"thin"} />
              <View style={{ padding: width * 15,  height:height*70, justifyContent:'center' }}>
                <Text numberOfLines={1} style={[styleG.textBold, { fontSize: width * 20 }]}>[{list.takeDay}]{list.aiType}{list.recordId}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        ))}
        <Subseperator type={"thin"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 20
  },
  titleArea: {
    width: width * 400,
    alignItems: 'flex-start',
    marginBottom: width * 10,
    marginLeft: width * 20,
  },
  listArea: {
    marginTop: height * 20,
    width: width * 400,
    height: height * 500
  }
});
