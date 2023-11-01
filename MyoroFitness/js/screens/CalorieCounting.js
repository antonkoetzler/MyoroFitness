import React from "react";
import { StatusBar, SafeAreaView, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import TopBar from "../components/TopBar.js";
import FooterBar from "../components/FooterBar.js";
import Meal from "../components/Meal.js";
import FoodSelectionModal from "../components/FoodSelectionModal.js";
import FoodInformationModal from "../components/FoodInformationModal.js";

function CalorieCounting({ navigation }) {
  const darkMode  = useSelector(state => state.darkMode);
  const [ meals ] = React.useState([
    { name: "Breakfast" },
    { name: "Lunch" },
    { name: "Dinner" },
    { name: "Snacks" }
  ]);

  function mapMeals() {
    return meals.map((meal, index) => {
      var extraMargin = false;
      if(index == (meals.length - 1)) extraMargin = true;
      return(<Meal key={index} name={meal.name} extraMargin={extraMargin} />);
    });
  }

  return(
    <>
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />

      <FoodSelectionModal navigation={navigation} />
      <FoodInformationModal />

      <SafeAreaView
        style={{
          flex:            1,
          backgroundColor: darkMode ? "#181818" : "#EDE6D6"
        }}
      >
        <TopBar />

        <ScrollView style={{ flex: 1, gap: 20 }}>
          { mapMeals() }
        </ScrollView>

        <FooterBar navigation={navigation} />
      </SafeAreaView>
    </>
  );
}

export default React.memo(CalorieCounting);
