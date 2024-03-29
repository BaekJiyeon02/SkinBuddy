import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from "expo-font";
import { BorderlessButton } from 'react-native-gesture-handler';

import AcneAnalysisScreen from './src/screen/AcneAnalysis/AcneAnalysisScreen';
import AcneAnalysisResultScreen from './src/screen/AcneAnalysis/AcneAnalysisResultScreen';

import ImprovementAnalysisScreen from './src/screen/ImprovementAnalysis/ImprovementAnalysisScreen';
import ImprovementAnalysisResultScreen from './src/screen/ImprovementAnalysis/ImprovementAnalysisResultScreen';

import MbtiTestScreen from './src/screen/MbtiTest/MbtiTestScreen';
import MbtiTestResultScreen from './src/screen/MbtiTest/MbtiTestResultScreen';

import HistoryScreen from './src/screen/History/HistoryScreen';
import HistoryDetailScreen from './src/screen/History/HistoryDetailScreen';

import CameraScreen from './src/screen/Photo/CameraScreen';
import AlbumScreen from './src/screen/Photo/AlbumScreen';

import SettingScreen from './src/screen/Setting/SettingScreen';
import ChangePasswordScreen from './src/screen/Setting/ChangePasswordScreen';
import NoticeScreen from './src/screen/Setting/NoticeScreen';
import ProfileEditScreen from './src/screen/Setting/ProfileEditScreen';
import QandAListScreen from './src/screen/Setting/QandAListScreen';
import QandAWriteScreen from './src/screen/Setting/QandAWriteScreen';

import MainScreen from './src/screen/MainScreen';



import { colors, width, height } from './src/assets/globalStyles'; //width,height 받아오기

const Tab = createBottomTabNavigator();


const imagePaths = {
  icon1: require('./src/assets/img/home.png'),
  icon2: require('./src/assets/img/acne-analysis.png'),
  icon3: require('./src/assets/img/improvement-analysis.png'),
  icon4: require('./src/assets/img/mbti-test.png'),
  icon5: require('./src/assets/img/historical-diagnostic-history.png'),
  // 다른 아이콘들에 대한 경로들도 추가할 수 있습니다.
};

const TabNavigator = () => (
  <SafeAreaProvider>
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator style={styles.tab}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case '홈':
                iconName = 'icon1';
                break;
              case 'Ai 트러블 분석':
                iconName = 'icon2';
                break;
              case 'Ai 호전도 분석':
                iconName = 'icon3';
                break;
              case '피부 MBTI':
                iconName = 'icon4';
                break;
              default:
                iconName = 'icon5';
            }
            return (
              <Image style={styles.image} name={iconName} source={(imagePaths[iconName])} />
            );
          },
          tabBarShowLabel: true, // 텍스트 숨기기
          tabBarActiveTintColor: colors.activeText, // 활성 탭의 텍스트 색상
          tabBarInactiveTintColor: '#6A6A6A', // 비활성 탭의 텍스트 색상
          tabBarStyle: { backgroundColor: '#F2F2F2', height: height * 60, paddingBottom: 0, paddingRight: width * 10, paddingLeft: 10 }, // tabBar의 배경색, 크기 조절
          tabBarLabelStyle: { fontWeight: 'bold', fontFamily: "NanumSquareRoundB", fontSize: width* 12 }
        })}
      >
          <Tab.Screen name="홈" component={MainScreen} />
          <Tab.Screen name="Ai 트러블 분석" component={AcneAnalysisScreen} />
          <Tab.Screen name="Ai 호전도 분석" component={ImprovementAnalysisScreen} />
          <Tab.Screen name="피부 MBTI" component={MbtiTestScreen} />
          <Tab.Screen name="과거 진단 기록" component={HistoryScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  </SafeAreaProvider>
);

const Stack = createStackNavigator();

// 이전 스크린으로 돌아가는 함수
const goBack = () => {
  navigation.goBack();
};

const HeaderLogo=()=>{
  return (
    <Image style={{width:width * 87, height:height * 87, marginBottom:height* 20}} source={require('./src/assets/img/SkinBuddy_logo.png')}/>
  )
}
const HeaderBackButton = () => {
  return (
    <Image
      source={require("./src/assets/img/backToPage.png")}
      style={{ width: 24, height: 24, margin:10 }}
      onPress={goBack}
    />
  );
};

function App() {
  const [fontsLoaded] = useFonts({
    NanumSquareRoundB: require("./src/assets/fonts/NanumSquareRoundEB.ttf"),
  });
  if (!fontsLoaded) return null;
  return (

    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Stack" component={TabNavigator}
        options={{headerTitle: (props) => <HeaderLogo {...props} />,
        headerStatusBarHeight:height*80,
        headerShadowVisible: false, // 헤더의 선 없애기
        headerLeft: () => <HeaderBackButton />, // 헤더 왼쪽에 뒤로가기 추가
       }} />
        <Stack.Group>
          <Stack.Screen name="홈" component={MainScreen} />
        </Stack.Group>

        <Stack.Group>
          <Stack.Screen name="Ai 트러블 분석" component={AcneAnalysisScreen} />
          <Stack.Screen name="카메라" component={CameraScreen} />
          <Stack.Screen name="앨범" component={AlbumScreen} />
        </Stack.Group>

        <Stack.Group>
          <Stack.Screen name="Ai 호전도 분석" component={ImprovementAnalysisScreen} />
        </Stack.Group>

        <Stack.Group>
          <Stack.Screen name="피부 MBTI" component={MbtiTestScreen} />
        </Stack.Group>

        <Stack.Group>
          <Stack.Screen name="과거 진단 기록" component={HistoryScreen} />
          <Stack.Screen name="과거 진단 기록 상세 페이지" component={HistoryScreen} />
          
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  image: {
    width: width * 30,
    height: height * 30,
  },

});


export default App;

