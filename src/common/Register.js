import React, {Component} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity,StyleSheet,Button, AsyncStorage, ToastAndroid} from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import { myFetch } from '../utils';


let rootUrl = 'https://www.fastmock.site/mock/0ca7e511621a2878ccbab5f26e4dd1be/App';
export default class Register extends Component {
  constructor(){
    super();
    this.state={
      username:'',
      pwd:'',
      apwd:'',
      isloading:false
    }
  }
  register=()=>{
    if (this.state.username !== '' && this.state.pwd != '' && this.state.apwd != '') {
      if (this.state.pwd !== this.state.apwd) {
          ToastAndroid.show('密码不一致', 100);
      } else {
          this.setState({ isloading: true })
          myFetch.post('/register', {
              username: this.state.username,
              pwd: this.state.pwd
          }).then(res => {
              AsyncStorage.getItem('lusername').then((value)=>{
                if(value == res.data.username){
                  ToastAndroid.show('该账号已被注册', 100);
                }else{
                  AsyncStorage.setItem('lusername', this.state.username);
                  AsyncStorage.setItem('lpwd', this.state.pwd)
                  .then(() => {
                  Actions.login();
            });
                }
              })
          })
      }
    } else {
      ToastAndroid.show('输入不能为空！', 100);
    }
  }
  render() {
    return (
      <View style={{flex: 1,justifyContent: 'center'}}>
        <View
          style={{ alignItems: 'center'}}>
          
          <TextInput placeholder="请输入账号" 
                keyboardType='default'
                style={styles.input} placeholderTextColor="grey" 
                onChangeText={(value)=>{this.setState({username:value + ''})}} />
          <TextInput placeholder="请输入密码" 
                style={styles.input} placeholderTextColor="grey" 
                onChangeText={(value)=>{this.setState({pwd:value + ''})}}
                secureTextEntry={true} />
         
          <TextInput 
          onChangeText={(value)=>{this.setState({apwd:value + ''})}}
          placeholderTextColor="grey" 
          secureTextEntry={true} 
          placeholder="确认密码" style={styles.input}/>
                <TouchableOpacity style={styles.ao} >
                    <Button title="注册" color='red' onPress={this.register}/>
                </TouchableOpacity >
                <TouchableOpacity style={styles.ao}>
                    <Button title="返回登录" color='red' onPress={()=>{Actions.login()}}/>
                </TouchableOpacity >
        </View>
        {this.state.isloading?<View><Text>正在注册</Text></View>:null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor:'white',
      alignItems:'center',
      justifyContent:'center'
      
  },
  input:{
      width:400,
      height:35,
      marginTop:10,
      borderBottomColor:'grey',
      borderBottomWidth:1
  },
  ao:{
      width:200,
      height:30,
      marginTop:20,
      overflow:"hidden",
      borderRadius:15,
      justifyContent:"center",
  },
})