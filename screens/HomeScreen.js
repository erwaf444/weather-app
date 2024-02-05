import { StyleSheet ,View, Text, Image, TextInput, TouchableOpacity, ScrollView, ImageBackground, Dimensions } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { MagnifyingGlassIcon, XMarkIcon } from 'react-native-heroicons/outline'
import { CalendarDaysIcon, MapPinIcon } from 'react-native-heroicons/solid'
import { debounce } from "lodash";
import { theme } from '../theme';
import { fetchLocations, fetchWeatherForecast } from '../api/weather';
import * as Progress from 'react-native-progress';
import { StatusBar } from 'expo-status-bar';
import { weatherImages } from '../constants';
import { getData, storeData } from '../utils/asyncStorage';
import Swiper from 'react-native-swiper';
import { Easing } from 'react-native';

export default function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({})


  const handleSearch = search=>{
    // console.log('value: ',search);
    if(search && search.length>2)
      fetchLocations({cityName: search}).then(data=>{
        // console.log('got locations: ',data);
        setLocations(data);
      })
  }

  const handleLocation = loc=>{
    setLoading(true);
    toggleSearch(false);
    setLocations([]);
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7'
    }).then(data=>{
      setLoading(false);
      setWeather(data);
      storeData('city',loc.name);
    })
  }

  useEffect(()=>{
    fetchMyWeatherData();
  },[]);

  const fetchMyWeatherData = async ()=>{
    let myCity = await getData('city');
    let cityName = 'Islamabad';
    if(myCity){
      cityName = myCity;
    }
    fetchWeatherForecast({
      cityName,
      days: '7'
    }).then(data=>{
      // console.log('got data: ',data.forecast.forecastday);
      setWeather(data);
      setLoading(false);
    })
    
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const {location, current} = weather;

  const bgimages = [
    require('../assets/images/bg1.jpg'),
    require('../assets/images/bg2.jpg'),
    require('../assets/images/bg3.jpg'),
  ];

  const w = Dimensions.get("window").width;
  const h = Dimensions.get("window").height;

  const styles = StyleSheet.create({
    img: {
      alignSelf: "center",
      borderTopRightRadius: 80,
      borderBottomLeftRadius: 80,
      height: h *0.5,
      width: w * 0.9,
      marginTop: 50,
    },
    title: {
      marginTop: 60,
      marginHorizontal: 10,
      fontSize: 32,
      marginTop: 380
    },
    text: {
      color: "#767676",
      marginTop: 20,
      fontSize: 16,
      lineHeight: 25,
      marginLeft: 10,
    },
    slide: {
      flex: 1,
      paddingTop: 80,
      marginHorizontal: 30,
      flex: 1,
      borderRadiuc: 30,

    },
  })

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      
      <Swiper
        loop
        autoplay={false}
        // autoplayTimeout={5}
        easing={Easing.easeInOut}
        autoplayDirection
      >
        <View 
          style={styles.slide}
        >
          <Image 
            blurRadius={0} 
            source={require('../assets/images/bg1.jpg')} 
            className="absolute w-full h-full" 
            style={styles.img}
          />
          <Text style={styles.title}>
            "啟動夢想之旅，創意無極限，與株式蛋社一同攜手成長。"
          </Text>
          <Text style={styles.text}>
            "啟動夢想之旅，創意無極限，與株式蛋社一同攜手成長。"
          </Text>
        </View>
        <View style={styles.slide}>
          <Image 
            blurRadius={0} 
            source={require('../assets/images/bg2.jpg')} 
            className="absolute w-full h-full" 
            style={styles.img}
          />
          <Text style={styles.title}>
            "啟動夢想之旅，創意無極限，與株式蛋社一同攜手成長。"
          </Text>
          <Text style={styles.text}>
            "啟動夢想之旅，創意無極限，與株式蛋社一同攜手成長。"
          </Text>
        </View>
        <View style={styles.slide}>
          <Image 
            blurRadius={0} 
            source={require('../assets/images/bg2.jpg')} 
            className="absolute w-full h-full" 
            style={styles.img}
          />
          <Text style={styles.title}>
            "啟動夢想之旅，創意無極限，與株式蛋社一同攜手成長。"
          </Text>
          <Text style={styles.text}>
            "啟動夢想之旅，創意無極限，與株式蛋社一同攜手成長。"
          </Text>
        </View>
        
        {
          loading? (
            <View className="flex-1 flex-row justify-center items-center">
              <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
            </View>
          ):(
            
            <SafeAreaView className="flex flex-1">
              <ImageBackground 
                blurRadius={4} 
                source={require('../assets/images/bg3.jpg')} 
                className="absolute w-full " 
                style={{ flex: 1, resizeMode: 'cover', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
              >
                {/* search section */}
                <View style={{height: '7%'}} className="mx-4 relative z-50">
                  <View 
                    className="flex-row justify-end items-center rounded-full" 
                    style={{backgroundColor: showSearch? theme.bgWhite(0.2): 'transparent'}}>
                    
                      {
                        showSearch? (
                          <TextInput 
                            onChangeText={handleTextDebounce} 
                            placeholder="搜尋城市" 
                            className="pl-6 h-10 pb-1 flex-1 text-base text-black" 
                          />
                        ):null
                      }
                      <TouchableOpacity 
                        onPress={()=> toggleSearch(!showSearch)} 
                        className="rounded-full p-3 m-1" 
                        style={{backgroundColor: theme.bgWhite(0.3)}}>
                        {
                          showSearch? (
                            <XMarkIcon size="25" color="red" />
                          ):(
                            <MagnifyingGlassIcon size="25" color="black" />
                          )
                        }
                        
                    </TouchableOpacity>
                  </View>
                  {
                    locations.length>0 && showSearch?(
                      <View className="absolute w-full bg-gray-300 top-16 rounded-3xl ">
                        {
                          locations.map((loc, index)=>{
                            let showBorder = index+1 != locations.length;
                            let borderClass = showBorder? ' border-b-2 border-b-gray-400':'';
                            return (
                              <TouchableOpacity 
                                key={index}
                                onPress={()=> handleLocation(loc)} 
                                className={"flex-row items-center border-0 p-3 px-4 mb-1 "+borderClass}>
                                  <MapPinIcon size="20" color="gray" />
                                  <Text className="text-black text-lg ml-2">{loc?.name}, {loc?.country}</Text>
                              </TouchableOpacity>
                            )
                          })
                        }
                      </View>
                    ):null
                  }
                  
                </View>
                
                {/* forecast section */}
                <View className="mx-4 flex justify-around flex-1 mb-2">
                  {/* location */}
                  <Text className="text-black/75 text-center text-2xl font-bold">
                    {location?.name}, 
                    <Text className="text-lg font-semibold text-black">{location?.country}</Text>
                  </Text>
                  {/* weather icon */}
                  <View className="flex-row justify-center">
                    <Image 
                      // source={{uri: 'https:'+current?.condition?.icon}} 
                      source={weatherImages[current?.condition?.text || 'other']} 
                      className="w-52 h-52" />
                    
                  </View>
                  {/* degree celcius */}
                  <View className="space-y-2" >
                      <Text style={{ color: 'yellow' }} className="text-center font-bold text-6xl ml-5">
                        {current?.temp_c}&#176;
                      </Text>
                      <Text style={{ color: 'pink' }} className="text-center text-xl tracking-widest">
                        {current?.condition?.text}
                      </Text>
                  </View>

                  {/* other stats */}
                  <View className="flex-row justify-between mx-4">
                    <View className="flex-row space-x-2 items-center">
                      <Image source={require('../assets/icons/wind.png')} className="w-6 h-6" />
                      <Text style={{ color: 'yellow' }} className=" font-semibold text-base">
                        {current?.wind_kph}km
                      </Text>
                    </View>
                    <View className="flex-row space-x-2 items-center">
                      <Image source={require('../assets/icons/drop.png')} className="w-6 h-6" />
                      <Text  style={{ color: 'yellow' }} className=" font-semibold text-base">
                        {current?.humidity}%
                      </Text>
                    </View>
                    <View className="flex-row space-x-2 items-center">
                      <Image source={require('../assets/icons/sun.png')} className="w-6 h-6" />
                      <Text style={{ color: 'yellow' }} className=" font-semibold text-base">
                        { weather?.forecast?.forecastday[0]?.astro?.sunrise }
                      </Text>
                    </View>       
                  </View>
                </View>
                    
                {/* forecast for next days */}
                <View className="mb-2 space-y-3">
                  <View className="flex-row items-center mx-5 space-x-2">
                    <CalendarDaysIcon size="22" color="white" />
                    <Text className="text-white text-base">每日預報</Text>
                  </View>
                  <View className="flex-row justify-between px-5">
                    {
                      weather?.forecast?.forecastday?.map((item,index)=>{
                        const date = new Date(item.date);
                        const options = { month: 'long', day: 'numeric'};
                        let dayName = date.toLocaleDateString('zh-CN', options);
                        dayName = dayName.split(',')[0];

                        return (
                          <View 
                            key={index} 
                            className="flex justify-center items-center w-9 rounded-3xl py-3 space-y-1 mr-4" 
                            style={{backgroundColor: theme.bgWhite(0.15)}}
                          >
                            <Image 
                              source={{uri: 'https:'+item?.day?.condition?.icon}}
                              //source={weatherImages[item?.day?.condition?.text || 'other']}
                              className="w-11 h-11" 
                              onError={(e) => console.log('Image load error', e)}
                              />
                            <Text className="text-white">{dayName}</Text>
                            <Text className="text-white text-sm font-semibold">
                              {item?.day?.avgtemp_c}&#176;
                            </Text>
                          </View>
                        )
                      })
                    }
                  </View>
                </View>
              </ImageBackground>
            </SafeAreaView>
          )
        }
      </Swiper>
    </View>
  )
}