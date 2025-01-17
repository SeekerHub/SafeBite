// AlertBox.js

import React, { useRef } from "react";
import {
  Animated,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import your preferred icon library
import { router } from "expo-router";
const AlertBox = ({ message, onClose, type }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleClose = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onClose());
    // router.push("/home");
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.alert}>
        <Icon
          name={type == "good" ? "thumbs-up" : "exclamation-circle"}
          size={24}
          color={type == "good" ? "#4CAF50" : "#F44336"}
          style={styles.icon}
        />

        {/* <Icon name="exclamation-circle" size={24} color="#F44336" style={styles.icon} /> */}
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Icon name="times-circle" size={24} color="#F44336" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alert: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  message: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },
  closeButton: {
    padding: 5,
  },
});

export default AlertBox;
