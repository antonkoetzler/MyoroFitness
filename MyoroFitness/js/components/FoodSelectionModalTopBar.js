import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard
} from "react-native";
import { useSelector } from "react-redux";
import BarcodeDark from "../../assets/img/BarcodeDark.png";
import BarcodeLight from "../../assets/img/BarcodeLight.png";
import { searchFoods } from "../Functions.js";
import Store from "../Store.js";

function FoodSelectionModalTopBar({ setFoods, setShowLoadingBar, navigation }) {
  const darkMode                              = useSelector(state => state.darkMode);
  const meal                                  = useSelector(state => state.meal);
  const [ searchbarValue, setSearchbarValue ] = useState("");
  const [ buttons, setButtons ]               = useState([
    { name: "Go",  onPress: () => search() },
    { name: false, onPress: () => {
      Store.dispatch({ type: "SET_SHOW_FOOD_SELECTION_MODAL", payload: false });
      navigation.navigate("BarcodeScanner");
    }},
    { name: " ✓ ", onPress: () => {
      if(Store.getState().meal.foods.length > 0)
        Store.dispatch({ type: "SET_MEAL_FINISHED", payload: true });
      Store.dispatch({ type: "SET_SHOW_FOOD_SELECTION_MODAL", payload: false });
    }},
    { name: " X ", onPress: () => {
      Store.dispatch({ type: "SET_SHOW_FOOD_SELECTION_MODAL", payload: false });
      Store.dispatch({ type: "RESET_MEAL" });
    }}
  ]);

  const styles = StyleSheet.create({
    text: {
      fontFamily: "Ubuntu Regular",
      color:      darkMode ? "#EDE6D6" : "#181818"
    }
  });

  React.useEffect(() => {
    setButtons(previousButtons => {
      const result = [ ...previousButtons ];
      result[0].onPress = () => search();
      return result;
    });
  }, [searchbarValue]);

  async function search() {
    Keyboard.dismiss();
    setShowLoadingBar(true);
    const results = await searchFoods(searchbarValue);
    setShowLoadingBar(false);
    if(results != false)
      setFoods(results);
  }

  function mapButtons() {
    return buttons.map((button, index) => {
      var image = false;
      if(button.name == false) image = true;
      if(button.name == " ✓ " && meal.foods.length == 0) return null;
      return(
        <TouchableWithoutFeedback key={index} onPress={button.onPress}>
          <View
            style={{
              borderLeftColor: darkMode ? "#EDE6D6" : "#181818",
              borderLeftWidth: 2,
              justifyContent:  "center",
              paddingLeft:     5,
              paddingRight:    5
            }}
          >
            {
              image
              ?
              <Image
                source={darkMode ? BarcodeDark : BarcodeLight}
                style={{
                  width:  40,
                  height: 40
                }}
              />
              :
              <Text style={[ styles.text, { fontSize: 24 }]}>{button.name}</Text>
            }
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
        justifyContent:    "space-between"
      }}
    >
      <TextInput
        style={[
          styles.text,
          {
            fontSize:    24,
            marginLeft:  10,
            marginRight: 10,
            flex:        1
          }
        ]}
        value={searchbarValue}
        onChangeText={setSearchbarValue}
        placeholder="Search Foods"
        placeholderTextColor={darkMode ? "rgba(237, 230, 214, 0.7)" : "rgba(24, 24, 24, 0.7)"}
        returnKeyType="go"
        onSubmitEditing={search}
      />

      <View style={{ flexDirection: "row" }}>
        { mapButtons() }
      </View>
    </View>
  );
}

export default React.memo(FoodSelectionModalTopBar);
