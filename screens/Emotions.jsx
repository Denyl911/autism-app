import { Camera, CameraType } from 'expo-camera';
import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Button,
  Image,
  StatusBar,
} from 'react-native';
import * as FaceDetector from 'expo-face-detector';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function Emotions({ navigation }) {

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [emotion, setEmotion] = useState('Escaner de Emociones');
  const [scanText, setScanText] = useState('ESCANEAR');
  const [foto, setFoto] = useState(null);
  const [fotoUri, setFotoUri] = useState(null);
  const [user, setUser] = useState({
    id: 0,
    name: '',
    type: '',
  });
  const getUser = async () => {
    setUser(JSON.parse(await AsyncStorage.getItem('user')) || user);
  };
  useFocusEffect(useCallback(() => {
    getUser();
  }, []));

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
      <View className=" flex items-center justify-center h-[100%]">
        <StatusBar
          backgroundColor="#0d5692"
          hidden={false}
          translucent={true}
        />
        <Text className="text-center text-2xl font-semibold">
          Necesitamos que nos otorgues permiso para acceder a la camara
        </Text>
        <Pressable
          className="bg-sky-700 p-3 rounded-lg mt-3"
          onPress={requestPermission}
        >
          <Text className="text-white font-bold text-lg">Otorgar permisos</Text>
        </Pressable>
        <Pressable
          className="bg-sky-100 p-3 rounded-lg mt-3"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-gray-700 font-bold text-lg">Volver</Text>
        </Pressable>
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

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
      const fliped = await manipulateAsync(
        img.uri,
        [{ flip: FlipType.Horizontal }],
        { format: SaveFormat.JPEG }
      );
      setFotoUri(fliped.uri);
      const res = await fetch(
        'https://cf1f-201-108-3-145.ngrok-free.app/emotions',
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
      const emo = data.emotion
      if (emo != 'No') {
        const translated = emo.replace(/\b\w+\b/g, function (match) {
          return trans[match] || match;
        });
        setEmotion(translated);
        const emotions =
          JSON.parse(await AsyncStorage.getItem('emotions')) || [];
        const data = { userId: user.id, emocion: translated, uri: fliped.uri, date: Date.now() };
        emotions.unshift(data);
        await AsyncStorage.setItem('emotions', JSON.stringify(emotions))
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
      <StatusBar backgroundColor="#0d5692" hidden={false} translucent={true} />
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
        <Pressable className="py-3 px-1 rounded-full  active:bg-slate-200" onPress={()=>navigation.navigate('Galery')}>
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
