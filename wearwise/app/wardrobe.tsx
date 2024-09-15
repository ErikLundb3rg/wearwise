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
import { Text, TextInput, Avatar, Button, Card } from "react-native-paper";
import { Link } from "expo-router";
import { useFonts } from "expo-font";
import { ScrollView } from "react-native-gesture-handler";

export default function Wardrobe() {
  const listImages = useQuery(api.listMessages.list);
  const items = useQuery(api.items.getItems);
  // const [loaded] = useFonts({
  //   Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
  //   InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  // });

  console.log(listImages);

  return (
    <View style={styles.container}>
      <ScrollView style={{ padding: 10 }}>
        <Text variant="displayMedium" style={{ color: "#172727" }}>
          Wardrobe
        </Text>
        {items &&
          items.map((item) => (
            <Card style={{ margin: 4 }}>
              <Image
                width={100}
                height={100}
                source={{ uri: item.url }}
                style={styles.image}
              />
              <Card.Content>
                <Text variant="titleLarge">{item.title}</Text>
                <Text variant="bodyMedium">{item.color}</Text>
                <Text variant="bodyMedium">{item.fabric}</Text>
                <Text variant="bodyMedium">{item.type}</Text>
              </Card.Content>
            </Card>
            // <Card>
            //   <Card.Title title="Card Title" subtitle="Card Subtitle" />
            //   <Card.Content>
            //     <Text variant="titleLarge">Card title</Text>
            //     <Text variant="bodyMedium">Card content</Text>
            //   </Card.Content>
            //   <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
            // </Card>
          ))}
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
