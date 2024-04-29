import { Image, StyleSheet, Text, View, Pressable, Alert } from 'react-native';

export default function PreLogin({ navigation }) {
  return (
    <View>
      <View className="flex flex-row items-center bg-sky-600 pb-96 px-10 pt-16">
        <Image
          style={styles.logo}
          source={require('../assets/logo-shadow.png')}
        ></Image>
        <Text className="text-3xl w-full font-bold ml-10 text-white">
          Autism App
        </Text>
      </View>
      <View>
        <View style={styles.separador}>
          <Image
            className="-mt-56"
            source={require('../assets/preLogin.png')}
          ></Image>
          <Pressable
            onPress={() => navigation.navigate('Register')}
            className="rounded-xl  shadow shadow-black bg-sky-800 py-3 px-24 mt-16"
          >
            <Text className="text-white text-lg">Registrarme</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Login')}
            className="rounded-xl shadow shadow-black bg-slate-200 py-3 px-20 mb-56  mt-8"
          >
            <Text className="text-sky-800 text-lg">Iniciar Sesión</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 90,
    height: 90,
  },
  separador: {
    borderTopRightRadius: 50,
    marginTop: -50,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {},
});
