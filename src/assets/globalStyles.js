import {Dimensions} from 'react-native';

export const colors = {
  buttonBlue: '#7CA7F1',
  buttonSkyBlue:'#C0D8FF',
  textGrey: '#626262',
  highlightBlue : "#9ABBF3",
  highlightRed : "#FFA4A4",
  activeText: "#000000"
};


export const basicDimensions = { // 디자이너가 작업하고 있는 XD파일 스크린의 세로,가로
  height: 932,
  width: 430,
};

export const height = ( // 높이 변환 작업
Dimensions.get('screen').height *
(1 / basicDimensions.height)
).toFixed(2);

export const width = ( // 가로 변환 작업
Dimensions.get('screen').width *
(1 / basicDimensions.width)
).toFixed(2);


export const styles = {


  titleText:{
    color: colors.textGrey,
    fontFamily: "NanumSquareRoundB",
    fontWeight: 'bold',
    fontSize: width * 30,
    margin: width*20,


  }
}
