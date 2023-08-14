import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { addtocart } from "../../features/basketSlice";

const ProductDetailsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { item } = route.params;
  const { width } = useWindowDimensions();

  const addItemToCart= () => {
    dispatch(addtocart(item));
  }

  return (
    <>
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        <FlatList
          data={item.data.images}
          renderItem={({ item }) => (
            <View>
              <Image
                source={{
                  uri: item,
                }}
                style={{ width: width, aspectRatio: 1 }}
              />
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />

        <View style={{ padding: 20 }}>
          <Text style={styles.title}>{item.data.name}</Text>

          <Text style={styles.price}>${item.data.price}</Text>

          <Text style={styles.description}>{item.data.description}</Text>
        </View>
      </ScrollView>
      
      <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={addItemToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 23,
    fontWeight: 500,
  },
  price: {
    paddingVertical: 10,
    fontSize:15
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
  },
  button: {
    position: "absolute",
    bottom: 5,
    height: 50,
    width: "80%",
    backgroundColor: "black",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: 500,
  },
});
