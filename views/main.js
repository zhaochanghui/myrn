import React,{Component} from 'react';
import {SafeAreaView,StyleSheet,  ScrollView,  View,  Text,  StatusBar, Image} from 'react-native';
import {createStackNavigator,createAppContainer,createBottomTabNavigator} from 'react-navigation';

import BookList from './pages/book/book_list';
import BookDetail from './pages/book/book_detail';

import MovieList from './pages/movie/movie_list';
import MovieDetail from './pages/movie/movie_detail';

import MusicList from './pages/music/music_list';
import MusicDetail from './pages/music/music_detail';

import MarketList from './pages/market/list';
import BiDetail from './pages/market/detail';

import NewsList from './pages/news/list';


class One extends Component{
    static navigationOptions={
        title:'行情',
        tabBarIcon: ({}) => (
            <Image
              source={require('./images/hq.jpg')}
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
                source={require('./images/xw.png')}
                style={[{height: 24, width: 24}, {}]}
            />
        ),
    };
    render() {
        return (
            <NewsList navigate={this.props.navigation.navigate} />
        );
    };
}

class Movie extends Component{
    static navigationOptions={
        title:'平台',
        tabBarIcon:({})=>(
            <Image
            source={require('./images/plat.png')}
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
        title:'区块链',
        tabBarIcon:({})=>(
            <Image
              source={require('./images/qkl.png')}
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
    },
    biDetail:{
      screen: BiDetail
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
