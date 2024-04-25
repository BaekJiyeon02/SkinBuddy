
import React, { useState, useEffect, useRef,useContext } from 'react';
import { StyleSheet, Text, View, Image, Button, ActivityIndicator } from 'react-native';
import MbtiGraph from '../components/MbtiGraph';
import AdBanner from '../components/AdBanner';
import { useNavigation } from '@react-navigation/native';
import { styleG, colors, width, height } from '../assets/globalStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../AuthProvider';



export default function MainScreen() {
  const navigation = useNavigation();

  const {userId, userName, skinType, loading, logout, doScore, rsScore, pnScore, wtScore } = useContext(AuthContext);
  
  const [backColor, setBackColor] = useState(colors.buttonSkyBlue);
  const [userMbti, setUserMbti] = useState(skinType);
  const [doResult,setDoResult]=useState(0);
  const [rsResult,setRsResult]=useState(0);
  const [pnResult,setPnResult]=useState(0);
  const [wtResult,setWtResult]=useState(0);
  const [doType,setDoType]=useState('');
  const [rsType,setRsType]=useState('');
  const [pnType,setPnType]=useState('');
  const [wtType,setWtType]=useState('');




  useEffect(() => {
    setUserMbti(skinType)
    ScoreCalcDO(); 
    ScoreCalcRS();
    ScoreCalcPN();
    ScoreCalcWT();
    mbtiColor();

  }, [loading, userId, skinType] //doResult 값이 변경될때마다 로그
  );

  const mbtiColor=()=>{

  }


  const ScoreCalcDO=()=>{
    const doResult=doScore;
    console.log('doResult:',doResult)
    if(doResult>26){
      // const score=15*(doResult/17);
      setDoResult(doResult*2.8)
      // console.log('score:',score)
      setDoType('Oily')
    }
    else if(doResult<=26){
      setDoResult(doResult*2)
      setDoType('Dry')
    }
  }

  //최저값 18, 최고값 72
  const ScoreCalcRS=()=>{
    const rsResult=rsScore;
    console.log('rsResult:',rsResult)
    if(rsResult>29){
      // const score=15*(doResult/17);
      setRsResult(rsResult*1.7)
      // console.log('score:',score)
      setRsType('Sensitive')
    }
    else if(rsResult<=29){
      if(rsResult>24){
        setRsResult(rsResult*2)
      }
      else{
        setRsResult(rsResult)
      }
      setRsType('Resistent')
    }
  }

  //최저값 10, 최고값 40
  const ScoreCalcPN=()=>{
    const pnResult=pnScore;
    console.log('pnResult:',pnResult)
    if(pnResult>30){
      setPnResult(pnResult*3)
      setPnType('Pigment')
    }
    else if(pnResult<=30){
      setPnResult(pnResult*2)
      setPnType('Non-Pigment')
    }
  }
  //최저값 20, 최고값 85
  const ScoreCalcWT=()=>{
    const wtResult=wtScore;
    console.log('wtResult:',wtResult)
    if(wtResult>40){
      if(wtResult<=60){
        setWtResult(wtResult*1.8)
      }
      else if(wtResult<75 && wtResult>60){
        setWtResult(wtResult*1.6)
      }
      else{
        setWtResult(wtResult*1.4)
      }
      setWtType('Wrinkle')
    }
    else if(wtResult<=40){
      setWtResult(wtResult)
      setWtType('Tight')
    }
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
      {/* 광고 배너 */}
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
            <TouchableOpacity style={[styles.mbtiBlock, { backgroundColor: backColor }]} onPress={()=>{skinType=='????'?navigation.navigate('MBTI'):navigation.navigate('MbtiTestResult')}}>
              <Text style={styles.mbtiText}>{userMbti}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.graph}>
            <MbtiGraph category={doType} score={doResult}></MbtiGraph>
            <MbtiGraph category={rsType} score={rsResult}></MbtiGraph>
            <MbtiGraph category={pnType} score={pnResult}></MbtiGraph>
            <MbtiGraph category={wtType} score={wtResult}></MbtiGraph>
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
