
import React, { useState, useEffect, useRef,useContext } from 'react';
import { StyleSheet, Text, View, Image, Button, ActivityIndicator } from 'react-native';
import MbtiGraph from '../components/MbtiGraph';
import AdBanner from '../components/AdBanner';
import * as Updates from 'expo-updates';
import { useNavigation } from '@react-navigation/native';
import { styleG, colors, width, height } from '../assets/globalStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../AuthProvider';




export default function MainScreen() {
  const navigation = useNavigation();

  // AuthContext에서 userId와 logout 함수를 가져오기
  const {userId, userName, skinType, loading, logout } = useContext(AuthContext);
  
  const [backColor, setBackColor] = useState(colors.buttonSkyBlue);
  const [userMbti, setUserMbti] = useState(skinType);
  const [doResult,setDoResult]=useState(0);



  useEffect(() => {
    // 컴포넌트가 마운트된 후 실행되는 부분
    ScoreCalcDO(); // 함수 호출
  }, [loading, userId] //doResult 값이 변경될때마다 로그
  );


  const ScoreCalcDO=()=>{
    const doScore=27;
    if(doScore>=26){
      const score=15*(doScore/17);
      setDoResult(score)
    }
  }

  const LogoutProcess=async()=>{
    await logout()
    await Updates.reloadAsync();
    
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
      <View style={styles.adBanner}>
        <AdBanner />
      </View>
      <View style={styles.bottom}>
        <View style={styles.userNameArea}>
          <Text style={[styleG.textStyle, { fontSize: width * 23, color: colors.textGray, fontFamily: 'NanumSquareRoundB', fontWeight: '100' }]}><Text style={[styleG.textBold, { fontSize: width * 30 }]}>
          {userName}
          {/* 백지연 */}
            </Text>님의 피부 MBTI</Text>
        </View>
        {/* MBTI 결과 그래프 */}
        <View style={styles.mbtiResult}>
          <View style={styles.mbti}>
            <TouchableOpacity style={[styles.mbtiBlock, { backgroundColor: backColor }]} onPress={LogoutProcess}>
              <Text style={styles.mbtiText}>{userMbti}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.graph}>
            <MbtiGraph category={'DO'} score={135}></MbtiGraph>
            <MbtiGraph category={'RS'} score={135}></MbtiGraph>
            <MbtiGraph category={'PN'} score={130}></MbtiGraph>
            <MbtiGraph category={'WT'} score={130}></MbtiGraph>
          </View>
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
    backgroundColor: colors.softGray,
    borderColor: colors.darkGray,
    borderWidth: width * 3,
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
    height: height * 350,
  },
  userNameArea: {
    height: width * 40,
    width: width * 400,
    paddingLeft: width * 10,
  },
  bottom:{

  }

});
