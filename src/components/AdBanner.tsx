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
        {/* <View style={styles.footer}>
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

    },
    sliderImage:{

        width: 450,
        height:300,
        resizeMode:'cover',
        marginVertical:20,

    },
    footerText:{

    },
    footer:{
        flexDirection:'row',
        justifyContent:'space-between',
        height:50,
        paddingHorizontal:40,
        alignItems:'center',
        backgroundColor:'#000',
    }

})