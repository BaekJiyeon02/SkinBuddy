
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { colors, width, height, styleG } from '../../assets/globalStyles'; //width,height 받아오기
import BasicButton from '../../components/BasicButton'
import axios from 'axios';


export default function ImprovementAnalysisResultScreen({ route }) {


  const [imageData, setImageData] = useState([]);
  const { recordId, troubleTotal, pastData, improvement } = route.params;

  const returnPhotoUrl = "http://52.79.237.164:3000/user/skin/detection/photo"
  const deleteResultUrl = "http://52.79.237.164:3000/user/skin/record/delete"
  /user/skin/detection/save


  console.log(improvement)
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
    console.log('recordId:', recordId, ' truoubleTotal:', troubleTotal, 'pastDate:', pastData, 'improvement:', improvement)
    returnImage()
  }, [])



  function returnImage() {

    console.log(recordId, pastData)
    const postData = {
      "recordId": recordId,
      "pastRecordId": (pastData == "" ? null : pastData)
    }
    console.log(postData)
    axios.post(returnPhotoUrl, postData)
      .then(response => {
        setImageData(response.data);
      })
      .catch(error => {
        console.log('recordId:', recordId)
        console.error('에러 발생:', error);
      });
  }

  const navigation = useNavigation();

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

  const goDermatology = () => {
    navigation.navigate('DermatologyMapScreen');
  }

  if (pastData) {

    return (
      <View style={styles.container}>
        <View style={styles.resultArea}>
          <View style={styles.titleArea}>
            <Text style={[styleG.titleText, { color: colors.textGray }]}>Ai 호전도 분석 결과</Text>
          </View>
          <View style={styles.contentsArea}>
            <View style={[styles.imgArea,{marginTop:height*60,}]}>
              <Image source={{ uri: `data:image/jpeg;base64,${imageData[1]}` }} style={styles.image} />
              <Image source={{ uri: `data:image/jpeg;base64,${imageData[0]}` }} style={styles.image} />
            </View>
            <View style={{width: width*450,height:height*100,justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize:width * 30}}> {'>>'} </Text>
            </View>
            {/* <View style={{height: height* 60, backgroundColor:'red', flexDirection: 'row', alignItems:'center', justifyContent:'center'}}>
            <Text style={[styleG.textBold, {fontSize: width * 25, flex: 1, alignItems:'center',  justifyContent:'center'}]}>전</Text>
            <Text style={[styleG.textBold, {fontSize: width * 25, flex: 1,  alignItems:'center'}]}>후</Text>
            </View> */}
            <View style={styles.textArea}>
              <Text style={[styleG.textStyle, { fontSize: width * 20 }]}>{improvement}</Text>
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
  else {
    return (
      <View style={styles.container}>
        <View style={styles.resultArea}>
          <View style={styles.titleArea}>
            <Text style={[styleG.titleText, { color: colors.textGray }]}>Ai 호전도 분석 결과</Text>
          </View>
          <View style={styles.contentsArea}>
            <View style={styles.imgArea}>
              {imageData != [] ? (
                <Image source={{ uri: `data:image/jpeg;base64,${imageData[0]}` }} style={styles.image} />
              ) : (
                <Image source={require('../../assets/img/Mbti.png')} style={styles.image} />
              )}
            </View>
          </View>
          <View style={styles.textArea}>
            <Text style={[styleG.textStyle, { fontSize: width * 20 }]}>{troubleTotal}개의 트러블 발견!</Text><Text style={[styleG.textStyle, { fontSize: width * 15 }]}> 결과를 등록했습니다. 다음에 호전도 분석 사진을 등록하시면 결과를 알려드릴게요!</Text>
          </View>
        </View>
        <View style={styles.ButtonArea}>
          <BasicButton category={'sideMargin'} color={colors.buttonSkyBlue} onPress={goDelete} title={'결과 삭제하기'} />
          <BasicButton category={'sideMargin'} color={colors.buttonSkyBlue} onPress={goDermatology} title={'주변 피부과'} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'columm',
    justifyContent: 'center',
    paddingBottom: height * 20,
    backgroundColor: 'white',
  },
  titleArea: {
    flexDirection: 'row',
    height: height * 100,
    alignItems: 'center'
  },
  contentsArea: {
    flexDirection: 'column',
    height: height * 400,
  },
  ButtonArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: height * 100,
    marginRight: width * 20
  },
  subseperatorArea: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultArea: {
    height: height * 600
  },
  imgArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  image: {
    margin: width * 10,
    width: width * 200,
    height: height * 200,
  },
  textArea: {
    backgroundColor: colors.softGray,
    justifyContent: 'center',
    padding: width * 30,
    width: width * 450
  }

});
