
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { colors, width, height, styleG } from '../../assets/globalStyles';
import BasicButton from '../../components/BasicButton'
import Subseperator from '../../components/Subseperator'
import Acne from '../../assets/Acne.json';
import * as ImagePicker from 'expo-image-picker'
import { AuthContext } from '../../../AuthProvider';
import axios from 'axios';

export default function AcneAnalysisScreen() {


  const AiTroubleUrl = 'http://ceprj.gachon.ac.kr:60017/test';
  


  const { userId } = useContext(AuthContext);


  useFocusEffect( //탭 활성화 인식
    React.useCallback(() => {
      // 탭이 활성화될 때 실행되는 함수
      // console.log('탭이 활성화되었습니다.');

      // 탭이 비활성화될 때 실행되는 함수
      return () => {
        // console.log('탭이 비활성화되었습니다.');
        // 여기에 실행하고자 하는 특정 함수를 추가합니다.
      };
    }, [])
  );


  const [image,setImage]=useState('')


  const navigation = useNavigation();

  const handleImageCameraPress=async()=>{
    let result = await ImagePicker.launchCameraAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.All,
        allowsEditing:true,
        aspect:[1,1],
        quality:1
    })
    if(!result.canceled){
      setImage(result.assets[0].uri)
      sendImageToServer(result.assets[0].uri); // 사진을 서버로 전송
    }
}
  const handleImagePickerPress=async()=>{
        // 카메라 롤(갤러리) 권한 요청
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        // 권한 확인
        if (status !== 'granted') {
            console.log('Camera roll permission denied');
            return;
        }
    
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.All,
        allowsEditing:true,
        aspect:[1,1],
        quality:1
    })
    if(!result.canceled){
      setImage(result.assets[0].uri)
      sendImageToServer(result.assets[0].uri); // 사진을 서버로 전송
    }
}


const sendImageToServer = async (imageUri) => {
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'photo.jpeg',
    });
    formData.append('userId', userId);

    axios.post(AiTroubleUrl, formData)
      .then(response => {
          console.log("response:",response["data"])
          const recordId=response['data']['recordId']
          const acneLevel=response['data']['acneLevel']
          navigation.navigate("AiTroubleResultScreen",{recordId:recordId, acneLevel:acneLevel})
      })
      .catch(error => {
        console.error('Error:', error);
      });

    setImage(null);
};

  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={styleG.titleText}>Ai 트러블 유형 </Text>
      </View>
      <View style={styles.contentsArea}>
        <Subseperator/>
        <View style={styles.commentArea}>
          <Text style={[styleG.textStyle, { fontSize: width * 25 }]}>
            얼굴에 <Text style={styleG.textBold}>트러블</Text>이 생겼나요?
          </Text>
          <Text style={[styleG.textStyle, { fontSize: width * 19 }]}>
            {'\n'}
            여드름은 잘못 방치하거나 압출하면{'\n'}
            염증이 심해지고 흉터가 남기도 합니다.{'\n'}
            이를 해결하기 위해선 올바른 관리가 중요한데요.{'\n'}
            {'\n'}
            여드름도  <Text style={styleG.textBold}>종류가 다양</Text>하고 각각마다 <Text style={styleG.textBold}>관리법이{'\n'}
              다르다</Text>는 사실 알고 계셨나요?
            {'\n'}{'\n'}
            저희가 <Text style={styleG.textBold}>피부 진단 AI</Text>를 통해 어떤 유형의 여드름인지{'\n'}
            확인하고 적절한 대처법을 알려드립니다.{'\n'}
            편하고 빠르게 진단 후 관리법을 처방받아 보세요!
          </Text>
          <Text style={[styleG.textStyle, { fontSize: width * 18, marginTop: height * 30 }]}>
            이렇게 찍어주세요 :){'\n'}
            {'\t'}• <Text style={{color:colors.highlightBlue}}>화장하지 않은</Text> 맨 얼굴{'\n'}
            {'\t'}• <Text style={{color:colors.highlightBlue}}>선명하게</Text> 찍은 얼굴{'\n'}
            {'\t'}• <Text style={{color:colors.highlightBlue}}>트러블이 있는 부위</Text>의 <Text style={{color:colors.highlightBlue}}>전체</Text> 얼굴{'\n'}
            {'\n'}
            이렇게 찍으면 어려워요 :({'\n'}
            {'\t'}• <Text style={{color:colors.highlightRed}}>초점이 맞지 않는</Text> 얼굴{'\n'}
            {'\t'}• <Text style={{color:colors.highlightRed}}>너무 먼 거리에서</Text> 찍은 얼굴{'\n'}
            {'\t'}• <Text style={{color:colors.highlightRed}}>얼굴 일부만</Text> 찍은 얼굴{'\n'}
            {'\t'}• <Text style={{color:colors.highlightRed}}>흔들리게</Text> 찍힌 얼굴{'\n'}
          </Text>
        </View>
      </View>
      <View style={styles.ButtonArea}>
        <BasicButton category={'sideMargin'} color={colors.buttonBlue} onPress={handleImageCameraPress} title={'사진 촬영'} />
        <BasicButton category={'sideMargin'} color={colors.buttonSkyBlue} onPress={handleImagePickerPress} title={'앨범에서 선택'} />
      </View>
    </View>
  );
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
    height: height * 70,
  },
  commentArea: {
    flexDirection: 'columm',
    height: height * 500,
    width: width * 400,
    marginTop: height * 20,
  },
  ButtonArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 100,
  },
  contentsArea: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
