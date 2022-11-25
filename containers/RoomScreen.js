import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

const arrayOfMarkers = [
  {
    latitude: 43.597473,
    longitude: 1.44438,
    title: "Place de l'europe",
    description: "Description d'une place",
  },
  {
    latitude: 43.60971450805664,
    longitude: 1.4308867454528809,
    title: "Place des Carmes",
    description: "Description d'une place",
  },
];

export default function RoomScreen({ route }) {
  const roomId = route.params.id;
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fullText, setFullText] = useState("");
  const [showText, setShowText] = useState(false);

  const markers = [
    {
      id: 1,
      latitude: 48.8564449,
      longitude: 2.4002913,
      title: "Le Reacteur",
      description: "La formation des champion·ne·s !",
    },
  ];

  useEffect(() => {
    try {
      const fetchRooms = async () => {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${roomId}`
        );
        // console.log(response.data);
        setRoom(response.data);
        setFullText(response.data.description);
        setIsLoading(false);
      };

      fetchRooms();
    } catch (error) {}
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
      <ScrollView>
        <Swiper
          style={styles.wrapper}
          dotColor="grey"
          activeDotColor="red"
          autoplay
        >
          {room.photos.map((slide, index) => {
            return (
              <View style={styles.slide} key={slide.picture_id}>
                <ImageBackground
                  source={{ uri: slide.url }}
                  style={{
                    height: "100%",
                    width: "100%",

                    justifyContent: "flex-end",
                  }}
                >
                  <Text style={styles.price}>{room.price} €</Text>
                </ImageBackground>
              </View>
            );
          })}
        </Swiper>
        <Text style={{ fontSize: 18, marginLeft: 12 }}>{room.title}</Text>
        <View style={styles.infos}>
          <Text style={styles.stars}>{generateStars(room.ratingValue)}</Text>
          <Image
            source={{ uri: room.user.account.photo.url }}
            style={styles.avatar}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setShowText(!showText);
          }}
        >
          {showText ? (
            <Text style={{ margin: 12 }}>{fullText}</Text>
          ) : (
            <Text style={{ margin: 12 }} ellipsizeMode="tail" numberOfLines={3}>
              {room.description}
            </Text>
          )}
        </TouchableOpacity>

        <MapView
          style={{ flex: 1, height: 350, width: "100%" }}
          initialRegion={{
            latitude: 48.856614,
            longitude: 2.3522219,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
          showsUserLocation={true}
        >
          {markers.map((marker) => {
            return (
              <MapView.Marker
                key={marker.id}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.title}
                description={marker.description}
              />
            );
          })}
        </MapView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 300,
  },
  slide: {
    height: 300,
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
  safeAreaView: {
    backgroundColor: "#FFFFFF",
    margin: 0,
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
