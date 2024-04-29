import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { View, Pressable, Text, StyleSheet, Button, Image } from 'react-native';
import * as FaceDetector from 'expo-face-detector';

export default function Emotions({ navigation }) {
  const [xOr, setXOr] = useState(0);
  const [yOr, setYOr] = useState(0);
  const [xWid, setXWid] = useState(0);
  const [xHei, setXHei] = useState(0);
  const [bord, setBorder] = useState(0);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  function handleFacesDetected(x) {
    if (x) {
      x.faces.forEach((el) => {
        if (el.bounds) {
          setXHei(el.bounds.size.height);
          setXWid(el.bounds.size.width);
          setXOr(el.bounds.origin.x);
          setYOr(el.bounds.origin.y);
          setBorder(2);
          console.log(el.bounds);
        } else {
          setBorder(0);
        }
      });
    }
  }

  function facePos() {
    console.log({
      height: xHei,
      with: xWid,
      position: 'absolute',
      left: xOr,
      top: yOr,
    });
    return {
      height: xHei,
      with: xWid,
      position: 'absolute',
      left: xOr,
      top: yOr,
    };
  }

  return (
    <View>
      <View className="pt-8 flex- items-center">
        <View className="w-full">
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image
              className="w-8 h-8 my-3 mx-5"
              source={require('../assets/back-arrow.png')}
            ></Image>
          </Pressable>
        </View>
        <View style={styles.container}>
          <Camera
            style={styles.camera}
            type={type}
            onFacesDetected={handleFacesDetected}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.accurate,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
              runClassifications: FaceDetector.FaceDetectorClassifications.none,
              minDetectionInterval: 100,
              tracking: true,
            }}
          >
            <View
              style={{
                height: xHei,
                width: xWid,
                position: 'absolute',
                left: xOr,
                bottom: yOr,
                borderColor: 'red',
                borderWidth: bord,
              }}
            ></View>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.button} onPress={toggleCameraType}>
                <Text style={styles.text}>Flip Camara</Text>
              </Pressable>
            </View>
          </Camera>
        </View>
      </View>
      <View className="felx items-center">
        <Image
          className="w-24 h-24 mt-20"
          source={require('../assets/happy.png')}
        ></Image>
        <Text className="mt-3 text-3xl font-bold text-center text-yellow-400">
          Felicidad
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    borderColor: '#000',
    borderWidth: 4,
    borderRadius: 12,
    height: 420,
    width: 340,
  },
  face: {
    marginHorizontal: 20,
    borderColor: '#000',
    borderWidth: 4,
    borderRadius: 12,
    height: 420,
    width: 340,
  },
  camera: {
    flex: 1,
    borderRadius: 15,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
