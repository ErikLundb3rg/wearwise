import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  Camera,
} from "expo-camera";
import { useRef, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Button, Text, TextInput } from "react-native-paper";
import { Link } from "expo-router";
import { useFonts } from "expo-font";
import { ScrollView } from "react-native-gesture-handler";

const outfit = ["Cap", "Rain boots", "Rain jacket Hooke"];

export default function Index() {
  const items = useQuery(api.items.getItems);
  const [pictureLoading, setPictureLoading] = useState(false);
  const [itemsLoaded, setItemsLoaded] = useState(false);

  // const [loaded] = useFonts({
  //   Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
  //   InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  // });

  // console.log(listImages);
  const generateOutfit = async () => {
    setPictureLoading(true);
    // sleep for 1 second to show the loading spinner
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setPictureLoading(false);
    setItemsLoaded(true);
  };

  // console.log("items", items);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text variant="displayLarge" style={{ color: "#172727" }}>
          WearWise
        </Text>
        {!itemsLoaded && !pictureLoading && (
          <Button
            style={{ marginVertical: 10 }}
            mode="contained"
            onPress={generateOutfit}
          >
            Generate my daily outfit
          </Button>
        )}
        {pictureLoading && (
          <ActivityIndicator style={{ margin: 20 }} size="large" />
        )}
        {items &&
          itemsLoaded &&
          items
            .filter(({ title }) => outfit.includes(title))
            .map((item) => (
              <Image
                width={100}
                source={{ uri: item.url }}
                style={styles.image}
              />
            ))}
        {/* <Button mode="contained"> */}
        {/* <Link href="/wardrobe">My wardrobe</Link>
        <Link href="/select-image">Upload your clothes</Link> */}
        {/* </Button> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    borderWidth: 3,
    borderRadius: 100,
    borderBlockColor: "black",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  image: {
    width: 200,
    height: 200,
    margin: 10,
  },
});
