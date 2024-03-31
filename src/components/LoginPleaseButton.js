import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, width, height, styles } from '../assets/globalStyles'; //width,height 받아오기

export default function BasicButton({ title, onPress, color, size }) {
    console.log(color)

    return (
        <TouchableOpacity style={[styleSheet.button,{backgroundColor:colors}]} onPress={onPress}>
            <Text style={styleSheet.textStyle}>{title}</Text>
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
        marginLeft: width* 10
    },
    textStyle:
    {
        fontFamily: "NanumSquareRoundB",
        fontWeight: 'bold',
        color: 'white',
        fontSize: width * 15
    }

})
