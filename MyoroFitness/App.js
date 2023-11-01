import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import Store from "./js/Store.js";
import * as Notifications from "expo-notifications";
import * as ScreenOrientation from "expo-screen-orientation";
import {
  init,
  getEnablePushNotifications,
  getDarkMode
} from "./js/Database.js";
import CalorieCounting from "./js/screens/CalorieCounting.js";
import BarcodeScanner from "./js/screens/BarcodeScanner.js";
import Workouts from "./js/screens/Workouts.js";
import Tracking from "./js/screens/Tracking.js";
import Streak from "./js/screens/Streak.js";

const Stack = createNativeStackNavigator();

export default function App() {
  React.useEffect(() => {
    init();

    // Register push notifications
    (async function registerForPushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      if(status !== "granted") await Notifications.requestPermissionsAsync();
    })();

    // Setting screen orientation
    (async function lockOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    })();

    // Setting dark mode to previous app start's options
    getDarkMode().then(result => {
      if(result) Store.dispatch({ type: "SET_DARK_MODE", payload: true });
      else       Store.dispatch({ type: "SET_DARK_MODE", payload: false });
    });

    // (Un)scheduling
    getEnablePushNotifications().then(async (enablePushNotifications) => {
      if(enablePushNotifications) {
        const scheduledNotification = await Notifications.getAllScheduledNotificationsAsync();
        if(scheduledNotification.length > 0) return;
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "MyoroFitness Streak Reminder",
            body:  "Daily reminder to log your weight, calories, & exercise to further your streak",
            sound: null
          },
          trigger: { hour: 20, minute: 0, repeats: true }
        });
      } else await Notifications.cancelAllScheduledNotificationsAsync();
    });
  }, []);

  const [ fonts ] = useFonts({
    "Ubuntu Regular": require("./assets/fonts/Ubuntu-R.ttf"),
    "Ubuntu Bold":    require("./assets/fonts/Ubuntu-B.ttf")
  });

  if(!fonts) return null;

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Tracking"
            component={Tracking}
	    options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="CalorieCounting"
            component={CalorieCounting}
	    options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="Workouts"
            component={Workouts}
	    options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="BarcodeScanner"
            component={BarcodeScanner}
	    options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="Streak"
            component={Streak}
	    options={{ gestureEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
