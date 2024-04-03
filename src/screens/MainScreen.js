
import React,{useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import MbtiGraph from '../components/MbtiGraph';


export default function App() {

  return (
    <View style={styles.container}>
      <View style={styles.mbtiResult}>
        <View style={styles.graph}>
          <MbtiGraph category={'DO'} score={130}></MbtiGraph>
          <MbtiGraph category={'RS'} score={130}></MbtiGraph>
          <MbtiGraph category={'PN'} score={130}></MbtiGraph>
          <MbtiGraph category={'WT'} score={130}></MbtiGraph>
        </View>
        <View style={styles.mbti}>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  mbtiResult:{
    flexDirection: 'row',
    width: 500,
    alignItems:'center',
    justifyContent:'center',
  },
  mbti:{
    backgroundColor:'blue',

  },
  graph:{
    backgroundColor:'red',
    position: 'relative',
    width: 200,
  }

});
