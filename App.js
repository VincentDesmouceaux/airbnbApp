import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import RoomScreen from "./containers/RoomScreen";
import AroundMeScreen from "./containers/AroundMeScreen";
import SplashScreen from "./containers/SplashScreen";
import { Image } from "react-native";
import Dimension from "react-native";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  const setId = async (id) => {
    if (id) {
      AsyncStorage.setItem("userId", id);
      setUserId(id);
    }
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserToken(userToken);

      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return null;
  }

  return (
    <NavigationContainer
      style={{
        marginTop: Platform.OS === "android" ? Dimension.statusBarHeight : 0,
      }}
    >
      <Stack.Navigator>
        {userToken === null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen name="SignIn">
              {() => <SignInScreen setToken={setToken} setId={setId} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp">
              {() => <SignUpScreen setToken={setToken} setId={setId} />}
            </Stack.Screen>
          </>
        ) : (
          // User is signed in ! 🎉
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarActiveTintColor: "tomato",
                  tabBarInactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="TabHome"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          headerStyle: { backgroundColor: "white" },
                          headerTitleStyle: { color: "white" },
                          headerTitle: (props) => (
                            <Image
                              style={{ width: 30, height: 30 }}
                              source={require("../airBnbapp/assets/airbnb_logo_icon_170605.png")}
                              // resizeMode="contain"
                            />
                          ),
                          headerTitleStyle: { flex: 1, textAlign: "center" },
                        }}
                      >
                        {() => <HomeScreen />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Room"
                        options={{
                          headerStyle: { backgroundColor: "white" },
                          headerTitleStyle: { color: "white" },
                          headerTitle: (props) => (
                            <Image
                              style={{ width: 30, height: 30 }}
                              source={require("../airBnbapp/assets/airbnb_logo_icon_170605.png")}
                              // resizeMode="contain"
                            />
                          ),
                          headerTitleStyle: { flex: 1, textAlign: "center" },
                        }}
                        component={RoomScreen}
                      >
                        {/* {() => <RoomScreen />} */}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="Profile"
                  options={{
                    title: "My Profile",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"person-circle-outline"}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Profil"
                        options={{
                          headerStyle: { backgroundColor: "white" },
                          headerTitleStyle: { color: "white" },
                          headerTitle: (props) => (
                            <Image
                              style={{ width: 30, height: 30 }}
                              source={require("../airBnbapp/assets/airbnb_logo_icon_170605.png")}
                              // resizeMode="contain"
                            />
                          ),
                          headerTitleStyle: { flex: 1, textAlign: "center" },
                        }}
                      >
                        {(props) => (
                          <ProfileScreen
                            {...props}
                            userToken={userToken}
                            userId={userId}
                            setToken={setToken}
                            setId={setId}
                          />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="AroundMe"
                  options={{
                    tabBarLabel: "Around Me",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name="map" size={24} color="black" />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="AroudMe"
                        options={{
                          headerStyle: { backgroundColor: "white" },
                          headerTitleStyle: { color: "white" },
                          headerTitle: (props) => (
                            <Image
                              style={{ width: 30, height: 30 }}
                              source={require("../airBnbapp/assets/airbnb_logo_icon_170605.png")}
                              // resizeMode="contain"
                            />
                          ),
                          headerTitleStyle: { flex: 1, textAlign: "center" },
                        }}
                      >
                        {() => <AroundMeScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
