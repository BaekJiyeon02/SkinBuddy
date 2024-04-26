
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { styleG, colors, width, height } from '../../assets/globalStyles';
import axios from 'axios';

export default function TermsOfUseScreen() {

  const termsUrl = "http://52.79.237.164:3000/user/terms"

  const [termsList, setTermsList] = useState([]);
  useEffect(()=>{
    getTerms()

  },[])

  function getTerms(){
    axios.get(termsUrl)
    .then(response => {
      console.log('응답 데이터:', response.data);
      setTermsList(response.data["trems"]);
    })
    .catch(error => {
      console.error('에러 발생:', error);
    });
}


  return (
    <View style={styles.container}>
      <Text>
      {termsList}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 20,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingBottom: 20
  },

});
