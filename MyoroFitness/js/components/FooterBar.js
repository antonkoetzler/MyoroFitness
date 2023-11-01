import React from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet
} from "react-native";
import { useSelector } from "react-redux";
import TrackingDark from "../../assets/img/TrackingDark.png";
import TrackingLight from "../../assets/img/TrackingLight.png";
import CaloriesDark from "../../assets/img/CaloriesDark.png";
import CaloriesLight from "../../assets/img/CaloriesLight.png";
import WorkoutsDark from "../../assets/img/WorkoutsDark.png";
import WorkoutsLight from "../../assets/img/WorkoutsLight.png";

function FooterBar({ navigation }) {
  const darkMode                = useSelector(state => state.darkMode);
  const [ buttons, setButtons ] = React.useState([]);

  const styles = StyleSheet.create({
    text: {
      fontFamily: "Ubuntu Regular",
      color:      darkMode ? "#EDE6D6" : "#181818"
    }
  });

  React.useEffect(() => {
    setButtons([
      {
        src:     darkMode ? TrackingDark : TrackingLight,
        text:    "Fitness Tracking",
        onPress: () => navigation.navigate("Tracking")
      },
      {
        src:     darkMode ? CaloriesDark : CaloriesLight,
        text:    "Calorie Counting",
        onPress: () => navigation.navigate("CalorieCounting")
      },
      {
        src:     darkMode ? WorkoutsDark : WorkoutsLight,
        text:    "My Workouts",
        onPress: () => navigation.navigate("Workouts")
      },
      {
        src:     false,
        icon:    "0",
        text:    "MF Streak",
        onPress: () => navigation.navigate("Streak")
      }
    ]);
  }, [darkMode]);

  function renderButtons() {
    return buttons.map((button, index) =>
      <TouchableWithoutFeedback key={index} onPress={button.onPress}>
        <View style={{ alignItems: "center", gap: 2 }}>
          {
            button.src
            ?
            <Image
              source={button.src}
              style={{
                width:  Dimensions.get("window").width / 4,
                height: (Dimensions.get("window").width / 4) / 1.67
              }}
            />
            :
            <View
              style={{
                alignItems:     "center",
                justifyContent: "center",
                height:         (Dimensions.get("window").width / 4) / 1.67
              }}
            >
              <Text style={[ styles.text, { fontSize: 50 }]}>{button.icon}</Text>
            </View>
          }
          <Text style={[ styles.text, { fontSize: 11.5 }]}>{button.text}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return(
    <View
      style={{
        width:          "100%",
        borderTopColor: darkMode ? "#EDE6D6" : "#181818",
        borderTopWidth: 3,
        flexDirection:  "row",
        gap:            5,
        justifyContent: "center",
        paddingTop:     10,
        paddingBottom:  10
      }}
    >
      { renderButtons() }
    </View>
  );
}

export default React.memo(FooterBar);
