import { useState } from "react";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";

function Dots({ x }) {
  if (x == 1) {
    return (
      <View className="flex flex-row">
        <Image className="mr-2" source={require('../assets/dot1.png')}></Image>
        <Image source={require('../assets/dot2.png')}></Image>
      </View>
    )
  } else {
    return (
      <View className="flex flex-row">
        <Image className="mr-2" source={require('../assets/dot2.png')}></Image>
        <Image source={require('../assets/dot1.png')}></Image>
      </View>
    )
  }
}

function Slides({ x }) {
  if (x == 1) {
    return (
      <View className="flex-1 items-center justify-center">
        <Image source={require('../assets/logo.png')}></Image>
        <Text className="text-blue-500 text-center text-xl font-bold py-4">Autism App</Text>
        <Text className="text-center mx-5" >Una aplicación de comunicación para ayudar a los estudiantes con autismo a comunicarse con amigos y profesores.</Text>
      </View>
    )
  } else {
    return (
      <View className="flex-1 items-center justify-center"> 
        <Image source={require('../assets/logo.png')}></Image>
        <Text className="text-blue-500 text-center text-xl font-bold py-4">Slide 2</Text>
        <Text className="text-center mx-5" >Una aplicación de comunicación para ayudar a los estudiantes con autismo a comunicarse con amigos y profesores.</Text>
      </View>
    )
  }
}

export default function Welcome() {
  const [n, setN] = useState(1)
  return (
    <View className="flex-1 items-center justify-center">
      <Slides x={n} />
      <View className="absolute bottom-10 flex justify-between flex-row items-center w-screen px-8">
        <Pressable onPress={() => setN(1)} style={styles.button}>
          <Text style={styles.buttonText}>Atras</Text>
        </Pressable>
        <Dots x={n} />
        <Pressable onPress={() => setN(2)} style={styles.button}>
          <Text style={styles.buttonText}>Siguiente</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgb(59, 103, 246)',
    padding: 15,
    borderRadius: 18,
  },
  buttonText: {
    color: "white"
  }
})
