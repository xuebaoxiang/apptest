import React, { Component } from 'react';
import {View, Text, FlatList, Dimensions ,ScrollView, Image,TextInput,StyleSheet,StatusBar,TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { Grid, Icon } from '@ant-design/react-native';
import Button from 'react-native-button';
const {width} = Dimensions.get('window');
export default class Home extends Component {
    constructor(){
        super();
        this.state={
            currentPage:0
        }
    }
    render() {
        return (
            <View style={styles.container}>
            <View style={{backgroundColor:'red',width:width,height:50,justifyContent:'center',alignItems:'center'}}>
            <View style={{flexDirection:'row',width:400,height:40,borderRadius:40,backgroundColor:'#fbb8b8'}}>
            <Image style={{width:25,height:30,marginTop:5,marginLeft:30}} source={require('../../assets/large.png')}/>
            <TextInput placeholderTextColor='white' placeholder="请输入您要搜索的关键字" style={styles.search} />
            <Image style={{width:25,height:30,marginLeft:170,marginTop:5}} source={require('../../assets/shopCar.png')}/>
            </View>
            </View>
            <View  style={{height:260}}>
            <Swiper autoplay={true} paginationStyle={{bottom: 10}}
                            dot={<View style={{           //未选中的圆点样式
                                backgroundColor: 'white',
                                width: 12,
                                height: 12,
                                borderRadius: 6,
                                marginLeft: 10,
                                marginRight: 10,
                                
                            }}/>}
                            activeDot={<View style={{    //选中的圆点样式
                                backgroundColor: '#fd0304',
                                width: 12,
                                height: 12,
                                borderRadius: 6,
                                marginLeft: 10,
                                marginRight: 10,
                            }}/>}

                    >
                        <Image style={{width:width,height:'100%'}} resizeMode='cover' source={require('../../assets/one.png')} />
                        <Image style={{width:width,height:'100%'}} resizeMode='cover' source={require('../../assets/two.png')} />
                        <Image style={{width:width,height:'100%'}} resizeMode='cover' source={require('../../assets/four.png')} />
                    </Swiper>  
            </View>
           
            <FlatList 
            data={[
                {key:'居家维修保养  ',value:require('../../assets/9.png')}, 
                {key: '住宿优惠      ',value:require('../../assets/10.png')}, 
                {key: '出行接送      ',value:require('../../assets/11.png')}, 
                {key: 'E族活动       ',value:require('../../assets/12.png')}
                ]}
                renderItem={({item}) => 
                <View style={styles.box} >
                    <Image source={item.value} style={styles.circle}/>
                    <Text style={{marginLeft:50,fontSize:18}}>{item.key}</Text>
                    <Image source={require('../../assets/13.png')} style={{position:"absolute",right:20}}/>
                </View>}>
            </FlatList>
            <View style={styles.button}>
            <TouchableOpacity style={{ backgroundColor:'red',width:360,
                borderRadius:6,
                height:44,justifyContent:'center',
                alignItems:'center',}}><Text style={{color:"#fff"}}>发布需求</Text></TouchableOpacity>
            </View>
            <Text style={{color:"#767676",fontSize:15,marginTop:30,marginLeft:200}}>©E族之家 版权所有</Text>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    btn:{
        width:width * 0.8,
        height: 40,
        color: '#fff',
        alignItems:'center',
        textAlignVertical:'center',
        borderRadius: 5,
        backgroundColor: '#f23030',
        marginTop:'3%',
        marginLeft:'10%',
        marginBottom:'5%'
    },
    container: {
        flex: 1,
    },
    search:{
        width:200,
        height:35,
        backgroundColor:'#fbb8b8',
        fontSize:16,
        marginTop:3
      },
      box:{
          backgroundColor:'white',
          width:width,
          height:70,
          marginTop:5,
          flexDirection:'row',
          alignItems:"center"
      },
      slide:{
        width: width,
        height: 260,
        justifyContent: 'center',
        alignItems: 'center',
        padding:0
    },
      circle:{
          marginLeft:20
      },
      button:{
          justifyContent:'center',
          alignItems:'center',
          color:"#000",
          flexDirection:'row',
          width:Dimensions.get('window').width,
          height:44
      }
})