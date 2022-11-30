import { useRoute } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
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
import { useNavigation } from "@react-navigation/core";
import { useState, useEffect, useId } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

export default function ProfileScreen({ setToken }) {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [description, setDescription] = useState("");
  ("");
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/:id`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar style="light" />
      <ScrollView>
        <View style={styles.image}>
          <Image />
          <SimpleLineIcons name="picture" size={24} color="black" />
          <AntDesign name="camera" size={24} color="black" />
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
        </View>

        <View>
          <TouchableOpacity style={styles.btn}>
            <Text>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            title="Log Out"
            onPress={() => {
              setToken(null);
            }}
          >
            <Text>Log Out</Text>
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
