import React, {Component} from 'react';
import {Dimensions, FlatList, StyleSheet, View,RefreshControl,TouchableOpacity} from "react-native";
import {
    Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right,
    Body, Icon, Text, Badge, Col, Row, Grid, List, ListItem
} from 'native-base';

//也可以在这里先取出屏幕的宽高
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').Height;


class Rank extends Component{
    render(){
        let param = this.props.param;
        if(param==1){
            return(
                <Badge  style={{width: windowWidth * 0.11,height:40,marginTop: 10}}>
                    <Text style={{height:40,textAlign: 'center', textAlignVertical: 'center'}}>{param}</Text>
                </Badge>
            );
        }

        if(param==2){
            return(
                <Badge primary style={{width: windowWidth * 0.11,height:40,marginTop: 10}}>
                    <Text style={{height:40,textAlign: 'center', textAlignVertical: 'center'}}>{param}</Text>
                </Badge>
            );
        }

        if(param==3){
            return(
                <Badge success style={{width: windowWidth * 0.11,height:40,marginTop: 10}}>
                    <Text style={{height:40,textAlign: 'center', textAlignVertical: 'center'}}>{param}</Text>
                </Badge>
            );
        }

        return(
            <Badge style={{backgroundColor: 'black',width: windowWidth * 0.11,height:40,marginTop: 10}}>
                <Text style={{color: 'white',height:40,textAlign: 'center', textAlignVertical: 'center'}}>{param}</Text>
            </Badge>
        );

    }
}

class UpDown extends Component{
  render(){
    let param = this.props.paramkey;
    let paramval = this.props.paramval

    if(param==1){
    return(
      <Button bordered success style={{width: windowWidth * 0.24,height:40,marginTop: 10,fontSize:12}}>
          <Text>+{paramval}</Text>
              </Button>
    );

  }else{
    return(
      <Button bordered danger style={{width: windowWidth * 0.24,height:40,marginTop: 10,fontSize:12}}>
          <Text>{paramval}</Text>
              </Button>
    );
  }
  }
}

export default class AnatomyExample extends Component {
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


    _keyExtractor = (item, index) => item.key.toString();

    render() {
        let requestData = this.state.data;
        if (!this.state.load) {
            return (
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: 'center',
                    backgroundColor: "#F5FCFF"
                }}>
                    <Text>正在加载数据...</Text>
                </View>
            );
        }


        const elements=[];
           requestData.forEach((item)=>{
             let str = item.updown
             let textColor = 1;
             if (str.indexOf("-") != -1) {
                 textColor = 2;
             }

             elements.push(
               <ListItem style={{marginLeft:windowWidth * 0.04,paddingTop:0,paddingBottom:1}}>
                  <TouchableOpacity  onPress={() => this.props.navigate('biDetail',{index:item.rank,title:item.name})} >
                   <Grid>
                       <Col style={{width: windowWidth * 0.11, height: 60}}>
                           <Rank param={item.rank} />
                       </Col>
                       <Col style={{width: windowWidth * 0.19, height: 60}}>

                           <Text style={{height:60,textAlign: 'center', textAlignVertical: 'center'}}>{item.name}</Text>

                       </Col>
                       <Col style={{width: windowWidth * 0.4, height: 60}}>
                           <Text style={{height:60,textAlign: 'center', textAlignVertical: 'center'}}>{item.price}</Text></Col>
                       <Col style={{width: windowWidth * 0.3, height: 60}}>
                         <UpDown paramkey={textColor} paramval={item.updown} />
                       </Col>
                   </Grid>
                   </TouchableOpacity>
               </ListItem>
             )
           });


        return (
            <Container>
                <Header style={{height:40}}>
                    <Body>
                    <Title>行情</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='search'/>
                        </Button>
                    </Right>
                </Header>

                <List style={{backgroundColor:'red',height:40}}>
                    <ListItem itemDivider>
                        <Grid>
                            <Col style={{width: windowWidth * 0.11}}><Text style={styles.title}>排名</Text></Col>
                            <Col style={{width: windowWidth * 0.19}}><Text style={styles.title}>币种</Text></Col>
                            <Col style={{width: windowWidth * 0.35}}><Text style={styles.title}>当前价</Text></Col>
                            <Col style={{width: windowWidth * 0.35}}><Text style={styles.title}>24H涨跌幅</Text></Col>
                        </Grid>
                    </ListItem>
                </List>

                <Content  refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.refresh.bind(this)} />}>
                      <List>
                        { elements }
                    </List>

                </Content>

            </Container>
        );
    }
}


const styles = StyleSheet.create({
    title:{
      fontSize:12
    }
});
