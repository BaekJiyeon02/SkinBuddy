import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import CameraButton from '../../components/CameraButton'
import { colors, width, height } from '../../assets/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../AuthProvider';
import axios from 'axios';

export default function CameraScreen({ route }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const { userId } = useContext(AuthContext);
  const { category } = route.params;
  const navigation = useNavigation();

  const AiTroubleUrl = 'http://ceprj.gachon.ac.kr:60017/test';

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status == 'granted');
    })();
  }, []);

  const handleFocus = async () => {
    if (cameraRef.current) {
      await cameraRef.current.focus();
    }
  };

  const handleTouchStart = async (event) => {
    if (cameraRef.current) {
      const touchX = event.nativeEvent.locationX;
      const touchY = event.nativeEvent.locationY;
      await cameraRef.current.focusAtPoint(touchX, touchY);
    }
  };

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };
  

  const sendImage = async () => {
    if (image) {
      const screenName = category;
      if (category == 'ImprovementAnalysisResultScreen') {
        navigation.navigate(screenName);
      } else {
        const formData = new FormData();
        formData.append('file', {
          uri: image,
          type: 'image/jpeg',
          name: 'photo.jpeg',
        });
        formData.append('userId', userId);

        axios.post(AiTroubleUrl, formData)
          .then(response => {
              console.log("response:",response["data"])
              const recordId=response['data']['recordId']
              const acneLevel=response['data']['acneLevel']
              navigation.navigate("AiTroubleResultScreen",{recordId:recordId, acneLevel:acneLevel})
              
            // if (response['Property'] == 200) {
            //   console.log('사진 보냄!');
            // } else {
            //   console.log('사진 실패!');
            // }
          })
          .catch(error => {
            console.error('Error:', error);
          });

        setImage(null);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ?
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
          autoFocus={true}
          onTouchStart={handleTouchStart}
        >
          <View style={styles.cameraButtons}>
            <CameraButton
              icon={'retweet'}
              onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}
            />
            <CameraButton
              icon={'flash'}
              color={flash === Camera.Constants.FlashMode.off ? 'gray' : colors.darkGray}
              onPress={() => setFlash(flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off)}
            />
          </View>
        </Camera>
        :
        <Image source={{ uri: image }} style={styles.camera} />
      }
      <View>
        {image ?
          <View style={styles.cameraButtons}>
            <CameraButton title={"다시 찍기"} icon="retweet" onPress={() => setImage(null)} />
            <CameraButton title={"선택 완료"} icon="check" onPress={sendImage} />
          </View>
          :
          <View style={styles.takePictureButtonArea}>
            <CameraButton size={50} color={'#4F4F4F'} icon='circle' onPress={takePicture} />
          </View>
        }
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
  camera: {
    width: width * 450,
    height: height * 450,
  },
  cameraButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
  takePictureButtonArea: {
    marginBottom: 10,
  }
});
