import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View className="items-center justify-center flex-[1]">
      <Text className="text-red-500 font-bold">Home Screeen</Text>
      <Button
        title="Go to Detalles"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
    
  );
}
