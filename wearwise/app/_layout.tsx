import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import { PaperProvider, BottomNavigation, Text } from "react-native-paper";
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});
import { useState } from "react";
import BottomBar from "../components/navigation/BottomBar";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <PaperProvider>
        <BottomBar />
      </PaperProvider>
    </ConvexProvider>
  );
}
