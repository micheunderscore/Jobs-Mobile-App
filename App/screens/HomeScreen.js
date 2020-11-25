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
      }
    }
  }
`;

const JobItem = ({ job }) => {
  const { title, company, name, logoUrl } = job;
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
  // const [searchText, setSearchText] = useState("");         // Unfinished search bar method
  // let lodedData;
  // if (!loading) {
  //   lodedData = data;
  // }

  if (loading) {
    return <Loading />;
  }

  // const [jobs, setJobs] = useState(lodedData);               // Unfinished search bar method

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
            // if (!loading) {                                  // Unfinished search bar method
            //   var filteredJobs = _.map(data.jobs, (j) => {
            //     if (_.includes([j.title], searchText)) return j;
            //   });
            //   setJobs(filteredJobs);
            // }
            // setSearchText(text);
            console.log(text);
          }}
          style={{ left: 30 }}
          placeholder="Looking for jobs?"
        />
      </View>
      <FlatList
        style={styles.flatList}
        data={data.jobs} // Set to Jobs.Jobs if ever return to trying search bar.
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
