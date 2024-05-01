import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, Button, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from "expo-font";
import { BorderlessButton } from 'react-native-gesture-handler';
import BackButton from './src/components/BackButton';
import { colors, width, height } from './src/assets/globalStyles'; //width,height 받아오기
import AsyncStorage from '@react-native-async-storage/async-storage';

//로그인 정보 확인 component
import { AuthProvider } from './AuthProvider';

import TabNavigator from './src/screens/TabNavigator';

import AcneAnalysisScreen from './src/screens/AcneAnalysis/AcneAnalysisScreen';
import AcneAnalysisResultScreen from './src/screens/AcneAnalysis/AcneAnalysisResultScreen';

import ImprovementAnalysisScreen from './src/screens/ImprovementAnalysis/ImprovementAnalysisScreen';
import ImprovementAnalysisResultScreen from './src/screens/ImprovementAnalysis/ImprovementAnalysisResultScreen';


import MbtiTestScreen from './src/screens/MbtiTest/MbtiTestScreen';
import MbtiTestResultScreen from './src/screens/MbtiTest/MbtiTestResultScreen';
import MbtiTestPaperScreen from './src/screens/MbtiTest/MbtiTestPaperScreen';


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
import TermsOfUseScreen from './src/screens/Setting/TermsOfUseScreen';
import VersionInformationScreen from './src/screens/Setting/VersionInformationScreen';
import DeleteAccountScreen from './src/screens/Setting/DeleteAccountScreen';



// 로그인/회원가입
import LoginScreen from './src/screens/Login/LoginScreen';
import FindAccountScreen from './src/screens/Login/FindAccountScreen';
import JoinScreen from './src/screens/Login/JoinScreen';

import MainScreen from './src/screens/MainScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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


const imagePaths = {
  icon1: require('./src/assets/img/home.png'),
  icon2: require('./src/assets/img/acne-analysis.png'),
  icon3: require('./src/assets/img/improvement-analysis.png'),
  icon4: require('./src/assets/img/mbti-test.png'),
  icon5: require('./src/assets/img/historical-diagnostic-history.png'),
  // 다른 아이콘들에 대한 경로들도 추가할 수 있습니다.
};

const BasicOption = {
  headerTitle: (props) => <HeaderLogo {...props} />,  //헤더 로고 추가
  headerStatusBarHeight: height * 80, // 헤더 높이
  headerShadowVisible: false, // 헤더의 선 없애기
  headerBackVisible: false,

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

const MainHeaderOption = {

}

function SettingPageScreen() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('SettingScreen')}>
      <Image
        source={require('./src/assets/img/setting.png')}
        style={{ width: width * 30, height: width * 30, marginRight: width * 30, }}
      />
    </TouchableOpacity>
  )
}

function Main() {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name="MainScreen" component={MainScreen}
          options={{
            ...BasicOption,
            headerRight: () => (
              <SettingPageScreen />
            )
          }} />
          <Stack.Screen name="MbtiTestResult" component={MbtiTestResultScreen}
          options={{
            ...BasicOption,
            ...BackButtonOption
          }}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name='SettingScreen' component={SettingScreen}
          options={{
            ...BasicOption,
            ...BackButtonOption
          }} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} 
        options={{
            ...BasicOption,
            ...BackButtonOption
          }} />
        <Stack.Screen name="TermsOfUse" component={TermsOfUseScreen} 
        options={{
            ...BasicOption,
            ...BackButtonOption
          }} />
        <Stack.Screen name="Notice" component={NoticeScreen} 
        options={{
            ...BasicOption,
            ...BackButtonOption
          }} />
        <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} 
        options={{
            ...BasicOption,
            ...BackButtonOption
          }} />
        <Stack.Screen name="QandAList" component={QandAListScreen} 
        options={{
            ...BasicOption,
            ...BackButtonOption
          }} />
        <Stack.Screen name="QandAWrite" component={QandAWriteScreen} 
        options={{
            ...BasicOption,
            ...BackButtonOption
          }} />
        <Stack.Screen name="VersionInformation" component={VersionInformationScreen} 
        options={{
            ...BasicOption,
            ...BackButtonOption
          }} />
        <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} 
        options={{
            ...BasicOption,
            ...BackButtonOption
          }} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

function AiTrouble() {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name="AiTroubleScreen" component={AcneAnalysisScreen} options={BasicOption} />
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
    </Stack.Navigator>
  )
}

function AiImprove() {
  return (
    <Stack.Navigator>

      <Stack.Group>
        <Stack.Screen name="AiImproveScreen" component={ImprovementAnalysisScreen} options={BasicOption} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

function Mbti() {
  return (
    <Stack.Navigator>

      <Stack.Group>
        <Stack.Screen name="MBTIScreen" component={MbtiTestScreen} options={BasicOption} />
        <Stack.Screen name="MbtiTest" component={MbtiTestPaperScreen}
          options={{
            ...BasicOption,
            ...BackButtonOption,
          }} />
        <Stack.Screen name="MbtiTestResult" component={MbtiTestResultScreen}
          options={{
            ...BasicOption,
            ...BackButtonOption
          }}
        />
      </Stack.Group>
    </Stack.Navigator>

  )
}

function History() {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
        <Stack.Screen name="HistoryDetail" component={HistoryDetailScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
}


function App() {

  // 상태를 판단하기 위한 추가된 코드
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 컴포넌트가 마운트될 때 로그인 상태를 확인합니다.
  useEffect(() => {
    // 로그인 상태 확인 로직을 추가하세요. 예: 토큰 유효성 검사, 사용자 데이터 확인 등.
    // 아래는 예시 코드입니다.
    const checkLoginStatus = async () => {
      const userId = await AsyncStorage.getItem('userId');
      setIsLoggedIn(!!userId);
      console.log('유저 로그인 상태:', isLoggedIn)
    };
    checkLoginStatus();
  }, [isLoggedIn]);

  // 사용 할 폰트 로드
  const [fontsLoaded] = useFonts({
    'NanumSquareRoundB': require("./src/assets/fonts/NanumSquareRoundB.ttf"),
    'NanumSquareRoundL': require('./src/assets/fonts/NanumSquareRoundL.ttf'),
    'NanumSquareRoundR': require('./src/assets/fonts/NanumSquareRoundR.ttf'),
    'NanumSquareRoundEB': require('./src/assets/fonts/NanumSquareRoundEB.ttf'),
  });
  if (!fontsLoaded) return null;

  return (

    <AuthProvider>
      {!isLoggedIn ? (
        <NavigationContainer>
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
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              headerBackVisible: false, // 뒤로가기 버튼 숨기기
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
                  case 'MBTI':
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
              tabBarStyle: { justifyContent: 'flex-start', backgroundColor: '#F2F2F2', height: height * 100, paddingBottom: 0, paddingRight: width * 10, paddingLeft: 10 }, // tabBar의 배경색, 크기 조절
              tabBarLabelStyle: { fontFamily: "NanumSquareRoundEB", fontSize: width * 12, marginBottom: height * 30 },
            })}
          >
            <Tab.Screen name="main" component={Main} options={{ tabBarLabel: '홈' }} />
            <Tab.Screen name="AiTrouble" component={AiTrouble} options={{ tabBarLabel: 'Ai 트러블 분석' }} />
            <Tab.Screen name="AiImprove" component={AiImprove} options={{ tabBarLabel: 'Ai 호전도 분석' }} />
            <Tab.Screen name="MBTI" component={Mbti} options={{ tabBarLabel: 'MBTI' }} />
            <Tab.Screen name="History" component={History} options={{ tabBarLabel: '과거 진단 기록' }} />
          </Tab.Navigator>
        </NavigationContainer>

      )}
    </AuthProvider>
  );
}

const styles = StyleSheet.create({

  image: {
    width: width * 30,
    height: height * 30,
  },


});

export default App;

