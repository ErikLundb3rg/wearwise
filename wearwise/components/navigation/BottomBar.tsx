import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import Landing from "../../app/index";
import SelectImage from "../../app/select-image";
import Wardrobe from "../../app/wardrobe";

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "landing",
      title: "Home",
      focusedIcon: "home-circle",
      unfocusedIcon: "home-circle-outline",
    },
    {
      key: "selectImage",
      title: "Upload",
      focusedIcon: "upload",
      unfocusedIcon: "upload-outline",
    },
    {
      key: "wardrobe",
      title: "Wardrobe",
      focusedIcon: "wardrobe",
      unfocusedIcon: "wardrobe-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    landing: Landing,
    selectImage: SelectImage,
    wardrobe: Wardrobe,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default MyComponent;
