// 사진 저장시 jpg, jpeg로, 정사각형
import * as React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Entypo} from '@expo/vector-icons'
import { colors, width, height, styleG } from '../assets/globalStyles';

export default function CameraButton({ title, onPress, icon, color,size }){
    if(size==undefined){
        size=28
    }
    return(
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Entypo name={icon} size={size} color={color ? color : colors.darkGray} />
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        height: height * 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
    },
    text: {
        fontWeight:'bold',
        fontSize: width * 16,
        color: colors.darkGray,
        marginLeft: width * 10
    }
})
