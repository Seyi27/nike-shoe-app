import { StatusBar } from "expo-status-bar";
import { FlatList, Image } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import products from "../data/products";
import { TouchableOpacity } from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectBasket } from "../../features/basketSlice";
import db from "../../firebase";

const ProductsScreen = ({ navigation }) => {
  const item = useSelector(selectBasket);
  const [groupItemInBasket, setGroupItemInBasket] = useState([]);
  const [shoeData, setShoeData] = useState([])

  useEffect(() => {
    db.collection('products').onSnapshot((snapshot)=>
    setShoeData(
      snapshot.docs.map((doc)=>({
        id: doc.id,
        data: doc.data()
      }))
    ))
  }, [])
  
  return (
    <View style={styles.container}>
      <FlatList
        data={shoeData}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate("Details", { item })}
          >
            <Image
              source={{
                uri: item.data.image,
              }}
              style={styles.image}
            />
          </TouchableOpacity>
        )}
        numColumns={2}
      />
      <StatusBar style="auto" />
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    width: "50%",
    padding: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
