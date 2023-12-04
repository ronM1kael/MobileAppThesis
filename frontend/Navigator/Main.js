import React, { useEffect, useState, useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFonts } from 'expo-font';
import HomeNavigator from "./HomeNavigator";
import Cart from "../Screens/Cart/Cart";
import CartIcon from "../Shared/CartIcon";
import CartNavigator from "./CartNavigator";
import UserNavigator from "./UserNavigator";
import AdminNavigator from "./AdminNavigator";
import Addfile from "../Screens/Admin/ProductForm";
import Admin from "../Screens/Admin/Admin";
import AnnouncementForm from "../Screens/Admin/AnnouncementForm"
import { createStackNavigator } from "@react-navigation/stack"

import Announcement from '../Screens/Product/AnnouncementContainer'

import AuthGlobal from "../Context/Store/AuthGlobal"

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Main = () => {

  const context = useContext(AuthGlobal);

  const [fontsLoaded] = useFonts({
    FontAwesome: require('react-native-vector-icons/Fonts/FontAwesome.ttf'),
  });

  const handleBellPress = () => {
    console.log('Bell icon pressed!');
    // Add your logic for notification handling or other actions
  };

  if (!fontsLoaded) {
    // You can return a loading indicator or null while fonts are loading
    return null;
  }

  const AdminStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Admin" component={Admin} />
      <Stack.Screen name="AnnouncementForm" component={AnnouncementForm}
                   />
      {/* Add more screens if needed */}
    </Stack.Navigator>
  );

  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="folder" size={size} color={color} />
          ),
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
              <Image
                source={require("../assets/tup.jpg")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Image
                source={require("../assets/res.jpg")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.companyName}>REDigitalize</Text>

              <View style={styles.bellContainer}>
                <TouchableOpacity onPress={handleBellPress} style={styles.bellIconContainer}>
                  <Image
                    source={require("../assets/notification_bell.png")}
                    style={styles.bellIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ),
        }}
      />

      {context.stateUser.isAuthenticated ? (<Drawer.Screen
        name="Upload a file"
        component={Addfile}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="save" size={size} color={color} />
          ),
        }}
      />) : null}
      
      

      {context.stateUser.isAuthenticated && context.stateUser.userProfile.role === 'Admin' ? (
      <Drawer.Screen
        name="Admin"
        component={AdminStack}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="cog" size={size} color={color} />
          ),
        }}
      /> ) : null}
      
    </Drawer.Navigator>
  );
};

const TabNavigator = ({ isLoggedIn }) => {

  const context = useContext(AuthGlobal);

  return (
    <Tab.Navigator
      initialRouteName="User"
      tabBarOptions={{
        activeTintColor: "maroon",
        showIcon: true,
        showLabel: false,
      }}
    >

      {context.stateUser.isAuthenticated ? (
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="home" style={{ position: "relative" }} color={color} size={25} />
          ),
        }}
      />
      ) : null}

{context.stateUser.isAuthenticated ? (
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <>
              <Icon
                name="certificate"
                style={{ position: "relative" }}
                color={color}
                size={25}
              />
              <CartIcon />
            </>
          ),
        }}
      />
      ) : null}

    <Tab.Screen
        name="Announcement"
        component={Announcement}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="bullhorn" style={{ position: "relative" }} color={color} size={25} />
          ),
        }}
      />
      
      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="user" style={{ position: "relative" }} color={color} size={25} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'maroon',
    marginLeft: 10,
  },
  bellContainer: {
    position: 'absolute',
    width: 50,
    left: 300,
    borderLeftWidth: 1,
    borderLeftColor: 'maroon',
  },
  bellIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellIcon: {
    width: 25,
    height: 25,
    tintColor: 'maroon',
  },
});

export default Main;
