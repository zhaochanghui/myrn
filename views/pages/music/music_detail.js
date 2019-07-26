import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, Image, Dimensions,ScrollView} from 'react-native';
import {createStackNavigator, createTabNavigator, createDrawerNavigator} from 'react-navigation';

class MusicDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetch_key: this.props.navigation.state.params.key,
            data: [],
            loaded: false,
        },

            this.fetchData = this.fetchData.bind(this);
    }

    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.title}`,
    });

    fetchData() {
        let furl = "http://www.developer1.cn:8001/yy.php?key=" + this.state.fetch_key;
        fetch(furl)
            .then((response) => response.json())
            .then((responseData) => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                console.log(responseData);
                this.setState({
                    data: responseData,
                    loaded: true,
                });
            });
    }

    componentDidMount() {
        this.fetchData();
    }


    render() {
        if (!this.state.loaded) {
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgrounColor: '#F5FCFF'
                }}>
                    <Text>loading...:{this.props.navigation.state.params.title}</Text>
                </View>
            );
        }
        let music = this.state.data;

        let qm=music.detail.qm.map((s,index)=>{
            return (
                <Text>{s}</Text>
            )
        })


        return (
            <View style={{backgrounColor: 'blue', flexDirection: 'column'}}>
                <ScrollView showsHorizontalScrollIndicator = {false}
                            pagingEnabled = {true} style={{}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{
                        backgroundColor: 'powderblue',
                        width: (Dimensions.get('window').width / 2),
                        height: 90
                    }}>
                        <Text>曲目名称： {music.title} </Text>
                        <Text> 评分，评价：{music.score},{music.pjs} </Text>
                        <Text>{music.info1}</Text>
                    </View>
                    <Image source={{uri: music.pic}}
                           style={{width: (Dimensions.get('window').width / 2.2), height: 90}}/>
                </View>

                {/*<View style={{flexDirection: 'row', backgroundColor: 'red',*/}
                    {/*width: (Dimensions.get('window').width ),  height: 90}}>*/}
                    {/**/}
                {/*</View>*/}

                <View style={{flexDirection:'column',backgroundColor:'steelblue',width:(Dimensions.get('window').width)}}>
                    <Text style={{fontSize:20}}>QMbrief</Text>
                    <Text style={{}}>{music.detail.brief}</Text>
                </View>
                    {qm}
                </ScrollView>
            </View>
        );
    }
}


export default MusicDetail;