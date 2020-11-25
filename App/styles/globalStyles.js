import { StyleSheet } from "react-native";

import color from "./colorPalette";

export default styles = StyleSheet.create({
  bannerImage: {
    width: "100%",
    height: "25%",
  },
  centered: {
    flex: 1,
    top: 65,
    justifyContent: "center",
    alignItems: "center",
  },
  flatList: {
    padding: 10,
  },
  genericContainer: {
    flex: 1,
    backgroundColor: color.white,
    alignItems: "stretch",
  },
  jobBox: {
    borderWidth: 1.5,
    borderColor: color.purple,
    flex: 1,
    flexDirection: "row",
    height: 82,
    opacity: 0.89,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: color.white,
  },
  searchBox: {
    height: 25,
    width: "90%",
    left: 20,
    bottom: 10,
    borderRadius: 10,
    backgroundColor: color.white,
  },
  searchIcon: {
    top: 2,
    height: 20,
    width: 20,
    position: "absolute",
    opacity: 0.25,
  },
  textBoxText: {
    flex: 1,
    opacity: 1,
    fontFamily: "Roboto",
    fontSize: 13,
    textShadowRadius: 2,
    padding: 2,
  },
  textInput: {
    borderWidth: 2,
    borderColor: color.black,
  },
  tinyLogo: {
    height: "100%",
    width: "25%",
    left: -7,
    justifyContent: "flex-start",
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
});
