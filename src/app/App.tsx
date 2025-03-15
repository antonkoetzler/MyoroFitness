import {
  Nunito_400Regular,
  Nunito_400Regular_Italic,
  Nunito_700Bold,
  useFonts,
} from '@expo-google-fonts/nunito';
import * as SplashScreen from 'expo-splash-screen';
import './App.css';
import { useEffect } from 'react';
import HomeScreen from '@/app/screens/home/components/HomeScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView className={'bg-primary w-full h-full font-nunito-regular'}>
      <HomeScreen />
    </SafeAreaView>
  );
}
