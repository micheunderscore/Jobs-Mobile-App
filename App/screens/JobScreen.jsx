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
import HTMLView from "react-native-htmlview";

function JobScreen({ navigation }) {
  const item = navigation.getParam("item");
  const companyLogo =
    item.company.logoUrl === ""
      ? { uri: item.company.logoUrl }
      : require("../assets/Welcome.png");
  console.log(item.company.logoUrl); //IT WORKS!!!!!!! :DDDDD

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
          resizeMode="cover"
          source={companyLogo}
        />
        <View style={{ alignItems: "center" }}>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={{ fontStyle: "italic" }}>{item.company.name}</Text>
          <ScrollView style={{ height: "340%" }}>
            <HTMLView value={item.description} />
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(item.applyUrl);
                //console.log(item.applyUrl); //This Works
              }}
            >
              <Button
                style={{ padding: 10, width: "100%" }}
                title="A P P L Y"
              />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

export default JobScreen;
