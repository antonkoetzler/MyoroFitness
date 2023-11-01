import React from "react";
import {
  StatusBar,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { useSelector } from "react-redux";
import TopBar from "../components/TopBar.js";
import FooterBar from "../components/FooterBar.js";
import StreakFlameDark from "../../assets/img/StreakFlameDark.png";
import StreakFlameLight from "../../assets/img/StreakFlameLight.png";
import { checkStreak } from "../Database.js";

function Streak({ navigation }) {
  const darkMode                      = useSelector(state => state.darkMode);
  const [ streakText, setStreakText ] = React.useState("0 Days");
  const styles                        = StyleSheet.create({
    text: {
      fontFamily: "Ubuntu Regular",
      color:      darkMode ? "#EDE6D6" : "#181818"
    },
    container: {
      borderRadius: 10,
      borderColor:  darkMode ? "#EDE6D6" : "#181818",
      borderWidth:  2,
      padding:      5
    }
  });

  React.useEffect(() => {
    checkStreak().then(streak => {
      if(streak === 1) setStreakText("1 Day");
      else             setStreakText(`${streak} Days`);
    });
  }, []);

  return(
    <>
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />

      <SafeAreaView
        style={{
          flex:            1,
          backgroundColor: darkMode ? "#181818" : "#EDE6D6"
        }}
      >
        <TopBar />

        <View
          style={{
            flex:           1,
            alignItems:     "center",
            justifyContent: "center"
          }}
        >
          <Image
            source={darkMode ? StreakFlameDark : StreakFlameLight}
            style={{ width: 200, height: 200 }}
          />

          <View style={{ alignItems: "center", gap: 10 }}>
            <Text style={[ styles.text, { fontSize: 50 } ]}>{streakText}</Text>
            <Text style={[ styles.text, { fontSize: 18 } ]}>Use the Tracking Button keep your streak!</Text>
          </View>
        </View>

        <FooterBar navigation={navigation} />
      </SafeAreaView>
    </>
  );
}

export default React.memo(Streak);
