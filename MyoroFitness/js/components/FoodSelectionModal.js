import React, { useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { useSelector } from "react-redux";
import Store from "../Store.js";
import FoodSelectionModalTopBar from "./FoodSelectionModalTopBar.js";
import LoadingBar from "./LoadingBar.js";

function FoodSelectionModal({ navigation }) {
  const darkMode                              = useSelector(state => state.darkMode);
  const showFoodSelectionModal                = useSelector(state => state.showFoodSelectionModal);
  const showFoodInformationModal              = useSelector(state => state.showFoodInformationModal);
  const [ showLoadingBar, setShowLoadingBar ] = useState(false);
  const [ foods, setFoods ]                   = useState([]);

  const styles = StyleSheet.create({
    text: {
      fontFamily: "Ubuntu Regular",
      color:      darkMode ? "#EDE6D6" : "#181818"
    }
  });

  function setShowFoodInformationModal(food) {
    Store.dispatch({ type: "SET_SELECTED_FOOD", payload: food });
    Store.dispatch({ type: "SET_SHOW_FOOD_SELECTION_MODAL", payload: false });
    Store.dispatch({ type: "SET_SHOW_FOOD_INFORMATION_MODAL", payload: true });
  }

  function mapFoods() {
    return foods.map((food, index) => {
      var extraMargin = false;
      if(index == (foods.length - 1)) extraMargin = true;
      return(
        <TouchableOpacity key={index} onPress={() => setShowFoodInformationModal(food)}>
          <View
            style={{
              flexDirection:  "row",
              justifyContent: "space-between",
              alignItems:     "center",
              marginLeft:     10,
              marginRight:    10,
              marginTop:      15,
              marginBottom:   extraMargin ? 15 : 0
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                numberOfLines={1}
                style={[ styles.text, { fontSize: 24 }]}
              >{food.name}</Text>
              {
                food.brand
                &&
                <Text
                  numberOfLines={1}
                  style={[ styles.text, { fontSize: 18 }]}
                >{food.brand}</Text>
              }
              {
                food.serving
                &&
                <Text
                  numberOfLines={1}
                  style={[ styles.text, { fontSize: 18 }]}
                >{food.serving}</Text>
              }
            </View>

            {
              food.calories
              &&
              <Text style={[ styles.text, { fontSize: 24, width: 90, textAlign: "right" }]}>{food.calories}cal</Text>
            }
          </View>
        </TouchableOpacity>
      )
    });
  }

  return(
    <Modal
      animationType="slide"
      transparent={false}
      visible={showFoodSelectionModal}
      onRequestClose={() => Store.dispatch({ type: "SET_SHOW_FOOD_SELECTION_MODAL", payload: false })}
    >
      <SafeAreaView
        style={{
          flex:            1,
          backgroundColor: darkMode ? "#181818" : "#EDE6D6"
        }}
      >
        <FoodSelectionModalTopBar
          setFoods={setFoods}
          setShowLoadingBar={setShowLoadingBar}
          navigation={navigation}
        />

        {
          showLoadingBar
          ?
          <LoadingBar showLoadingBar={showLoadingBar} />
          :
          <ScrollView style={{ flex: 1 }}>
            { mapFoods() }
          </ScrollView>
        }
      </SafeAreaView>
    </Modal>
  );
}

export default React.memo(FoodSelectionModal);
