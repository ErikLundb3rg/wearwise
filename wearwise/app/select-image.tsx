import { useState } from "react";
import { Image, View, StyleSheet, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useCameraPermissions } from "expo-camera";
import { Button, Text, TextInput } from "react-native-paper";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ImagePickerExample() {
  const [image, setImage] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const generateUploadUrl = useMutation(api.messages.generateUploadUrl);
  const sendImage = useMutation(api.messages.sendImage);
  const uploadItem = useMutation(api.items.uploadItem);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const [fabric, setFabric] = useState("");
  const [type, setType] = useState("");

  async function storeImage(uri: string) {
    // 1. Get upload url from Convex.
    //    This is the first mutation from the Convex docs for uploading.
    const postUrl = await generateUploadUrl();

    // 2. Get the file from the URI pointing to a local file
    const fileData = await fetch(uri);
    // Basic error handling to ensure the file is valid.
    if (!fileData.ok) {
      console.error("Error loading file.", fileData);
      return;
    }

    // 3. Get the file contents to upload
    const blob = await fileData.blob();

    // 4. Set up error handling for your upload
    try {
      // 5. Actually send the file contents to Convex
      const result = await fetch(postUrl, {
        method: "POST",
        // Note: Use the right mime type.
        //       iOS and Android use mp4 for audio recordings.
        headers: { "Content-Type": "image/png" },
        body: blob,
      });
      // MOAR ERROR HANDLING!
      if (!result.ok) {
        // Note: You may actually want to inform the user of this.
        console.log("Failed to upload.");
        return;
      }

      // 6. Once successfully uploaded get the storageId
      const { storageId } = await result.json();

      // 7. Store custom metadata associated with this recording in Convex
      return storageId;
    } catch (err) {
      // Note: You may actually want to inform the user of this.
      console.error("Failed to upload.", err);
      throw err;
    }
  }

  const uploadImage = async (image: File) => {
    const postUrl = await generateUploadUrl();

    console.log("image", image);
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: image,
    });
    console.log("upload", result);
    const body = await result.json();
    const { storageId } = body;
    const sent = await sendImage({ storageId, author: "author-name" });
    return sent;
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      const picture = result.assets[0];
      setImage(picture.uri);
    }
  };
  requestPermission();

  const takePicture = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      const picture = result.assets[0];
      setImage(picture.uri);
    }
  };

  const submitPicture = async () => {
    if (!image) {
      return;
    }
    const storageId = await storeImage(image);
    await uploadItem({ color, fabric, storageId, title, type });
    console.log("Submitted picture");
  };
  return (
    <ScrollView style={styles.container}>
      <Text variant="displayLarge" style={{ color: "#172727" }}>
        Upload clothing
      </Text>
      <Button
        style={{ marginVertical: 10 }}
        icon="camera"
        mode="contained"
        onPress={takePicture}
      >
        Take a picture
      </Button>
      <Button
        style={{ marginVertical: 10 }}
        icon="select"
        mode="contained"
        onPress={pickImage}
      >
        Choose from library
      </Button>
      <View style={{ flex: 1, alignItems: "center" }}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
      {image && (
        <>
          <TextInput
            style={styles.button}
            label="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.button}
            label="Color"
            value={color}
            onChangeText={setColor}
          />
          <TextInput
            style={styles.button}
            label="Fabric"
            value={fabric}
            onChangeText={setFabric}
          />
          <TextInput
            style={styles.button}
            label="Type"
            value={type}
            onChangeText={setType}
          />
          <Button mode="contained" onPress={submitPicture}>
            Submit
          </Button>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    margin: 10,
  },
  button: {
    margin: 10,
  },
});
