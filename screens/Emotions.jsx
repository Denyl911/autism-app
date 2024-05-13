import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { View, Pressable, Text, StyleSheet, Button, Image } from 'react-native';
import * as FaceDetector from 'expo-face-detector';
import { manipulateAsync, FlipType } from 'expo-image-manipulator';

export default function Emotions({ navigation }) {
  // const [xOr, setXOr] = useState(0);
  // const [yOr, setYOr] = useState(0);
  // const [xWid, setXWid] = useState(0);
  // const [xHei, setXHei] = useState(0);
  // const [bord, setBorder] = useState(0);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [emotion, setEmotion] = useState('Escaner de Emociones');
  const [scanText, setScanText] = useState('ESCANEAR');
  const [foto, setFoto] = useState(null);
  const [fotoUri, setFotoUri] = useState(null);

  const trans = {
    angry: 'Enojado',
    disgust: 'Disgustado',
    fear: 'Miedo',
    happy: 'Felicidad',
    neutral: 'Neutral',
    sad: 'Triste',
    surprise: 'Sorprendido',
  };

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
  // function handleFacesDetected(x) {
  //   if (x) {
  //     x.faces.forEach((el) => {
  //       if (el.bounds) {
  //         setXHei(el.bounds.size.height);
  //         setXWid(el.bounds.size.width);
  //         setXOr(el.bounds.origin.x);
  //         setYOr(el.bounds.origin.y);
  //         setBorder(2);
  //       } else {
  //         setBorder(0);
  //       }
  //     });
  //   }
  // }

  async function scanFace() {
    if (fotoUri) {
      setFotoUri(null);
      setScanText('ESCANEAR');
      setEmotion('Escaner de Emociones');
      return;
    }
    setEmotion('Escaneando...');
    setScanText('Volver');
    try {
      const img = await cameraRef.takePictureAsync({
        base64: true,
        isImageMirror: true,
      });
      const fliped = await manipulateAsync(img.uri, [
        { flip: FlipType.Horizontal },
      ]);
      setFotoUri(fliped.uri);
      const res = await fetch(
        'https://81c1-201-108-4-15.ngrok-free.app/emotions',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imagen: img.base64,
          }),
        }
      );
      const data = await res.json();
      if (data.emotion != 'No') {
        setEmotion(
          data.emotion.replace(/\b\w+\b/g, function (match) {
            return trans[match] || match;
          })
        );
      } else {
        setEmotion('No se detectó ninguna');
      }
    } catch (e) {
      console.log(e);
    }
  }

  function ShowImage(props) {
    if (props.show) {
      return (
        <Image
          style={{
            borderRadius: 8,
            borderColor: '#000',
            borderWidth: 2,
            height: 472,
            width: 382,
          }}
          source={{
            uri: fotoUri,
          }}
        ></Image>
      );
    }
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
        <View
          style={{
            display: fotoUri ? 'none' : 'block',
            marginHorizontal: 20,
            borderColor: '#000',
            borderWidth: 4,
            borderRadius: 12,
            height: 480,
            width: 390,
          }}
        >
          <Camera
            ref={(ref) => setCameraRef(ref)}
            style={styles.camera}
            type={type}
            // onFacesDetected={handleFacesDetected}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.accurate,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
              runClassifications: FaceDetector.FaceDetectorClassifications.none,
              minDetectionInterval: 3000,
              tracking: true,
            }}
          ></Camera>
        </View>
        <ShowImage show={fotoUri ? true : false}></ShowImage>
      </View>
      <View>
        <Text className="mt-16 text-3xl font-bold text-center text-sky-900">
          {emotion}
        </Text>
      </View>
      <View className="flex flex-row justify-between items-center mt-16 mx-5">
        {/* <Image
          className="w-24 h-24 mt-20"
          source={require('../assets/happy.png')}
        ></Image> */}
        <Pressable
          className="py-3 px-1 rounded-full  active:bg-slate-200"
          onPress={toggleCameraType}
        >
          <Text className="text-2xl text-black">Rotar</Text>
        </Pressable>
        <Pressable
          className="px-4 py-3 rounded-full bg-sky-800"
          onPress={scanFace}
        >
          <Text className="text-3xl font-bold text-center text-white">
            {scanText}
          </Text>
        </Pressable>
        <Pressable className="py-3 px-1 rounded-full  active:bg-slate-200">
          <Text className="text-2xl text-black">Galeria</Text>
        </Pressable>
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
    height: 480,
    width: 390,
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
