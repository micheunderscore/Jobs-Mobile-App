import React, { useState } from "react";
import {
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ImageBackground,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import _ from "lodash";

import Loading from "./Loading";
import styles from "../styles/globalStyles";

const JOBS_QUERRY = gql`
  query Jobs {
    jobs {
      id
      title
      description
      applyUrl
      locationNames
      company {
        name
        logoUrl
        websiteUrl
      }
    }
  }
`;

const JobItem = ({ job }) => {
  const { title, company, name, websiteUrl } = job;
  const companyLogo = {
    uri:
      "https://logo.clearbit.com/" +
      company.websiteUrl.replace("https://www.", ""),
  };

  return (
    <View style={styles.jobBox}>
      <Image
        style={styles.tinyLogo}
        resizeMode="contain"
        source={companyLogo}
      />
      <View>
        <Text style={[styles.textBoxText, { fontWeight: "bold" }]}>
          {title}
        </Text>
        <Text style={[styles.textBoxText, { fontStyle: "italic" }]}>
          {company.name}
        </Text>
      </View>
    </View>
  );
};

export default ({ navigation }) => {
  const { data, loading } = useQuery(JOBS_QUERRY);
  const [searchText, setSearchText] = useState("");

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={[styles.bannerImage, { position: "absolute" }]}
        source={require("../assets/background.jpg")}
        resizeMode="cover"
      />
      <View style={{ paddingBottom: 90 }} />
      <View style={styles.searchBox}>
        <Image
          style={styles.searchIcon}
          source={require("../assets/search-icon.png")}
        />
        <TextInput
          onChangeText={(text) => {
            setSearchText(text);
            console.log("Search: " + searchText);
          }}
          style={{ left: 30 }}
          placeholder="Looking for jobs?"
        />
      </View>
      <FlatList
        style={styles.flatList}
        data={data.jobs}
        renderItem={({ item }) => {
          if (
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.company.name.toLowerCase().includes(searchText.toLowerCase())
          ) {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Job", { Info: item.id, item: item });
                }}
              >
                <JobItem job={item} />
              </TouchableOpacity>
            );
          }
        }}
        keyExtractor={(job) => job.id.toString()}
      />
      <Text style={{ alignSelf: "center" }}>End of Results</Text>
    </View>
  );
};
