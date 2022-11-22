import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Platform,
  ScrollView,
  Image,
} from "react-native";

import { useState } from "react";

import axios from "axios";

import Constants from "expo-constants";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userToken = "secret-token";
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar style="light" />
      <ScrollView>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../assets/airbnb_logo_icon_170605.png")}
            resizeMethod="contain"
          />
          <Text style={styles.title}>Sign in</Text>
        </View>
        <View>
          <TextInput
            placeholder="email"
            style={styles.input}
            defaultValue={email}
            onChangeEmail={(newEmail) => setEmail(newEmail)}
          />

          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={styles.input}
            defaultValue={password}
            onChangePassword={(newPassword) => setPassword(newPassword)}
          />
          <Button
            title="Sign in"
            onPress={async (event) => {
              event.preventDefault();

              alert(email);

              try {
                const response = await axios.post(
                  "https://express-airbnb-api.herokuapp.com/user/log_in",
                  {
                    email,
                    password,
                  }
                );
                console.log(response.data);

                setToken(userToken);
              } catch (error) {
                console.log(error.message);
                console.log(error.response.data);
              }
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text>Create an account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#FFFFFF",
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    flex: 1,
  },

  header: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    height: 300,
  },

  logo: {
    height: 100,
    width: 100,
  },

  title: {
    fontSize: 25,
    marginTop: 10,
    color: "grey",
  },

  input: {
    // backgroundColor: "blue",
    height: 50,
    margin: 30,
  },
});
