
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import CameraButton from '../../components/CameraButton'

export default function App() {
    const [hasCameraPermission, setHasCamerPermission] = useState(null); //카메라 접근 권한 여부
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back); //카메라 후면/전면 설정. 기본값:후면
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off) //카메라 플래쉬 설정. 기본값:꺼짐
    const cameraRef = useRef(null);
    const [zoomLevel, setZoomLevel] = useState(0);

    useEffect(() => {
        (async () => {
            //카메라 권한 얻어오기
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCamerPermission(cameraStatus.status == 'granted')
        })();
    }, [])

    //사진 찍기 버튼 눌렀을때
    const takePicture = async () => {
        if (cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                console.log(data);//사진에 대한 크기와 정보
                setImage(data.uri);
                console.log(data.uri)
            } catch (e) {
                console.log(e);
            }
        }
    }
    const saveImage = async () => {
        if (image) {
            try {
                await MediaLibrary.createAssetAsync(image);
                alert('Picture save!');
                setImage(null);
            } catch (e) {
                console.log(e)
            }
        }
    }


    //camera 허용 안되어있을시 띄워주기
    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>
    }

    return (
        <View style={styles.container}>
            {!image ?
                //Image가 없을 시 카메라 띄워줌
                <Camera
                    style={styles.camera}
                    type={type}
                    flashMode={flash}
                    ref={cameraRef}
                    autoFocus={true}

                >

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 30
                    }}>
                        <CameraButton icon={'retweet'} onPress={() => {
                            setType(type === CameraType.back ? CameraType.front : CameraType.back)
                        }} />
                        <CameraButton icon={'flash'}
                            color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#f1f1f1'}
                            onPress={() => {
                                setFlash(flash === Camera.Constants.FlashMode.off
                                    ? Camera.Constants.FlashMode.on
                                    : Camera.Constants.FlashMode.off)
                            }} />
                    </View>
                </Camera>
                :
                <Image source={{ url: image }} style={styles.camera} />
            }
            <View>
                {image ?
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 50
                    }}>
                        <CameraButton title={"Re-take"} icon="retweet" onPress={() => setImage(null)} />
                        <CameraButton title={"Save"} icon="check" onPress={saveImage} />
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
        flex: 1,
        borderRadius: 20,
    },
    takePictureButtonArea: {
        marginBottom: 30,

    }

});
