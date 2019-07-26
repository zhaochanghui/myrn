import React,{ Component } from 'react';
import {View,Text,Button,StyleSheet,Image,FlatList,TouchableOpacity,TextInput} from 'react-native';
import {createBottomTabNavigator,createStackNavigator,createDrawerNavigator} from 'react-navigation';


class BookList extends  Component {
    constructor(props){
        super(props);
        this.state={
          data:[],
          loaded:false,
        };
        this.fetchData= this.fetchData.bind(this);
        this.renderData = this.renderData.bind(this);
        this.fetchBySearch = this.fetchBySearch.bind(this);

    }

    fetchData(){
        fetch('http://www.developer1.cn:8001/api.php')
            .then((response) => response.json())
            .then((responseData) => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                console.log(responseData);
                this.setState({
                    data: this.state.data.concat(responseData),
                    loaded: true,
                });
            });
    }


    fetchBySearch(){
        alert('s搜索')
    }

    componentDidMount(){
        this.fetchData();
    }

    render(){

        if(!this.state.loaded){
            return(
                <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:'center',backgroundColor:"#F5FCFF"}}>
                    <Text>正在加载数据...</Text>
                </View>
            );
        }

        return(

            <View style={{flex:1,justifyContent:'flex-start'}}>
                {/*搜索部分*/}
                <View style={{flexDirection:'row',height:42}}>
                    <View style={{flex:8,height:40}}>
                    <TextInput
                        style={{height:38,backgroundColor: '#fff'}}
                        placeholder='book name...'
                    />
                    </View>
                    <View style={{flex:2,padding:0,height:42}}>
                     <Button title='搜索' onPress={this.fetchBySearch} style={{width:150,eight:42}}/>
                    </View>
                </View>
                {/*搜索部分*/}


                <FlatList
                    data={this.state.data}
                    renderItem={this.renderData}
                    keyExtractor={this._keyExtractor}
                    style={{marginTop: 5}}
                />

            {/*<View style={{flexDirection: 'row',height:100}}>*/}
                {/*<View style={{width:150,height:100,backgroundColor:'red'}}>*/}
                    {/*<Image source={{uri:'http://d.lanrentuku.com/down/png/1807/10shuguopng.jpg'}}  style={{width:150,height:100}} />*/}
                {/*</View>*/}
                {/*<View style={{flex:1,height:100,justifyContent:'center',backgroundColor:'skyblue'}}>*/}
                    {/*<Text style={{textAlign: 'center'}}>标题：java从入门到精通</Text>*/}
                    {/*<Text style={{textAlign:'center'}}>出版社：人民大学出版社  作者：高洛峰</Text>*/}
                    {/*<Text style={{textAlign:'center'}}>价格：350，页数：00页</Text>*/}
                {/*</View>*/}
            {/*</View>*/}

                {/*<View style={{height:100,flexDirection: 'row',paddingTop:10}}>*/}
                    {/*<View style={{width:150,height:100,backgroundColor:'red'}}>*/}
                        {/*<Image source={{uri:'http://d.lanrentuku.com/down/png/1807/10shuguopng.jpg'}}  style={{width:150,height:100}} />*/}
                    {/*</View>*/}
                    {/*<View style={{flex:1,height:100,justifyContent:'center',backgroundColor:'skyblue'}}>*/}
                        {/*<Text style={{textAlign: 'center'}}>标题：java从入门到精通</Text>*/}
                        {/*<Text style={{textAlign:'center'}}>出版社：人民大学出版社  作者：高洛峰</Text>*/}
                        {/*<Text style={{textAlign:'center'}}>价格：350，页数：00页</Text>*/}
                    {/*</View>*/}
                {/*</View>*/}


            </View>
        );
    }

    renderData({item}){
        return(
        <View style={{flexDirection: 'row',height:100,marginBottom: 5}}>
            <View style={{width:150,height:100,backgroundColor:'red'}}>
                <TouchableOpacity  onPress={() => {alert('点击了图书，标题:'+item.title)}} >
                <Image source={{uri:item.img}}  style={{width:150,height:100}} />
                </TouchableOpacity>
            </View>
            <View style={{flex:1,height:100,justifyContent:'center',backgroundColor:'skyblue'}}>
                <TouchableOpacity  onPress={() => this.props.navigate('bookDetail',{index:item.key,title:item.title})} >
                <Text style={{textAlign: 'center'}}>标题：{item.title}</Text>
                <Text style={{textAlign:'center'}}  numberOfLines={10}>{item.info}</Text>
                <Text style={{textAlign:'center'}}>{item.pj}</Text>
                </TouchableOpacity>
            </View>

        </View>
        );
    }

    _keyExtractor = (item, index) => item.key.toString();
}



const styles = StyleSheet.create({
    box1:{
        width:50,height:50
    }
    }

);

export default BookList;