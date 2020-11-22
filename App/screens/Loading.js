import React from "react";
import { View, ActivityIndicator } from "react-native";

import color from "../styles/colorPalette";
import styles from "../styles/globalStyles";

export default () => (
  <View style={styles.centered}>
    <ActivityIndicator size="large" color={color.purple} />
  </View>
);
