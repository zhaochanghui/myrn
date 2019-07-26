import React,{Component} from 'react';
import {View,Text,Button,StyleSheet,Image}  from 'react-native';
import {createStackNavigator,createTabNavigator,createDrawerNavigator}  from 'react-navigation';

class MovieDetail extends Component{
    constructor(props){
        super(props);
    }

    static navigationOptions=({navigation})=>({
        title:`${navigation.state.params.title}`,
    });

    render(){
        return(
            <View style={{flex:1,flexDirection: 'row',justifyContent: 'center',alignItems:'center',backgrounColor:'#F5FCFF'}}>
                <Text>detail:{this.props.navigation.state.params.title}</Text>
            </View>
        );
    }
}


export default MovieDetail;