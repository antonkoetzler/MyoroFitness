import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet
} from "react-native";
import { useSelector } from "react-redux";
import { logData } from "../Database.js";

function LogBox() {
  const darkMode                    = useSelector(state => state.darkMode);
  const [ weight, setWeight ]       = useState("");
  const weightRef                   = useRef(null);
  const [ exercised, setExercised ] = useState(false);
  const [ calories, setCalories ]   = useState(""); // Display calories automatically
  const caloriesRef                 = useRef(null);

  const styles = StyleSheet.create({
    text: {
      fontFamily: "Ubuntu Regular",
      color:      darkMode ? "#EDE6D6" : "#181818"
    },
    container: {
      fontFamily:   "Ubuntu Regular",
      fontSize:     20,
      color:        darkMode ? "#EDE6D6" : "#181818",
      borderRadius: 10,
      borderColor:  darkMode ? "#EDE6D6" : "#181818",
      borderWidth:  2,
      padding:      5,
      minWidth:     90,
      textAlign:    "center"
    }
  });

  function log() {
    if(weight === "") {
      weightRef.current.focus();
      return;
    } else if(calories === "") {
      caloriesRef.current.focus();
      return;
    }

    const currentDate = new Date();
    const date        = currentDate.getFullYear() + ':' + String(currentDate.getMonth() + 1).padStart(2, '0') + ':' + String(currentDate.getDate()).padStart(2, '0');

    logData(weight, exercised, calories, date);
  }

  return(
    <View style={{ alignItems: "center", gap: 15 }}>
      <Text style={[ styles.text, { fontSize: 30 } ]}>Log for Today</Text>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <TextInput
          style={styles.container}
          placeholder="Weight"
          placeholderTextColor={darkMode ? "rgba(237, 230, 214, 0.7)" : "rgba(24, 24, 24, 0.7)"}
          value={weight}
          onChangeText={setWeight}
          ref={weightRef}
          keyboardType="numeric"
          returnKeyType="done"
          onSubmitEditing={() => caloriesRef.current.focus()}
        />

        <TouchableWithoutFeedback onPress={() => setExercised(!exercised)}>
          <View
            style={[
              styles.container,
              { backgroundColor: !exercised ? "transparent" : (darkMode ? "#EDE6D6" : "#181818") }
            ]}
          >
            <Text
              style={{
                fontFamily: "Ubuntu Regular",
                fontSize:   20,
                color:      !exercised ? (darkMode ? "#EDE6D6" : "#181818") : (darkMode ? "#181818" : "#EDE6D6")
              }}
            >Exercised?</Text>
          </View>
        </TouchableWithoutFeedback>

        <TextInput
          style={styles.container}
          placeholder="Calories"
          placeholderTextColor={darkMode ? "rgba(237, 230, 214, 0.7)" : "rgba(24, 24, 24, 0.7)"}
          value={calories}
          onChangeText={setCalories}
          ref={caloriesRef}
          keyboardType="numeric"
          returnKeyType="done"
        />
      </View>

      <TouchableOpacity onPress={log}>
        <Text style={[ styles.text, { fontSize: 50 } ]}>✓</Text>
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(LogBox);
