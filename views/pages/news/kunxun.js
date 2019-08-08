import React, { Component } from "react";
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import {TouchableOpacity, View,Dimensions} from "react-native";

var {height,width} =  Dimensions.get('window');

export default class CardItemBordered extends Component {
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
                //
                console.log(responseData);
                this.setState({
                    data: this.state.data.concat(responseData),
                    load: true,
                });
            });
    }

    //
    refresh(){
        // alert('ÏÂÀ­')
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
                    <CardItem header bordered>
                        <Text>{item.title}</Text>
                    </CardItem>
                    <CardItem bordered>
                        <Body>
                        <Text>
                            {item.content}
                        </Text>
                        </Body>
                    </CardItem>
                    <CardItem footer bordered>
                        <Text style={{width: width/3,fontSize:10}}>看多:{item.seemore}    看空:{item.bearish}</Text>
                        <Text style={{color: "#FFAEB9"}}>{item.addtime}</Text>
                    </CardItem>
                </Card>
            )
        });


        return (
            <Container>
                {/*<Header />*/}
                <Content padder>
                    {elements}
                </Content>
            </Container>
        );
    }
}
