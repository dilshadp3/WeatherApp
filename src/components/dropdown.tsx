import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-searchable-dropdown-kj';
import { colors } from '../asset/styles/colors';

export type Props = {
    dataList:any;
    defualtValue:string;
    handleChange: (text: string) => void;
  };

const DropdownComponent : React.FC<Props> = ({
    handleChange,
    dataList,
    defualtValue,
  }) => {
  const [value, setValue] = useState(defualtValue);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    setValue(defualtValue)
  },[defualtValue]);
  return (

    <View style={styles.container}>
      
      <View style={styles.sectionStyle}>
      <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        containerStyle={{backgroundColor:colors.color_white}}
        data={dataList}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item:any) => {
            handleChange(item.label)
          setValue(item.value);
          setIsFocus(false);
        }}
       
      />
        
      </View>
    
    </View>

  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {

    margin: 10,
   
  },
  dropdown: {
    height: 50,
    width:'100%',
    padding:10,
    color:colors.color_black


   
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: colors.color_black,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color:colors.color_black,
    
  },
  selectedTextStyle: {
    fontSize: 16,
    color:colors.color_black,
  },
  iconStyle: {
    width: 30,
    height: 30,
    tintColor:colors.color_black
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    tintColor:colors.color_black,
    color:colors.color_black
  },
  sectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.color_white,
    borderBottomWidth: 1,
    borderRadius: 10,
    borderColor: colors.color_white,
    height: 55,
   
  },
});