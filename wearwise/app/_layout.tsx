import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <PaperProvider>
        <Stack>
          <Stack.Screen name="index" />
        </Stack>
      </PaperProvider>
    </ConvexProvider>
  );
}
