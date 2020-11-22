import React from "react";
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

import Loading from "./Loading";
import styles from "../styles/globalStyles";
import color from "../styles/colorPalette";
import { stubArray } from "lodash";

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
      }
    }
  }
`;

const JobItem = ({ job }) => {
  const { title, company, name, logoUrl, applyUrl, description } = job;
  const companyLogo = company.logoUrl
    ? { uri: company.logoUrl }
    : require("../assets/Welcome.png");

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
      <Image
        style={styles.centered}
        source={require("../assets/Welcome.png")}
        alignSelf="center"
      />
      <View style={{ paddingBottom: 90 }} />
      <View style={{ height: 25, left: 20 }}>
        <Image
          style={{ top: 2, height: 20, width: 20, position: "absolute" }}
          source={require("../assets/search-icon.png")}
        />
        <TextInput
          style={{ left: 30 }}
          alignSelf="stretch"
          placeholder="Looking for jobs?"
        />
      </View>
      <FlatList
        style={styles.flatList}
        data={data.jobs}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Job", { Info: item.id, item: item });
              console.log(item);
            }}
          >
            <JobItem job={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(job) => job.id.toString()}
      />
      <Text style={{ alignSelf: "center" }}>End of Results</Text>
    </View>
  );
};
