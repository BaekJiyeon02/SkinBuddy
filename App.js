import React from 'react';
import { StyleSheet, Text, View, Image, Button, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from "expo-font";
import { BorderlessButton } from 'react-native-gesture-handler';
import BackButton from './src/components/BackButton';

import AcneAnalysisScreen from './src/screens/AcneAnalysis/AcneAnalysisScreen';
import AcneAnalysisResultScreen from './src/screens/AcneAnalysis/AcneAnalysisResultScreen';

import ImprovementAnalysisScreen from './src/screens/ImprovementAnalysis/ImprovementAnalysisScreen';
import ImprovementAnalysisResultScreen from './src/screens/ImprovementAnalysis/ImprovementAnalysisResultScreen';

import MbtiTestScreen from './src/screens/MbtiTest/MbtiTestScreen';
import MbtiTestResultScreen from './src/screens/MbtiTest/MbtiTestResultScreen';

import HistoryScreen from './src/screens/History/HistoryScreen';
import HistoryDetailScreen from './src/screens/History/HistoryDetailScreen';

import CameraScreen from './src/screens/Photo/CameraScreen';
import AlbumScreen from './src/screens/Photo/AlbumScreen';

import SettingScreen from './src/screens/Setting/SettingScreen';
import ChangePasswordScreen from './src/screens/Setting/ChangePasswordScreen';
import NoticeScreen from './src/screens/Setting/NoticeScreen';
import ProfileEditScreen from './src/screens/Setting/ProfileEditScreen';
import QandAListScreen from './src/screens/Setting/QandAListScreen';
import QandAWriteScreen from './src/screens/Setting/QandAWriteScreen';

// 로그인/회원가입
import LoginScreen from './src/screens/Login/LoginScreen';
import FindAccountScreen from './src/screens/Login/FindAccountScreen';
import JoinScreen from './src/screens/Login/JoinScreen';

import MainScreen from './src/screens/MainScreen';

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
              case 'main':
                iconName = 'icon1';
                break;
              case 'AiTrouble':
                iconName = 'icon2';
                break;
              case 'AiImprove':
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
          tabBarLabelStyle: { fontWeight: 'bold', fontFamily: "NanumSquareRoundB", fontSize: width * 12 }
        })}
      >
        <Tab.Screen name="main" component={MainScreen} />
        <Tab.Screen name="AiTrouble" component={AcneAnalysisScreen} />
        <Tab.Screen name="AiImprove" component={ImprovementAnalysisScreen} />
        <Tab.Screen name="MBTI" component={MbtiTestScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  </SafeAreaProvider>
);

const Stack = createStackNavigator();



const HeaderLogo = () => {
  return (
    <Image style={{ width: width * 87, height: height * 87, marginBottom: height * 20 }} source={require('./src/assets/img/SkinBuddy_logo.png')} />
  )
}
const HeaderBackButton = () => {
  return (
    <BackButton />

  );
};

const BasicOption = {
  headerTitle: (props) => <HeaderLogo {...props} />,  //헤더 로고 추가
  headerStatusBarHeight: height * 80, // 헤더 높이
  headerShadowVisible: false, // 헤더의 선 없애기
}

const BackButtonOption = {

  HeaderBackButton: true,
  headerBackTitleVisible: false,
  headerTintColor: "black"
}

const NoLogoHeaderOption = {
  headerStatusBarHeight: height * 60, // 헤더 높이
  headerShadowVisible: false, // 헤더의 선 없애기
  headerTitle: '',
}

function App() {

  // 사용 할 폰트 로드
  const [fontsLoaded] = useFonts({
    'NanumSquareRoundB': require("./src/assets/fonts/NanumSquareRoundEB.ttf"),
    'NanumSquareRoundL': require('./src/assets/fonts/NanumSquareRoundL.ttf'),
    'NanumSquareRoundR': require('./src/assets/fonts/NanumSquareRoundR.ttf'),
  });
  if (!fontsLoaded) return null;
  //로그인 안했을 경우
  if (1) {
    return (
      <NavigationContainer>
        <StatusBar />
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen}
              options={{
                headerShown: false
              }} />
            <Stack.Screen name="FindAccount" component={FindAccountScreen}
              options={{
                ...BackButtonOption,
                ...NoLogoHeaderOption,
              }} />
            <Stack.Screen name="Join" component={JoinScreen}
              options={{
                ...BackButtonOption,
                ...NoLogoHeaderOption,
              }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer >
      //   </SafeAreaView >
      // </SafeAreaProvider>
    )
  }

  //로그인 했을 경우
  if (0) {
    return (

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Stack" component={TabNavigator}
            options={BasicOption} />
          <Stack.Group>
            <Stack.Screen name="main" component={MainScreen} />
          </Stack.Group>

          <Stack.Group>
            <Stack.Screen name="AiTrouble" component={AcneAnalysisScreen} />
            <Stack.Screen name="Camera" component={CameraScreen}
              options={{
                ...BasicOption,
                ...BackButtonOption,
              }}
            />
            <Stack.Screen name="Album" component={AlbumScreen}
              options={{
                ...BasicOption,
                ...BackButtonOption,
              }}
            />
          </Stack.Group>

          <Stack.Group>
            <Stack.Screen name="AiImprove" component={ImprovementAnalysisScreen} />
          </Stack.Group>

          <Stack.Group>
            <Stack.Screen name="MBTI" component={MbtiTestScreen} />
          </Stack.Group>

          <Stack.Group>
            <Stack.Screen name="History" component={HistoryScreen} />
            <Stack.Screen name="HistoryDetail" component={HistoryScreen} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({

  image: {
    width: width * 30,
    height: height * 30,
  },

});

export default App;

