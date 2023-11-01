import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useSelector } from "react-redux";
import { searchFoods } from "../Functions.js";
import Store from "../Store.js";

function BarcodeScanner({ navigation }) {
  const darkMode                                    = useSelector(state => state.darkMode);
  const [ cameraPermissions, setCameraPermissions ] = useState(false);
  const [ text, setText ]                           = useState("Scan A Barcode");
  const [ scanned, setScanned ]                     = useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setCameraPermissions(true);
      } catch(error) {
        console.log(error);
        navigation.goBack();
      }
    })();
  }, []);

  async function getBarcodeData({ type, data }) {
    setScanned(true);
    const result = await searchFoods(data);
    if(result == false) {
      setText("Barcode Not Found");
    } else {
      navigation.navigate("CalorieCounting");
      await Store.dispatch({ type: "SET_SHOW_FOOD_INFORMATION_MODAL", payload: true });
      await Store.dispatch({ type: "SET_SELECTED_FOOD", payload: result[0] });
    }
    setTimeout(() => {
      setScanned(false);
      if(result == false) setText("Try Again");
    }, 2000);
  }

  return(
    <View
      style={{
        width:  "100%",
        height: "100%"
      }}
    >
      {
        cameraPermissions
        &&
        <BarCodeScanner
          style={{
            flex:           1,
            alignItems:     "center",
            justifyContent: "center"
          }}
          onBarCodeScanned={!scanned && getBarcodeData}
        >
          <View
            style={{
              backgroundColor: darkMode ? "#181818" : "#EDE6D6",
              padding:         10,
              borderRadius:    10,
              borderColor:     darkMode ? "#EDE6D6" : "#181818",
              borderWidth:     2,
              position:        "absolute",
              top:             50
            }}
          >
            <Text
              style={{
                fontFamily: "Ubuntu Regular",
                fontSize:   30,
                color:      darkMode ? "#EDE6D6" : "#181818"
              }}
            >{text}</Text>
          </View>

          <View
            style={{
              width:       Dimensions.get("window").width / 1.5,
              height:      Dimensions.get("window").width / 2,
              borderColor: darkMode ? "#181818" : "#EDE6D6",
              borderWidth: 4,
              borderStyle: "dotted"
            }}
          ></View>
        </BarCodeScanner>
      }
    </View>
  );
}

export default React.memo(BarcodeScanner);
