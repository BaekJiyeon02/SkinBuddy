import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState} from 'react';
import { colors, width, height, styles } from '../assets/globalStyles'; //width,height 받아오기

export default function BasicButton({ title, onPress, category, size }) {
  const score=130;

    

    switch(category){
      case 'DO' :
        return(
          <View style={styleSheet.conatiner}>
            <View style={{width:160, height:23, backgroundColor:"#FFD4AC", top:9, right:10,position:'absolute'}}></View>
            <View style={{width:score, height:23, backgroundColor:"#FF5959", top:9, left:10,position:'absolute'}}></View> 
            <View style={ [styleSheet.leftCircle, {backgroundColor:"#FF9494"}]}>
              <Text>D</Text>
            </View>
            <View style={[styleSheet.rightCircle, {backgroundColor:"#FFC48D"}]}></View>
          </View>

        )
        
      case 'RS' :

        return(
          <View style={styleSheet.conatiner}>
            <View style={{width:160, height:23, backgroundColor:"#FFF48E", top:9, right:10,position:'absolute'}}></View>
            <View style={{width:score, height:23, backgroundColor:"#FFD159", top:9, left:10,position:'absolute'}}></View> 
            <View style={[styleSheet.leftCircle, {backgroundColor:"#FFE194"}]}></View>
            <View style={[styleSheet.rightCircle,{backgroundColor:"#FFED4C"}]}></View>
          </View>
        )

      case 'PN' :

        return(
          <View style={styleSheet.conatiner}>
            <View style={{width:160, height:23, backgroundColor:"#B3EEE0", top:9, right:10,position:'absolute'}}></View>
            <View style={{width:score, height:23, backgroundColor:"#50C846", top:9, left:10,position:'absolute'}}></View> 
            <View style={[styleSheet.leftCircle, {backgroundColor:"#77D881"}]}></View>
            <View style={[styleSheet.rightCircle, {backgroundColor:"#91E0CD"}]}></View>
          </View>

          
        )


      case 'WT':
        return(
          <View style={styleSheet.conatiner}>
            <View style={{width:160, height:23, backgroundColor:"#DBDAFF", top:9, right:10,position:'absolute'}}></View>
            <View style={{width:score, height:23, backgroundColor:"#9AC8FF", top:9, left:10,position:'absolute'}}></View> 
            <View style={[styleSheet.leftCircle,{backgroundColor:"#A4CEFF"}]}></View>
            <View style={[styleSheet.rightCircle, {backgroundColor:"#BEBDFF"}]}></View>
          </View>
        )
    }
}

const styleSheet = StyleSheet.create({
  conatiner:{
    width: 200,
    height:60,
    backgroundColor:"gray"

  },
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
    textStyle:{
        fontFamily: "NanumSquareRoundB",
        fontWeight: 'bold',
        color: 'white',
        fontSize: width * 15
    },
    leftCircle : {
      width:40,
      height:40,
      position:'absolute',
      borderRadius:50, 
      left:0 
    },
    rightCircle : {
      width:40,
      height:40,
      position:'absolute',
      borderRadius:50, 
      right:0 
    },


})
