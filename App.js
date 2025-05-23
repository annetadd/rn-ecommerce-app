import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import CartScreen from "./CartScreen";
import { CartProvider } from "./CartContext";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MainStackNavigator = () => (
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
);

const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerHeader}>
                <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
                    <Image source={require("./assets/Close.png")} style={styles.closeButton} />
                </TouchableOpacity>
            </View>
            <View style={styles.userNameContainer}>
                <Text style={styles.drawerHeaderText}>Eric Atsu</Text>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};

const DrawerNavigator = () => (
    <Drawer.Navigator
        initialRouteName="Clothing"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
        <Drawer.Screen name="Store" component={MainStackNavigator} options={{ headerShown: false }} />
        <Drawer.Screen name="Locations" component={MainStackNavigator} options={{ headerShown: false }} />
        <Drawer.Screen name="Blog" component={MainStackNavigator} options={{ headerShown: false }} />
        <Drawer.Screen name="Jewelery" component={MainStackNavigator} options={{ headerShown: false }} />
        <Drawer.Screen name="Electronics" component={MainStackNavigator} options={{ headerShown: false }} />
        <Drawer.Screen name="Clothing" component={MainStackNavigator} options={{ headerShown: false }} />
    </Drawer.Navigator>
);

const App = () => {
    return (
        <CartProvider>
            <NavigationContainer>
                <DrawerNavigator />
            </NavigationContainer>
        </CartProvider>
    );
};

const styles = StyleSheet.create({
    drawerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    drawerHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 4,
        marginLeft: 10,
    },
    closeButton: {
        width: 20,
        height: 20,
    },
    userNameContainer: {
        borderBottomWidth: 2,
        borderBottomColor: 'red',
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginBottom: 10,
    }
});

export default App;
