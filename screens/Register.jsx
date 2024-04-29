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

export default function Register({ navigation }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [pass2, setPass2] = useState();
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
            placeholder="Email"
          />
          <TextInput
            className="mt-10 border-b-2 border-sky-800 text-2xl placeholder:text-slate-400 w-60 p-2"
            onChangeText={setPass}
            value={pass}
            placeholder="Contraseña"
          />
          <TextInput
            className="mt-10 border-b-2 border-sky-800 text-2xl placeholder:text-slate-400 w-60 p-2"
            onChangeText={setPass2}
            value={pass2}
            placeholder="Confirmar contraseña"
          />
          <Pressable
            onPress={() => navigation.navigate('Home')}
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
