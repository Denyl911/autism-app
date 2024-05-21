import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
} from 'react-native';

export default function Settings({ navigation }) {
  const [user, setUser] = useState({
    name: '',
    type: '',
  });
  const getUser = async () => {
    setUser(JSON.parse(await AsyncStorage.getItem('user')) || user);
  };
  useFocusEffect(
    useCallback(() => {
      getUser();
    }, [])
  );

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.navigate('LoginBefore');
  };
  return (
    <View className="h-[100%]">
      <StatusBar backgroundColor="#0d5692" hidden={false} translucent={true} />
      <View>
        <View className="pt-8"></View>
        <Image
          className="w-screen h-40 rounded-b-3xl"
          source={require('../assets/home2.jpg')}
        ></Image>
        <View className="-mt-44 flex items-center">
          <Image
            className="mt-10"
            source={require('../assets/user.png')}
          ></Image>
          <Text className="text-white text-center text-md font-bold">
            {user.name}
          </Text>
          <Text className="text-white text-center mt-1 mb-0 text-sm">
            {user.type}
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <ScrollView className="mt-12">
          <Pressable
            onPress={() => navigation.navigate('Galery')}
            className="bg-sky-500 mx-10 rounded-xl px-6 py-5 mt-24"
          >
            <Text className="text-white text-xl">Galería</Text>
            <Text className="text-white">Galería de fichas de emociones</Text>
          </Pressable>
          <Pressable
            onPress={logout}
            className="bg-sky-700 mx-10 rounded-xl px-6 py-5 mt-8"
          >
            <Text
              className="text-white text-xl"
              onPress={() => navigation.navigate("Report")}
            >
              Generar reporte
            </Text>
            <Text className="text-white">
              Generar reporte de emociones del mes
            </Text>
          </Pressable>
          <Pressable
            onPress={logout}
            className="bg-sky-900 mx-10 rounded-xl px-6 py-5 mt-8"
          >
            <Text className="text-white text-xl">Logout</Text>
            <Text className="text-white">Cerrar Sesión</Text>
          </Pressable>
        </ScrollView>
      </View>
      <View className="bg-white w-screen px-8 py-5 absolute bottom-0">
        <View className="flex items-center justify-between flex-center flex-row">
          <Pressable
            onPress={() => navigation.navigate('Home')}
            className="flex items-center"
          >
            <Image source={require('../assets/home-icon.png')}></Image>
            <Text className="text-sky-800 text-center">Inicio</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Emotions')}
            className="flex items-center justify-center text-center"
          >
            <Image source={require('../assets/chat.png')}></Image>
            <Text className="text-black text-center">Emociones</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Settings')}
            className="flex items-center justify-center text-center"
          >
            <Image source={require('../assets/settings.png')}></Image>
            <Text className="text-black">Mi perfil</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 700,
  },
});
