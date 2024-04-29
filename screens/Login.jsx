import { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';

export default function Login({ navigation }) {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  return (
    <View>
      <View className="w-full flex flex-row justify-between bg-sky-700 pt-7">
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            className=" mx-6 mt-5"
            source={require('../assets/back.png')}
          ></Image>
        </Pressable>
        <Image source={require('../assets/login.png')}></Image>
      </View>
      <View>
        <View style={styles.separador}>
          <TextInput
            className="mt-20 border-b-2 border-sky-800 text-2xl placeholder:text-slate-400 w-60 p-2"
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
          />
          <TextInput
            className="mt-12 border-b-2 border-sky-800 text-2xl placeholder:text-slate-400 w-60 p-2"
            onChangeText={setPass}
            value={pass}
            placeholder="Contraseña"
          />
          <Pressable
            onPress={() => navigation.navigate('Home')}
            className="rounded-xl  shadow shadow-black bg-sky-800 py-3 px-4 mt-28"
          >
            <Text className="text-white text-lg">Iniciar Sesión</Text>
          </Pressable>
          <Pressable
            onPress={() => Alert.alert('Hola')}
            className="rounded-xl p-3 mb-12  mt-8"
          >
            <Text className="text-sky-800 text-lg">
              Olvidaste tu contraseña?
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Register')}
            className="rounded-xl  p-3  mt-8 mb-80"
          >
            <Text className="text-sky-800 text-lg">Registrarme</Text>
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
