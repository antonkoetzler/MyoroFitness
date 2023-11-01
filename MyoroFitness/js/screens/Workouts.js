import React, { useState } from "react";
import {
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text
} from "react-native";
import { useSelector } from "react-redux";
import TopBar from "../components/TopBar.js";
import FooterBar from "../components/FooterBar.js";
import WorkoutEditorModal from "../components/WorkoutEditorModal.js";
import Store from "../Store.js";
import Workout from "../components/Workout.js";
import { getWorkouts } from "../Database.js";

function Workouts({ navigation }) {
  const darkMode                            = useSelector(state => state.darkMode);
  const [ workouts, setWorkouts ]           = useState([]);
  const [ modifyWorkout, setModifyWorkout ] = useState(null);

  function mapWorkouts() {
    return workouts.map((workout, index) =>
      <Workout
        key={index}
        name={workout.name}
        exercises={workout.exercises}
        setModifyWorkout={setModifyWorkout}
        index={index}
      />
    );
  }

  // Loading updated workout from SQL database
  React.useEffect(() => {
    if(modifyWorkout !== null) return;

    getWorkouts().then(workouts => { setWorkouts(workouts); });
  }, [modifyWorkout]);

  return(
    <>
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />

      <WorkoutEditorModal
        setWorkouts={setWorkouts}
        modifyWorkout={modifyWorkout}
        setModifyWorkout={setModifyWorkout}
      />

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: darkMode ? "#181818" : "#EDE6D6"
        }}
      >
        <TopBar />

        <ScrollView style={{ flex: 1 }}>
          { mapWorkouts() }

          <TouchableOpacity
            style={{ marginTop: 10, marginBottom: 10 }}
            onPress={() => Store.dispatch({ type: "SET_SHOW_WORKOUT_EDITOR_MODAL", payload: true })}
          >
            <View
              style={{
                borderColor:  darkMode ? "#EDE6D6" : "#181818",
                borderWidth:  2,
                borderRadius: 10,
                alignSelf:    "center",
                padding:      10
              }}
            >
              <Text
                style={{
                  fontFamily: "Ubuntu Regular",
                  fontSize:   30,
                  color:      darkMode ? "#EDE6D6" : "#181818"
                }}
              >Create Workout</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        <FooterBar navigation={navigation} />
      </SafeAreaView>
    </>
  );
}

export default React.memo(Workouts);
