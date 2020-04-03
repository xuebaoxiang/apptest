import React, { Component } from 'react'
import { StyleSheet, View, Text ,Image,FlatList ,Dimensions,TextInput, TouchableOpacity} from 'react-native'


class Goods extends Component {
    constructor(){
        super();
        this.state={
            data:[require('../../assets/one1.png'),require('../../assets/one1.png'),require('../../assets/one1.png'),require('../../assets/one1.png'),require('../../assets/one1.png'),require('../../assets/one1.png')],
            activecolor:'red',
            inactivecolor:'black',
            fselect:[1,0,0,0,0]
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{backgroundColor:'white'}}>
                <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                <TextInput placeholderTextColor='#999999' placeholder="请输入商品名称" style={styles.search}/>
                <Image style={{width:60,height:35}} source={require('../../assets/three.png')}/>
                </View>
                <FlatList
                numColumns={5}
                data = {[{key:'one',value:'综合',ef:require('../../assets/one1.png')},
                {key:'two',value:'销量',ef:require('../../assets/one2.png')},
                {key:'three',value:'新品',ef:require('../../assets/one3.png')},
                {key:'four',value:'价格',ef:require('../../assets/one4.png')},
                {key:'five',value:'信用',ef:require('../../assets/one5.png')}]}
                renderItem={({item,index})=><TouchableOpacity onPress={()=>{var select = this.state.fselect.map((item)=>0);select[index] = 1;this.setState({data:[item.ef,item.ef,item.ef,item.ef,item.ef,item.ef],fselect:select})}}><View style={styles.fbox}><Text style={{color:this.state.fselect[index]?this.state.activecolor:this.state.inactivecolor}}>{item.value}</Text></View></TouchableOpacity>}
                />
                </View>
                <View style={{alignItems:'space-around',justifyContent:'center'}}> 
                <FlatList 
                numColumns={2}
                style={{width:480}} 
                data={this.state.data} 
                renderItem={({item})=><Image style={{width:200,height:200,marginTop:10,marginRight:20}} source={item}/>}
                />
          </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    fbox:{
        width:Dimensions.get('window').width / 5,
        height:50,
        flexDirection:'row',
        justifyContent:"center",
        alignItems:'center'
    },
    search:{
            width:340,
            height:35,
            backgroundColor:'#eeeeee',
    }
})

export default Goods