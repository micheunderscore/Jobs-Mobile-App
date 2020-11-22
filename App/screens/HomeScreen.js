import React from "react";
import { Text, FlatList, TouchableOpacity, View, Image } from "react-native";
import { gql, useQuery } from "@apollo/client";

import Loading from "./Loading";
import styles from "../styles/globalStyles";
import { SearchBar } from "react-native-elements";

const JOBS_QUERRY = gql`
  query Jobs {
    jobs {
      id
      title
      isFeatured
      company {
        name
        logoUrl
      }
    }
  }
`;

const JobItem = ({ job }) => {
  const { title, company, name, logoUrl, isFeatured } = job;
  const companyLogo = company.logoUrl ? { uri: company.logoUrl } : null;

  return (
    <TouchableOpacity style={styles.container}>
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
          <Text style={styles.textBoxText}>{company.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ({ navigation }) => {
  const { data, loading } = useQuery(JOBS_QUERRY);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.bannerImage}
        source={require("../assets/background.jpg")}
      />
      <SearchBar placeholder="Looking for jobs?" lightTheme={true} />
      <FlatList
        style={styles.flatList}
        data={data.jobs}
        renderItem={({ item }) => <JobItem job={item} />}
        keyExtractor={(job) => job.id.toString()}
      />
      <Text JustifyContent="center">End of Results</Text>
    </View>
  );
};
