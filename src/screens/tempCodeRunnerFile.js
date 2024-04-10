
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import MbtiGraph from '../components/MbtiGraph';
import AdBanner from '../components/AdBanner';
import { styleG, colors, width, height } from '../assets/globalStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function App() {

  const [backColor, setBackColor] = useState(colors.buttonSkyBlue);
  const [userMbti, setUserMbti] = useState('DRPT');

  return (

    <View style={styles.container}>
      <View style={styles.adBanner}>

        <AdBanner></AdBanner>

      </View>

      <View style={styles.userNameArea}>
        {/* 유저 이름 받아 올시 해제
        <Text>{userName}</Text> */}
        <Text style={[styleG.textStyle, { fontSize: width * 23, fontWeight: '500' }]}><Text style={{ fontSize: width * 30, fontWeight: 'bold' }}>박정재</Text>님의 피부 MBTI</Text>
      </View>
      {/* MBTI 결과 그래프 */}
      <View style={styles.mbtiResult}>
        <View style={styles.mbti}>
          <TouchableOpacity style={[styles.mbtiBlock, { backgroundColor: backColor }]}>
            <Text style={styles.mbtiText}>{userMbti}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.graph}>
          <MbtiGraph category={'DO'} score={130}></MbtiGraph>
          <MbtiGraph category={'RS'} score={130}></MbtiGraph>
          <MbtiGraph category={'PN'} score={130}></MbtiGraph>
          <MbtiGraph category={'WT'} score={130}></MbtiGraph>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  mbtiResult: {
    width: width * 400,
    height: height * 270,
    flexDirection: 'row',
    backgroundColor: colors.softGrey,
    borderColor: colors.darkGrey,
    borderWidth: 3,
    borderRadius: 15,
  },
  mbti: {
    width: width * 180,
    alignItems: 'center',
    justifyContent: 'center'
  },
  graph: {
    width: width * 200,
    justifyContent: 'center',
  },
  mbtiBlock: {
    width: width * 120,
    height: height * 110,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mbtiText: {
    fontFamily: 'NanumSquareRoundB',
    fontSize: width * 30,
    color: 'white',
  },
  adBanner: {
    height: height * 370,
  },
  userNameArea: {
    height: 40,
    width: 400,
    paddingLeft: 10,
  }

});
