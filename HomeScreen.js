import React, { useEffect, useState, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    Modal,
    ScrollView,
} from "react-native";
import { CartContext } from "./CartContext";

const HomeScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const { addToCart, cartItems } = useContext(CartContext);

    useEffect(() => {
        const localProducts = [
            {
                id: 1,
                title: "Office Wear",
                description: "Reversible angora cardigan",
                price: "120",
                image: require("./assets/dress 1.png"),
            },
            {
                id: 2,
                title: "Black Dress",
                description: "Reversible angora cardigan",
                price: "120",
                image: require("./assets/dress 2.png"),
            },
            {
                id: 3,
                title: "Church Wear",
                description: "Reversible angora cardigan",
                price: "120",
                image: require("./assets/dress 3.png"),
            },
            {
                id: 4,
                title: "Lamerei",
                description: "Reversible angora cardigan",
                price: "120",
                image: require("./assets/dress 4.png"),
            },
            {
                id: 5,
                title: "21WN",
                description: "Reversible angora cardigan",
                price: "120",
                image: require("./assets/dress 5.png"),
            },
            {
                id: 6,
                title: "Lopo",
                description: "Reversible angora cardigan",
                price: "120",
                image: require("./assets/dress 6.png"),
            },
            {
                id: 7,
                title: "21WN",
                description: "Reversible angora cardigan",
                price: "120",
                image: require("./assets/dress 7.png"),
            },
            {
                id: 8,
                title: "Lame",
                description: "Reversible angora cardigan",
                price: "120",
                image: require("./assets/dress 8.png"),
            },
        ];
        setProducts(localProducts);
        setLoading(false);
    }, []);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleImageClick = (product) => {
        setSelectedProduct(product);
        toggleModal();
    };

    const truncateDescription = (description, maxLength) => {
        return description.length > maxLength
            ? `${description.substring(0, maxLength)}...`
            : description;
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
                <ActivityIndicator size="large" color="black" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.head}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Image source={require("./assets/Menu.png")} />
                </TouchableOpacity>
                <Image source={require("./assets/open fashion logo.png")} />
                <View style={styles.upper}>
                    <Image source={require("./assets/Search.png")} style={styles.icon} />
                    <TouchableOpacity onPress={() => navigation.navigate("Cart")} style={styles.cartContainer}>
                        <Image source={require("./assets/shopping bag.png")} style={styles.icon} />
                        {cartItems.length > 0 && (
                            <View style={styles.cartBadge}>
                                <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            {/* OUR STORY */}
            <View style={styles.story}>
                <Text style={styles.header}>OUR STORY</Text>
                <View style={styles.iconBox}>
                    <Image source={require("./assets/list.png")} style={styles.listIcon} />
                    <Image source={require("./assets/Filter.png")} style={styles.filterIcon} />
                </View>
            </View>

            {/* Product List */}
            <FlatList
                data={products}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleImageClick(item)} style={{ flex: 1, alignItems: "center", margin: 10 }}>
                        <Image source={item.image} style={{ width: 150, height: 220, resizeMode: "contain" }} />
                        <Text style={{ fontWeight: "bold", marginTop: 5 }}>{item.title}</Text>
                        <Text style={{ color: "gray" }}>{truncateDescription(item.description, 30)}</Text>
                        <Text style={{ color: "#df7d33", marginVertical: 5 }}>${item.price}</Text>
                        <TouchableOpacity onPress={() => addToCart(item)} style={{ padding: 5 }}>
                            <Text style={{ color: "#df7d33" }}>Add to Basket</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.productContainer}
            />

            {/* Product Modal */}
            <Modal visible={showModal} transparent={true} onRequestClose={toggleModal}>
                <View style={styles.modalContainer}>
                    <ScrollView contentContainerStyle={styles.modalScrollView}>
                        {selectedProduct && (
                            <View>
                                <Image source={selectedProduct.image} style={styles.modalImage} />
                                <Text style={{ fontSize: 20, fontWeight: "bold" }}>{selectedProduct.title}</Text>
                                <Text>{selectedProduct.description}</Text>
                                <Text style={{ color: "#df7d33", fontSize: 18 }}>${selectedProduct.price}</Text>

                                <TouchableOpacity onPress={() => addToCart(selectedProduct)} style={{ marginTop: 15 }}>
                                    <Text style={{ backgroundColor: "#df7d33", color: "white", padding: 10, borderRadius: 5, textAlign: "center" }}>
                                        ADD TO BASKET
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={toggleModal} style={{ marginTop: 10 }}>
                                    <Text style={{ color: "gray", textAlign: "center" }}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    head: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    upper: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
        marginHorizontal: 10,
    },
    cartContainer: {
        position: "relative",
        padding: 5,
    },
    cartBadge: {
        position: "absolute",
        right: 0,
        top: -4,
        backgroundColor: "#df7d33",
        borderRadius: 10,
        width: 18,
        height: 18,
        justifyContent: "center",
        alignItems: "center",
    },
    cartBadgeText: {
        color: "white",
        fontSize: 10,
        fontWeight: "bold",
    },
    story: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,


    },
    header: {
        flexDirection: 'row',

        fontSize: 20,
        fontWeight: "600",
    },
    iconBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 3,
        paddingBottom: 15,

    },
    listIcon: {
        flexDirection: 'row',
        width: 24,
        height: 24,
        marginLeft: 30,

    },
    filterIcon: {
        flexDirection: 'row',
        width: 64,
        height: 64,
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginLeft: 5,
        marginRight: -15,
    },
    productContainer: {
        paddingBottom: 80,
        paddingTop: 10,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        padding: 20,
    },
    modalScrollView: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
    },
    modalImage: {
        width: "100%",
        height: 300,
        resizeMode: "contain",
        marginBottom: 20,
    },
});

export default HomeScreen;
