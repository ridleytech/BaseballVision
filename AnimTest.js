import React, {Component} from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  Text,
  View,
  StyleSheet,
} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.moveAnimation = new Animated.ValueXY({x: 10, y: 10});
  }

  _moveBall = () => {
    Animated.spring(this.moveAnimation, {
      toValue: {x: 250, y: 10},
      useNativeDriver: false,
    }).start();
  };

  animateWidth() {
    Animated.sequence([
      Animated.delay(3000),
      Animated.spring(this.moveAnimation, {
        toValue: {x: 250, y: 10},
        useNativeDriver: false,
      }),
    ]).start(() => {
      // Logic whenever an iteration finishes...
      this.animateWidth();
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.tennisBall, this.moveAnimation.getLayout()]}>
          <TouchableWithoutFeedback
            style={styles.button}
            onPress={this.animateWidth}>
            <Text style={styles.buttonText}>Press</Text>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  tennisBall: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'greenyellow',
    borderRadius: 100,
    width: 100,
    height: 100,
  },
  button: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  buttonText: {
    fontSize: 24,
    color: '#333',
  },
});
