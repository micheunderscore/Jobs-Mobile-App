import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import JobScreen from "../screens/JobScreen";

const screens = {
  Home: {
    screen: HomeScreen,
  },
  Job: {
    screen: JobScreen,
  },
};

const HomeStack = createStackNavigator(screens, { headerMode: "none" });

export default createAppContainer(HomeStack);
