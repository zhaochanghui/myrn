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
