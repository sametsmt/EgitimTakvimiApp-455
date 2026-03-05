import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ListScreen from "../screens/ListScreen";

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#0a111f" },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="List" component={ListScreen} />
    </Stack.Navigator>
  );
}
