/**
 * Sample React Native Movement
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from "react";
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

import MovementSettings from "./MovementSettings";

import disabledImg from "./images/btn-disabled.png";
import enabledImg from "./images/btn-enabled.png";

const Movement = () => {
  const [speed, setSpeed] = useState(40);
  const [convSpeed, setConvSpeed] = useState(500);
  const [isGuessing, setIsGuessing] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [hits, setHits] = useState(0);
  const [atBats, setAtBats] = useState(0);
  const [hitsInRow, setHitsInRow] = useState(0);
  const [currentBallPosition, setCurrentBallPosition] = useState(0);
  const [currentBallPositionIndex, setCurrentBallPositionIndex] = useState(0);
  const [userGuess, setUserGuess] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [isRoundTimerActive, setIsRoundTimerActive] = useState(false);
  const [roundStarted, setRoundStarted] = useState(false);
  const [currentPitch, setCurrentPitch] = useState(0);
  const [currentDisplayedPitch, setCurrentDisplayedPitch] = useState(0);
  const [currentPitchCount, setCurrentPitchCount] = useState(0);
  const [thrownCount, setThrownCount] = useState(0);
  const [pitches, setPitches] = useState([]);
  const [pitchTotal, setPitchTotal] = useState(30);
  const [ballIsReady, setBallIsReady] = useState(true);
  const [answerCorrect, setAnswerCorrect] = useState(null);

  const BallImages = [
    {
      id: 1,
      src: require("./images/ball1.png"),
    },
    {
      id: 2,
      src: require("./images/ball2.png"),
    },
    {
      id: 3,
      src: require("./images/ball3.png"),
    },
    {
      id: 4,
      src: require("./images/ball4.png"),
    },
    {
      id: 5,
      src: require("./images/ball5.png"),
    },
    {
      id: 6,
      src: require("./images/ball6.png"),
    },
    {
      id: 7,
      src: require("./images/ball7.png"),
    },
    {
      id: 8,
      src: require("./images/ball8.png"),
    },
    {
      id: 9,
      src: require("./images/ball9.png"),
    },
    {
      id: 10,
      src: require("./images/ball10.png"),
    },
    {
      id: 11,
      src: require("./images/ball11.png"),
    },
    {
      id: 12,
      src: require("./images/ball12.png"),
    },
    {
      id: 13,
      src: require("./images/ball13.png"),
    },
    {
      id: 14,
      src: require("./images/ball14.png"),
    },
    {
      id: 15,
      src: require("./images/ball15.png"),
    },
    {
      id: 16,
      src: require("./images/ball16.png"),
    },
    {
      id: 17,
      src: require("./images/ball17.png"),
    },
  ];

  const [ballPositions] = useState([
    Dimensions.get("screen").width * 0.1,
    Dimensions.get("screen").width * 0.45,
    Dimensions.get("screen").width * 0.8,
  ]);

  //quiz timer

  useEffect(() => {
    let interval = null;

    if (isRoundTimerActive) {
      //console.log('start quiz timer');
      interval = setInterval(() => {
        moveBall();
      }, convSpeed);
    } else if (!isRoundTimerActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRoundTimerActive, thrownCount]);

  useEffect(() => {
    //console.log("updated thrown count: " + thrownCount);

    var upd = pitches[thrownCount] - 1;
    setCurrentDisplayedPitch(BallImages[upd]);

    console.log("set new pitch index: " + pitches[thrownCount]);
  }, [thrownCount]);

  useEffect(() => {
    var ind = currentBallPositionIndex;

    //console.log("cdp: " + JSON.stringify(currentDisplayedPitch));

    if (!isMoving) {
      return;
    }

    if (ind % 2 == 0 && ind > 0) {
      //console.log('reset ind');
      setCurrentBallPositionIndex(0);
    } else {
      //console.log('increment ind');
      var newInd = ind + 1;
      //console.log('new ind: ' + newInd);
      setCurrentBallPositionIndex(newInd);
    }
  }, [currentDisplayedPitch]);

  useEffect(() => {
    console
      .log
      //"currentBallPositionIndex change: " + ballPositions[currentBallPositionIndex]
      ();

    setCurrentBallPosition(ballPositions[currentBallPositionIndex]);
  }, [currentBallPositionIndex]);

  const moveBall = () => {
    setBallIsReady(true);

    if (thrownCount == pitchTotal - 1) {
      setIsRoundTimerActive(false);
      //setIsMoving(false);

      setTimeout(() => {
        setIsGuessing(true);
        setIsMoving(false);
      }, 1000);
    } else {
      var thrownCount1 = thrownCount + 1;
      setThrownCount(thrownCount1);
    }
  };

  useEffect(() => {
    console.log("convSpeed: " + convSpeed);
  }, [convSpeed]);

  //did mount

  useEffect(() => {
    console.log("did mount");

    console.clear();

    setThrownCount(0);
    setAtBats(0);
    setHitsInRow(0);
    setHits(0);
    setCurrentBallPosition(ballPositions[1]);
    setIsGuessing(false);
    setUserGuess(null);
    //setBallIsReady(false);

    generateBallNumbers();
  }, []);

  //unmount

  useEffect(
    () => () => {
      //console.log('unmount');
    },
    []
  );

  const startRound = () => {
    console.log("start round");

    setThrownCount(0);
    setCurrentBallPosition(ballPositions[0]);
    setCurrentBallPositionIndex(0);

    setAnswerCorrect(null);
    setRoundStarted(true);
    setIsMoving(true);
    setBallIsReady(false);

    setTimeout(() => {
      setBallIsReady(true);
      setIsRoundTimerActive(true);
    }, 1000);
  };

  const userInput = (val) => {
    if (val) {
      setUserGuess(val);
    } else {
      setUserGuess(null);
    }
  };

  const chooseSpeed = (speed1) => {
    console.log("chooseSpeed: " + speed1);
    if (speed1 == 40) {
      setConvSpeed(1000);
    } else if (speed1 == 50) {
      setConvSpeed(800);
    } else if (speed1 == 60) {
      setConvSpeed(600);
    } else if (speed1 == 70) {
      setConvSpeed(400);
    } else if (speed1 == 80) {
      setConvSpeed(200);
    }

    setSpeed(speed1);
  };

  const generate = (n) => {
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

  const getRandomInt = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    var theVal = Math.floor(Math.random() * (max - min) + min);

    if (theVal == exclude) {
      getRandomInt(min, max, exclude);
    }

    return theVal; //The maximum is exclusive and the minimum is inclusive
  };

  const shuffle = (array) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle..
    while (0 !== currentIndex) {
      // Pick a remaining element..
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  intervalId = null;

  const generateBallNumbers = () => {
    var currentPitch1 = getRandomInt(1, 15);
    var currentPitchCount1 = getRandomInt(5, 10);
    var pitches1 = [];

    //add round pitch to array

    for (var i = 0; i < currentPitchCount1; i++) {
      pitches1.push(currentPitch1);
    }

    //add random pitches to array
    //if current pitch, select another

    var remainingCount = pitchTotal - currentPitchCount1;

    for (var i = 0; i < remainingCount; i++) {
      var randomPitch = getRandomInt(1, 15);
      pitches1.push(randomPitch);
    }

    //shuffle array

    pitches1 = shuffle(pitches1);

    console.log("\ncurrentPitch: " + currentPitch1);
    console.log("currentPitchCount: " + currentPitchCount1);
    console.log("pitches: " + pitches1);
    //console.log("count: " + pitches1.length);
    console.log(
      "percentage of pitches: " +
        parseInt((currentPitchCount1 / pitchTotal) * 100) +
        "%"
    );

    var upd = pitches1[0] - 1;

    console.log("setCurrentDisplayedPitch: " + upd);

    setCurrentPitch(currentPitch1);
    setCurrentDisplayedPitch(BallImages[upd]);
    setCurrentPitchCount(currentPitchCount1);
    setPitches(pitches1);
  };

  const submitGuess = () => {
    console.log("currentPitchCount: " + currentPitchCount);
    console.log("userGuess: " + userGuess);

    var hits1 = hits;
    var hitsInRow1 = hitsInRow;

    if (currentPitchCount == userGuess) {
      console.log("correct");

      hits1 = hits + 1;
      hitsInRow1 = hits + 1;

      setCurrentStatus("CORRECT");
      setAnswerCorrect(true);
    } else {
      console.log("incorrect");
      hitsInRow1 = 0;

      setCurrentStatus("INCORRECT");
      setAnswerCorrect(false);
    }

    var atBats1 = atBats + 1;

    console.log("atBats: " + atBats1);

    setIsGuessing(false);
    setUserGuess(null);
    setAtBats(atBats1);
    setHitsInRow(hitsInRow1);
    setHits(hits1);
    setRoundStarted(false);
    setPitches([]);

    setThrownCount(0);
    generateBallNumbers();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView />
      <View
        style={{
          height: "100%",
          backgroundColor: "white",
          justifyContent: "center",
        }}
      >
        {isMoving ? (
          <View
            style={{
              //backgroundColor: 'yellow',
              height: "100%",
            }}
          >
            <Image
              source={currentDisplayedPitch.src}
              style={[
                styles.ballMove,
                {
                  position: "absolute",
                  top: "40%",
                  left: currentBallPosition,
                  right: 0,
                  bottom: 0,
                  opacity: ballIsReady ? 1 : 0,
                },
              ]}
            />
          </View>
        ) : !isGuessing && currentPitch ? (
          <MovementSettings
            speed={speed}
            enabledImg={enabledImg}
            disabledImg={disabledImg}
            startRound={startRound}
            chooseSpeed={chooseSpeed}
            roundStarted={roundStarted}
            currentPitch={currentPitch}
            hits={hits}
            atBats={atBats}
            hitsInRow={hitsInRow}
            BallImages={BallImages}
          />
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
                  onChangeText={(text) => userInput(text)}
                  value={userGuess}
                  keyboardType="number-pad"
                ></TextInput>
                <TouchableOpacity
                  onPress={() => submitGuess()}
                  style={styles.startBtn}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: 20,
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
    </>
  );
};

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  ball: {
    width: 75,
    height: 75,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
    marginBottom: 15,
  },
  ballMove: {
    // width: 75,
    // height: 75,
    width: height > 450 ? 150 : 75,
    height: height > 450 ? 150 : 75,
  },

  centerContent: {
    flex: 2,
    //backgroundColor: 'green',
  },
  scrollView: {},
  startBtn: {
    backgroundColor: "#7FBF30",
    width: 250,
    height: 40,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 8,
    marginTop: 10,
  },
  guessView: {
    //backgroundColor: 'yellow',
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  inputTxt: {
    backgroundColor: "white",
    height: 50,
    width: 250,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    marginBottom: 20,
    borderStyle: "solid",
    borderWidth: 1,
    color: "black",
    textAlign: "center",
    fontSize: 25,
  },
  inputTxt2: {
    backgroundColor: "white",
    height: 50,
    width: 250,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    borderStyle: "solid",
    //borderWidth: 1,
    borderBottomWidth: 1,
    color: "black",
    textAlign: "center",
    fontSize: 25,
  },
  instructionsTxt: {
    fontSize: 25,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  instructionsTxt3: { fontSize: 20, textAlign: "center" },

  resultsTxt: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  guessCenterContent: {
    //backgroundColor: 'red',
  },
});

export default Movement;
