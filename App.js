import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './src/navigation/AppNavigation';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';


function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
      <Toast />
      <StatusBar style="auto" backgroundColor='#fff' />
    </NavigationContainer>
  );
}

export default App;