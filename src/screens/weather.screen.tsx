import React, {useState, useEffect} from 'react';
import {

  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import DropdownComponent from '../components/dropdown';
import { getWeather, getWeatherDaily } from '../services/network.services';
import getCommonStyleValue from '../asset/styles/getCommonStyleValue';
import moment from 'moment';
import { colors } from '../asset/styles/colors';
import AwesomeLoading from 'react-native-awesome-loading';
import Dialog from "react-native-dialog";

const WeatherScreen = () => {

  const [city, setCity] = useState("India, IN");
  const [response, setResponse] = useState<any>({});
  const [forecast_response, setForecastResponse] = useState<any>([]);
  const [isLoder, setLoader] = useState(false)
  const [isError, setError] = useState(false)
  const [isDownloaded, setDownloaded] = useState(false)
  const [errorMsg, setErrorMsg] = useState("Somting went wrong");

  const cntry = [
   
    { label: 'India, IN', value: '1' },
    { label: 'London, GB', value: '2' },
    { label: 'England, US', value: '3' },
    { label: 'United Arab Emirates, AE', value: '4' },
    { label: 'Abidjan, CI', value: '5' },
  ];

  const contryClick = (city:string) => {
    setCity(city)
  }

  const flatListDesign = (item:any) => {

    let date=moment(item?.dt_txt).format('DD/MM/YYYY')
    return <View style={{backgroundColor:colors.color_gry,borderRadius:5,marginTop:1,padding:4}}>
      <Text style={[getCommonStyleValue().normalText]}>{date}</Text>
      <View style={{flexDirection:'row'}}>
          <Text style={[getCommonStyleValue().titleText]}>{Math.round(item?.main?.temp)}</Text>
          <Text style={[getCommonStyleValue().smallText]}>o</Text>
          <Text style={[getCommonStyleValue().normalText]}>C</Text>
          </View>
          <View >
          {item?.weather?.map((block:any)=>{
            console.log("block",block);
            
              return <Text style={[getCommonStyleValue().normalText]}>{block?.description}</Text>
            
          })}
          
      </View>
     
    </View>
  

  }
  

  useEffect(() => {
    setLoader(true)
    getWeather(city).then((response) => {
      setLoader(false)
      
      // console.log("responsekkk",JSON.stringify(response?.response?.status));
      if(response?.response?.status===401||response?.response?.status===404){
        setError(true)
        setErrorMsg(response?.message)
      }else{
        setResponse(response.data)
        setDownloaded(true)
      }
    
    }).catch((error) => {
     setErrorMsg(error?.data?.response)
     setLoader(false)
    })

    getWeatherDaily(city).then((response) => {
      setLoader(false)
      if(response?.response?.status===401||response?.response?.status===404){
        setError(true)
        setErrorMsg(response?.message)
      }else{
        
        const blockData: { [key: string]: any } = {};
        let forecastList:any=[];
        response?.data?.list.map((block:any)=>{
          let date=moment(block?.dt_txt).format('DD/MM/YYYY')
          if(!blockData[date]){
            blockData[date]={...block };
            forecastList.push(block)

          } 

        })
        setForecastResponse(forecastList)
        setDownloaded(true)
      }
    
    }).catch((error) => {
      setLoader(false)
      setErrorMsg(error?.data?.response)
     console.log(error);
     
    })
  }, [city]);

  const handleLoginDialogCancel = () => {
   setError(false)
  };

  return (
    <SafeAreaView style={{flex:1}}>
      {isLoder?<AwesomeLoading textStyle={{color:colors.color_black,fontWeight:'bold'}} indicatorId={8} size={50} isActive={true} text="Please wait" />:null}

      <View>
          <Dialog.Container visible={isError}
          contentStyle ={{borderRadius:20}}>
            <Dialog.Title>Oops!!</Dialog.Title>
            <Dialog.Description>
             {errorMsg}
            </Dialog.Description>
            <Dialog.Button color={colors.color_black} bold={true}
            label="Ok" onPress={handleLoginDialogCancel} 
            />
            
          </Dialog.Container>
        </View>
        <DropdownComponent
        dataList={cntry}
        defualtValue='1'
        handleChange={contryClick}
        />
        <View style={[getCommonStyleValue().cardDesign]}>
          {!isDownloaded?
          <View style={{alignItems:'center'}}><Text>No Data Found</Text>
          </View>:
          <View>
            <Text style={[getCommonStyleValue().titleText]}>{response?.name}</Text>
            <View style={{flexDirection:'row'}}>
            <Text style={[getCommonStyleValue().tempText]}>{Math.round(response?.main?.temp)}</Text>
            <Text>o</Text>
            <Text style={[getCommonStyleValue().tempText]}>C</Text>
            </View>
            <View >
            {response?.weather?.map((block:any)=>{
              
                return <Text style={[getCommonStyleValue().mediumText]}>{block?.description}</Text>
              
            })}
            
            </View>
            <View style={{marginTop:15}}>
              <Text style={[getCommonStyleValue().titleText]}>3-day forecast</Text>
            
              <FlatList
              data={forecast_response.slice(1,4)}
              renderItem={({ item }) => flatListDesign(item)}
              keyExtractor={(item) => item.key}
              scrollEnabled={true}
              contentContainerStyle={{ justifyContent: "space-around" }}
              />
            </View>
          </View>
          }
          
          
        </View>
    </SafeAreaView>
  );
};

export default WeatherScreen;