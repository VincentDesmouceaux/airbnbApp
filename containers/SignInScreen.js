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

export default function SignInScreen({ setToken, setId }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const userToken = "secret-token";
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar style="light" />
      <ScrollView>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../assets/airbnb_logo_icon_170605.png")}
          />
          <Text style={styles.title}>Sign in</Text>
        </View>
        <View>
          <TextInput
            placeholder="email"
            style={styles.input}
            defaultValue={email}
            onChangeText={(newEmail) => setEmail(newEmail)}
          />

          {errorMessage2 && (
            <Text style={{ color: "red", marginTop: 5 }}>{errorMessage2}</Text>
          )}
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={styles.input}
            defaultValue={password}
            onChangeText={(newPassword) => setPassword(newPassword)}
          />
          {errorMessage && (
            <Text style={{ color: "red", marginTop: 5 }}>{errorMessage}</Text>
          )}
          <Button
            title="Sign in"
            onPress={async (event) => {
              event.preventDefault();

              try {
                setErrorMessage("");
                const response = await axios.post(
                  "https://express-airbnb-api.herokuapp.com/user/log_in",
                  {
                    email,
                    password,
                  }
                );

                alert("Bienvenue!");
                const userToken = response.data.token;
                const userID = response.data.id;
                setToken(userToken);
                setId(userID);
              } catch (error) {
                console.log(error.message);
                console.log(error.response.data);
                if (error.response?.status === 400) {
                  setErrorMessage("Merci de remplir tous les champs !");
                }
                if (error.response?.status === 401) {
                  setErrorMessage2("Mauvais email et/ou mot de passe  ");
                }
              }
            }}
          />
          <TouchableOpacity
            style={styles.btn}
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
    borderBottomColor: "red",
    borderBottomWidth: 1,
    height: 50,
    margin: 30,
  },

  btn: {
    borderColor: "#ffbac0",
    borderWidth: 3,
    height: 50,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    margin: 40,
    borderRadius: 10,
    marginLeft: 115,
  },
});
