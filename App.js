import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './src/navigation/AppNavigation';
import Toast from 'react-native-toast-message';
import { app } from "./src/utils/firebase"


function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
      <Toast />
    </NavigationContainer>
  );
}

export default App;

