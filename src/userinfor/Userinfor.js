import React, { Component } from 'react';
import {View, Text, FlatList, Dimensions,TouchableOpacity  ,ScrollView, Image,TextInput,StyleSheet,StatusBar,AsyncStorage, } from 'react-native';
import Button from 'react-native-button';
import Swiper from 'react-native-swiper';
import { Grid, Icon } from '@ant-design/react-native';
import ImagePicker from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import {Actions} from 'react-native-router-flux';

const {width} = Dimensions.get('window');

const options = {
    title: '请选择',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '从相册选择图片',
    customButtons: [{ name: 'fb', title: '从 Facebook 选择图片' }],
    cancelButtonTitle: '取消',
    storageOptions: {
      skipBackup: true,
      path: 'assets',
    },
};
const styles = StyleSheet.create({
    boxs:{
        marginTop:8,
        justifyContent:'center',
        alignItems:'center'
    },
})






export default class Userinfor extends Component {
    constructor(){
        super();
        this.state = {
            imageUrl:'',
            t:'0'
        }
    }
    
    componentDidMount(){
        AsyncStorage.getItem('photo').then((res)=>{
            if(res){
                this.setState({imageUrl:{uri:res}})
            }
            else{
                this.setState({imageUrl:''})
            }
        });
        AsyncStorage.getItem('t').then((res)=>{
            if(res === '1'){
                this.setState({t:res})
            }else{
                this.setState({t:'0'})
            }
        })
    }
    
    takephoto = ()=>{
        ImagePicker.showImagePicker(options, (response) => {
            
            if (response.didCancel) {
              return;
            } else if (response.error) {
              console.log('Error:', response.error);
            } else if (response.customButton) {
              console.log('custom:', response.customButton);
            } else {
                //const source = { uri: response.uri };
                this.setState({
                    imageUrl: { uri: response.uri },
                    t:'1'
                });
                
                AsyncStorage.setItem('photo',this.state.imageUrl.uri);
                AsyncStorage.setItem('t','1');
                
            }
          });
    }
    out=()=>{
        AsyncStorage.removeItem('user')
            .then(() => {
                Actions.login();
            });
    }
    render() {
        return (
            <ScrollView style={{backgroundColor:'#f5f5f5'}}>
                <View style={{flex: 1,}}>
                    <StatusBar backgroundColor="red" />
                   
                    <View  style={{width:width,height:250,backgroundColor:'#f23030',position:'relative'}}>
                        
                        
                        <View style={{width:100,height:100,position:'absolute',top:'20%',left:'40%'}}>
                            <TouchableOpacity   onPress={()=>{this.takephoto()}}>
                                {this.state.t==='1'?<Image  style={{width:100,height:100,borderRadius:50}} source={this.state.imageUrl}  />:<Image  style={{width:100,height:100,borderRadius:50}} source={require('../../assets/tx.jpg')}  />}
                            </TouchableOpacity>
                        </View>
                        
                        <Text  style={{color:"white",fontSize:22,position:'absolute',top:'65%',left:'35%'}}>BINNU DHILLON</Text>
                    </View>

                    <View style={{backgroundColor:"#fff",width:Dimensions.get('window').width,marginTop:5,alignItems:'center',flexDirection:'row'}}>
                <Image source={require('../../assets/label.png')} style={{width:30,height:30}}/>
                <Text style={{fontSize:20}} >我的个人中心</Text>
                </View>
                <View style={{justifyContent:'center',
                backgroundColor:"#fff",
                width:Dimensions.get('window').width,height:280,
                marginTop:1
                }}>
                    <FlatList  numColumns ={3} 
                        data={[{key:'账户管理',value:require('../../assets/account.png')}, 
  		                        {key: '收货地址',value:require('../../assets/address.png')}, 
  		                        {key: '我的信息',value:require('../../assets/manager.png')}, 
                                {key: '我的订单',value:require('../../assets/dingdan.png')},
                                {key: '我的二维码',value:require('../../assets/ma.png')}, 
                                {key: '我的积分',value:require('../../assets/goal.png')},
                                {key: '我的收藏',value:require('../../assets/collect.png')}]}
                        renderItem={({item}) => 
                    <View  style={{flex:3,marginTop:20}}>
                         <View style={styles.boxs}>
                         <Image source={item.value} style={{width:30,height:30}}/>
                         <Text style={{marginTop:10}}>{item.key}</Text>
                        </View>
                    </View>}/>
                </View>
                <View style={{backgroundColor:"#fff",width:Dimensions.get('window').width,marginTop:5,alignItems:'center',flexDirection:'row'}}>
                <Image source={require('../../assets/label.png')} style={{width:30,height:30}}/>
                <Text style={{fontSize:20}} >E族活动</Text>
                </View>
                <View style={{justifyContent:'center',
                backgroundColor:"#fff",
                height:200,width:Dimensions.get('window').width,
                marginTop:1,
                }}>
                     <FlatList  numColumns ={3} 
                        data={[{key:'居家维修保养',value:require('../../assets/protect.png')}, 
  		                        {key: '出行接送',value:require('../../assets/car.png')}, 
  		                        {key: '我的受赠人',value:require('../../assets/person.png')}, 
                                {key: '我的住宿优惠',value:require('../../assets/bed.png')},
                                {key: '我的活动',value:require('../../assets/flag.png')}, 
                                {key: '我的发布',value:require('../../assets/public.png')},
                                 ]}
                        renderItem={({item}) => 
                 <View  style={{justifyContent:'center',flexDirection:'row',flex:3,marginTop:20}}>
                         <TouchableOpacity onPress={()=>{
                            if(item.key == '我的发布'){Actions.publish()}
                         }}>
                         <View style={styles.boxs}>
                         <Image source={item.value} style={{width:30,height:30}}/>
                         <Text style={{marginTop:10}}>{item.key}</Text>
                        </View>
                         </TouchableOpacity>
                        
                    </View>}/>
                </View>
                  
                
                    <TouchableOpacity 
                        style={{
                            width: '40%',
                            height: 40,
                            borderRadius:20,
                            backgroundColor: 'red',
                            marginTop: 10,
                            marginLeft:'30%',
                            marginBottom:10,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={this.out}>
                        <Text style={{color:'white'}}>退出登录</Text>
                    </TouchableOpacity>

                    <Text style={{marginLeft:'40%',marginBottom:5,color:'#767676',alignItems:'center',justifyContent:'center'}}>BINNU DHILLON | 退出</Text>
                </View>
            </ScrollView>
        )
    }
}
