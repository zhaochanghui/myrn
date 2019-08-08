import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import {Dimensions, FlatList, StyleSheet, View,RefreshControl,TouchableOpacity,Text} from "react-native";

import Kunxun from './kunxun'

export default class TabsExample extends Component {
    render() {
        return (
            <Container>
                <Tabs>
                    <Tab heading="快讯">
                       <Kunxun/>
                    </Tab>
                    <Tab heading="深度">
                        <View><Text>2222221</Text></View>
                    </Tab>
                    {/*<Tab heading="Tab3">*/}
                        {/*<View><Text>333333</Text></View>*/}
                    {/*</Tab>*/}
                </Tabs>
            </Container>
        );
    }
}
