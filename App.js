import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeWindStyleSheet } from 'nativewind';
import HomeScreen from './screens/Home';
import DetailsScreen from './screens/Details';

import Welcome from './screens/Welcome';
import LoginBefore from './screens/LoginBefore';
import Login from './screens/Login';
import Register from './screens/Register';
import Emotions from './screens/Emotions';

NativeWindStyleSheet.setOutput({
  default: 'native',
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer className="bg-white font-mono">
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="LoginBefore" component={LoginBefore} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="Emotions" component={Emotions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
