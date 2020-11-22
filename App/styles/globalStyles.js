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
    top: 50,
  },
  jobBox: {
    borderWidth: 1.5,
    borderColor: color.purple,
    flex: 1,
    flexDirection: "row",
    height: 82,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  textBoxText: {
    flex: 1,
    fontFamily: "Roboto",
    fontSize: 12,
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
    justifyContent: "flex-start",
  },
});
