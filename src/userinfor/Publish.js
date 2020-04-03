import React, {Component,useEffect} from 'react';
import {View,Button, Text,StatusBar, FlatList, Dimensions ,ScrollView,Image, ToastAndroid ,TouchableWithoutFeedback,TouchableOpacity} from 'react-native';
//import Button from 'react-native-button';
import { MessageBarManager } from 'react-native-message-bar';
import {Actions} from 'react-native-router-flux';

/*import { Pagination, Icon } from '@ant-design/react-native';
const locale = {
  prevText: '上一页',
  nextText: '下一页',
};*/

const {width} = Dimensions.get('window');

export default class Publish extends Component {
    constructor(){
        super();
        this.state ={
            data:[],
            page:1
        }
    };
    componentDidMount(){
        fetch('https://cnodejs.org/api/v1/topics?limit=10&page='+this.state.page)
			.then(res=>res.json())
			.then((res)=>{
                this.setState({data:res.data});
                //console.log(res.data);
            })
    }
    next=()=>{
        fetch('https://cnodejs.org/api/v1/topics?limit=10&page='+this.state.page+1)
        .then(res=>res.json())
        .then(res=>{
            this.setState({data:res.data,page:this.state.page+1})
        })
    }
    first=()=>{
        if(this.state.page<=1){
            this.setState({page:1})
            ToastAndroid.showWithGravity(
                '当前是第一页！',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              )
        }else{
            fetch('https://cnodejs.org/api/v1/topics?limit=10&page='+(this.state.page-1))
            .then(res=>res.json())
            .then(res=>{
                this.setState({data:res.data,page:this.state.page-1})
            })
            
        }
    }
    render() {
        
        return (
            <ScrollView style={{backgroundColor:'#f5f5f5'}}>
                <View style={{flex: 1,}}>
                    <StatusBar backgroundColor="red" />
                    
                    <View style={{width:width,height:48,position:'relative',backgroundColor:'#f23030'}}>
                        <TouchableOpacity style={{width:25,height:25,position:'absolute',top:'25%',left:'5%',}}  onPress={()=>Actions.pop()}>
                            <View  >
                                <Image style={{width:25,height:25}} source={require('../../assets/icon/back.png')}/> 
                            </View> 
                        </TouchableOpacity>  
                        <Text style={{color:'white',fontSize:20,position:'absolute',top:'18%',left:'40%'}}>我的发布</Text>
                        
                    </View>
                    
                    
                    
                    <View style={{backgroundColor:"white",width:width,marginTop:'2%'}}>
                        <FlatList                            
                            data={this.state.data}
                            numColumns={1}
                            renderItem={({item})=>(
                                <View style={{width:width,height:40,marginTop:'3%',alignItems:'center',position:'relative'}}>
                                    
                                    {item.title.length>15?<Text style={{fontSize:17,color:'#333',position:'absolute',left:'5%'}} >{item.title.substr(0,15)+'...'}</Text>:<Text style={{fontSize:16,color:'#333',position:'absolute',left:'5%'}} >{item.title}</Text>}
                                    <Text style={{fontSize:17,position:'absolute',right:'20%'}}>{item.create_at.substr(0,10)}</Text>
                                    {item.reply_count===0?<Text style={{fontSize:17,position:'absolute',right:'5%',color:'red'}}>待回复</Text>:<Text style={{fontSize:16,position:'absolute',right:'5%',color:'#000'}}>已回复</Text>}
                                </View>
                            )}
                            
                        />
                        <View style={{width:width,height:50,position:'relative',marginTop:'5%'}}>
                            <TouchableWithoutFeedback onPress={this.first}>
                                <View style={{height:40,width:'27%',borderRadius:20,backgroundColor:'#f23030',position:'absolute',left:'5%'}}>
                                    <Text style={{textAlign:'center',lineHeight:35,color:'white',fontSize:18}}>上一页</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            {/* <Pagination total={5} current={1} locale={locale} /> */}
                            <Text style={{width:'30%',textAlign:'center',fontSize:18,position:'absolute',top:'10%',left:'35%'}}>第&nbsp;&nbsp;{this.state.page}&nbsp;&nbsp;页</Text>
                            <TouchableWithoutFeedback onPress={this.next}>
                                <View style={{height:40,width:'27%',borderRadius:20,backgroundColor:'#f23030',color:'#fff',position:'absolute',right:'5%'}}>
                                    <Text style={{textAlign:'center',lineHeight:35,color:'white',fontSize:18}}>下一页</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            
                        </View>

                        
                    </View>

                   
                </View>
            </ScrollView>
        )
    }
}
