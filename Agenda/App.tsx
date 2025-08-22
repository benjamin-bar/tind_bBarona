import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Actividades from './components/Actividades';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Actividades />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#f8f9fa',
  },
});