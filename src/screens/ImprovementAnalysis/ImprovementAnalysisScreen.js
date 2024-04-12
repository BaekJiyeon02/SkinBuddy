
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { colors, width, height, styleG } from '../../assets/globalStyles';
import BasicButton from '../../components/BasicButton'
import Subseperator from '../../components/Subseperator'

export default function App() {
  useFocusEffect( //탭 활성화 인식
    React.useCallback(() => {
      // 탭이 활성화될 때 실행되는 함수
      console.log('탭이 활성화되었습니다.');

      // 탭이 비활성화될 때 실행되는 함수
      return () => {
        console.log('탭이 비활성화되었습니다.');
        // 여기에 실행하고자 하는 특정 함수를 추가합니다.
      };
    }, [])
  );

  const navigation = useNavigation();

  const goCamera = () => {
    navigation.navigate('카메라');
  }
  const goAlbum = () => {
    navigation.navigate('앨범');
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={styleG.titleText}>Ai 피부 호전도 분석</Text>
      </View>
      <View style={styles.contentsArea}>
        <Subseperator />
        <View style={styles.commentArea}>
          <Text style={[styleG.textStyle, { fontSize: width * 25 }]}>
          과거 사진과 비교하여 <Text style={styleG.textBold}>호전도</Text>를 {'\n'}확인해보세요!
          </Text>
          <Text style={[styleG.textStyle, { fontSize: width * 18 }]}>
            {'\n'}
            관리의 완성은 꾸준함이죠! 아무리 좋은 방법일지라도{'\n'}
            지속적이지 않으면 아쉽게 얻고자 하는 바를 놓칠 수도{'\n'}
            있어요.{'\n'}
            {'\n'}
            저희가 <Text style={styleG.textBold}>피부 분석 AI</Text>하고 각각마다 <Text style={styleG.textBold}>관리법이{'\n'}
              다르다</Text>는 사실 알고 계셨나요?
            {'\n'}{'\n'}
            저희가 <Text style={styleG.textBold}>피부 진단 AI</Text>를 통해 지난 사진과 비교해서{'\n'}
            얼마나 호전되었는지 파악해 드릴게요!
          </Text>
          <Text style={[styleG.textStyle, { fontSize: width * 18, marginTop: height * 30 }]}>
            이렇게 찍어주세요 :){'\n'}
            {'\t'}• <Text style={{ color: colors.highlightBlue }}>화장하지 않은</Text> 맨 얼굴{'\n'}
            {'\t'}• <Text style={{ color: colors.highlightBlue }}>선명하게</Text> 찍은 얼굴{'\n'}
            {'\t'}• <Text style={{ color: colors.highlightBlue }}>트러블이 있는 부위</Text>의 얼굴{'\n'}
            {'\n'}
            이렇게 찍으면 어려워요 :({'\n'}
            {'\t'}• <Text style={{ color: colors.highlightRed }}>초점이 맞지 않는</Text> 얼굴{'\n'}
            {'\t'}• <Text style={{ color: colors.highlightRed }}>너무 먼 거리에서</Text> 찍은 얼굴{'\n'}
            {'\t'}• <Text style={{ color: colors.highlightRed }}>옆모습이나 각도가 기운 채</Text>로 찍은 얼굴{'\n'}
            {'\t'}• <Text style={{ color: colors.highlightRed }}>흔들리게</Text> 찍힌 얼굴{'\n'}
          </Text>

        </View>
      </View>
      <View style={styles.ButtonArea}>
        <BasicButton color={colors.buttonBlue} onPress={goCamera} title={'사진 촬영'} />
        <BasicButton color={colors.buttonSkyBlue} onPress={goAlbum} title={'앨범에서 선택'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  titleArea: {
    flexDirection: 'row',
    height: height * 70,
  },
  commentArea: {
    flexDirection: 'columm',
    height: height * 500,
    width: width * 400,
    marginTop: height * 20,
  },
  ButtonArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 100,
  },
  contentsArea: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
