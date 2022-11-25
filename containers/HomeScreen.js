import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const generateStars = (ratingValue) => {
    const starsArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < ratingValue) {
        starsArray.push(
          <Entypo name="star" size={24} color="#DAA520" key={i} />
        );
      } else {
        starsArray.push(<Entypo name="star" size={24} color="grey" key={i} />);
      }
    }

    return starsArray;
  };

  return isLoading === true ? (
    <ActivityIndicator />
  ) : (
    <SafeAreaView style={styles.safeAreaView}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.container}
            onPress={() => {
              navigation.navigate("Room", {
                id: item._id,
              });
            }}
          >
            <ImageBackground
              source={{ uri: item.photos[0].url }}
              style={styles.picture}
            >
              <Text style={styles.price}>{item.price} €</Text>
            </ImageBackground>

            <Text style={{ fontSize: 18, marginLeft: 12 }}>{item.title}</Text>

            <View style={styles.infos}>
              <Text style={styles.stars}>
                {generateStars(item.ratingValue)}
              </Text>
              <Image
                source={{ uri: item.user.account.photo.url }}
                style={styles.avatar}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  picture: {
    height: 300,
    width: 400,
    margin: 13,
    justifyContent: "flex-end",
  },

  safeAreaView: {
    backgroundColor: "#FFFFFF",
    margin: 0,
  },

  header: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },

  logo: {
    height: 30,
    width: 30,
  },

  price: {
    color: "white",
    backgroundColor: "black",
    fontSize: 20,
    marginRight: 320,
    marginBottom: 20,
    padding: 10,
    textAlign: "center",
    alignItems: "center",
  },

  avatar: {
    height: 80,
    width: 80,
    borderRadius: 100,
    marginRight: 10,
  },

  infos: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  stars: {
    marginLeft: 10,

    paddingTop: 20,
  },
});
