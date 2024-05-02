import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function DermatologyMapScreen() {
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [userLocation, setUserLocation] = useState(null);
  const [dermatologyPlaces, setDermatologyPlaces] = useState([]);

  useEffect(() => {
    requestLocationPermission();
    searchDermatologyPlaces();
  }, []);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to show it on the map.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          Alert.alert('Location permission denied');
        }
      } else {
        getCurrentLocation();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Location permission denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setUserLocation(location.coords);
    } catch (error) {
      console.error('Error getting current location:', error);
    }
  };

  const searchDermatologyPlaces = async () => {
    try {
      const apiKey = 'YOUR_GOOGLE_PLACES_API_KEY';
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=피부과&key=${apiKey}`
      );
      const data = await response.json();
      setDermatologyPlaces(data.results);
    } catch (error) {
      console.error('Error searching dermatology places:', error);
    }
  };

  const getDistance = (coord1, coord2) => {
    const lat1 = coord1.latitude;
    const lon1 = coord1.longitude;
    const lat2 = coord2.latitude;
    const lon2 = coord2.longitude;
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = deg => {
    return deg * (Math.PI / 180);
  };

  const closestDermatology = () => {
    let minDistance = Number.MAX_VALUE;
    let closestPlace = null;
    dermatologyPlaces.forEach(place => {
      const distance = getDistance(userLocation, place.geometry.location);
      if (distance < minDistance) {
        minDistance = distance;
        closestPlace = place;
      }
    });
    return closestPlace;
  };

  const closestPlace = closestDermatology();

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        {userLocation && <Marker coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }} />}
        {closestPlace && (
          <Marker
            coordinate={{
              latitude: closestPlace.geometry.location.lat,
              longitude: closestPlace.geometry.location.lng,
            }}
            title={closestPlace.name}
            description={closestPlace.formatted_address}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
