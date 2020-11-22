import React from "react";
import { Button, View } from "react-native";

import styles from "../styles/globalStyles";

function JobScreen({ job }) {
  return (
    <View style={styles.genericContainer}>
      <Button
        title={"Go Back"}
        style={{
          top: 80,
        }}
      />
    </View>
  );
}

export default JobScreen;
