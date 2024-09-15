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
import { Button, Text, TextInput } from "react-native-paper";
import { Link } from "expo-router";
import { useFonts } from "expo-font";
import { ScrollView } from "react-native-gesture-handler";

export default function Index() {
  const listImages = useQuery(api.listMessages.list);
  const items = useQuery(api.items.getItems);
  // const [loaded] = useFonts({
  //   Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
  //   InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  // });

  console.log(listImages);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text variant="displayLarge" style={{ color: "#172727" }}>
          WearWise
        </Text>
        {/* {listImages &&
          listImages.map((image) => (
            <Image
              width={300}
              height={300}
              source={{ uri: image.url }}
              style={styles.image}
            />
          ))} */}
        {/* {items &&
          items.map((item) => (
            <Image
              width={300}
              height={300}
              source={{ uri: item.url }}
              style={styles.image}
            />
          ))} */}
        {/* <Button mode="contained"> */}
        <Link href="/wardrobe">My wardrobe</Link>
        <Link href="/select-image">Upload your clothes</Link>
        {/* </Button> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
