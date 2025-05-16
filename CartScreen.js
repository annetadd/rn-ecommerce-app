import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { CartContext } from './CartContext';

const CartScreen = () => {
    const { cartItems, removeFromCart } = useContext(CartContext);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>${item.price}</Text>
                <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeBtn}>
                    <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

    return (
        <View style={styles.container}>
            {cartItems.length === 0 ? (
                <Text style={styles.empty}>Your cart is empty.</Text>
            ) : (
                <>
                    <FlatList
                        data={cartItems}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: 80 }}
                    />
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    card: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: 100,
        height: 140,
        resizeMode: 'contain',
    },
    details: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: 'gray',
        marginVertical: 5,
    },
    price: {
        fontSize: 16,
        color: '#df7d33',
        marginBottom: 5,
    },
    removeBtn: {
        alignSelf: 'flex-start',
        backgroundColor: '#eee',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    removeText: {
        color: 'red',
    },
    empty: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
        color: 'gray',
    },
    totalContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 20,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
        color: '#000',
    },
});

export default CartScreen;
