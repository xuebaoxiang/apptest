import React, {Component} from 'react';
import {View, Text, Image,Button, TextInput, TouchableOpacity, StyleSheet,AsyncStorage, ToastAndroid, BackHandler} from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import { myFetch } from '../utils';


let rootUrl = 'https://www.fastmock.site/mock/0ca7e511621a2878ccbab5f26e4dd1be/App';
export default class Login extends Component {
  constructor(){
    super();
    this.state={
      username:'',
      pwd:'',
      lusername: '',
      lpwd: '',
      isloading:false
    }
    AsyncStorage.getItem('lusername').then((res) => {
      if (res) {
        this.setState({
          username: res,
          lusername: res
        });
      }
    });
    AsyncStorage.getItem('lpwd').then((res) => {
      if (res) {
        this.setState({
          pwd: res,
          lpwd: res
        });
      }
    });
  }
  login=()=>{
    if (this.state.username !== '' && this.state.pwd !== '') {
      this.setState({
        isloading: true
      });
      myFetch.post('/login',{
        username:this.state.username,
        pwd:this.state.pwd
      }).then(res=>{
       if (res.data.username === this.state.lusername && res.data.pwd === this.state.lpwd) {
        AsyncStorage.setItem('user', JSON.stringify(res.data))
          .then(() => {
            this.setState({
              isloading: false
            });
            Actions.homePage();
          });
        } else {
          this.setState({
            isloading: false
          });
          ToastAndroid.show('用户名或密码错误',100);
        }
      });
    }else{
      ToastAndroid.show('输入为空',100);
    }
  }
  componentDidMount() {
    let now = 0;
    BackHandler.addEventListener('back', () => {
      if (new Date().getTime() - now < 2000) {
        BackHandler.exitApp();
      } else {
        ToastAndroid.show('确定要退出吗', 100);
        now = new Date().getTime();
        return true;
      }
    });
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

              <TouchableOpacity style={styles.ao} >
                    <Button title="注册" color='red' onPress={()=>Actions.register()}/>
                </TouchableOpacity >
                <TouchableOpacity style={styles.ao}>
                    <Button title="登录" color='red' onPress={this.login}/>
                </TouchableOpacity >
          </View>
        {this.state.isloading?<View><Text>正在登陆</Text></View>:null}
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