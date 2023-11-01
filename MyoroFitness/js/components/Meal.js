import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { getDate } from "../Functions.js";
import { updateMealRow, getMealRow } from "../Database.js";
import Store from "../Store.js";

function Meal({ name, extraMargin }) {
  const darkMode            = useSelector(state => state.darkMode);
  const meal                = useSelector(state => state.meal);
  const mealModification    = useSelector(state => state.mealModification);
  const [ foods, setFoods ] = React.useState([]);

  const styles = StyleSheet.create({
    regularText: {
      fontFamily: "Ubuntu Regular",
      color:      darkMode ? "#EDE6D6" : "#181818"
    },
  });

  React.useEffect(() => {
    // Loading stored meals
    if(meal.finished == false || meal.name != name) {
      const date = getDate();
      getMealRow(name).then(result => {
        if(!result.foods)       return;
        if(result.date != date) return;
        setFoods(JSON.parse(result.foods));
      });
    } else {
      if(mealModification == false) {
        setFoods(meal.foods);
        updateMealRow(JSON.stringify(meal.foods), getDate(), meal.name);
      } else {
        if(meal.foods.hasOwnProperty("remove")) {
          setFoods(previousFoods => {
            const result = [ ...previousFoods ];
            for(let i = 0; i < result.length; i++) {
              if(result[i].name == meal.foods.name && result[i].brand == meal.foods.brand) {
                result.splice(i, 1);
                break;
              }
            }

            updateMealRow(JSON.stringify(result), getDate(), meal.name);
            return result;
          });
        } else {
          setFoods(previousFoods => {
            const result = [ ...previousFoods ];
            for(let i = 0; i < result.length; i++) {
              if(result[i].name == meal.foods.name && result[i].brand == meal.foods.brand) {
                result[i] = meal.foods;
                break;
              }
            }

            updateMealRow(JSON.stringify(result), getDate(), meal.name);
            return result;
          });
        }
      }

      Store.dispatch({ type: "RESET_MEAL" });
    }
  }, [meal.finished]);

  return(
    <View
      style={{
        backgroundColor: darkMode ? "#000000" : "#C6BDA8",
        borderRadius:    10,
        marginLeft:      10,
        marginRight:     10,
        marginTop:       15,
        marginBottom:    extraMargin ? 15 : 0,
        padding:         10,
        gap:             10
      }}
    >
      {/* Meal name & button to add foods */}
      <View
        style={{
          flexDirection:  "row",
          justifyContent: "space-between",
          alignItems:     "center"
        }}
      >
        <Text
          style={{
            fontFamily: "Ubuntu Bold",
            fontSize:   40,
            color:      darkMode ? "#EDE6D6" : "#181818"
          }}
        >{name}</Text>

        <TouchableOpacity
          onPress={() => {
            Store.dispatch({ type: "SET_MEAL_MODIFICATION", payload: false });
            Store.dispatch({ type: "SET_MEAL_NAME", payload: name });
            Store.dispatch({ type: "SET_SHOW_FOOD_SELECTION_MODAL", payload: true });
          }}
        >
          <View
            style={{
              width:           40,
              height:          40,
              backgroundColor: darkMode ? "#EDE6D6" : "#181818",
              borderRadius:    10,
              alignItems:      "center",
              justifyContent:  "center"
            }}
          >
            <Text
              style={[
                styles.regularText,
                {
                  color:      darkMode ? "#181818" : "#EDE6D6",
                  fontSize:   50,
                  lineHeight: 45
                }
              ]}
            >+</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Foods */}
      <View style={{ gap: 7 }}>
        {
          foods.map((food, index) =>
            <TouchableOpacity
              key={index}
              onPress={() => {
                Store.dispatch({ type: "SET_MEAL_MODIFICATION", payload: true });
                Store.dispatch({ type: "SET_MEAL_NAME", payload: name });
                Store.dispatch({ type: "ADD_MEAL_FOOD", payload: food });
                Store.dispatch({ type: "SET_SHOW_FOOD_INFORMATION_MODAL", payload: true });
              }}
            >
              <View
                style={{
                  flexDirection:  "row",
                  justifyContent: "space-between",
                  alignItems:     "center"
                }}
              >
                {/* Food name & serving size */}
                <View style={{ flex: 1 }}>
                  <Text
                    numberOfLines={1}
                    style={[ styles.regularText, { fontSize: 26 }]}
                  >{food.name}</Text>
                  <Text
                    numberOfLines={1}
                    style={[ styles.regularText, { fontSize: 18 }]}
                  >{food.userData.serving}{food.userData.servingUnit && food.userData.servingUnit}</Text>
                </View>

                {/* Calories */}
                <Text style={[ styles.regularText, { fontSize: 26, textAlign: "right" }]}>{food.userData.calories}cal</Text>
              </View>
            </TouchableOpacity>
          )
        }
      </View>
    </View>
  );
}

export default React.memo(Meal);
