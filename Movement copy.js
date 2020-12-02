/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import disabledImg from './images/btn-disabled.png';
import enabledImg from './images/btn-enabled.png';
import ball1 from './images/ball1.png';

class App extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      speed: 40,
      digits: 3,
      isGuessing: false,
      isMoving: true,
      hits: 0,
      hitsInRow: 0,
      atBats: 0,
      currentBallPosition: 0,
      currentBallIndex: 0,
    };
  }

  userInput = (val) => {
    if (val) {
      this.setState({userGuess: val});
    } else {
      this.setState({userGuess: null});
    }
  };

  setSpeed = (speed) => {
    this.setState({speed: speed});
  };

  setDigits = (digits) => {
    this.setState({digits: digits});
  };

  generate = (n) => {
    var add = 1,
      max = 12 - add; // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.

    if (n > max) {
      return generate(max) + generate(n - max);
    }

    max = Math.pow(10, n + add);
    var min = max / 10; // Math.pow(10, n) basically
    var number = Math.floor(Math.random() * (max - min + 1)) + min;

    return ('' + number).substring(add);
  };

  getRandomInt = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    var theVal = Math.floor(Math.random() * (max - min) + min);

    if (theVal == exclude) {
      getRandomInt(min, max, exclude);
    }

    return theVal; //The maximum is exclusive and the minimum is inclusive
  };

  shuffle = (array) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  generateBallNumbers = () => {
    var currentPitch = this.getRandomInt(0, 15);
    var currentPitchCount = this.getRandomInt(5, 10);

    var pitches = [];

    //add round pitch to array

    for (var i = 0; i < currentPitchCount; i++) {
      pitches.push(currentPitch);
    }

    //add random pitches to array
    //if current pitch, select another

    var remainingCount = 20 - currentPitchCount;

    for (var i = 0; i < remainingCount; i++) {
      var randomPitch = this.getRandomInt(0, 15);
      pitches.push(randomPitch);
    }

    //shuffle array

    pitches = this.shuffle(pitches);

    console.log('currentPitch: ' + currentPitch);
    console.log('currentPitchCount: ' + currentPitchCount);
    console.log('pitches: ' + pitches);
    console.log('count: ' + pitches.length);
    console.log(
      'percentage of pitches: ' +
        parseInt((currentPitchCount / 20) * 100) +
        '%',
    );

    this.setState({
      currentPitch: currentPitch,
      currentPitchCount: currentPitchCount,
      pitches: pitches,
    });

    // setInterval(() => {
    //   this.moveBall.bind(this);
    // }, 1000);

    var intervalId = setInterval(this.timer, 1000);
    // // store intervalId in the state so it can be accessed later:
    // this.setState({intervalId: intervalId});

    // setInterval(()=>{this.setState({time:this.state.time})},1000)
  };

  moveBall = () => {
    var ind = this.state.currentBallIndex;

    var pos;

    if (ind == 0) {
      pos = Dimensions.get('screen').width * 0.33;
    } else if (ind == 0) {
      pos = Dimensions.get('screen').width * 0.5;
    } else {
      pos = Dimensions.get('screen').width * 0.75;
    }

    console.log('pos: ' + pos);

    this.setState({
      currentBallPosition: pos,
    });

    if (ind % 2 == 0) {
      this.setState({
        currentBallIndex: 0,
      });
    }
  };

  startRound = () => {
    this.setState({
      anserCorrect: null,
      roundStarted: true,
      currentNumber: 'GET READY',
    });

    // setTimeout(() => {
    //   this.showBlank();
    // }, 1000);
  };

  showBlank = () => {
    this.setState({
      currentNumber: '',
    });

    setTimeout(() => {
      this.displayNumber();
    }, 1500);
  };

  displayNumber = () => {
    //console.log('start round');

    var convSpeed;
    var speed = this.state.speed;

    if (speed == 40) {
      convSpeed = 1000;
    } else if (speed == 50) {
      convSpeed = 800;
    } else if (speed == 60) {
      convSpeed = 600;
    } else if (speed == 70) {
      convSpeed = 400;
    } else if (speed == 80) {
      convSpeed = 200;
    }

    var num = this.generate(this.state.digits);

    this.setState({currentNumber: num});

    //console.log('num: ' + num);

    var int = setTimeout(() => {
      this.setState({isGuessing: true});
    }, convSpeed);
  };

  submitGuess = () => {
    console.log('currentNumber: ' + this.state.currentNumber);
    console.log('userGuess: ' + this.state.userGuess);

    var hits = this.state.hits;
    var hitsInRow = this.state.hitsInRow;

    if (this.state.currentNumber === this.state.userGuess) {
      console.log('correct');

      hits = this.state.hits + 1;
      hitsInRow = this.state.hits + 1;

      this.setState({currentNumber: 'CORRECT', anserCorrect: true});
    } else {
      console.log('incorrect');
      hitsInRow = 0;
      this.setState({currentNumber: 'INCORRECT', anserCorrect: false});
    }

    console.log('state.atBats: ' + this.state.atBats);

    var atBats = this.state.atBats + 1;

    console.log('atBats: ' + atBats);

    this.setState({
      isGuessing: false,
      userGuess: null,
      atBats: atBats,
      hits: hits,
      hitsInRow: hitsInRow,
      roundStarted: false,
    });
  };

  componentDidMount() {
    this.generateBallNumbers();
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          {this.state.isMoving ? (
            <View style={{backgroundColor: 'yellow', height: '100%'}}>
              <Image
                source={ball1}
                style={[
                  styles.ballMove,
                  {
                    position: 'absolute',
                    top: '40%',
                    left: this.state.currentBallPosition,
                    right: 0,
                    bottom: 0,
                  },
                ]}
              />
            </View>
          ) : !this.state.isGuessing ? (
            <View
              style={{
                flexDirection: 'row',
                //backgroundColor: 'yellow',
                justifyContent: 'space-between',
                padding: 20,
                height: '100%',
              }}>
              <View
                style={[
                  styles.leftContent,
                  {opacity: this.state.roundStarted ? 0.1 : 1},
                ]}>
                <Text style={styles.btnHeader}>Speed</Text>
                <View style={styles.btnItem}>
                  <TouchableOpacity
                    style={{marginRight: 10}}
                    onPress={() => this.setSpeed(40)}>
                    <Image
                      source={this.state.speed == 40 ? enabledImg : disabledImg}
                    />
                  </TouchableOpacity>
                  <Text style={styles.btnText}>40 MPH</Text>
                </View>
                <View style={styles.btnItem}>
                  <TouchableOpacity
                    style={{marginRight: 10}}
                    onPress={() => this.setSpeed(50)}>
                    <Image
                      source={this.state.speed == 50 ? enabledImg : disabledImg}
                    />
                  </TouchableOpacity>
                  <Text style={styles.btnText}>50 MPH</Text>
                </View>
                <View style={styles.btnItem}>
                  <TouchableOpacity
                    style={{marginRight: 10}}
                    onPress={() => this.setSpeed(60)}>
                    <Image
                      source={this.state.speed == 60 ? enabledImg : disabledImg}
                    />
                  </TouchableOpacity>
                  <Text style={styles.btnText}>60 MPH</Text>
                </View>
                <View style={styles.btnItem}>
                  <TouchableOpacity
                    style={{marginRight: 10}}
                    onPress={() => this.setSpeed(70)}>
                    <Image
                      source={this.state.speed == 70 ? enabledImg : disabledImg}
                    />
                  </TouchableOpacity>
                  <Text style={styles.btnText}>70 MPH</Text>
                </View>
                <View style={styles.btnItem}>
                  <TouchableOpacity
                    style={{marginRight: 10}}
                    onPress={() => this.setSpeed(80)}>
                    <Image
                      source={this.state.speed == 80 ? enabledImg : disabledImg}
                    />
                  </TouchableOpacity>
                  <Text style={styles.btnText}>80 MPH</Text>
                </View>
              </View>

              <View style={styles.centerContent}>
                <View style={{opacity: this.state.roundStarted ? 0.1 : 1}}>
                  <Text style={[styles.instructionsTxt]}>Movement</Text>

                  <Text style={styles.instructionsTxt2}>Instructions</Text>
                  <Text style={styles.basicText}>
                    Count the number of times you see the below pitch.
                  </Text>
                  <Text style={styles.basicText2}>Press START to begin.</Text>
                </View>

                <Image source={ball1} style={styles.ball} />

                <View style={{opacity: this.state.roundStarted ? 0.1 : 1}}>
                  <Text style={styles.resultsTxt}>
                    {this.state.hits} for {this.state.atBats}
                  </Text>
                  <Text style={styles.resultsTxt}>
                    {this.state.hitsInRow} hits in a row
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.startBtn}
                  onPress={() => this.startRound()}>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    START
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.rightContent]}></View>
            </View>
          ) : (
            <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
              <View style={styles.guessView}>
                <View style={styles.guessCenterContent}>
                  <Text style={styles.instructionsTxt3}>
                    What was the number?
                  </Text>
                  <TextInput
                    style={styles.inputTxt2}
                    onChangeText={(text) => this.userInput(text)}
                    value={this.state.userGuess}></TextInput>
                  <TouchableOpacity
                    onPress={() => this.submitGuess()}
                    style={styles.startBtn}>
                    <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      SUBMIT
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          )}
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  ball: {
    width: 75,
    height: 75,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    marginBottom: 15,
  },
  ballMove: {
    width: 75,
    height: 75,
  },
  leftContent: {
    flex: 0.4,
    //backgroundColor: 'red'
  },
  rightContent: {
    flex: 0.2,
    //backgroundColor: 'yellow',
  },
  centerContent: {
    flex: 2,
    //backgroundColor: 'green',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  startBtn: {
    backgroundColor: '#7FBF30',
    width: 250,
    height: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 8,
    marginTop: 10,
  },
  guessView: {
    //backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  inputTxt: {
    backgroundColor: 'white',
    height: 50,
    width: 250,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    marginBottom: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    color: 'black',
    textAlign: 'center',
    fontSize: 25,
  },
  inputTxt2: {
    backgroundColor: 'white',
    height: 50,
    width: 250,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    borderStyle: 'solid',
    //borderWidth: 1,
    borderBottomWidth: 1,
    color: 'black',
    textAlign: 'center',
    fontSize: 25,
  },
  instructionsTxt: {
    fontSize: 25,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  instructionsTxt2: {fontSize: 20, marginBottom: 20, textAlign: 'center'},
  instructionsTxt3: {fontSize: 20, textAlign: 'center'},

  btnItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    minWidth: 50,
    maxWidth: 70,
    alignItems: 'center',
  },
  resultsTxt: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  guessCenterContent: {
    //backgroundColor: 'red',
  },
  basicText: {fontSize: 15, marginBottom: 10, textAlign: 'center'},
  basicText2: {fontSize: 15, textAlign: 'center'},
  btnText: {fontSize: 15},
  btnHeader: {fontSize: 18},
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
