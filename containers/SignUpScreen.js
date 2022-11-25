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

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassord] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const userToken = "secret-token";

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar style="light" />
      <ScrollView>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../assets/airbnb_logo_icon_170605.png")}
            // resizeMethod="contain"
          />
          <Text style={styles.title}>Sign up</Text>
        </View>
        <View>
          <TextInput
            placeholder="email"
            style={styles.input}
            defaultValue={email}
            onChangeText={(newEmail) => setEmail(newEmail)}
          />

          <TextInput
            placeholder="username"
            style={styles.input}
            defaultValue={username}
            onChangeText={(newUsername) => setUsername(newUsername)}
          />

          <TextInput
            placeholder="Describe yourself in a few words"
            style={styles.inputdescription}
            defaultValue={email}
            onChangeText={(newDescription) => setDescription(newDescription)}
          />

          <TextInput
            placeholder="password"
            style={styles.input}
            defaultValue={password}
            onChangeText={(newPassword) => setPassword(newPassword)}
            secureTextEntry={true}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Your password"
            onChangeText={(text) => setConfirmPassord(text)}
            value={confirmPassword}
            autoCapitalize="none"
            secureTextEntry
          />
          <Text style={{ color: "red", marginTop: 5 }}>{errorMessage}</Text>
          <TouchableOpacity
            style={styles.btn}
            title="Sign up"
            onPress={async (event) => {
              event.preventDefault();

              try {
                setErrorMessage("");

                if (
                  !email ||
                  !username ||
                  !password ||
                  !confirmPassword ||
                  !description
                ) {
                  setErrorMessage("Remplir tous les champs");
                  return;
                }

                if (password !== confirmPassword) {
                  setErrorMessage("Les 2 mdp ne sont pas identiques");
                  return;
                }

                const response = await axios.post(
                  "https://express-airbnb-api.herokuapp.com/user/sign_up",
                  {
                    email: email,
                    username: username,
                    description: description,
                    password: password,
                  }
                );
                console.log(response.data.token);
                alert("Vous êtes bien inscrits !");

                setToken(userToken);
              } catch (error) {
                console.log(error.response.status);

                const message = error.response.data.error;
                console.log(message);

                if (
                  message === "This username already has an account." ||
                  message === "This email already has an account."
                ) {
                  setErrorMessage(message);
                }
              }
            }}
          >
            <Text>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text>Already have an account ? Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#FFFFFF",
  },

  header: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    height: 300,
  },

  logo: {
    height: 20,
    width: 20,
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
  inputdescription: {
    borderColor: "red",
    borderWidth: 1,
    height: 100,
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
    marginLeft: 100,
  },
});
