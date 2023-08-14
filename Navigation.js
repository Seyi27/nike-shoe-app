import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductsScreen from "./src/screens/ProductsScreen";
import ProductDetailsScreen from "./src/screens/ProductDetailsScreen";
import ProductCart from "./src/screens/ProductCart";
import { useSelector } from "react-redux";
import { selectBasket } from "./features/basketSlice";
import { AntDesign } from "@expo/vector-icons";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const item = useSelector(selectBasket);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Products"
          component={ProductsScreen}
          options={({navigation})=>({
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => navigation.navigate("Cart")}
              >
                <AntDesign name="shoppingcart" size={24} color="black" />
                <Text style={styles.cartText}>{item.length}</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Details"
          component={ProductDetailsScreen}
          options={{
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="Cart"
          component={ProductCart}
          options={{
            presentation: "modal",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  cartText: {
    position: "absolute",
    left: 25,
    fontWeight: 700,
    fontSize: 15,
  },
});
