import {
  Nunito_400Regular,
  Nunito_400Regular_Italic,
  Nunito_700Bold,
  useFonts,
} from '@expo-google-fonts/nunito';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import './App.css';
import { useEffect } from 'react';
import HomeScreen from '@/app/screens/home/components/HomeScreen';

// Activates the splash screen.
SplashScreen.preventAutoHideAsync();

/**
 * Root component of the application.
 */
export default function App() {
  const [fontsLoaded, fontsError] = useFonts({
    Nunito_400Regular,
    Nunito_400Regular_Italic,
    Nunito_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <View className={'bg-primary w-full font-nunito-regular'}>
      <HomeScreen />
    </View>
  );
}
