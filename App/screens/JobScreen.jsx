import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  Linking,
  Button,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import styles from "../styles/globalStyles";

function JobScreen({ navigation }) {
  const item = navigation.getParam("item");
  var companyLogo = item.company.logoUrl;
  if (companyLogo === null || companyLogo === "") {
    companyLogo = require("../assets/Welcome.png");
  } else {
    companyLogo = { uri: item.company.logoUrl };
  }

  return (
    <View>
      <ImageBackground
        style={styles.bannerImage}
        resizeMode="cover"
        source={require("../assets/background.jpg")}
      />
      <View
        style={[
          styles.genericContainer,
          {
            flex: 2,
            padding: 10,
            flexDirection: "row",
            alignContent: "stretch",
            justifyContent: "center",
            flexWrap: "wrap",
          },
        ]}
      >
        <Image
          style={[styles.tinyLogo, { width: "100%" }]}
          resizeMode="contain"
          source={companyLogo}
        />
        <View style={{ alignItems: "center" }}>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={{ fontStyle: "italic" }}>{item.company.name}</Text>
          <ScrollView style={{ height: "340%" }}>
            <Text>{item.description}</Text>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(item.applyUrl);
                //console.log(item.applyUrl); //This Works
              }}
            >
              <Button style={{ width: "100%" }} title="A P P L Y" />
            </TouchableOpacity>
            <View style={{ padding: 10 }} />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

export default JobScreen;
