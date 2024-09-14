import { Text, View } from "react-native";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function Index() {
  const tasks = useQuery(api.tasks.get);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {tasks?.map(({ _id, text }) => <Text key={_id}>{text}</Text>)}
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
