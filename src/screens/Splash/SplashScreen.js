import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styleG, colors, width, height } from '../../assets/globalStyles';


export default function App() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* 배경 이미지 */}
            <ImageBackground source={require("../../assets/img/SkinBuddy.png")} style={{ width: "100%", height: "100%" }}>
                <View style={styles.contentsArea}>
                    <View style={styles.logoArea}>
                        <Image style={styles.logo} source={require("../../assets/img/SkinBuddy_logo.png")}></Image>
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
        alignItems:'center',
    },
    logo: {
        height:height * 170,
        width:width * 170,
    },

});
