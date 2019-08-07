import React, { Component } from 'react';
import {Container, Header, Content, Card, CardItem, Text, Body, ListItem, Grid, Col} from 'native-base';
import {TouchableOpacity, View} from "react-native";


export default class CardHeaderFooterExample extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[],
            load:false,
        };
        this.fetchData= this.fetchData.bind(this);
        // this.renderData = this.renderData.bind(this);
        // this.fetchBySearch = this.fetchBySearch.bind(this);

    }

    fetchData(){
        fetch('http://www.developer1.cn:8001/bsj/index.php?news=1')
            .then((response) => response.json())
            .then((responseData) => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                console.log(responseData);
                this.setState({
                    data: this.state.data.concat(responseData),
                    load: true,
                });
            });
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


    componentDidMount(){
        this.fetchData();
    }

    render() {


        if(!this.state.load){
            return(
                <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:'center',backgroundColor:"#F5FCFF"}}>
                    <Text>正在加载数据...</Text>
                </View>
            );
        }
        let requestData = this.state.data
        const elements=[];
        requestData.forEach((item)=>{

            elements.push(
                <Card>
                    <CardItem header>
                        <Text>{item.title}</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                        <Text>
                            {item.content}
                        </Text>
                        </Body>
                    </CardItem>
                    <CardItem footer>
                        <Text>看多：{item.seemore}    看空：{item.bearish}</Text>
                    </CardItem>
                </Card>
            )
        });


        return (
            <Container>
                <Header />
                <Content>
                    {elements}
                </Content>
            </Container>
        );
    }
}
