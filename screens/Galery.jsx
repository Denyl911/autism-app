import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
} from 'react-native';

function formatearFecha(fecha) {
    if (fecha) {
      fecha = new Date(fecha);
      const meses = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ];
  
      const dia = fecha.getDate();
      const mesIndex = fecha.getMonth();
      const año = fecha.getFullYear();
  
      return `${meses[mesIndex]} ${dia}, ${año}`;
    }
  }

export default function Galery({ navigation }) {
  const [user, setUser] = useState({
    name: '',
    type: '',
  });
  const [allEmotions, setAllEmotions] = useState([])
  const [userEmotions, setUserEmotions] = useState([])
  const getUser = async () => {
    setUser(JSON.parse(await AsyncStorage.getItem('user')) || user);
    const all = JSON.parse(await AsyncStorage.getItem('emotions')) || []
    setAllEmotions(all)
    all.forEach((el)=>{
        if (el.id == user.id) {
            setUserEmotions((op) => [...op, el])
        }
    })
  };
  useFocusEffect(useCallback(() => {
    getUser();
  }, []));

  const deleteEmotion = async (date)=>{
    const allFilt = allEmotions.filter((el) => el.date != date)
    setAllEmotions(allFilt)
    setUserEmotions(userEmotions.filter((el) => el.date != date))
    await AsyncStorage.setItem('emotions', JSON.stringify(allFilt))
  }
  return (
    <View className="h-[100%] bg-slate-200">
      <StatusBar backgroundColor="#0d5692" hidden={false} translucent={true} />
      <View>
        <View className="h-[87%] mt-16">
            <Text className="text-sky-800 text-center font-bold text-3xl mb-10">Galería de Emociones</Text>
            <ScrollView>
            {userEmotions.map((el,i)=> {
                return (
                    <View className="flex flex-row items-center justify-between rounded-lg p-3 bg-white w-[90%] mx-auto my-1" key={i}>
                        <View className="basis-">
                            <Text className="text-lg font-bold">{el.emocion}</Text>
                            <Text>{formatearFecha(el.date)}</Text>
                            <Pressable onPress={()=> deleteEmotion(el.date)} className="mt-5 bg-slate-50 rounded-md px-2 py-1"><Text className="text-red-500 text-center">X Eliminar</Text></Pressable>
                        </View>
                        <Image className="w-28 h-28" source={{uri: el.uri}}></Image>
                    </View>
                )
            })}
            </ScrollView>
        </View>
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
