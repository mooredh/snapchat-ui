import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Content } from 'native-base';
import Swiper from 'react-native-swiper';
import CameraComponent from './components/CameraComponent'
import New from './components/new'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      outerScrollEnabled: true
    }
  }

  verticalScroll = (index) => {
    if (index !== 1) {
      this.setState({outerScrollEnabled: false})
    }
    else {
      this.setState({outerScrollEnabled: true})
    }
  }
  
  render() {
    return (
      <Container>
        <Content>
          <Swiper 
          loop={false} 
          showsPagination={false} 
          index={1}
          scrollEnabled={this.state.outerScrollEnabled}>
            <View style={styles.slideDefault}>
              <Text style={styles.text}>Chat</Text>
            </View>
            <Swiper 
            loop={false} 
            showsPagination={false} 
            index={1} 
            horizontal={false}
            onIndexChanged={index => this.verticalScroll(index)}
            >
              <View style={styles.slideDefault}>
                <New />
              </View>
              <View style={{ flex: 1 }}>
                <CameraComponent />
              </View>
              <View style={styles.slideDefault}>
                <Text style={styles.text}>Memories</Text>
              </View>
            </Swiper>
            
            <View style={styles.slideDefault}>
              <Text style={styles.text}>Stories</Text>
            </View>
          </Swiper>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  slideDefault: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
});
