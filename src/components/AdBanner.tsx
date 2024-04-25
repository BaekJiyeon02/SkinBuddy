import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet,FlatList,Image, View } from 'react-native';
import { Entypo } from '@expo/vector-icons'
import { colors, width, height, styleG } from '../assets/globalStyles'; //width,height 받아오기
import { SliderBox } from "react-native-image-slider-box";
import { StatusBar } from 'expo-status-bar';
import { useRef } from 'react';
import carouseItem from "../assets/carousel.json";


interface CarouselItems{
    title: string;
    url: string;
    promo:string;

}

export default function adBanner({ title, onPress, color, size }) {


    let flatListRef=useRef<FlatList<CarouselItems> | null>();

    const renderItems: React.FC<{item: CarouselItems}> =({item})=>{
        return <TouchableOpacity onPress={()=>console.log('clicked')}>

        <Image source={{uri:item.url}} style={styles.sliderImage}/>

        {/*
        footer 필요한 경우 사용
         <View style={styles.footer}>
            <Text style={styles.footerText}>{item.title}</Text>
            <Text style={styles.footerText}>{item.promo}</Text>
        </View> */}
        </TouchableOpacity>
    }


        // 

    return (
        <View style={styles.container}>
            <FlatList data={carouseItem}
            renderItem={renderItems}
            keyExtractor={(item,index)=>index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            ref={(ref)=>{

            }}
            
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height:320 * Number(height),


    },
    sliderImage:{
        width: 430 * Number(width),
        height:250 * Number(height),
        resizeMode:'cover',
        marginVertical:50 * Number(height),

    },
    footerText:{
        color:'white',

    },
    footer:{
        flexDirection:'row',
        justifyContent:'space-between',
        height:50 * Number(height),
        paddingHorizontal:40  * Number(width),
        alignItems:'center',
        backgroundColor:'#000',
    }

})
