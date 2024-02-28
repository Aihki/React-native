import {StatusBar} from 'expo-status-bar';
import {Platform, SafeAreaView, StyleSheet} from 'react-native';
import Navigation from './src/navigators/navigator';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default App;
