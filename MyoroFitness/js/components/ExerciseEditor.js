import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { useSelector } from "react-redux";

function ExerciseEditor({ setExercises, modifyExercise, setModifyExercise }) {
  const darkMode                                                                    = useSelector(state => state.darkMode);
  const [ supersetName, setSupersetName ]                                           = useState("");
  const supersetNameRef                                                             = useRef(null);
  const [ exerciseName, setExerciseName ]                                           = useState("");
  const exerciseNameRef                                                             = useRef(null);
  const [ reps, setReps ]                                                           = useState("");
  const repsRef                                                                     = useRef(null);
  const [ sets, setSets ]                                                           = useState("");
  const setsRef                                                                     = useRef(null);
  const [ isAMRAP, setIsAMRAP ]                                                     = useState(false);
  const [ isSuperset, setIsSuperset ]                                               = useState(false);
  const [ supersetExerciseModification, setSupersetExerciseModification ]           = useState(false);
  const [ supersetExerciseModificationIndex, setSupersetExerciseModificationIndex ] = useState(null);
  // Modifying an exercise that was already added to exercises state
  const [ isModifyingExercise, setIsModifyingExercise ]                             = useState(false);
  // Added exercises within a superset
  const [ supersetExercises, setSupersetExercises ]                                 = useState([]);
  // AMRAP and superset buttons
  const [ modificationButtons, setModificationButtons ]                             = useState([
    {
      name:    "AMRAP",
      state:   isAMRAP,
      onPress: () => setIsAMRAP(!isAMRAP)
    },
    {
      name:    "Superset",
      state:   isSuperset,
      onPress: () => setIsSuperset(!isSuperset)
    }
  ]);

  const styles = StyleSheet.create({
    text: {
      fontFamily:   "Ubuntu Regular",
      color:        darkMode ? "#EDE6D6" : "#181818",
    },
    textInput: {
      fontFamily:   "Ubuntu Regular",
      color:        darkMode ? "#EDE6D6" : "#181818",
      fontSize:     30,
      padding:      5,
      textAlign:    "center",
      borderColor:  darkMode ? "#EDE6D6" : "#181818",
      borderWidth:  2,
      borderRadius: 10,
      marginLeft:   10,
      marginRight:  10
    },
    addButton: {
      flex:            1,
      alignItems:      "center",
      borderRadius:    10,
      backgroundColor: darkMode ? "#181818" : "#EDE6D6",
      borderColor:     darkMode ? "#EDE6D6" : "#181818",
      borderWidth:     2,
      padding:         5,
      marginLeft:      10,
      marginRight:     10
    }
  });

  // REACT MOMENT
  React.useEffect(() => {
    if(!isModifyingExercise) {
      setModificationButtons([
        {
          name:    "AMRAP",
          state:   isAMRAP,
          onPress: () => setIsAMRAP(!isAMRAP)
        },
        {
          name:    "Superset",
          state:   isSuperset,
          onPress: () => setIsSuperset(!isSuperset)
        }
      ]);
    } else {
       setModificationButtons([
        {
          name:    "AMRAP",
          state:   isAMRAP,
          onPress: () => setIsAMRAP(!isAMRAP)
        }
      ]);
     
    }
  }, [isAMRAP, isSuperset, isModifyingExercise]);

  React.useEffect(() => {
    if(modifyExercise === null) return;

    setIsModifyingExercise(true);
    if(modifyExercise.superset) {
      setIsSuperset(true);
      setSupersetName(modifyExercise.name);
      setSupersetExercises(modifyExercise.exercises);
    } else {
      setIsSuperset(false);
      setExerciseName(modifyExercise.name);
      if(modifyExercise.reps === "AMRAP") {
        setIsAMRAP(true);
      } else {
        setIsAMRAP(false);
        setReps(modifyExercise.reps);
      }
      setSets(modifyExercise.sets);
    }
  }, [modifyExercise]);

  function mapSupersetExercises() {
    return supersetExercises.map((exercise, index) => {
      var repsText = "";
      if(exercise.reps === "AMRAP") repsText = "AMRAP";
      else                          repsText = exercise.reps + " Reps";

      if(index === (supersetExercises.length - 1))
        return(
          <TouchableOpacity key={index} onPress={() => editSupersetExercise(index)}>
            <View style={{ alignItems: "center" }}>
              <Text style={[ styles.text, { fontSize: 30 } ]}>{exercise.name}</Text>
              <Text style={[ styles.text, { fontSize: 26 } ]}>{repsText}, {exercise.sets} Sets</Text>
            </View>
          </TouchableOpacity>
        );
      else
        return(
          <React.Fragment key={index}>
            <TouchableOpacity onPress={() => editSupersetExercise(index)}>
              <View style={{ alignItems: "center" }}>
                <Text style={[ styles.text, { fontSize: 30 } ]}>{exercise.name}</Text>
                <Text style={[ styles.text, { fontSize: 26 } ]}>{repsText}, {exercise.sets} Sets</Text>
              </View>
            </TouchableOpacity>

            <View
              style={{
                width:           "100%",
                height:          2,
                backgroundColor: darkMode ? "#EDE6D6" : "#181818"
              }}
            ></View>
          </React.Fragment>
        );
    });
  }

  function addSupersetExercise() {
    if(exerciseName === "") {
      exerciseNameRef.current.focus();
      return;
    } else if(reps === "" && !isAMRAP) {
      repsRef.current.focus();
      return;
    } else if(sets === "") {
      setsRef.current.focus();
      return;
    }

    if(supersetExerciseModification) {
      setSupersetExercises(previous => {
        const result = [ ...previous ];
        result[supersetExerciseModificationIndex] = { name: exerciseName, reps: isAMRAP ? "AMRAP" : reps, sets: sets };
        return result;
      });
      setSupersetExerciseModification(false);
      setSupersetExerciseModificationIndex(null);
    } else {
      setSupersetExercises(previous => [
        ...previous,
        { name: exerciseName, reps: isAMRAP ? "AMRAP" : reps, sets: sets }
      ]);
    }

    setExerciseName(""); setReps(""); setSets("");
  }

  function editSupersetExercise(index) {
    setSupersetExerciseModification(true);
    setSupersetExerciseModificationIndex(index);
    setExerciseName(supersetExercises[index].name);
    if(supersetExercises[index].reps === "AMRAP") setIsAMRAP(true);
    else                                          setReps(supersetExercises[index].reps);
    setSets(supersetExercises[index].sets);
  }

  // Adds a normal exercise (not superset) to workout exercise list
  function addExercise() {
    if(exerciseName === "") {
      exerciseNameRef.current.focus();
      return;
    } else if(reps === "" && !isAMRAP) {
      repsRef.current.focus();
      return;
    } else if(sets === "") {
      setsRef.current.focus();
      return;
    }

    if(!isModifyingExercise)
      setExercises(previous => [
        ...previous,
        { superset: false, name: exerciseName, reps: isAMRAP ? "AMRAP" : reps, sets: sets }
      ]);
    else
      setExercises(previous => {
        const result = [ ...previous ];
        result[modifyExercise.index] = { superset: false, name: exerciseName, reps: isAMRAP ? "AMRAP" : reps, sets: sets };
        return result;
      });

    setExerciseName(""); setReps(""); setSets("");
    setIsModifyingExercise(false); setModifyExercise(null);
  }

  // addExercise for supersets
  function addSuperset() {
    if(supersetName === "") {
      supersetNameRef.current.focus();
      return;
    } else if(supersetExercises.length === 0) {
      exerciseNameRef.current.focus();
      return;
    }

    if(!isModifyingExercise)
      setExercises(previous => [
        ...previous,
        { superset: true, name: supersetName, exercises: supersetExercises }
      ]);
    else
      setExercises(previous => {
        const result = [ ...previous ];
        result[modifyExercise.index] = { superset: true, name: supersetName, exercises: supersetExercises };
        return result;
      });

    setSupersetName("");
    setExerciseName("");
    setReps("");
    setSets("");
    setSupersetExercises([]);
    setIsModifyingExercise(false);
    setModifyExercise(null);
  }

  // Deletes non-superset exercise from workout
  function deleteExercise() {
    setExercises(previous => {
      const result = [ ...previous ];
      result.splice(modifyExercise.index, 1);
      return result;
    });
    setSupersetName("");
    setSupersetExercises([]);
    setExerciseName("");
    setReps("");
    setSets("");
    setIsModifyingExercise(false);
    setModifyExercise(null);
  }

  function deleteSupersetExercise() {
    setSupersetExercises(previous => {
      const result = [ ...previous ];
      result.splice(supersetExerciseModificationIndex, 1);
      return result;
    });
    setSupersetExerciseModification(false);
    setSupersetExerciseModificationIndex(null);
    setExerciseName(""); setReps(""); setSets("");
  }

  return(
    <View
      style={{
        borderRadius:    10,
        backgroundColor: darkMode ? "#000000" : "#C6BDA8",
        marginLeft:      10,
        marginRight:     10,
        marginTop:       10,
        paddingTop:      10,
        paddingBottom:   10,
        gap:             10
      }}
    >
      {/* Superset name */}
      {
        isSuperset
        &&
        <>
          <TextInput
            style={[ styles.textInput, { fontFamily: "Ubuntu Bold" } ]}

            onChangeText={setSupersetName}
            value={supersetName}

            ref={supersetNameRef}

            placeholder="Superset Name"
            placeholderTextColor={darkMode ? "rgba(237, 230, 214, 0.7)" : "rgba(24, 24, 24, 0.7)"}

            returnKeyType="go"
            onSubmitEditing={() => exerciseNameRef.current.focus()}
          />

          {/* Added superset exercises */}
          <View style={{ gap: 10 }}>
            { mapSupersetExercises() }
          </View>
        </>
      }

      {/* Name */}
      <TextInput
        style={styles.textInput}
        onChangeText={setExerciseName}

        value={exerciseName}

        ref={exerciseNameRef}

        placeholder="Exercise Name"
        placeholderTextColor={darkMode ? "rgba(237, 230, 214, 0.7)" : "rgba(24, 24, 24, 0.7)"}

        returnKeyType="go"
        onSubmitEditing={() => { if(isAMRAP) setsRef.current.focus(); else repsRef.current.focus(); }}
      />

      {/* Reps and sets */}
      <View
        style={{
          flexDirection: "row",
          alignItems:    "center"
        }}
      >
        {
          !isAMRAP
          ?
          <TextInput
            style={[ styles.textInput, { fontSize: 26, flex: 1 } ]}
            onChangeText={setReps}

            value={reps}
            ref={repsRef}

            placeholder="Reps"
            placeholderTextColor={darkMode ? "rgba(237, 230, 214, 0.7)" : "rgba(24, 24, 24, 0.7)"}

            inputMode="numeric"

            returnKeyType="done"
            onSubmitEditing={() => setsRef.current.focus()}
          />
          :
          <Text
            style={[
              styles.text,
              {
                fontSize:     40,
                flex:         1,
                marginLeft:   12,
                marginRight:  12,
                paddingLeft:  5,
                paddingRight: 5,
                textAlign:    "center"
              }
            ]}
          >∞</Text>
        }

        <Text
          style={[
            styles.text,
            { fontSize: 30 }
          ]}
        >x</Text>

        <TextInput
          style={[ styles.textInput, { fontSize: 26, flex: 1 } ]}
          onChangeText={setSets}
          value={sets}
          placeholder="Sets"
          placeholderTextColor={darkMode ? "rgba(237, 230, 214, 0.7)" : "rgba(24, 24, 24, 0.7)"}
          ref={setsRef}
          inputMode="numeric"
          returnKeyType="done"
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          gap:           30,
          marginLeft:    10,
          marginRight:   10
        }}
      >
        {
          modificationButtons.map((button, index) =>
            <TouchableWithoutFeedback key={index} onPress={button.onPress}>
              <View
                style={{
                  flex:            1,
                  alignItems:      "center",
                  borderRadius:    10,
                  backgroundColor: !button.state ? (darkMode ? "#181818" : "#EDE6D6") : (darkMode ? "#EDE6D6" : "#181818"),
                  padding:         5
                }}
              >
                <Text
                  style={[
                    styles.text,
                    {
                      fontSize: 26,
                      color:    !button.state ? (darkMode ? "#EDE6D6" : "#181818") : (darkMode ? "#181818" : "#EDE6D6")
                    }
                  ]}
                >{button.name}</Text>
              </View>
            </TouchableWithoutFeedback>
          )
        }
      </View>

      {/* Add buttons */}
      <View style={{ flexDirection: "row" }}>
        {
          (isModifyingExercise && !isSuperset)
          &&
          <TouchableOpacity onPress={deleteExercise} style={{ flex: 1 }}>
            <View style={styles.addButton}>
              <Text style={[ styles.text, { fontSize: 30 } ]}
              >Delete</Text>
            </View>
          </TouchableOpacity>
        }
        <TouchableOpacity onPress={!isSuperset ? addExercise : addSupersetExercise} style={{ flex: 1 }}>
          <View style={styles.addButton}>
            <Text style={[ styles.text, { fontSize: !isSuperset ? 30 : (!supersetExerciseModification ? 30 : 24) } ]}
            >{!isSuperset ? "Finish" : (!supersetExerciseModification ? "Add" : "Change") }</Text>
          </View>
        </TouchableOpacity>
        {
          supersetExerciseModification
          &&
          <TouchableOpacity onPress={deleteSupersetExercise} style={{ flex: 1 }}>
            <View style={styles.addButton}>
              <Text style={[ styles.text, { fontSize: !supersetExerciseModification ? 30 : 24 } ]}>Delete</Text>
            </View>
          </TouchableOpacity>
        }
        {
          isSuperset
          &&
          <TouchableOpacity onPress={addSuperset} style={{ flex: 1 }}>
            <View style={styles.addButton}>
              <Text style={[ styles.text, { fontSize: !supersetExerciseModification ? 30 : 24 } ]}>Finish</Text>
            </View>
          </TouchableOpacity>
        }
      </View>

      {
        (isModifyingExercise && isSuperset)
        &&
        <TouchableOpacity onPress={deleteExercise} style={{ flex: 1 }}>
          <View style={styles.addButton}>
            <Text style={[ styles.text, { fontSize: !supersetExerciseModification ? 30 : 24 } ]}>Delete Superset</Text>
          </View>
        </TouchableOpacity>
      }
    </View>
  );
}

export default React.memo(ExerciseEditor);
