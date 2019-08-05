import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
export default class AnatomyExample extends Component {
    constructor(props){
        super(props);
    }

    static navigationOptions=({navigation})=>({
        title:`${navigation.state.params.title}`+"("+`${navigation.state.params.cnname}`+")",
    });


    render() {
        return (
            <Container>
                <Content>
                    <Text>
                        This is Content Section
                    </Text>
                </Content>

            </Container>
        );
    }
}
