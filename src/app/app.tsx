import { View } from 'react-native';
import './app.css';
import HomeScreen from './screens/home/components/home_screen';

export default function App() {
  return (
    <View className={'bg-primary'}>
      <HomeScreen />
    </View>
  );
}
