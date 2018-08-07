import React, { Component } from 'react';
import {
  Button,
  CameraRoll,
  Image,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { Constants, takeSnapshotAsync } from 'expo';

export default class New extends Component {
  state = {
    cameraRollUri: null,
  };

  render() {
    return (
      <View
        style={styles.container}
        collapsable={false}
        ref={view => {
          this._container = view;
        }}>
        <Text style={styles.paragraph}>
          Change code in the editor and watch it change on your phone!
          Save to get a shareable url. You get a new url each time you save.
        </Text>

        {this.state.cameraRollUri &&
          <Image
            source={{ uri: this.state.cameraRollUri }}
            style={{ width: 200, height: 200 }}
          />}

        <Button title="Snappy snap" onPress={this._saveToCameraRollAsync} />
      </View>
    );
  }

  _saveToCameraRollAsync = async () => {
    let result = await takeSnapshotAsync(this._container, {
      format: 'png',
      result: 'file',
    });

    let saveResult = await CameraRoll.saveToCameraRoll(result, 'photo');
    this.setState({ cameraRollUri: saveResult });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
