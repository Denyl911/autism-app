import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Home';
import DetailsScreen from './screens/Details';
import { NativeWindStyleSheet } from "nativewind";
import Welcome from './screens/Welcome';

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Inicio" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
