import React, { Component } from 'react'
import { Text, View ,Image,StyleSheet, AsyncStorage, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';

export default class SwiperPage extends Component {
    start=()=>{
        AsyncStorage.setItem('isInstall','true',()=>{
            this.props.afterInstall();
        });
    }
    render() {
        return (
                <Swiper style={styles.wrapper} showsButtons={false}>
                    <View style={styles.slide1}>
                        <Image style={styles.img}  source={require('../../assets/one.png')} />
                    </View>
                    <View style={styles.slide1}>
                        <Image style={styles.img}  source={require('../../assets/two.png')} />
                    </View>
                    <View style={styles.slide1}>
                        <Image style={styles.img} source={require('../../assets/four.png')} />
                        <TouchableOpacity onPress={this.start} style={styles.start}><Text style={{color:'#fff'}}>开始体验</Text></TouchableOpacity>
                    </View>
                </Swiper>
            
        )
    }
}

const styles = StyleSheet.create({

    slide1:{
        flex:1,
        height:'100%',
        alignItems:'center',
        //justifyContent:'center',
    },
    img:{
        width:'100%',
        height:'100%'
    },
    start:{
        //position:'absolute',
        bottom:100,
        width:100,
        height:40,
        backgroundColor:'#f23030',
        alignItems:'center',
        justifyContent:'center',
        color:'white',
        borderRadius:20
    }
})
