import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addtocart,
  removefromcart,
  selectBasket,
  selectBasketTotal,
} from "../../features/basketSlice";
import { AntDesign } from "@expo/vector-icons";

const ProductCart = () => {
  const item = useSelector(selectBasket);
  const total = useSelector(selectBasketTotal)
  const [groupItemInBasket, setGroupItemInBasket] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const groupedItems = item.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupItemInBasket(groupedItems);
  }, [item]);

  return (
    <>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        style={{ flex: 1 }}
      >
        {Object.entries(groupItemInBasket).map(([key, items]) => (
          <View key={key} style={styles.cartContainer}>
            <Image
              source={{
                uri: items[0]?.data.image,
              }}
              style={styles.cartImage}
            />

            <View style={styles.nameContainer}>
              <Text style={styles.nameContainerText}>{items[0]?.data.name}</Text>

              {/* <Text>{items[0]?.data.sizes[0]}</Text> */}

              <View style={styles.numberContainer}>
                <TouchableOpacity>
                  <AntDesign
                    name="minuscircleo"
                    size={20}
                    color="black"
                    style={{ paddingRight: 10 }}
                    onPress={() => {
                      dispatch(removefromcart({ id: key }));
                    }}
                  />
                </TouchableOpacity>

                <Text style={{ fontSize: 17 }}>{items.length}</Text>

                <TouchableOpacity>
                  <AntDesign
                    name="pluscircleo"
                    size={20}
                    color="black"
                    style={{ paddingLeft: 10 }}
                    onPress={() => {
                      dispatch(addtocart(items[0]));
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.priceContainerText}>${items[0]?.data.price}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={{ backgroundColor: "white", paddingVertical: 10 }}>
        <View style={styles.fee}>
          <Text style={styles.feeText}>Delivery</Text>
          <Text style={styles.feeText}>$5</Text>
        </View>
        <View style={styles.fee}>
          <Text style={styles.feeText}>Sub-total</Text>
          <Text style={styles.feeText}>{total}</Text>
        </View>
        <View style={styles.fee}>
          <Text style={styles.feeTextTotal}>Total</Text>
          <Text style={styles.feeTextTotal}>${total + 5}</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ProductCart;

const styles = StyleSheet.create({
  cartContainer: {
    height: 120,
    width: "100%",
    marginVertical: 5,
    backgroundColor: "white",
    resizeMode: "contain",
    flexDirection: "row",
  },
  cartImage: {
    width: 120,
    height: "100%",
    marginRight: 10,
  },
  nameContainer: {
    flexDirection: "column",
  },
  numberContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  nameContainerText: {
    fontSize: 17,
    fontWeight: 700,
    flex: 1,
  },
  priceContainer: {
    position: "absolute",
    bottom: 10,
    right: 5,
    marginRight: 10,
  },
  priceContainerText: {
    fontSize: 15,
  },
  button: {
    backgroundColor: "black",
    height: 50,
    width: "50%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: 500,
  },
  fee: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  feeText: {
    color: "gray",
    fontSize: 15,
  },
  feeTextTotal: {
    color: "black",
    fontSize: 15,
    fontWeight: 700,
  },
});
