import React, { Component } from 'react';
import {View,Text,Button,StyleSheet,Image,TextInput,TouchableOpacity,FlatList,Dimensions }  from 'react-native';
import { ButtonGroup ,Header,ListItem } from 'react-native-elements';

//http://www.developer1.cn:8001/bsj/index.php

class First extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            selectedIndex:1,
              loaded:false,
        }
        this.updateIndex = this.updateIndex.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }
    updateIndex(selectedIndex) {
        this.setState({ selectedIndex })
    }

    fetchData(){
        fetch('http://www.developer1.cn:8001/bsj/index.php')
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

    componentDidMount(){
        this.fetchData();
    }

    keyExtractor = (item, index) => index.toString()
    renderItem = ({ item }) => (
      <ListItem
      style={{marginBottom:5}}
        title={item.name}
        subtitle={item.price}
        leftAvatar={{
          source: item.avatar_url && { uri: item.avatar_url },
          title: item.name
        }}
      />
    )

    render() {
      if(!this.state.loaded){
          return(
              <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:'center',backgroundColor:"#F5FCFF"}}>
                  <Text>正在加载数据...</Text>
              </View>
          );
      }

      const list = [
        {
          name: 'Amy Farha',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          price: 'Vice President'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          price: 'Vice Chairman'
        },
        {
          name: '朋友111',
          avatar_url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=585605422,3072805408&fm=11&gp=0.jpg',
          price: 'laojiade'
        }
      ]

      return(
        <FlatList
             keyExtractor={this.keyExtractor}
             data={this.state.data}
             renderItem={this.renderItem}
          />
        );

    }
}


export default First;
