import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styleG, colors, width, height } from '../../assets/globalStyles';
import InputTextBox from '../../components/InputTextBox';
import BackButton from '../../components/BackButton';
import BasicButton from '../../components/BasicButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export default function App() {
    const navigation = useNavigation();
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');



    const loginApiUrl = 'http://52.79.237.164:3000/user/login';


    //id 입력 데이터 저장
    const handleIdValue = (text) => {
        setInputId(text);
    };

    //pw 입력 데이터 저장
    const handlePwValue=(text)=> {
        setInputPw(text);
    }

    //로그인 성공시 상태 업데이트
    const handleLoginSuccess = async (id, token) => {
        await AsyncStorage.setItem('userId', id);
        // await AsyncStorage.setItem('userToken', token); //필요할시 사용
    };

    const goLogin = () => {

        const postData = {
            "userId" : inputId,
            "psword" : inputPw,
        };
      
          axios.post(loginApiUrl, postData)
          .then(response => {
              // 요청 성공 시 처리
              handleLoginSuccess(postData.userId, true)
              navigation.navigate("Stack")
          })
          .catch(error => {
              // 요청 실패 시 처리
              console.error('Error:', error);
          });

    }
    const goJoin = () => {
        navigation.navigate("Join")
    }
    const goFind = () => {
        navigation.navigate("FindAccount")
    }

    return (
        <View style={styles.container}>
            {/* 배경 이미지 */}
            <ImageBackground source={require("../../assets/img/SkinBuddy.png")} style={{ width: "100%", height: "100%" }}>
                <View style={styles.contentsArea}>
                    <View style={styles.logoArea}>
                        <Image style={styles.logo} source={require("../../assets/img/SkinBuddy_logo.png")}></Image>
                    </View>
                    <View style={styles.inputArea}>
                        <InputTextBox title={'ID'} value={inputId} onChangeText={handleIdValue}/>
                        <InputTextBox title={'PW'} value={inputPw} onChangeText={handlePwValue} type={'password'}/>
                    </View>
                    <View style={styles.buttonArea}>
                        <BasicButton color={colors.loginBlue} size={300} title={"로그인"} onPress={goLogin}/>
                        <BasicButton color={colors.loginSkyBlue} size={300} category={"topMargin"} title={"비회원으로 접속"} />
                    </View>
                    <View style={styles.hrefTextArea}>
                        <TouchableOpacity onPress={goJoin}>
                            <Text style={[styleG.textBold, { textDecorationLine: 'underline', color: colors.gray, fontSize: width * 17, margin:10, }]}>회원가입</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={goFind}>
                            <Text style={[styleG.textBold, { textDecorationLine: 'underline', color: colors.gray, fontSize: width * 17 , margin:10,}]}>아이디/비밀번호 찾기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    contentsArea: {
        flex: 1,
        alignItems: 'center',
    },
    logoArea: {
        width: 400,
        height: 150,
        marginTop: height * 170,
        alignItems: 'center',
    },
    logo: {
        height: height * 150,
        width: width * 150,
    },
    inputArea: {
        width: width * 300,
        height: height * 140,
    },
    buttonArea: {
        width: width * 300,
        height: height * 120,
    },
    hrefTextArea:{
        flexDirection:'row',
        alignItems: 'center'
    }

});
