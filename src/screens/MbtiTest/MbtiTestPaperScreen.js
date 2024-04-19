
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { colors, width, height, styleG } from '../../assets/globalStyles';
import BasicButton from '../../components/BasicButton'
import Subseperator from '../../components/Subseperator'
import MbtiTestPaper from '../../components/MbtiTestPaper'

export default function MbtiTestPaperScreen() {



  useFocusEffect( //탭 활성화 인식
  React.useCallback(() => {
    // 탭이 활성화될 때 실행되는 함수
    console.log('MBTI탭이 활성화되었습니다.');

    // 탭이 비활성화될 때 실행되는 함수
    return () => {
      navigation.navigate('MBTI');
      console.log('MBTI탭이 비활성화되었습니다.');

    };
  }, [])
);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <MbtiTestPaper></MbtiTestPaper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'columm',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
