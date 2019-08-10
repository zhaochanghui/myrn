import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import {Dimensions, FlatList, StyleSheet, View,RefreshControl,TouchableOpacity,Text} from "react-native";

import Biku from './biku';

export default class TabsExample extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>

                <Tabs>
                    <Tab heading="市值排行">
                        <Biku  navigate={this.props.navigate} />
                    </Tab>
                    <Tab heading="历史高位">
                        <View><Text>2222221</Text></View>
                    </Tab>
                    <Tab heading="交易所排行">
                        <View><Text>333333</Text></View>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}
