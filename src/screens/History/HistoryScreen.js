import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { colors, width, height, styleG } from '../../assets/globalStyles';
import Subseperator from '../../components/Subseperator';
import axios from 'axios';
import { AuthContext } from '../../../AuthProvider';

export default function HistoryScreen() {
  const { userId } = useContext(AuthContext);
  const navigation = useNavigation();

  const deleteResultUrl = "http://52.79.237.164:3000/user/skin/record/delete";
  const recordListUrl = 'http://52.79.237.164:3000/user/skin/record/list';
  const detailReturnUrl = 'http://52.79.237.164:3000/user/skin/record/select';

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      listReturn();
      console.log('탭 활성화')
      return () => {
        console.log('탭 비활성화')
      };
    }, [])
  );

  useEffect(() => {
    listReturn();
  }, [])

  const listReturn = () => {
    const postData = {
      "userId": userId
    }
    axios.post(recordListUrl, postData)
      .then(response => {
        console.log('응답 데이터:', response.data);
        setList(response.data["list"]);
      })
      .catch(error => {
        console.error('에러 발생:', error);
      });
  }

  const deleteData = (recordId) => {
    console.log('응답:', recordId)
    if (!recordId) {
      console.error('recordId가 비어 있습니다.');
      return;
    }
    const postData = {
      'recordId': recordId,
    };
    axios.delete(deleteResultUrl, { data: postData })
      .then(response => {
        console.log('postData:', postData)
        console.log('응답:', response.data)
        if (response.data['property'] == 200) {
          console.log('진단기록 삭제됨')
        }
        else if (response.data['property'] == 301) {
          console.log('응답:', response.data)
          Alert.alert(
            response.data['message'],
            '',
            [
              { text: '확인' },
            ],
          );
        }
        else {
          Alert.alert(
            response.data['message'],
            '',
            [
              { text: '확인' },
            ],
          );
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  const goCamera = () => {
    navigation.navigate('카메라');
  }
  const goAlbum = () => {
    navigation.navigate('앨범');
  }

  const handlePress = (recordId, aiType, takeDay) => {
    const postData = {
      "userId": userId,
      "recordId": recordId,
      "aiType": aiType
    }
    axios.post(detailReturnUrl, postData)
      .then(response => {
        console.log('응답 데이터!:', response.data);
        const res = response.data
        if (aiType == "AI 호전도 분석") {
          if (res.improvement == "처음으로 호전도 검사 서비스를 사용 하였으므로 과거 기록이 존재하지 않습니다") {
            navigation.navigate("ImprovementAnalysisResultScreen", { recordId: res.currentData.recordId, troubleTotal: res.currentData.troubleTotal, pastData: null, improvement: res.improvement, takeDay: takeDay, history: true });
          }
          else {
            navigation.navigate("ImprovementAnalysisResultScreen", { recordId: res.currentData.recordId, troubleTotal: res.currentData.troubleTotal, pastData: res.pastData.recordId, pastTotal: res.pastData.troubleTotal, improvement: res.improvement, takeDay: takeDay, history: true });
          }
        }
        else if (aiType == "AI 트러블 분석") {
          navigation.navigate("AiTroubleResultScreen", { recordId: res.data.recordId, acneLevel: res.data.troubleType, takeDay: takeDay, history: true });
        }
      })
      .catch(error => {
        console.error('에러 발생:', error);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={{ fontSize: width * 35, color: 'gray', width: width * 270, fontFamily: 'NanumSquareRoundEB' }}>과거 진단 기록</Text>
      </View>
      <Subseperator />
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => handlePress(item.recordId, item.aiType, item.takeDay)}>
            <View style={{ marginBottom: width * 10 }}>
              <Subseperator type={"thin"} />
              <View style={{ padding: width * 15, height: height * 70, justifyContent: 'center' }}>
                <Text numberOfLines={1} style={[styleG.textBold, { fontSize: width * 20 }]}>[{item.takeDay}]{item.aiType}{item.recordId}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={{ marginTop: height * 20, width: width * 400, height: height * 500 }}
      />
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
  }
});
