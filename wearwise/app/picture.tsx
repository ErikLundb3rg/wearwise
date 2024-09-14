import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  Camera,
} from "expo-camera";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Picture() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const tasks = useQuery(api.tasks.get);
  const cameraRef = useRef<CameraView>(null); // Ref to access camera functions
  const generateUploadUrl = useMutation(api.messages.generateUploadUrl);
  const sendImage = useMutation(api.messages.sendImage);
  const listImages = useQuery(api.listMessages.list);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }
  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
    const captured = await cameraRef.current?.takePictureAsync();
    if (captured) {
      const { height, uri, width, base64 } = captured;
      const postUrl = await generateUploadUrl();
      console.log("posturl", postUrl);
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: base64,
      });
      console.log("upload", result);
      const body = await result.json();
      const { storageId } = body;
      const sent = await sendImage({ storageId, author: "author-name" });
      console.log(sent);
      console.log("listed images");
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take picture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
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
});
