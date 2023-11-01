import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions
} from "react-native";
import { useSelector } from "react-redux";
import Store from "../Store.js";

function Workout({ name, exercises, setModifyWorkout, index }) {
  const darkMode = useSelector(state => state.darkMode);

  const styles = StyleSheet.create({
    divider: {
      width:           "100%",
      height:          2,
      backgroundColor: darkMode ? "#EDE6D6" : "#181818"
    },
    regularText: {
      fontFamily: "Ubuntu Regular",
      color:      darkMode ? "#EDE6D6" : "#181818"
    },
    exerciseBox: {
      alignItems: "center",
      padding:    10
    }
  });

  function mapExercises() {
    return exercises.map((exercise, index) => {
      if(exercise.superset) {
        if(index == (exercises.length - 1)) {
          return(
            <View key={index} style={styles.exerciseBox}>
              <Text style={[ styles.regularText, { fontSize: 26 } ]}>{exercise.name}</Text>
              <View
                style={{
                  marginTop:       5,
                  gap:             5,
                  width:           Dimensions.get("window").width - 40
                }}
              >
                {
                  exercise.exercises.map((supersetExercise, index) => {
                    var repText = "";
                    if(supersetExercise.reps === "AMRAP") repText = "AMRAP";
                    else                                  repText = supersetExercise.reps + " Reps";

                    return(
                      <View key={index} style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={[ styles.regularText, { fontSize: 20 } ]}
                        >{supersetExercise.name}</Text>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={[ styles.regularText, { fontSize: 20 } ]}
                        >{repText}, {supersetExercise.sets} Sets</Text>
                      </View>
                    );
                  })
                }
              </View>
            </View>
          );
        } else {
          return(
            <React.Fragment key={index}>
              <View style={styles.exerciseBox}>
                <Text style={[ styles.regularText, { fontSize: 26 } ]}>{exercise.name}</Text>
                <View
                  style={{
                    marginTop:       5,
                    gap:             5,
                    width:           Dimensions.get("window").width - 40
                  }}
                >
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={[ styles.regularText, { fontSize: 20 } ]}
                    >Chest Press</Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={[ styles.regularText, { fontSize: 20 } ]}
                    >5 Reps, 4 Sets</Text>
                  </View>
                </View>
              </View>

              <View style={styles.divider}></View>
            </React.Fragment>
          );
        }
      } else {
        var repText = "";
        if(exercise.reps === "AMRAP") repText = "AMRAP";
        else                          repText = exercise.reps + " Reps";
        if(index == (exercises.length - 1)) {
          return(
            <View key={index} style={styles.exerciseBox}>
              <Text style={[ styles.regularText, { fontSize: 26 } ]}>{exercise.name}</Text>
              <Text style={[ styles.regularText, { fontSize: 20 } ]}>{repText}, {exercise.sets} Sets</Text>
            </View>
          );
        } else {
          return(
            <React.Fragment key={index}>
              <View style={styles.exerciseBox}>
                <Text style={[ styles.regularText, { fontSize: 26 } ]}>{exercise.name}</Text>
                <Text style={[ styles.regularText, { fontSize: 20 } ]}>{repText}, {exercise.sets} Sets</Text>
              </View>

              <View style={styles.divider}></View>
            </React.Fragment>
          );
        }
      }
    });
  }

  return(
    <TouchableOpacity
      onPress={() => {
        Store.dispatch({ type: "SET_SHOW_WORKOUT_EDITOR_MODAL", payload: true });
        setModifyWorkout({ name: name, exercises: exercises, index: index });
      }}
    >
      <View
        style={{
          borderRadius:    10,
          marginTop:        10,
          marginLeft:      10,
          marginRight:     10,
          backgroundColor: darkMode ? "#000000" : "#C6BDA8",
          alignItems:      "center"
        }}
      >
        <Text
          style={{
            fontFamily: "Ubuntu Bold",
            fontSize:   30,
            color:      darkMode ? "#EDE6D6" : "#181818",
            padding:    10
          }}
        >{name}</Text>

        <View style={styles.divider}></View>

        { mapExercises() }
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(Workout);
