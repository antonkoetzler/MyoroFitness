import React, { useState } from "react";
import { Modal, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import Store from "../Store.js";
import FoodInformationModalTopBar from "./FoodInformationModalTopBar.js";
import FoodInformation from "./FoodInformation.js";

function FoodInformationModal() {
  const darkMode                        = useSelector(state => state.darkMode);
  const showFoodInformationModal        = useSelector(state => state.showFoodInformationModal);
  // States that needs to be inherited for FoodInformation
  const [ calories, setCalories ]       = useState("");
  const [ serving, setServing ]         = useState("");
  const [ servingUnit, setServingUnit ] = useState(null);

  return(
    <Modal
      animationType="slide"
      transparent={false}
      visible={showFoodInformationModal}
      onRequestClose={() => Store.dispatch({ type: "SET_SHOW_FOOD_INFORMATION_MODAL", payload: false })}
    >
      <SafeAreaView
        style={{
          flex:            1,
          backgroundColor: darkMode ? "#181818" : "#EDE6D6"
        }}
      >
        <FoodInformationModalTopBar
          calories={calories} serving={serving} servingUnit={servingUnit}
        />

        <FoodInformation
          calories={calories} setCalories={setCalories}
          serving={serving} setServing={setServing}
          servingUnit={servingUnit} setServingUnit={setServingUnit}
        />
      </SafeAreaView>
    </Modal>
  );
}

export default React.memo(FoodInformationModal);
