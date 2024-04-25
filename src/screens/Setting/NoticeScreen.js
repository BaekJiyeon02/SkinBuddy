import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { colors, width, height, styleG } from '../../assets/globalStyles';
import BasicButton from '../../components/BasicButton'
import Subseperator from '../../components/Subseperator'
import axios from 'axios';


export default function NoticeScreen() {

  const noticeUrl = 'http://52.79.237.164:3000/user/notice/list';

  const [list, setList] = useState([])

  const [expandedIndex, setExpandedIndex] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      noticeReturn();
      return () => {

      };
    }, [])
  );

  const navigation = useNavigation();

  function noticeReturn() {
    axios.get(noticeUrl)
      .then(response => {
        console.log('응답 데이터:', response.data);
        setList(response.data["list"]);
        console.log(list[1]);
      })
      .catch(error => {
        console.error('에러 발생:', error);
      });
  }

  const goCamera = () => {
    navigation.navigate('카메라');
  }
  const goAlbum = () => {
    navigation.navigate('앨범');
  }

  const handlePress = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={{ fontSize: width * 35, color: 'gray', width: width * 270, fontFamily: 'NanumSquareRoundEB' }}>공지사항</Text>
      </View>
      <Subseperator />
      <View style={styles.listArea}>
        {list.map((notice, index) => (
          <TouchableWithoutFeedback key={index} onPress={() => handlePress(index)}>
            <View style={{ marginBottom: width * 10 }}>
              <Subseperator type={"thin"} />
              <View style={{ padding: width * 15 }}>
                <Text>{notice.reviceDay}</Text>
                {expandedIndex === index ? (
                  <Text style={[styleG.textStyle, { fontSize: width * 20 }]}>{notice.content}</Text>
                ) : (
                  <Text numberOfLines={1} style={[styleG.textStyle, { fontSize: width * 20 }]}>{notice.content}</Text>
                )}
              </View>
              <Subseperator type={"thin"} />
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 20
  },
  titleArea: {
    width: width * 400,
    alignItems: 'flex-start',
    marginBottom: width * 10,
    marginLeft: width * 20,
  },
  listArea: {
    marginTop: height * 20,
    width: width * 400,
    height: height * 500
  }
});
