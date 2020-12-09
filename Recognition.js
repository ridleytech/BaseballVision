/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from "react";
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
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import disabledImg from "./images/btn-disabled.png";
import enabledImg from "./images/btn-enabled.png";
class Recognition extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      speed: 40,
      digits: 3,
      isGuessing: false,
      hits: 0,
      hitsInRow: 0,
      atBats: 0,
    };
  }

  userInput = (val) => {
    if (val) {
      this.setState({ userGuess: val });
    } else {
      this.setState({ userGuess: null });
    }
  };

  setSpeed = (speed) => {
    this.setState({ speed: speed });
  };

  setDigits = (digits) => {
    this.setState({ digits: digits });
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

    return ("" + number).substring(add);
  };

  startRound = () => {
    this.setState({
      anserCorrect: null,
      roundStarted: true,
      currentNumber: "GET READY",
    });

    setTimeout(() => {
      this.showBlank();
    }, 1000);
  };

  showBlank = () => {
    this.setState({
      currentNumber: "",
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

    this.setState({ currentNumber: num });

    //console.log('num: ' + num);

    var int = setTimeout(() => {
      this.setState({ isGuessing: true });
    }, convSpeed);
  };

  submitGuess = () => {
    console.log("currentNumber: " + this.state.currentNumber);
    console.log("userGuess: " + this.state.userGuess);

    var hits = this.state.hits;
    var hitsInRow = this.state.hitsInRow;

    if (this.state.currentNumber === this.state.userGuess) {
      console.log("correct");

      hits = this.state.hits + 1;
      hitsInRow = this.state.hits + 1;

      this.setState({ currentNumber: "CORRECT", anserCorrect: true });
    } else {
      console.log("incorrect");
      hitsInRow = 0;
      this.setState({ currentNumber: "INCORRECT", anserCorrect: false });
    }

    console.log("state.atBats: " + this.state.atBats);

    var atBats = this.state.atBats + 1;

    console.log("atBats: " + atBats);

    this.setState({
      isGuessing: false,
      userGuess: null,
      atBats: atBats,
      hits: hits,
      hitsInRow: hitsInRow,
      roundStarted: false,
    });
  };

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View
            style={{
              height: "100%",
              backgroundColor: "white",
              justifyContent: "center",
            }}
          >
            {!this.state.isGuessing ? (
              <View
                style={{
                  flexDirection: "row",
                  //backgroundColor: "yellow",
                  alignContent: "flex-end",
                  padding: 20,
                  //height: "100%",
                  //justifyContent: "space-between",
                }}
              >
                <View
                  style={[
                    styles.leftContent,
                    { opacity: this.state.roundStarted ? 0.1 : 1 },
                  ]}
                >
                  <Text style={styles.btnHeader}>Speed</Text>
                  <View style={styles.btnItem}>
                    <TouchableOpacity
                      style={{ marginRight: 10 }}
                      onPress={() => this.setSpeed(40)}
                    >
                      <Image
                        style={styles.btnImg}
                        source={
                          this.state.speed == 40 ? enabledImg : disabledImg
                        }
                      />
                    </TouchableOpacity>
                    <Text style={styles.btnText}>40 MPH</Text>
                  </View>
                  <View style={styles.btnItem}>
                    <TouchableOpacity
                      style={{ marginRight: 10 }}
                      onPress={() => this.setSpeed(50)}
                    >
                      <Image
                        style={styles.btnImg}
                        source={
                          this.state.speed == 50 ? enabledImg : disabledImg
                        }
                      />
                    </TouchableOpacity>
                    <Text style={styles.btnText}>50 MPH</Text>
                  </View>
                  <View style={styles.btnItem}>
                    <TouchableOpacity
                      style={{ marginRight: 10 }}
                      onPress={() => this.setSpeed(60)}
                    >
                      <Image
                        style={styles.btnImg}
                        source={
                          this.state.speed == 60 ? enabledImg : disabledImg
                        }
                      />
                    </TouchableOpacity>
                    <Text style={styles.btnText}>60 MPH</Text>
                  </View>
                  <View style={styles.btnItem}>
                    <TouchableOpacity
                      style={{ marginRight: 10 }}
                      onPress={() => this.setSpeed(70)}
                    >
                      <Image
                        style={styles.btnImg}
                        source={
                          this.state.speed == 70 ? enabledImg : disabledImg
                        }
                      />
                    </TouchableOpacity>
                    <Text style={styles.btnText}>70 MPH</Text>
                  </View>
                  <View style={styles.btnItem}>
                    <TouchableOpacity
                      style={{ marginRight: 10 }}
                      onPress={() => this.setSpeed(80)}
                    >
                      <Image
                        style={styles.btnImg}
                        source={
                          this.state.speed == 80 ? enabledImg : disabledImg
                        }
                      />
                    </TouchableOpacity>
                    <Text style={styles.btnText}>80 MPH</Text>
                  </View>
                </View>

                <View style={styles.centerContent}>
                  <View style={{ opacity: this.state.roundStarted ? 0.1 : 1 }}>
                    <Text style={[styles.instructionsTxt]}>Recognition</Text>

                    <Text style={styles.instructionsTxt2}>Instructions</Text>
                    <Text style={styles.basicText}>
                      Watch the box below and enter the numbers shown.
                    </Text>
                    <Text style={styles.basicText2}>Press START to begin.</Text>
                  </View>

                  <TextInput
                    style={styles.inputTxt}
                    value={this.state.currentNumber}
                    editable={false}
                    color={
                      this.state.anserCorrect
                        ? "green"
                        : this.state.anserCorrect == false
                        ? "red"
                        : "black"
                    }
                  ></TextInput>
                  <View style={{ opacity: this.state.roundStarted ? 0.1 : 1 }}>
                    <Text style={styles.resultsTxt}>
                      {this.state.hits} for {this.state.atBats}
                    </Text>
                    <Text style={styles.resultsTxt}>
                      {this.state.hitsInRow} hits in a row
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.startBtn}
                    onPress={() => this.startRound()}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontSize: height > 450 ? 35 : 20,
                        fontWeight: "bold",
                      }}
                    >
                      START
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={[
                    styles.rightContent,
                    { opacity: this.state.roundStarted ? 0.1 : 1 },
                  ]}
                >
                  <Text style={styles.btnHeader}>Digits</Text>
                  <View style={styles.btnItem}>
                    <TouchableOpacity
                      style={{ marginRight: 10 }}
                      onPress={() => this.setDigits(3)}
                    >
                      <Image
                        style={styles.btnImg}
                        source={
                          this.state.digits == 3 ? enabledImg : disabledImg
                        }
                      />
                    </TouchableOpacity>
                    <Text style={styles.btnText}>3</Text>
                  </View>
                  <View style={styles.btnItem}>
                    <TouchableOpacity
                      style={{ marginRight: 10 }}
                      onPress={() => this.setDigits(4)}
                    >
                      <Image
                        style={styles.btnImg}
                        source={
                          this.state.digits == 4 ? enabledImg : disabledImg
                        }
                      />
                    </TouchableOpacity>
                    <Text style={styles.btnText}>4</Text>
                  </View>
                  <View style={styles.btnItem}>
                    <TouchableOpacity
                      style={{ marginRight: 10 }}
                      onPress={() => this.setDigits(5)}
                    >
                      <Image
                        style={styles.btnImg}
                        source={
                          this.state.digits == 5 ? enabledImg : disabledImg
                        }
                      />
                    </TouchableOpacity>
                    <Text style={styles.btnText}>5</Text>
                  </View>
                  <View style={styles.btnItem}>
                    <TouchableOpacity
                      style={{ marginRight: 10 }}
                      onPress={() => this.setDigits(6)}
                    >
                      <Image
                        style={styles.btnImg}
                        source={
                          this.state.digits == 6 ? enabledImg : disabledImg
                        }
                      />
                    </TouchableOpacity>
                    <Text style={styles.btnText}>6</Text>
                  </View>
                  <View style={styles.btnItem}>
                    <TouchableOpacity
                      style={{ marginRight: 10 }}
                      onPress={() => this.setDigits(7)}
                    >
                      <Image
                        style={styles.btnImg}
                        source={
                          this.state.digits == 7 ? enabledImg : disabledImg
                        }
                      />
                    </TouchableOpacity>
                    <Text style={styles.btnText}>7</Text>
                  </View>
                </View>
              </View>
            ) : (
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <View style={styles.guessView}>
                  <View style={styles.guessCenterContent}>
                    <Text style={styles.instructionsTxt3}>
                      What was the number?
                    </Text>
                    <TextInput
                      style={styles.inputTxt2}
                      onChangeText={(text) => this.userInput(text)}
                      value={this.state.userGuess}
                    ></TextInput>
                    <TouchableOpacity
                      onPress={() => this.submitGuess()}
                      style={styles.startBtn}
                    >
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          fontSize: height > 450 ? 35 : 20,
                          fontWeight: "bold",
                        }}
                      >
                        SUBMIT
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </KeyboardAvoidingView>
            )}
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const { height, width } = Dimensions.get("window");

console.log("height: " + height);

const styles = StyleSheet.create({
  btnImg: {
    width: height > 450 ? 80 : 35,
    height: height > 450 ? 80 : 35,
    marginRight: 10,
  },
  leftContent: {
    flex: 0.4,
    //backgroundColor: 'red'
  },
  rightContent: {
    flex: 0.2,
    paddingRight: height > 450 ? 20 : 10,
    //backgroundColor: "yellow",
  },
  centerContent: {
    flex: 2,
    //backgroundColor: 'green',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  startBtn: {
    backgroundColor: "#7FBF30",
    width: height > 450 ? 400 : 250,
    height: height > 450 ? 80 : 40,
    marginLeft: "auto",
    marginRight: "auto",
    padding: height > 450 ? 18 : 8,
    marginTop: height > 450 ? 25 : 10,
  },
  guessView: {
    //backgroundColor: 'yellow',
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  inputTxt: {
    backgroundColor: "white",
    height: height > 450 ? 100 : 50,
    width: height > 450 ? 500 : 250,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: height > 450 ? 40 : 20,
    marginBottom: height > 450 ? 40 : 20,
    borderStyle: "solid",
    borderWidth: 1,
    color: "black",
    textAlign: "center",
    fontSize: height > 450 ? 50 : 25,
  },
  inputTxt2: {
    backgroundColor: "white",
    height: height > 450 ? 100 : 50,
    width: height > 450 ? 500 : 250,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: height > 450 ? 20 : 10,
    borderStyle: "solid",
    //borderWidth: 1,
    borderBottomWidth: 1,
    color: "black",
    textAlign: "center",
    fontSize: height > 450 ? 50 : 25,
  },
  instructionsTxt: {
    fontSize: height > 450 ? 40 : 25,
    marginBottom: height > 450 ? 18 : 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  instructionsTxt2: {
    fontSize: height > 450 ? 30 : 20,
    marginBottom: height > 450 ? 28 : 20,
    textAlign: "center",
  },
  instructionsTxt3: { fontSize: height > 450 ? 28 : 20, textAlign: "center" },

  btnItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height > 450 ? 40 : height < 400 ? 20 : 25,
    //minWidth: 70,
    // maxWidth: 115,
    //ackgroundColor: "red",
    alignItems: "center",
    //overflow: "hidden",
  },
  resultsTxt: {
    fontSize: height > 450 ? 30 : 15,
    marginBottom: height > 450 ? 20 : 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  guessCenterContent: {
    //backgroundColor: 'red',
  },
  basicText: {
    fontSize: height > 450 ? 28 : 15,
    marginBottom: 10,
    textAlign: "center",
  },
  basicText2: { fontSize: height > 450 ? 28 : 15, textAlign: "center" },
  btnText: {
    fontSize: height > 450 ? 18 : height < 400 ? 13 : 15,
    fontWeight: "bold",
  },
  btnHeader: { fontSize: height > 450 ? 30 : height < 400 ? 16 : 18 },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default Recognition;
