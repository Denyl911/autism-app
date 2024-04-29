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

export default function HomeScreen({ navigation }) {
  return (
    <View className="h-screen ">
      <View>
        <View className="pt-9 bg-sky-800"></View>
        <Image
          className="w-screen h-40 rounded-b-3xl"
          source={require('../assets/home2.jpg')}
        ></Image>
        <View className="-mt-44 flex items-center">
          <Image
            className="mt-10"
            source={require('../assets/user.png')}
          ></Image>
          <Text className="text-white text-center text-md">Juan Perez</Text>
        </View>
      </View>
      <View style={styles.container}>
        <ScrollView className="mt-12">
          <Pressable
            onPress={() => navigation.navigate('Emotions')}
            className="bg-sky-900 mx-10 rounded-xl px-6 py-5 mt-24"
          >
            <Text className="text-white text-xl">Emociones</Text>
            <Text className="text-white">
              Juegos para poner en práctica los conocimientos
            </Text>
            <Image
              className="mt-10 absolute right-0 bottom-2"
              source={require('../assets/juegos.png')}
            ></Image>
          </Pressable>
          <View className="bg-sky-600 mx-10 rounded-xl px-6 py-5 my-20">
            <Text className="text-white text-xl">Cronograma</Text>
            <Text className="text-white">
              Un calendario completo con todas tus tareas pendientes
            </Text>
            <Image
              className="mt-10 absolute right-0 bottom-2"
              source={require('../assets/cronograma.png')}
            ></Image>
          </View>
          <View className="bg-sky-300 mx-10 rounded-xl px-6 py-5 mb-40">
            <Text className="text-white text-xl">Juegos</Text>
            <Text className="text-white">
              Juegos para poner en práctica los conocimientos
            </Text>
            <Image
              className="mt-10 absolute right-0 bottom-2"
              source={require('../assets/juegos2.png')}
            ></Image>
          </View>
        </ScrollView>
      </View>
      <View className="bg-white w-screen px-8 py-5 absolute -bottom-10">
        <View className="flex items-center justify-between flex-center flex-row">
          <View className="flex items-center">
            <Image source={require('../assets/home-icon.png')}></Image>
            <Text className="text-sky-800 text-center">Inicio</Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate('Emotions')}
            className="flex items-center justify-center text-center"
          >
            <Image source={require('../assets/chat.png')}></Image>
            <Text className="text-black text-center">Emociones</Text>
          </Pressable>
          <View className="flex items-center justify-center text-center">
            <Image source={require('../assets/settings.png')}></Image>
            <Text className="text-black">Mi perfil</Text>
          </View>
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
