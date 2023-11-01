import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { useSelector } from "react-redux";
import Store from "../Store.js";

function FoodInformationModalTopbar({ calories, serving, servingUnit }) {
  const darkMode                = useSelector(state => state.darkMode);
  const mealModification        = useSelector(state => state.mealModification);
  const meal                    = useSelector(state => state.meal);
  const selectedFood            = useSelector(state => state.selectedFood);
  const [ buttons, setButtons ] = React.useState([]);

  React.useEffect(() => {
    if(mealModification == false) {
      setButtons([
        { name: "Add",          onPress: add },
        { name: "Add & Finish", onPress: addAndFinish },
        { name: " X ",          onPress: closeModal }
      ]);
    } else {
      setButtons([
        { name: "Change",       onPress: changeFood },
        { name: "Delete",       onPress: deleteFood },
        { name: " X ",          onPress: closeModal }
      ]);
    }
  }, [mealModification, calories, serving, servingUnit]);

  function formatFoodSelection(food) {
    const result = {
      ...food,
      // Perhaps edited serving portions
      userData: { calories: calories, serving: serving, servingUnit: servingUnit }
    }; return result;
  }

  // Adds food to meal.foods
  function add() {
    const food = formatFoodSelection(selectedFood);
    Store.dispatch({ type: "ADD_MEAL_FOOD", payload: food });
    Store.dispatch({ type: "SET_SHOW_FOOD_INFORMATION_MODAL", payload: false });
    Store.dispatch({ type: "SET_SHOW_FOOD_SELECTION_MODAL", payload: true });
  }

  function addAndFinish() {
    const food = formatFoodSelection(selectedFood);
    Store.dispatch({ type: "ADD_MEAL_FOOD", payload: food });
    Store.dispatch({ type: "SET_MEAL_FINISHED", payload: true });
    Store.dispatch({ type: "SET_SHOW_FOOD_INFORMATION_MODAL", payload: false });
  }

  function changeFood() {
    const food = formatFoodSelection(Store.getState().meal.foods[0]);
    Store.dispatch({ type: "SET_MEAL_FOOD", payload: food });
    Store.dispatch({ type: "SET_MEAL_FINISHED", payload: true });
    Store.dispatch({ type: "SET_SHOW_FOOD_INFORMATION_MODAL", payload: false });
  }

  function deleteFood() {
    Store.dispatch({ type: "SET_MEAL_FOOD", payload: { ...selectedFood, remove: true }});
    Store.dispatch({ type: "SET_MEAL_FINISHED", payload: true });
    Store.dispatch({ type: "SET_SHOW_FOOD_INFORMATION_MODAL", payload: false });
  }

  function closeModal() {
    Store.dispatch({ type: "SET_SHOW_FOOD_INFORMATION_MODAL", payload: false });
    if(mealModification == true)
      Store.dispatch({ type: "SET_MEAL_MODIFICATION", payload: false });
    else
      Store.dispatch({ type: "SET_SHOW_FOOD_SELECTION_MODAL", payload: true });
  }

  function mapButtons() {
    return buttons.map((button, index) => {
      var modifiedFontSize = false;
      if(button.name == " X ") modifiedFontSize = true;

      return(
        <TouchableWithoutFeedback key={index} onPress={button.onPress}>
          <View
            style={{
              height:          50,
              borderLeftColor: darkMode ? "#EDE6D6" : "#181818",
              borderLeftWidth: 2,
              justifyContent:  "center",
              paddingLeft:     5,
              paddingRight:    5,
            }}
          >
            <Text
              style={{
                fontFamily:      "Ubuntu Regular",
                fontSize:        !modifiedFontSize ? 20 : 24,
                color:           darkMode ? "#EDE6D6" : "#181818"
              }}
            >{button.name}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    });
  }

  return(
    <View
      style={{
        width:             "100%",
        height:            50,
        borderBottomColor: darkMode ? "#EDE6D6" : "#181818",
        borderBottomWidth: 2,
        flexDirection:     "row",
        justifyContent:    "space-between",
        alignItems:        "center"
      }}
    >
      <Text
        style={{
          fontFamily:  "Ubuntu Bold",
          fontSize:    30,
          color:       darkMode ? "#EDE6D6" : "#181818",
          paddingLeft: 10,
          textAlign:   "center",
          flex:        1
        }}
      >{!mealModification ? "Add Food" : "Edit Food"}</Text>

      <View style={{ flexDirection: "row" }}>
        { mapButtons() }
      </View>
    </View>
  );
}

export default React.memo(FoodInformationModalTopbar);
