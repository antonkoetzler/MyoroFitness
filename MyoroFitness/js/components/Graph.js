import React, { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { BarChart } from "react-native-chart-kit";
import { getLogData } from "../Database.js";

function Graph() {
  const darkMode                                          = useSelector(state => state.darkMode);
  const [ buttons, setButtons ]                           = useState([
    { name: "Weight",   selected: true },
    { name: "Calories", selected: false },
    { name: "Exercise", selected: false }
  ]);
  const [ data, setData ]                                 = useState({ labels: [], datasets: [ { data: [] } ] });
  const [ logData, setLogData ]                           = useState(null);
  const [ displayDatasetValues, setDisplayDatasetValues ] = useState(true);

  React.useEffect(() => {
    getLogData().then(data => {
      setLogData(data);
      setData({
        labels:   data.labels,
        datasets: [ { data: data.weightData.slice(-7) } ]
      });
    });
  }, []);

  function changeChartMode(index) {
    setButtons(previous => {
      const result = [ ...previous ];
      for(let i = 0; i < result.length; i++) {
        if(i == index) result[i].selected = true;
        else           result[i].selected = false;
      } return result;
    });

    setData(() => {
      const result = {
        labels:   logData.labels,
        datasets: null
      };

      switch(index) {
        case 0:
          result.datasets = [ { data: logData.weightData.slice(-7) } ];
          setDisplayDatasetValues(true);
          break;
        case 1:
          result.datasets = [ { data: logData.calorieData.slice(-7) } ];
          setDisplayDatasetValues(true);
          break;
        case 2:
          result.datasets = [ { data: logData.exerciseData.slice(-7) } ];
          setDisplayDatasetValues(false);
          break;
        default: break;
      }

      // datasets: [ { data: logData.newMode } ]
      return result;
    });
  }

  const renderBarContent = (value, index) => (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'black', fontSize: 12 }}>{value}</Text>
    </View>
  );

  return(
    <View
      style={{
        alignItems: "center",
        marginTop:  10,
        gap:        10
      }}
    >
      <BarChart
        data={data}
        width={Dimensions.get("window").width - 20} height={200}
        style={{ transform: "translateX(-20px)" }}
        chartConfig={{
          color:                  (opacity = 0) => darkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
          backgroundGradientFrom: darkMode ? "#181818" : "#EDE6D6",
          backgroundGradientTo:   darkMode ? "#181818" : "#EDE6D6",
          fontFamily:             "Ubuntu Regular",
          decimalPlaces:          0,
          propsForBackgroundLines: {
            strokeWidth: 0, // Set an empty string to remove the dotted lines
          }
        }}
        renderBarContent={renderBarContent}
        withHorizontalLabels={displayDatasetValues}
      />

      <View style={{ flexDirection: "row", gap: 10 }}>
        {
          buttons.map((button, index) =>
            <TouchableOpacity key={index} onPress={() => changeChartMode(index)}>
              <View
                style={{
                  width:           90,
                  borderColor:     darkMode ? "#EDE6D6" : "#181818",
                  borderWidth:     2,
                  borderRadius:    10,
                  padding:         5,
                  alignItems:      "center",
                  backgroundColor: button.selected ? (darkMode ? "#EDE6D6" : "#181818") : "transparent"
                }}
              >
                <Text
                  style={{
                    fontFamily: "Ubuntu Regular",
                    fontSize:   20,
                    color:      button.selected ? (darkMode ? "#181818" : "#EDE6D6") : (darkMode ? "#EDE6D6" : "#181818")
                  }}
                >{button.name}</Text>
              </View>
            </TouchableOpacity>
          )
        }
      </View>
    </View>
  );
}

export default React.memo(Graph);
