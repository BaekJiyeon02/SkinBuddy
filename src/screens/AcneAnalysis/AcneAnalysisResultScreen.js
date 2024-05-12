import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { colors, width, height, styleG } from '../../assets/globalStyles'; //width,height 받아오기
import BasicButton from '../../components/BasicButton'
import axios from 'axios';
import Acne from '../../assets/Acne.json';
import { AuthContext } from '../../../AuthProvider';
import Subseperator from '../../components/Subseperator'


export default function AcneAnalysisResultScreen({ route }) {

  const navigation = useNavigation();

  const { userId } = useContext(AuthContext)

  const [imageData, setImageData] = useState(null);
  const [acneType, setAcneType] = useState('');
  const [careContents, setCareContents] = useState('');
  const [avoidContents, setAvoidContents] = useState('');
  const [saveButton, setSaveButton] = useState(false);

  const [loading, setLoading] = useState(true);


  const returnPhotoUrl = "http://52.79.237.164:3000/user/skin/classification/photo"
  const deleteResultUrl = "http://52.79.237.164:3000/user/skin/record/delete"


  const { recordId, acneLevel, history, takeDay } = route.params;
  console.log(history)


  useFocusEffect( //탭 활성화 인식
    React.useCallback(() => {
      // 탭이 활성화될 때 실행되는 함수
      console.log('탭이 활성화되었습니다.');
      // 탭이 비활성화될 때 실행되는 함수
      return () => {
        console.log('탭이 비활성화되었습니다.');
        // 여기에 실행하고자 하는 특정 함수를 추가합니다.
      };
    }, [])
  );

  useEffect(() => {
    console.log('기록번호:', recordId)
    returnImage()
    console.log('여드름 분류 레벨:', acneLevel)
    setContents()
    setLoading(false)
  }, [])

  function returnImage() {

    const postData = {
      "recordId": recordId
    }
    axios.post(returnPhotoUrl, postData)
      .then(response => {

        setImageData(response.data);
      })
      .catch(error => {
        console.log('recordId:', recordId)
        console.error('에러 발생:', error);
      });

  }

  const setContents = () => {
    if (acneLevel == 1) {
      setAcneType(Acne[1]["종류"])
      setCareContents(Acne[1]["관리법"])
      setAvoidContents(Acne[1]["피해야 할 사항"])
    }
    else if (acneLevel == 2) {
      setAcneType(Acne[2]["종류"])
      setCareContents(Acne[2]["관리법"])
      setAvoidContents(Acne[2]["피해야 할 사항"])
    }

    else if (acneLevel == 3) {
      setAcneType(Acne[3]["종류"])
      setCareContents(Acne[3]["관리법"])
      setAvoidContents(Acne[3]["피해야 할 사항"])
    }
  }
  const goDelete = async () => {
    const deleteData = {
      "recordId": recordId,
    };
    await axios.delete(deleteResultUrl, { data: deleteData })
      .then(response => {
        // 요청 성공 시 처리
        console.log(response.data)
        console.log(deleteData)
        if (response.data['property'] == 200) {
          console.log('진단기록 삭제됨')
        }
        else if (response.data['property'] == 301) {
          console.log(response.data)
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


  const goSave = () => {
    Alert.alert(
      '저장되었습니다',
      '이전 화면으로 돌아갑니다.\n 결과는 과거 진단 기록에서 확인가능합니다',
      [
        {
          text: '확인', onPress: () =>
            navigation.navigate('AiTroubleScreen')
        },
      ],
    );
    setSaveButton(true)
  }

  const goDermatology = () => {
    navigation.navigate('DermatologyMapScreen');
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>로딩 중...</Text>
      </View>
    );
  }

  if (acneLevel == 0) {
    return(
      <View style={styles.container}>
        {history && <View style={styles.historyArea}><Text style={{ fontSize: width * 27, color: 'gray', width: width * 4000, fontFamily: 'NanumSquareRoundEB', marginBottom:height*10 }}>[{takeDay}]트러블 유형 분석</Text><Subseperator /></View>}
        <View style={styles.ContentsArea}>
          <View style={styles.TopArea}>
            <View style={styles.titleArea}>
              <Text style={[styleG.textBold, { marginBottom: height * 20, fontSize: width * 25 }]}>분석 결과</Text>
              <Text style={{ color: 'gray', fontSize: width * 20, }}><Text style={[styleG.textBold, { fontSize: width * 30, color: 'black' }]}>여드름이 발견되지 않았어요!</Text></Text>
            </View>
            {imageData && <Image source={{ uri: `data:image/jpeg;base64,${imageData}` }} style={styles.image} />}
          </View>
          <View style={{ padding: width * 13, height: height * 300 }}>
            <View>
              <Text style={[styleG.textBold, { color: colors.highlightBlue, fontSize: width * 20 }]}>관리법</Text>
              <Text style={[styleG.textStyle, { fontSize: width * 15 }]}>잘하고 있어요! 지금의 컨디션을 유지하면 좋을 것 같아요</Text>
            </View>
            <View>
              <Text style={[styleG.textBold, { color: colors.highlightRed, fontSize: width * 20, marginTop: height * 20 }]}>피해야 될 사항</Text>
              <Text style={[styleG.textStyle, { fontSize: width * 15 }]}>급격한 환경변화와 평소 쓰지 않는 화장품을 조심해야돼요</Text>
            </View>

          </View>
        </View>
        <View style={styles.ButtonArea}>
          <BasicButton category={'sideMargin'} color={colors.buttonSkyBlue} onPress={goDelete} title={'결과 삭제하기'} />
          <BasicButton category={'sideMargin'} color={colors.buttonSkyBlue} onPress={goDermatology} title={'주변 피부과'} />
        </View>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <View style={styles.ContentsArea}>
      {history && <View style={styles.historyArea}><Text style={{ fontSize: width * 27, color: 'gray', width: width * 4000, fontFamily: 'NanumSquareRoundEB', marginBottom:height*10 }}>[{takeDay}]트러블 유형 분석</Text><Subseperator /></View>}
        <View style={styles.TopArea}>
          <View style={styles.titleArea}>
            <Text style={[styleG.textBold, { marginBottom: height * 20, fontSize: width * 25 }]}>분석 결과</Text>
            <Text style={{ color: 'gray', fontSize: width * 20, }}><Text style={[styleG.textBold, { fontSize: width * 30, color: 'black' }]}>{acneType}</Text>입니다</Text>
          </View>
          {imageData && <Image source={{ uri: `data:image/jpeg;base64,${imageData}` }} style={styles.image} />}
        </View>
        <View style={{ padding: width * 13, height: height * 300 }}>
          <View>
            <Text style={[styleG.textBold, { color: colors.highlightBlue, fontSize: width * 20 }]}>관리법</Text>
            <Text style={[styleG.textStyle, { fontSize: width * 15 }]}>{careContents}</Text>
          </View>
          <View>
            <Text style={[styleG.textBold, { color: colors.highlightRed, fontSize: width * 20, marginTop: height * 20 }]}>피해야 될 사항</Text>
            <Text style={[styleG.textStyle, { fontSize: width * 15 }]}>{avoidContents}</Text>
          </View>

        </View>
      </View>
      <View style={styles.ButtonArea}>
        <BasicButton category={'sideMargin'} color={colors.buttonSkyBlue} onPress={goDelete} title={'결과 삭제하기'} />
        <BasicButton category={'sideMargin'} color={colors.buttonSkyBlue} onPress={goDermatology} title={'주변 피부과'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: height * 20,
    backgroundColor: 'white',
  },
  TopArea: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    height: height * 200,
    width: width * 400,
    marginTop: 30 * height,
    marginRight: 30 * width,
    paddingLeft: width * 15,

  },
  titleArea: {
    flex: 1,
    justifyContent: 'center',
  },
  ContentsArea: {
    flexDirection: 'column',
    height: height * 550,
  },
  ButtonArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    height: height * 100,
    marginRight: width * 20

  },
  subseperatorArea: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  subseperator: {
    backgroundColor: 'grey',
    width: width * 400,
    height: 1,

  },
  image: {
    width: width * 150,
    height: height * 150,
  },
  historyArea:{
    width: width * 450,
    alignItems: 'flex-start',
    marginBottom: width * 10,
    marginLeft: width * 20,
    marginTop: height* 30
  }


});
