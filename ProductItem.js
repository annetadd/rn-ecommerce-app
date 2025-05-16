import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";


const ProductItem = ({ item, handleImageClick, addToCart, truncateDescription }) => {
    return (
        <TouchableOpacity onPress={() => handleImageClick(item)} style={styles.item}>
          <Image source={{ uri: item.image}} style={styles.image} />
          <View style={styles.addButtonContainer}>
            <TouchableOpacity onPress={() => addToCart(item)} style={styles.addButton}>
               <Image source={require('./assets/add_circle.png')} style={styles.addIcon}/>
            </TouchableOpacity>
          </View>
          <View style={styles.itemDetails}>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.description}>{truncateDescription(item.description, 59)}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: "column",
        marginBottom: 16,
        marginHorizontal: 10,
        alignItems: "center",
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        overflow: "hidden",

    },
});

export default ProductItem;