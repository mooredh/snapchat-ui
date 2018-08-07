import React, { Component } from 'react';
import {  View, Text, TouchableWithoutFeedback, CameraRoll, StatusBar, Image } from 'react-native';
import { Camera, Permissions, Constants, takeSnapshotAsync } from 'expo';
import { Container, Content, Header, Item, Icon, Input, Button } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DOUBLE_PRESS_DELAY = 700;

export default class CameraComponent extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            cameraRollUri: null,
        }
    }
    
    componentWillMount = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'})
    }

    _saveToCameraRollAsync = async () => {
        let result = await takeSnapshotAsync(this._container, {
        format: 'png',
        result: 'file',
        });

        let saveResult = await CameraRoll.saveToCameraRoll(result, 'photo');
        this.setState({ cameraRollUri: saveResult });
    }

    handleImagePress = (e) => {
    const now = new Date().getTime();

    // alert(e);

        if (this.lastImagePress && (now - this.lastImagePress) < DOUBLE_PRESS_DELAY) {
            delete this.lastImagePress;
            this.handleImageDoublePress(e);
        }
        else {
            this.lastImagePress = now;
        }
    }

    handleImageDoublePress(e) {
    // alert('double press activated!');
        this.setState({ type: this.state.type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back })
    }

  render() {
    const { hasCameraPermission } = this.state

    if (hasCameraPermission === null) {
        return <View />
    }
    else if (hasCameraPermission === false) {
        return <Text>No access to Camera</Text>
    }
    else {
        return ( 
            <TouchableWithoutFeedback onPress={(e) => this.handleImagePress(e)}>
                <View style={{ flex: 1 }}>
                    <StatusBar barStyle={"light-content"} />
                    <Camera ref={view => this._container = view} style={{flex: 1, justifyContent: 'space-between',}} type={this.state.type}>
                        <Header searchBar rounded 
                        style={{ position: 'absolute', backgroundColor: 'transparent', left: 0, top: 0, right: 0, zIndex: 0, alignItems: 'center', }}
                        >
                        <View style={{flexDirection: 'row', flex: 4}}>
                            <Icon name="logo-snapchat" style={{color: '#fff'}}/>
                            <Item style={{backgroundColor: 'transparent',}}>
                                <Icon name="ios-search" style={{color: '#fff', fontSize: 24, fontWeight: 'bold',}}/>
                                <Input placeholder="Search" placeholderTextColor="#fff" />
                            </Item>
                        </View>
                        <View style={{flexDirection: 'row', flex: 2, justifyContent: 'space-around'}}>
                            <Icon style={{color: '#fff', fontWeight: 'bold',}} name="ios-flash" />
                            <Icon onPress={() => this.setState({ type: this.state.type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back })} 
                            style={{color: '#fff', fontWeight: 'bold',}} 
                            name="ios-reverse-camera" 
                            />
                        </View>
                        </Header>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 15, alignItems: 'flex-end', }}>
                            <MaterialCommunityIcons name="message-reply"
                            style={{ color: '#fff', fontSize: 36, }}
                            ></MaterialCommunityIcons>
                            <View style={{alignItems: 'center',}}>
                                <MaterialCommunityIcons name="circle-outline"
                                style={{ color: '#fff', fontSize: 100, }}
                                onPress={this._saveToCameraRollAsync}
                                ></MaterialCommunityIcons>
                                <Icon name='ios-images'
                                style={{ color: '#fff', fontSize: 36, }}
                                />
                            </View>
                            <MaterialCommunityIcons name="google-circles-communities"
                            style={{ color: '#fff', fontSize: 36, }}
                            ></MaterialCommunityIcons>

                        </View>
                    </Camera>
                </View>    
            </TouchableWithoutFeedback>
        );
        
    }
  }
}
