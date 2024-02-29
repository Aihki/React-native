import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/navigators/navigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <Navigation />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
};

export default App;
