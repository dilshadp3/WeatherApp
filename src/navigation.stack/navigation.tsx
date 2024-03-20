import * as React from "react";

import WeatherScreen from "../screens/weather.screen";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


export type ModuleRouteProps = {
    WeatherScreen: {name:'' };
   
  
};

export type RootRouteProps<RouteName extends keyof ModuleRouteProps> =
  RouteProp<ModuleRouteProps, RouteName>;

export type RootNavigationProps = StackNavigationProp<ModuleRouteProps>;

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="WeatherScreen"
      >
        <Stack.Screen name="WeatherScreen" component={WeatherScreen} />
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigation;
