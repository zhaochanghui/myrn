import React, { Component } from 'react';
import {View,Text,Button,StyleSheet,Image,TextInput,TouchableOpacity,FlatList,Dimensions}  from 'react-native';

class MusicList extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:[],
            loaded:false,
            input_text:'',
            fetchUrl:'http://www.developer1.cn:8001/yy.php',
        };
        this.fetchData = this.fetchData.bind(this);
        this.onchangeInput = this.onchangeInput.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.getInput = this.getInput.bind(this);
    }

    fetchData()
    {
        let url1 = this.state.fetchUrl+"?kw="+this.state.input_text;
        alert(url1)
        fetch(url1)
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
        this.setState({input_text: text});
    }

    getInput()
    {
        this.setState({data:[]});
        this.fetchData();
    }

    renderItem({item}){
        return(

            <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:5,backgroundColor:"skyblue"}}>
                <Image source={{uri:item.pic}} style={{width:80,height:70}} />
                <View style={[{flexDirection:'row',justifyContent:'space-around',height:40},this.getSize()]}>
                    <View style={{}}>
                        <Text>曲目:{item.title}</Text>
                        <Text>时间:{item.time}</Text>
                    </View>
                    <View style={{}}>
                        <Text>演唱:{item.singer}</Text>
                        <Text>评分:{item.score}</Text>
                    </View>

                </View>
                <Button title='   详情   ' onPress={()=>this.props.navigate('musicDetail',{title:item.title,url1:item.url,key:item.key})}/>
            </View>
        );
    }

    _keyExtractor = (item, index) => item.key.toString();

    componentDidMount(){
        this.fetchData();
    }

    getSize() {
        return {
            width: Dimensions.get('window').width,
           // height: Dimensions.get('window').height
        }
    }

    render(){
        if(!this.state.loaded){
            return(
                <View style={{flex:1,justifyContent: "center",alignItems: 'center'}}>
                    <Text>loading music...</Text>
                </View>
            );
        }


        return(
            <View style={{flex:1}}>
                <View style={{flexDirection:'row',height:40}}>
                    <TextInput  placeholder=''
                                editable={true}
                                onChangeText={this.onchangeInput}
                        style={{flex:1,borderColor:'black',borderWidth: 1}}
                    />
                    <Button title='   搜索   ' onPress={this.getInput} />
                </View>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={this._keyExtractor}
                    style={{marginBottom: 5}}
                />
                {/*<View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:5}}>*/}
                    {/*<Image source={{uri:'http://img.ivsky.com/img/tupian/t/201804/29/titian-001.jpg'}} style={{width:80,height:70}} />*/}
                    {/*<View style={[{flexDirection:'row',justifyContent:'space-around',height:80,backgroundColor: 'red'},this.getSize()]}>*/}
                        {/*<View style={{backgroundColor:'blue'}}>*/}
                            {/*<Text>qumu:xxx</Text>*/}
                            {/*<Text>yanchang:sdsds</Text>*/}
                        {/*</View>*/}
                        {/*<View style={{backgroundColor:'yellow',alignItems:"flex-end"}}>*/}
                            {/*<Text>shijia:xxx</Text>*/}
                            {/*<Text>pingfen:9.0</Text>*/}
                        {/*</View>*/}

                    {/*</View>*/}
                        {/*<Button title='   detail   ' onPress={this.getInput}/>*/}
                {/*</View>*/}

            </View>
        );
    }
}


export default MusicList;