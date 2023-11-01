import React, { useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { useSelector } from "react-redux";
import Store from "../Store.js";
import WorkoutEditorModalTopBar from "./WorkoutEditorModalTopBar.js";
import ExerciseEditor from "./ExerciseEditor.js";
import { deleteWorkout } from "../Database.js";

function WorkoutEditorModal({ setWorkouts, modifyWorkout, setModifyWorkout }) {
  const darkMode                                      = useSelector(state => state.darkMode);
  const showWorkoutEditorModal                        = useSelector(state => state.showWorkoutEditorModal);
  const [ workoutName, setWorkoutName ]               = useState("");
  const workoutNameRef                                = React.useRef(null);
  const [ exercises, setExercises ]                   = useState([]);
  const [ modifyExercise, setModifyExercise ]         = useState(null);
  const [ isModifyingWorkout, setIsModifyingWorkout ] = useState(false);

  const styles = StyleSheet.create({
    boldText: {
      fontFamily: "Ubuntu Bold",
      fontSize:   30,
      color:      darkMode ? "#EDE6D6" : "#181818"
    },
    regularText: {
      fontFamily: "Ubuntu Regular",
      fontSize:   26,
      color:      darkMode ? "#EDE6D6" : "#181818"
    },
    exerciseBox: {
      alignItems: "center",
      padding:    10
    }
  });

  React.useEffect(() => {
    setWorkoutName("");
    setExercises([]);

    if(modifyWorkout === null) return;

    setIsModifyingWorkout(true);
    setWorkoutName(modifyWorkout.name);
    setExercises(modifyWorkout.exercises);
  }, [showWorkoutEditorModal]);

  function mapExercises() {
    return exercises.map((exercise, index) => {
      if(exercise.superset) {
        if(index === (exercises.length - 1))
          return(
            <TouchableOpacity key={index} onPress={() => setModifyExercise({ ...exercise, index: index })}>
              <View style={[ styles.exerciseBox, { alignItems: "center" } ]}>
                <Text style={styles.boldText}>{exercise.name}</Text>
                {
                  exercise.exercises.map((supersetExercise, index) => {
                    var repText = "";
                    if(supersetExercise.reps === "AMRAP") repText = "AMRAP";
                    else                                  repText = supersetExercise.reps + " Reps";

                    return(
                      <View key={index} style={styles.exerciseBox}>
                        <Text style={styles.regularText}>{supersetExercise.name}</Text>
                        <Text style={styles.regularText}>{repText}, {supersetExercise.sets} Sets</Text>
                      </View>
                    );
                  })
                }
              </View>
            </TouchableOpacity>
          );
      else
        return(
          <React.Fragment key={index}>
            <TouchableOpacity key={index} onPress={() => setModifyExercise({ ...exercise, index: index })}>
              <View style={[ styles.exerciseBox, { alignItems: "center" } ]}>
                <Text style={styles.boldText}>{exercise.name}</Text>
                {
                  exercise.exercises.map((supersetExercise, index) => {
                    var repText = "";
                    if(supersetExercise.reps === "AMRAP") repText = "AMRAP";
                    else                                  repText = supersetExercise.reps + " Reps";

                    return(
                      <View key={index} style={styles.exerciseBox}>
                        <Text style={styles.regularText}>{supersetExercise.name}</Text>
                        <Text style={styles.regularText}>{repText}, {supersetExercise.sets} Sets</Text>
                      </View>
                    );
                  })
                }
              </View>
            </TouchableOpacity>

            <View
              style={{
                width:  "100%",
                height: 2,
                backgroundColor: darkMode ? "#EDE6D6" : "#181818"
              }}
            ></View>
          </React.Fragment>
        );
      } else {
        var repText = "";
        if(exercise.reps === "AMRAP") repText = "AMRAP";
        else                          repText = exercise.reps + " Reps";
        if(index === (exercises.length - 1))
          return(
            <TouchableOpacity key={index} onPress={() => setModifyExercise({ ...exercise, index: index })}>
              <View style={styles.exerciseBox}>
                <Text style={styles.boldText}>{exercise.name}</Text>
                <Text style={styles.regularText}>{repText}, {exercise.sets} Sets</Text>
              </View>
            </TouchableOpacity>
          );
        else
          return(
            <React.Fragment key={index}>
              <TouchableOpacity onPress={() => setModifyExercise({ ...exercise, index: index })}>
                <View style={styles.exerciseBox}>
                  <Text style={styles.boldText}>{exercise.name}</Text>
                  <Text style={styles.regularText}>{repText}, {exercise.sets} Sets</Text>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  width:  "100%",
                  height: 2,
                  backgroundColor: darkMode ? "#EDE6D6" : "#181818"
                }}
              ></View>
            </React.Fragment>
          );
      }
    });
  }

  function removeWorkout() {
    deleteWorkout(modifyWorkout);
    setModifyWorkout(null);
    Store.dispatch({ type: "SET_SHOW_WORKOUT_EDITOR_MODAL", payload: false });
  }

  return(
    <Modal
      animationType="slide"
      transparent={false}
      visible={showWorkoutEditorModal}
      onRequestClose={() => Store.dispatch({ type: "SET_SHOW_WORKOUT_EDITOR_MODAL", payload: false })}
    >
      <SafeAreaView
        style={{
          flex:            1,
          backgroundColor: darkMode ? "#181818" : "#EDE6D6"
        }}
      >
        <WorkoutEditorModalTopBar
          exercises={exercises}
          setWorkouts={setWorkouts}
          workoutName={workoutName}
          workoutNameRef={workoutNameRef}
          modifyWorkout={modifyWorkout}
          setModifyWorkout={setModifyWorkout}
        />

        <ScrollView style={{ flex: 1 }}>
          <TextInput
            style={{
              fontFamily:   "Ubuntu Regular",
              fontSize:     30,
              color:        darkMode ? "#EDE6D6" : "#181818",
              borderColor:  darkMode ? "#EDE6D6" : "#181818",
              borderWidth:  2,
              borderRadius: 10,
              padding:      5,
              textAlign:    "center",
              marginLeft:   20,
              marginRight:  20,
              marginTop:    10
            }}
            onChangeText={setWorkoutName}
            value={workoutName}
            ref={workoutNameRef}
            placeholder="Workout Name"
            placeholderTextColor={darkMode ? "rgba(237, 230, 214, 0.7)" : "rgba(24, 24, 24, 0.7)"}
          />

          {
            isModifyingWorkout
            &&
            <TouchableOpacity onPress={removeWorkout}>
              <View
                style={{
                  borderColor:  darkMode ? "#EDE6D6" : "#181818",
                  borderWidth:  2,
                  borderRadius: 10,
                  padding:      5,
                  marginLeft:   20,
                  marginRight:  20,
                  marginTop:    10
                }}
              >
                <Text
                  style={{
                    fontFamily: "Ubuntu Regular",
                    fontSize:   30,
                    color:      darkMode ? "#EDE6D6" : "#181818",
                    textAlign:  "center"
                  }}
                >Delete Workout</Text>
              </View>
            </TouchableOpacity>
          }

          <ExerciseEditor
            setExercises={setExercises}
            modifyExercise={modifyExercise}
            setModifyExercise={setModifyExercise}
          />

          {/* Added exercises */}
          <View
            style={{
              borderRadius:    10,
              margin:          10,
              backgroundColor: darkMode ? "#000000" : "#C6BDA8"
            }}
          >
            { mapExercises() }

          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

export default React.memo(WorkoutEditorModal);
