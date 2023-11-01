import React from "react";
import { StatusBar, SafeAreaView, View } from "react-native";
import { useSelector } from "react-redux";
import TopBar from "../components/TopBar.js";
import FooterBar from "../components/FooterBar.js";
import Graph from "../components/Graph.js";
import LogBox from "../components/LogBox.js";

function Tracking({ navigation }) {
  const darkMode = useSelector(state => state.darkMode);

  return(
    <>
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />

      <SafeAreaView
        style={{
          flex:            1,
          backgroundColor: darkMode ? "#181818" : "#EDE6D6"
        }}
      >
        <TopBar />

        <View style={{ flex: 1, justifyContent: "center" }}>
          <LogBox />
          <Graph />
        </View>

        <FooterBar navigation={navigation} />
      </SafeAreaView>
    </>
  );
}

export default React.memo(Tracking);
