import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { useSelector } from "react-redux";

function FoodInformation({
  calories, setCalories,
  serving, setServing,
  servingUnit, setServingUnit
}) {
  const darkMode                                        = useSelector(state => state.darkMode);
  const selectedFood                                    = useSelector(state => state.selectedFood);
  const [ foodName, setFoodName ]                       = useState("");
  const [ foodBrand, setFoodBrand ]                     = useState("");
  const [ ingredients, setIngredients ]                 = useState([]);
  const [ numericalSectionOne, setNumericalSectionOne ] = useState([]);
  const [ numericalSectionTwo, setNumericalSectionTwo ] = useState([]);
  const [ units, setUnits ]                             = useState([
    { unit: "g/ml", selected: true },
    { unit: "oz",   selected: false },
    { unit: "cups", selected: false },
    { unit: "lbs",  selected: false },
    { unit: "kgs",  selected: false }
  ]);

  const styles = StyleSheet.create({
    regularText: {
      fontFamily: "Ubuntu Regular",
      fontSize:   30,
      color:      darkMode ? "#EDE6D6" : "#181818"
    },
    boldText: {
      fontFamily: "Ubuntu Bold",
      fontSize:   30,
      color:      darkMode ? "#EDE6D6" : "#181818"
    }
  });

  React.useEffect(() => {
    if(selectedFood == null) return;

    // Food name, brand, calories & serving
    setFoodName(selectedFood.name);
    setFoodBrand(selectedFood.brand);
    setCalories(selectedFood.calories);
    if(selectedFood.serving == null) {
      setServing("1");
      setServingUnit(null);
    } else {
      setServing(Number(selectedFood.serving.match(/\d+/g)[0]));
      setServingUnit("g/ml");
    }
    // Setting ingredients
    if(selectedFood.ingredients) {
      var ingredientsArray = selectedFood.ingredients.replace(/\([^)]*\)/g, '');
          ingredientsArray = ingredientsArray.split(',').map(ingredient => ingredient.trim());
          ingredientsArray = ingredientsArray.filter(ingredient => ingredient != "");
      setIngredients(ingredientsArray);
    } else setIngredients(null);
    // Setting nutrients
    setNumericalSectionOne([
      { name: "Water",        value: selectedFood.water ? selectedFood.water : "N/A" },
      { name: "Carbohydrate", value: selectedFood.macronutrients.carbohydrate ? selectedFood.macronutrients.carbohydrate : "N/A" },
      { name: "Fiber",        value: selectedFood.macronutrients.fiber ? selectedFood.macronutrients.fiber : "N/A" },
      { name: "Protein",      value: selectedFood.macronutrients.protein ? selectedFood.macronutrients.protein : "N/A" },
      { name: "Cholesterol",  value: selectedFood.macronutrients.cholesterol ? selectedFood.macronutrients.cholesterol : "N/A" },
      { name: "Sugar",        value: selectedFood.macronutrients.sugars.sugar ? selectedFood.macronutrients.sugars.sugar : "N/A" },
      { name: "Aspartame",    value: selectedFood.macronutrients.sugars.asparticAcid ? selectedFood.macronutrients.sugars.asparticAcid : "N/A" },
      { name: "Fat",          value: selectedFood.macronutrients.fats.fat ? selectedFood.macronutrients.fats.fat : "N/A" },
      { name: "Trans-Fat",    value: selectedFood.macronutrients.fats.transFat ? selectedFood.macronutrients.fats.transFat : "N/A" },
      { name: "Vitamin A",    value: selectedFood.vitamins.a ? selectedFood.vitamins.a : "N/A" },
      { name: "Vitamin B6",   value: selectedFood.vitamins.b6 ? selectedFood.vitamins.b6 : "N/A" }
    ]);
    setNumericalSectionTwo([
      { name: "Vitamin B12",  value: selectedFood.vitamins.b12 ? selectedFood.vitamins.b12 : "N/A" },
      { name: "Vitamin C",    value: selectedFood.vitamins.c ? selectedFood.vitamins.c : "N/A" },
      { name: "Vitamin D",    value: selectedFood.vitamins.d ? selectedFood.vitamins.d : "N/A" },
      { name: "Vitamin K",    value: selectedFood.vitamins.k ? selectedFood.vitamins.k : "N/A" },
      { name: "Calcium",      value: selectedFood.minerals.calcium ? selectedFood.minerals.calcium : "N/A" },
      { name: "Iron",         value: selectedFood.minerals.iron ? selectedFood.minerals.iron : "N/A" },
      { name: "Potassium",    value: selectedFood.minerals.potassium ? selectedFood.minerals.potassium : "N/A" },
      { name: "Magnesium",    value: selectedFood.minerals.magnesium ? selectedFood.minerals.magnesium : "N/A" },
      { name: "Sodium",       value: selectedFood.minerals.sodium ? selectedFood.minerals.sodium : "N/A" },
      { name: "Zinc",         value: selectedFood.minerals.zinc ? selectedFood.minerals.zinc : "N/A" },
      { name: "Selenium",     value: selectedFood.minerals.selenium ? selectedFood.minerals.selenium : "N/A" }
    ]);
  }, [selectedFood]);

  return(
    <ScrollView style={{ flex: 1 }}>
      {/* Food name & brand */}
      <View
        style={{
          borderRadius:    10,
          backgroundColor: darkMode ? "#000000" : "#C6BDA8",
          alignItems:      "center",
          padding:         10,
          marginTop:       15,
          marginLeft:      10,
          marginRight:     10
        }}
      >
        <Text style={[ styles.boldText, { textAlign: "center" }]}>{foodName}</Text>
        {
          foodBrand
          &&
          <Text style={[ styles.regularText, { textAlign: "center" }]}>{foodBrand}</Text>
        }
      </View>

      {/* Calories & serving */}
      <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection:  "row",
            alignItems:     "center",
            justifyContent: "center",
            gap:            50
          }}
        >
          <View style={{ alignItems: "center" }}>
            <TouchableWithoutFeedback
              onPress={() => {
                if(servingUnit == null) {
                  setServing(serving + 1);
                  setCalories(calories + calories);
                } else {
                  setCalories(Math.floor(((Number(serving) + 1) * calories) / Number(serving)));
                  setServing(Number(serving) + 1);
                }
              }}
            >
              <Text style={styles.regularText}>▲</Text>
            </TouchableWithoutFeedback>
            <Text style={styles.regularText}>{serving}{servingUnit && servingUnit}</Text>
            <TouchableWithoutFeedback
              onPress={() => {
                if(serving > 0) {
                  if(servingUnit == null) {
                    setServing(serving - 1);
                    setCalories(calories + calories);
                  } else {
                    setCalories(Math.floor(((serving - 1) * calories) / serving));
                    setServing(serving - 1);
                  }
                }
              }}
            >
              <Text style={styles.regularText}>▼</Text>
            </TouchableWithoutFeedback>
          </View>

          <View>
            <Text style={styles.regularText}>{calories}cal</Text>
          </View>
        </View>

        {/* Unit selection */}
        {
          servingUnit
          &&
          <View
            style={{
              flexDirection:  "row",
              justifyContent: "center",
              gap:            5
            }}
          >
            {
              units.map((unit, index) =>
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setUnits((previousUnits) => {
                      const result = [ ...previousUnits ];

                      for(let i = 0; i < result.length; i++) {
                        if(result[i].unit == unit.unit && !result[i].selected)
                          result[i].selected = true;
                        else if(result[i].unit != unit.unit && result[i].selected)
                          result[i].selected = false;
                      }

                      return result;
                    });

                    const originalServing = Number(selectedFood.serving.match(/\d+/g)[0]);
                    var result;
                    switch(unit.unit) {
                      case "g/ml":
                        result = originalServing;
                        break;
                      case "oz":
                        result = originalServing / 28.34952;
                        break;
                      case "cups":
                        result = originalServing / 250;
                        break;
                      case "lbs":
                        result = originalServing / 453.592;
                        break;
                      case "kgs":
                        result = originalServing / 1000;
                        break;
                      default: break;
                    }

                    if(Number.isInteger(result))
                      setServing(result);
                    else
                      setServing(result.toFixed(2));
                    setServingUnit(unit.unit);
                    setCalories(selectedFood.calories);
                  }}
                >
                  <View
                    style={{
                      width:           65,
                      height:          50,
                      borderColor:     darkMode ? "#EDE6D6" : "#181818",
                      borderWidth:     2,
                      backgroundColor: unit.selected ? (darkMode ? "#EDE6D6" : "#181818") : "transparent",
                      borderRadius:    10,
                      alignItems:      "center",
                      justifyContent:  "center"
                    }}
                  >
                    <Text
                      style={[
                        styles.regularText,
                        {
                          fontSize: 25,
                          color:    unit.selected ? (darkMode ? "#181818" : "#EDE6D6") : (darkMode ? "#EDE6D6" : "#181818")
                        }
                      ]}
                    >{unit.unit}</Text>
                  </View>
                </TouchableOpacity>
              )
            }
          </View>
        }
      </View>

      {/* Ingredients */}
      {
        ingredients
        &&
        <View
          style={{
            gap: 10,
            marginTop: 15,
            marginLeft: 10,
            marginRight: 10
          }}
        >
          <Text style={[ styles.boldText, { textAlign: "center" }]}>Ingredients</Text>
          <View style={{ gap: 5 }}>
            {
              ingredients.map((ingredient, index) =>
                <View key={index} style={{ flexDirection: "row" }}>
                  <Text style={[ styles.regularText, { fontSize: 18 }]}> - </Text>
                  <Text style={[ styles.regularText, { fontSize: 18, paddingRight: 10 }]}>{ingredient}</Text>
                </View>
              )
            }
          </View>
        </View>
      }

      {/* Numerical information */}
      <View style={{ marginTop: 15, marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
        <Text style={[ styles.boldText, { textAlign: "center" }]}>Numerical Data</Text>
        <View
          style={{
            flexDirection:  "row",
            justifyContent: "space-between",
            marginTop:      5
          }}
        >
          <View>
            {
              numericalSectionOne.map((obj, index) =>
                <View
                  key={index}
                  style={{
                    flexDirection:  "row",
                    justifyContent: "space-between",
                    gap:            3
                  }}
                >
                  <Text style={[ styles.regularText, { fontSize: 16 }]}>{obj.name}: </Text>
                  <Text style={[ styles.regularText, { fontSize: 16 }]}>{obj.value}</Text>
                </View>
              )
            }
          </View>

          <View>
            {
              numericalSectionTwo.map((obj,index) =>
                <View
                  key={index}
                  style={{
                    flexDirection:  "row",
                    justifyContent: "space-between",
                    gap:            3
                  }}
                >
                  <Text style={[ styles.regularText, { fontSize: 16 }]}>{obj.name}: </Text>
                  <Text style={[ styles.regularText, { fontSize: 16 }]}>{obj.value}</Text>
                </View>
              )
            }
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default React.memo(FoodInformation);
