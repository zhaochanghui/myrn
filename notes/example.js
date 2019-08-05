import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import { List } from '@ant-design/react-native';
const Item = List.Item;
const Brief = Item.Brief;
export default class BasicListExample extends React.Component {
  render() {
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: '#f5f5f9' }}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <List renderHeader={'basic'}>
          <Item data-seed="logId">
            标题文字点击无反馈，文字超长则隐藏，文字超长则隐藏
          </Item>
          <Item wrap>
            文字超长折行文字超长折行文字超长折行文字超长折行文字超长折行
          </Item>
          <Item disabled extra="箭头向右" arrow="horizontal" onPress={() => {}}>
            标题文字
          </Item>
          <Item extra="箭头向下" arrow="down" onPress={() => {}}>
            标题文字
          </Item>
          <Item extra="箭头向上" arrow="up" onPress={() => {}}>
            标题文字
          </Item>
          <Item extra="没有箭头" arrow="empty">
            标题文字
          </Item>
          <Item
            extra={
              <View>
                内容内容
                <Brief style={{ textAlign: 'right' }}>辅助文字内容</Brief>
              </View>
            }
            multipleLine
          >
            垂直居中对齐
          </Item>
          <Item extra="内容内容" multipleLine>
            垂直居中对齐<Brief>辅助文字内容</Brief>
          </Item>
          <Item
            wrap
            extra="文字超长折行文字超长折行文字超长折行文字超长折行文字超长折行文字超长折行文字超长折行"
            multipleLine
            align="top"
            arrow="horizontal"
          >
            顶部对齐
            <Brief>辅助文字内容辅助文字内容辅助文字内容辅助文字内容</Brief>
            <Brief>辅助文字内容</Brief>
          </Item>
          <Item
            extra={
              <View>
                内容内容
                <Brief style={{ textAlign: 'right' }}>辅助文字内容</Brief>
              </View>
            }
            multipleLine
            align="bottom"
          >
            底部对齐
          </Item>
        </List>
        <List renderHeader={'带缩略图'}>
          <Item thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png">
            thumb
          </Item>
          <Item
            thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png"
            arrow="horizontal"
          >
            thumb
          </Item>
          <Item
            extra={
              <Image
                source={{
                  uri:
                    'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png',
                }}
                style={{ width: 29, height: 29 }}
              />
            }
            arrow="horizontal"
          >
            extra为Image
          </Item>
        </List>
      </ScrollView>
    );
  }
}










//搜索：

import React from 'react';
import { Alert, View } from 'react-native';
import { SearchBar } from '@ant-design/react-native';
export default class SearchBarDemo extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      value: '美食',
    };
    this.onChange = value => {
      this.setState({ value });
    };
    this.clear = () => {
      this.setState({ value: '' });
    };
  }
  render() {
    return (
      <View style={{ marginTop: 30 }}>
        <SearchBar defaultValue="初始值" placeholder="搜索" />
        <SearchBar
          value={this.state.value}
          placeholder="搜索"
          onSubmit={value => Alert.alert(value)}
          onCancel={this.clear}
          onChange={this.onChange}
          showCancelButton
        />
      </View>
    );
  }
}





//2019-7-30: 备份

import React,{Component} from 'react';
import {View,Text,Button,StyleSheet,Image,FlatList,TouchableOpacity,ScrollView,Dimensions } from 'react-native';
import { ButtonGroup,Badge,Header ,withBadge,Icon,PricingCard,SocialIcon     } from 'react-native-elements';

var {height,width} =  Dimensions.get('window');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex:1,
      data:[],
      load:false,
      refreshing:true,
      currentPage:1
    }
    this.updateIndex = this.updateIndex.bind(this);
    this.fetchData = this.fetchData.bind(this)
    this.refresh = this.refresh.bind(this)
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
            load: true,
              refreshing:false,
          });
        });
  }


  componentDidMount(): void {
    this.fetchData();
  }

    //下拉刷新,更改状态，重新获取数据
    refresh(){
      // alert('下拉')
        this.setState({
          selectedIndex:1,
          data:[],
          load:false,
          refreshing:true,
          currentPage:1
        },()=>{
            this.fetchData();
        });

    }

  render() {
    const buttons = ['BTC', 'ETH', 'EOS']
    // const { selectedIndex } = this.state

    if(!this.state.load){
      return(
          <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:'center',backgroundColor:"#F5FCFF"}}>
            <Text>正在加载数据...</Text>
          </View>
      );
    }


    return (
        <View style={{flex:1}}>
            <View  style={{height:40,width:width,backgroundColor:'#2089dc',flexDirection:'row',justifyContent:"center"}}>
                <Text style={{textAlign:"center"}}>头部首页</Text>
            </View>

              <View style={{flexDirection:'row',justifyContent:'space-between',width:width,height:25}}>
                <Text style={{color:'red',textAlign: 'left',width:width/7}}> 排名</Text>
                <Text style={{color:'red',textAlign: 'left',width:width/4}}> 名称</Text>
                <Text style={{color:'red',textAlign: 'left',width:width/4}}> 最新价</Text>
                <Text style={{color:'red',textAlign: 'left',width:width/4}}> 涨跌幅</Text>
              </View>


          <FlatList
              data={this.state.data}
              // onRefresh = {this._onRefresh.bind(this)} //刷新操作
              refreshing = {this.state.refreshing} //等待加载出现加载的符号是否显示, 是否刷新 ，自带刷新控件
              onRefresh={this.refresh} // 刷新方法,写了此方法，下拉才会出现  刷新控件，使用此方法必须写 refreshing
              renderItem={this.renderData}
              keyExtractor={this._keyExtractor}
              style={{marginTop: 5}}
          />

          </View>

    );
  }


  renderData({item}){

      var str = item.updown
      let textColor = '#0ab45a';
      if(str.indexOf("-") != -1 ){
           textColor = 'red';
      }

    return(
        <View style={{flexDirection:'row',justifyContent:'space-between',width:width,height:40,marginTop:5,backgroundColor:'#eee'}}>
            {/*<View> */}
                <Text style={{textAlign: 'left',width:width/7, textAlignVertical: 'center'}}> {item.rank}  </Text>
        {/*</View>*/}
            {/*<View>   <Image source={{uri:item.avatar_url}}  style={{width:150,height:100}} /></View>*/}
          {/*<View>*/}
              <Text style={{textAlign: 'left',width:width/4, textAlignVertical: 'center'}}> {item.name}</Text>
              <Text style={{textAlign: 'left',width:width/4, textAlignVertical: 'center'}}> {item.price}</Text>
              <Text style={{textAlign: 'left',color: textColor ,width:width/4, textAlignVertical: 'center'}}> {item.updown}</Text>
          {/*</View>*/}
        </View>
    );
  }

  _keyExtractor = (item, index) => item.key.toString();
}


//------------>nativebase
//list avatar

import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
export default class ListAvatarExample extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3882086854,1489818851&fm=15&gp=0.jpg' }} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}



//2019-8-06
import React,{Component} from 'react';
import {View,Text,Button,StyleSheet,Image}  from 'react-native';
import {createStackNavigator,createTabNavigator,createDrawerNavigator}  from 'react-navigation';

class BiDetail extends Component{
    constructor(props){
        super(props);
    }

    static navigationOptions=({navigation})=>({
        title:`${navigation.state.params.title}`+"("+`${navigation.state.params.cnname}`+")",
    });

    render(){
        return(
            <View style={{flex:1,flexDirection: 'row',justifyContent: 'center',alignItems:'center',backgrounColor:'#F5FCFF'}}>
                <Text>detail:{this.props.navigation.state.params.title}--全球指数</Text>
            </View>
        );
    }
}


export default BiDetail;
