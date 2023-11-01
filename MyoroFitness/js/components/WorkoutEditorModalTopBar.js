import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { useSelector } from "react-redux";
import { insertWorkout, updateWorkout } from "../Database.js";
import Store from "../Store.js";

function WorkoutEditorModalTopBar({
  exercises,
  setWorkouts,
  workoutName,
  workoutNameRef,
  modifyWorkout,
  setModifyWorkout
}) {
  const darkMode                = useSelector(state => state.darkMode);
  const [ buttons, setButtons ] = React.useState([]);

  React.useEffect(() => {
    if(exercises.length === 0)
      setButtons([{
        name:    " X ",
        onPress: () => Store.dispatch({ type: "SET_SHOW_WORKOUT_EDITOR_MODAL", payload: false })
      }]);
    else
      setButtons([
        { name:    " ✓ ", onPress: () => addWorkout(workoutName) },
        {
          name:    " X ",
          onPress: () => Store.dispatch({ type: "SET_SHOW_WORKOUT_EDITOR_MODAL", payload: false })
        }
      ]);
  }, [exercises]);

  function mapButtons() {
    return buttons.map((button, index) =>
      <TouchableWithoutFeedback key={index} onPress={button.onPress}>
        <View
          style={{
            justifyContent:  "center",
            paddingLeft:     5,
            paddingRight:    5,
            borderLeftColor: darkMode ? "#EDE6D6" : "#181818",
            borderLeftWidth: 2
          }}
        >
          <Text
            style={{
              fontFamily: "Ubuntu Regular",
              fontSize:   24,
              color:      darkMode ? "#EDE6D6" : "#181818"
            }}
          >{button.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  function addWorkout(workoutName) {
    if(workoutName === "") {
      workoutNameRef.current.focus();
      return;
    }

    if(modifyWorkout === null) {
      setWorkouts(previous => [
        ...previous,
        { name: workoutName, exercises: exercises }
      ]);
      insertWorkout(workoutName, exercises);
    } else {
      setWorkouts(previous => {
        const result = [ ...previous ];
        result[modifyWorkout.index] = { name: workoutName, exercises: exercises };
        return result;
      });
      updateWorkout(workoutName, exercises, modifyWorkout);
      setModifyWorkout(null);
    }

    Store.dispatch({ type: "SET_SHOW_WORKOUT_EDITOR_MODAL", payload: false })
  }

  return(
    <View
      style={{
        width:             "100%",
        height:            50,
        borderBottomColor: darkMode ? "#EDE6D6" : "#181818",
        borderBottomWidth: 2,
        flexDirection:     "row",
        alignItems:        "center",
        justifyContent:    "space-between"
      }}
    >
      <Text
        style={{
          fontFamily:  "Ubuntu Bold",
          fontSize:    30,
          color:       darkMode ? "#EDE6D6" : "#181818",
          paddingLeft: 10
        }}
      >Create Workout</Text>

      <View
        style={{
          flexDirection: "row",
          height:        50
        }}
      >
        { mapButtons() }
      </View>
    </View>
  );
}

export default React.memo(WorkoutEditorModalTopBar);
