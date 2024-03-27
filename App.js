import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from "expo-font";
import { BorderlessButton } from 'react-native-gesture-handler';

import AcneAnalysisScreen from './src/screen/AcneAnalysisScreen';
import ImprovementAnalysisScreen from './src/screen/ImprovementAnalysisScreen';
import MainScreen from './src/screen/MainScreen';
import MbtiTestScreen from './src/screen/MbtiTestScreen';
import HistoryScreen from './src/screen/HistoryScreen';
import CameraScreen from './src/screen/CameraScreen';

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
          tabBarActiveTintColor: 'black', // 활성 탭의 텍스트 색상
          tabBarInactiveTintColor: '#626262', // 비활성 탭의 텍스트 색상
          tabBarStyle: { backgroundColor: '#F2F2F2', height: 60, paddingBottom: 0, paddingRight: 10, paddingLeft: 10 }, // tabBar의 배경색, 크기 조절
          tabBarLabelStyle: { fontWeight: 'bold', fontFamily: "NanumSquareRoundB", fontSize: 12 }
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

function HeaderLogo(){
  return (
    <Image style={{width:75, height:75}} source={require('./src/assets/img/SkinBuddy_logo.png')}/>
  )
}

function App() {
  const [fontsLoaded] = useFonts({
    NanumSquareRoundB: require("./src/assets/fonts/NanumSquareRoundEB.ttf"),
  });
  if (!fontsLoaded) return null;
  return (

    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Stack" component={TabNavigator}
        options={{ headerTitle: (props) => <HeaderLogo {...props} /> }} />
        <Stack.Group>
          <Stack.Screen name="홈" component={MainScreen} />
        </Stack.Group>

        <Stack.Group>
          <Stack.Screen name="Ai 트러블 분석" component={AcneAnalysisScreen} />
          <Stack.Screen name="카메라" component={CameraScreen} />
        </Stack.Group>

        <Stack.Group>
          <Stack.Screen name="Ai 호전도 분석" component={ImprovementAnalysisScreen} />
        </Stack.Group>

        <Stack.Group>
          <Stack.Screen name="피부 MBTI" component={MbtiTestScreen} />
        </Stack.Group>

        <Stack.Group>
          <Stack.Screen name="과거 진단 기록" component={HistoryScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  image: {
    width: 30,
    height: 30,
  },

});


export default App;

