
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
      </View>
      <View style={styles.ContentsArea}>

      </View>
      <View style={styles.ButtonArea}>
        <BasicButton color={colors.buttonBlue} onPress={goCamera} title={'사진 촬영'}/>
        <BasicButton color={colors.buttonSkyBlue} onPress={goAlbum} title={'앨범에서 선택'}/>
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
  ContentsArea: {
    flexDirection: 'row',
    height: height * 500,
  },
  ButtonArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 100,
  },
  subseperatorArea:{
    justifyContent: 'center',
    alignItems:'center',
  },
  subseperator:{
    backgroundColor:'grey',
    width: width * 400,
    height:1,
    
  }

});
