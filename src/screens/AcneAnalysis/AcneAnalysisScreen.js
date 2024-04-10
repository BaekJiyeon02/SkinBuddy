
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { colors, width, height, styleG } from '../../assets/globalStyles'; //width,height 받아오기
import BasicButton from '../../components/BasicButton'


export default function App() {

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


  const navigation = useNavigation();

  const goCamera = () => {
    navigation.navigate('카메라');
  }
  const goAlbum = () => {
    navigation.navigate('앨범');
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={styleG.titleText}>Ai 트러블 유형 </Text>
      </View>
      <View style={styles.subseperatorArea}>
        <View style={styles.subseperator}>
        </View>
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

        </View>
      </View>
      <View style={styles.ButtonArea}>
        <BasicButton color={colors.buttonBlue} onPress={goCamera} title={'사진 촬영'} />
        <BasicButton color={colors.buttonSkyBlue} onPress={goAlbum} title={'앨범에서 선택'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'columm',
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
    marginTop: height * 10,
    // backgroundColor: 'red',
  },
  ButtonArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 100,
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


});
