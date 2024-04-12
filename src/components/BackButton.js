import * as React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { width, height } from '../assets/globalStyles'; //width,height 받아오기
import { useNavigation } from '@react-navigation/native';


export default function BasicButton() {
    const navigation = useNavigation();


    // 이전 스크린으로 돌아가는 함수
    const goBack = () => {
        navigation.goBack();
    };

    return (
        <TouchableOpacity onPress={goBack}>
            <Image
                source={require("../assets/img/backToPage.png")}
                style={{ width: 24, height: 24, margin: 10 }}
            />

        </TouchableOpacity>
    )
}

const styleSheet = StyleSheet.create({

    button: {
        width: width * 116,
        height: height * 53,
        borderRadius: width * 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: width * 10,
        marginLeft: width * 10
    },
    textStyle:
    {
        fontFamily: "NanumSquareRoundB",
        fontWeight: 'bold',
        color: 'white',
        fontSize: width * 15
    }

})
