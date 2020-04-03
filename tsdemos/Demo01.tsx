import React, { Component } from 'react';
import { Text, View  } from 'react-native';
import ListItem from './ListItem';
import Desc from './Desc';

//类型断言：可以确定地指出一个值的类型
//形式：
//<Type>值  在 jsx 中不能用
//值 as类型

/*interface Person{
    name:string;
    age:number;
}
let user1:Person={
    name:'a',
    age:18
}
let user2 ={} as Person;
user2.name="liu";
user2.age=18;
*/

//联合类型 或者 any类型
function getLength(p1:string|number):number{
    return (p1 as string).length
}

//类定义
//es5形式：创建一个Person类，有name 和 age属性，调用的时候传入
/*function Person(name:string,age:number){
    this.name = name;
    this.age = age;
}
let user = new Person('zhang',20);
console.log(user);*/

/*class Person{
    name:string;
    age:number;
    constructor(name:string,age:number){
        this.name = name;
        this.age = age;
    }

    sayName(){}
}

class Worker extends Person{
    //静态属性
    static money:number;
    job:string='程序员';
    //private job:string='程序员';
    constructor(name:string,age:number,job:string){
        super(name,age);
        //this.job = job;
    }
}
Worker.money = 1000;
let user = new Worker('zhang',18,'程序员');
console.log(user);
*/

/*function identity<T>(arg:T):T{
    return arg;
}
console.log(identity<String>('params1'));
*/

/*function getMsg<U>(msg:U):U{
    return msg;
}
console.log(getMsg(100));*/

/*interface GenericTdentityFn<T>{
    (arg:T):T;
}
let myIdentity:GenericTdentityFn<number>=function(arg){
    return 100;
}
console.log(myIdentity(100))
*/

interface Props{
    name:string;
    data:{
        id:string,
        title:string
    }
}

interface State{
    title:string
}


export default class Demo01 extends Component<Props,State> {
    constructor(props:Props){
        super(props);
        this.state={
            title:'typescript'
        }
    }
    componentDidMount(){
        this.setState({title:'100'})
    }
    render() {
        return (
            <View>
                <Text> textInComponent </Text>
                <Text>{this.props.name}</Text>
                {/* <ListItem name={'122'}/> */}
                <Desc />
            </View>
        )
    }
}
