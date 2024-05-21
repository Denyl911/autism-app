import { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  const [uType, setuType] = useState('Alumno');

  const changeType = () => {
    if (uType == 'Alumno') {
      setuType('Profesor');
    } else {
      setuType('Alumno');
    }
  };

  const registerUser = async () => {
    try {
      if (name && email && pass && pass2) {
        if (pass != pass2) {
          ToastAndroid.showWithGravity(
            'Las contraseñas no coinciden',
            ToastAndroid.LONG,
            ToastAndroid.CENTER
          );
          return;
        }

        const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
        const user = {
          id: users.length + 1,
          name: name,
          email: email,
          password: pass,
          type: uType,
        };
        users.push(user);
        await AsyncStorage.setItem('users', JSON.stringify(users));
        ToastAndroid.showWithGravity(
          'Registrado exitosamente',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        navigation.navigate('Home');
      } else {
        ToastAndroid.showWithGravity(
          'Faltan campos por llenar',
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      }
    } catch (e) {
      ToastAndroid.showWithGravity(
        'Opps ocurrio un error!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      console.log(e);
    }
  };
  return (
    <View>
      <View className="w-full flex flex-row  justify-between bg-sky-700 pt-10">
        <Text className="text-3xl font-bold text-center text-white mt-16 ml-10">
          Registrarme
        </Text>
        <Image
          height={100}
          width={100}
          source={require('../assets/register.png')}
        ></Image>
      </View>
      <View>
        <View style={styles.separador}>
          <Pressable
            onPress={changeType}
            className="bg-gray-300 rounded-full px-2 py-1 flex flex-row items-center mt-7"
          >
            <Text
              className={`px-2 ${
                uType == 'Alumno' ? 'py-1 rounded-full bg-white' : ''
              }`}
            >
              Alumno
            </Text>
            <Text
              className={`px-2 ${
                uType == 'Profesor' ? 'py-1 rounded-full bg-white' : ''
              }`}
            >
              Profesor
            </Text>
          </Pressable>
          <TextInput
            className="mt-10 border-b-2 border-sky-800 text-2xl placeholder:text-slate-400 w-60 p-2"
            onChangeText={setName}
            value={name}
            placeholder="Nombre"
          />
          <TextInput
            className="mt-10 border-b-2 border-sky-800 text-2xl placeholder:text-slate-400 w-60 p-2"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            placeholder="Email"
          />
          <TextInput
            className="mt-10 border-b-2 border-sky-800 text-2xl placeholder:text-slate-400 w-60 p-2"
            onChangeText={setPass}
            value={pass}
            secureTextEntry={true}
            placeholder="Contraseña"
          />
          <TextInput
            className="mt-10 border-b-2 border-sky-800 text-2xl placeholder:text-slate-400 w-60 p-2"
            onChangeText={setPass2}
            value={pass2}
            secureTextEntry={true}
            placeholder="Confirmar contraseña"
          />
          <Pressable
            onPress={registerUser}
            className="rounded-xl  shadow shadow-black bg-sky-800 py-3 px-4 mt-20"
          >
            <Text className="text-white text-lg">Registrarme</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.goBack()}
            className="rounded-xl  p-3 mb-80 mt-3"
          >
            <Text className="text-sky-800 text-lg">Volver</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 90,
  },
  separador: {
    borderRadius: 50,
    marginTop: -50,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {},
});
