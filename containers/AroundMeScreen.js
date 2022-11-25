import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, ActivityIndicator, Image } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import axios from "axios";
import Dimension from "react-native";
//lat :  43.597473
//long :  1.44438

//lat : 43.60971450805664
//long : 1.4308867454528809

export default function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [map, setMap] = useState([]);
  useEffect(() => {
    const getPermission = async () => {
      try {
        // Demander la permission d'accéder aux coordonnées de l'appareil
        const { status } = await Location.requestForegroundPermissionsAsync();
        // console.log(result);
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          console.log(location);
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          setLoading(false);
        } else {
          alert("Permission refusée");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getPermission();

    try {
      const fetchMap = async () => {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms/around"
        );

        setMap(response.data);
      };

      fetchMap();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <View style={styles.container}>
      {isLoading === true ? (
        <ActivityIndicator />
      ) : (
        <>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
          >
            {map.map((marker) => {
              return (
                <Marker
                  key={marker._id}
                  coordinate={{
                    latitude: marker.location[1],
                    longitude: marker.location[0],
                  }}
                  title={marker.title}
                  description={marker.description}
                />
              );
            })}
          </MapView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    height: "100%",
    width: "100%",
  },

  logo: {
    height: 30,
    width: 30,
  },
});
