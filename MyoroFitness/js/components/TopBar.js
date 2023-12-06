import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet
} from "react-native";
import { useSelector } from "react-redux";
import * as Notifications from "expo-notifications";
import {
  getEnablePushNotifications,
  toggleEnablePushNotifications,
  getDarkMode,
  toggleDarkMode
} from "../Database.js";
import Store from "../Store.js";
import LogoDark from "../../assets/img/LogoDark.png";
import LogoLight from "../../assets/img/LogoLight.png";
import OptionsDark from "../../assets/img/OptionsDark.png";
import OptionsLight from "../../assets/img/OptionsLight.png";

function TopBar() {
  const darkMode                                = useSelector(state => state.darkMode);
  const [ logoSrc, setLogoSrc ]                 = useState(darkMode ? LogoDark : LogoLight);
  const [ optionsSrc, setOptionsSrc ]           = useState(darkMode ? OptionsDark : OptionsLight);
  const [ showDropdown, setShowDropdown ]       = useState(false);
  const [ dropdownButtons, setDropdownButtons ] = useState([]);

  React.useEffect(() => {
    getEnablePushNotifications().then(enablePushNotifications => {
      setDropdownButtons(() => {
        const result = [
          {
            name:    enablePushNotifications ? "Disable Notifications" : "Enable Notifications",
            onPress: toggleNotifications
          },
          {
            name:    darkMode ? "Enable Light Mode" : "Enable Dark Mode",
            onPress: toggleDarkMode
          }
        ];

        return result;
      });
    });
  }, []);

  React.useEffect(() => {
    setLogoSrc(darkMode ? LogoDark : LogoLight);
    setOptionsSrc(darkMode ? OptionsDark : OptionsLight);
  }, [darkMode]);

  function toggleDarkMode() {
    if(Store.getState().darkMode) Store.dispatch({ type: "SET_DARK_MODE", payload: false });
    else                          Store.dispatch({ type: "SET_DARK_MODE", payload: true });
    toggleDarkMode();
    setShowDropdown(false);
    setTimeout(() => {
      getEnablePushNotifications().then(enablePushNotifications => {
        setDropdownButtons(() => {
          const result = [
            {
              name:    enablePushNotifications ? "Disable Notifications" : "Enable Notifications",
              onPress: toggleNotifications
            },
            {
              name:    darkMode ? "Enable Light Mode" : "Enable Dark Mode",
              onPress: toggleDarkMode
            }
          ];

          return result;
        });
      });
    }, 500);
  }

  function toggleNotifications() {
    getEnablePushNotifications().then(async (enablePushNotifications) => {
      if(!enablePushNotifications) {
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

    toggleEnablePushNotifications();

    setShowDropdown(false);
    setTimeout(() => {
      getEnablePushNotifications().then(enablePushNotifications => {
        setDropdownButtons(() => {
          const result = [
            {
              name:    enablePushNotifications ? "Disable Notifications" : "Enable Notifications",
              onPress: toggleNotifications
            },
            {
              name:    darkMode ? "Enable Light Mode" : "Enable Dark Mode",
              onPress: toggleDarkMode
            }
          ];

          return result;
        });
      });
    }, 500);
  }

  return(
    <View style={{ zIndex: 1 }}>
      <View
        style={{
          width:             "100%",
          height:            60,
          borderBottomColor: darkMode ? "#EDE6D6" : "#181818",
          borderBottomWidth: 2,
          flexDirection:     "row",
          justifyContent:    "space-between",
          alignItems:        "center"
        }}
      >
        {/* Logo */}
        <Image source={logoSrc} style={styles.image} />

        [/*
        <TouchableWithoutFeedback onPress={() => setShowDropdown(!showDropdown)}>
          <Image source={optionsSrc} style={styles.image} />
        </TouchableWithoutFeedback>
        */}
      </View>

      {/* Option's dropdown */}
      {
        showDropdown
        &&
        <View
          style={{
            width:    "100%",
            position: "absolute",
            top:      60
          }}
        >
          {
            dropdownButtons.map((button, index) =>
              <TouchableWithoutFeedback key={index} onPress={button.onPress}>
                <View
                  style={{
                    backgroundColor:   darkMode ? "#181818" : "#EDE6D6",
                    borderBottomColor: darkMode ? "#EDE6D6" : "#181818",
                    borderBottomWidth: 2,
                    padding:           5
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Ubuntu Regular",
                      fontSize:   30,
                      color:      darkMode ? "#EDE6D6" : "#181818",
                      textAlign:  "center"
                    }}
                  >{button.name}</Text>
                </View>
              </TouchableWithoutFeedback>
            )
          }
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width:   40,
    height:  40,
    margin:  10
  }
});

export default React.memo(TopBar);
