import { Dimensions, StyleSheet, Platform } from "react-native";
import { colors } from "./colors";



export default function getCommonStyleValue() {
  return StyleSheet.create({

    masterContainer: {
        flex:1,
        flexDirection: "column",
        backgroundColor: colors.color_white,
        height: "100%",
      },
      cardDesign: {
    
        flex:1,
       margin:5,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 16,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 14,

      },
      titleText: {
        color: colors.color_black,
        fontSize:18,
        fontWeight:'bold'
      },
      tempText: {
        color: colors.color_black,
        fontSize:48,
        fontWeight:'bold'
      },
      mediumText: {
        color: colors.color_black,
        fontSize:18,
        fontWeight:'bold'
      },
      normalText: {
        color: colors.color_black,
        fontSize:15,
        fontWeight:'normal'
      },
      smallText: {
        color: colors.color_black,
        fontSize:10,
        fontWeight:'normal'
      },
      singleCardDesign: {
        flex:1,
       margin:2,
        backgroundColor: 'white',
        borderRadius: 5,
        padding:5,
        shadowColor: 'black',
        elevation: 14,

      },
   
  });
}
