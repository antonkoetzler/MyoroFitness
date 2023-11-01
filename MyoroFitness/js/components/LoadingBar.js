import React from "react";
import { View, Animated } from "react-native";
import { useSelector } from "react-redux";

function LoadingBar({ showLoadingBar }) {
  const darkMode           = useSelector(state => state.darkMode);
  const animation          = React.useRef(new Animated.Value(0)).current;
  const widthInterpolation = animation.interpolate({
    inputRange:  [ 0, 1 ],
    outputRange: [ "0%", "100%" ]
  });

  React.useEffect(() => {
    if(showLoadingBar) startLoadingAnimation();
    else               animation.stopAnimation();
  }, [showLoadingBar]);

  function startLoadingAnimation() {
    Animated.loop(
      Animated.timing(animation, {
        toValue:         1,
        duration:        2500,
        useNativeDriver: false
      })
    ).start();
  }

  return(
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View
        style={{
          width: 250, height: 40,
          borderColor: darkMode ? "#EDE6D6" : "#181818",
          borderWidth: 3
        }}
      >
        <Animated.View
          style={{
            width: widthInterpolation, height: "100%",
            backgroundColor: darkMode ? "#EDE6D6" : "#181818"
          }}
        />
      </View>
    </View>
  );
}

export default React.memo(LoadingBar);
