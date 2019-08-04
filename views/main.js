import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, Image
} from 'react-native';
import {createStackNavigator,createAppContainer,createBottomTabNavigator} from 'react-navigation';

import MarketList from './pages/market/list';

import BookList from './pages/book/book_list';
import BookDetail from './pages/book/book_detail';

import MovieList from './pages/movie/movie_list';
import MovieDetail from './pages/movie/movie_detail';

import MusicList from './pages/music/music_list';
import MusicDetail from './pages/music/music_detail';


class One extends Component{
    static navigationOptions={
        title:'行情',
        tabBarIcon: ({}) => (
            <Image
                source={{uri:'https://s1.bqiapp.com/news/20190724/fe7be25908b439c96a617fff71256068.png'}}
                style={[{height: 24, width: 24}, {}]}
            />
        ),
    };
    render() {
        return (
            <MarketList navigate={this.props.navigation.navigate} />
        );
    };
}

class Book extends Component{
    static navigationOptions={
        title:'资讯',
        tabBarIcon: ({}) => (
            <Image
                source={{uri:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3249694114,25894522&fm=26&gp=0.jpg'}}
                style={[{height: 24, width: 24}, {}]}
            />
        ),
    };
    render() {
        return (
            <BookList navigate={this.props.navigation.navigate} />
        );
    };
}


class Movie extends Component{
    static navigationOptions={
        title:'平台',
        tabBarIcon:({})=>(
            <Image source={{uri:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2823951946,1544725307&fm=26&gp=0.jpg'}}
                   style={[{height:24,width:25},{}]}
            />
        ),
    };
    render(){
        const { navigate } = this.props.navigation;
        return(

            <MovieList navigate={navigate}/>
        );
    }
}


class Music extends Component{
    static navigationOptions={
        title:'钱包',
        tabBarIcon:({})=>(
            <Image
                source={{uri:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2138215559,1851475130&fm=26&gp=0.jpg'}}
                style={[{width:25,height:24},{}]}
            />
        ),
    };
    render(){
        const {navigate} = this.props.navigation;

        return(
            <MusicList navigate={navigate}/>
        );
    }
}


class Detail extends Component{
    static navigationOptions={
        title:'detail',
        tabBarIcon:({})=>(
            <Image
                source={{uri:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2138215559,1851475130&fm=26&gp=0.jpg'}}
                style={[{width:25,height:24},{}]}
            />
        ),
    };
    render(){
        return(
            <Show desc='detail' />
        );
    }
}


const TabBar = createBottomTabNavigator(
      {
        one:{screen: One },
        two:{screen: Book },
        three:{screen: Movie},
        four:{screen: Music }
      },

       {
    initialRouteName: 'one', // 初始化页面
    //tabBarComponent: CustomTabBar,
    tabBarOptions: {
      activeTintColor: '#fb7299',
      inactiveTintColor: '#999'
    }
}

  );



const StackNavigator = createStackNavigator(
  {
    MainTab: {  //路由
      screen: TabBar,
      navigationOptions: {
          header: null,
      }
    },

    detail:{
        screen:Detail
    },
    bookDetail:{
        screen:BookDetail
    },
    movieDetail:{
        screen:MovieDetail
    },
    musicDetail:{
        screen:MusicDetail
    }

  },
  {
    initialRouteName: "MainTab"
  }
);



const MainNavigator = createAppContainer(StackNavigator);



export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <MainNavigator  />
            </View>
        );
    }
}
