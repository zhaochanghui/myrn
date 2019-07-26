import React, { Component } from 'react';
import {View,Text,Button,StyleSheet,Image,TextInput,TouchableOpacity,FlatList}  from 'react-native';

class MovieList extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:[],
            loaded:false,
            input_text:'',
            fetchUrl:'http://www.developer1.cn:8001/mapi.php',
        };
        this.fetchData = this.fetchData.bind(this);
        this.onchangeInput = this.onchangeInput.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    fetchData()
    {
        fetch(this.state.fetchUrl)
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

    onchangeInput(text){
            alert(text)
    }


    renderItem({item}){
        return(
            <View style={{flexDirection: 'row',marginBottom: 5}}>
                <TouchableOpacity onPress={ ()=> alert('点击了电影：'+item.title) }>
                <Image source={{uri: item.pic}} style={{width:150,height:100}}/>
                </TouchableOpacity>
                <View style={{flex:1,flexDirection:'column',justifyContent:"flex-start",alignItems: 'flex-start',marginLeft: 8,backgroundColor:"yellow"}}>
                    <TouchableOpacity  onPress={() => this.props.navigate('movieDetail',{index:item.key,title:item.title})} >
                     <Text>{item.title}</Text>
                      <Text>{item.label}</Text>
                      <Text>{item.showtime}</Text>
                      <Text>分数：{item.score}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _keyExtractor = (item, index) => item.key.toString();

    componentDidMount(){
        this.fetchData();
    }

    render(){

        if(!this.state.loaded){
            return(
            <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
                <Text style={{fontSize:21,color:'red'}}> 正在加载中....</Text>
            </View>
                );
        }

        return(
            <View style={{flex:1}}>
                <View style={{flexDirection: 'row',justifyContent: 'flex-start',height:40}}>
                <TextInput
                placeholder='电影名...'  editable={true}
                style={{flex:1,height:40,borderColor:'black',borderWidth:1}}
                onChangeText = {this.onchangeInput}
                />
                <Button
                    onPress={() => this.props.navigate('movieDetail', { title: 'Lucy' })}
                    title='   搜索   '
                    style={{width:120}}
                />
                </View>

                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={this._keyExtractor}
                    style={{marginTop: 4}}
                          />

            </View>
        );
    }
}


export default MovieList;