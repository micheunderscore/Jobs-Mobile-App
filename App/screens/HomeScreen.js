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
import { _ } from "lodash";

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
  const [searchText, setSearchText] = useState("");
  const [jobs, setJobs] = useState(jobs);
  const { data, loading } = useQuery(JOBS_QUERRY);

  var filteredJobs = _.map(jobs, () => {
    if (_.isIncluded([jobs.title], searchText)) return jobs;
  });

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
            setJobs(filteredJobs);
            console.log(text);
          }}
          style={{ left: 30 }}
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
