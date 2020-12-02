/**
 * Sample React Native Movement
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
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

import disabledImg from './images/btn-disabled.png';
import enabledImg from './images/btn-enabled.png';
import ball1 from './images/ball1.png';
import ball2 from './images/ball2.png';
import ball3 from './images/ball3.png';
import ball4 from './images/ball4.png';
import ball5 from './images/ball5.png';
import ball6 from './images/ball6.png';
import ball7 from './images/ball7.png';
import ball8 from './images/ball8.png';
import ball9 from './images/ball9.png';
import ball10 from './images/ball10.png';
import ball11 from './images/ball11.png';
import ball12 from './images/ball12.png';
import ball13 from './images/ball13.png';
import ball14 from './images/ball14.png';
import ball15 from './images/ball15.png';
import ball16 from './images/ball16.png';
import ball17 from './images/ball17.png';
import ball18 from './images/ball17.png';
import ball19 from './images/ball17.png';

const Movement = () => {
  const [speed, setSpeed] = useState(40);
  const [convSpeed, setConvSpeed] = useState(500);
  const [isGuessing, setIsGuessing] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [hits, setHits] = useState(0);
  const [atBats, setAtBats] = useState(0);
  const [hitsInRow, setHitsInRow] = useState(0);
  const [currentBallPosition, setCurrentBallPosition] = useState(0);
  const [currentBallIndex, setCurrentBallIndex] = useState(0);
  const [userGuess, setUserGuess] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [isQuizTimerActive, setIsQuizTimerActive] = useState(false);
  const [quizTime, setQuizTime] = useState(0);
  const [roundStarted, setRoundStarted] = useState(false);
  const [currentPitch, setCurrentPitch] = useState(0);
  const [currentPitchCount, setCurrentPitchCount] = useState(0);
  const [thrownCount, setThrownCount] = useState(0);
  const [pitches, setPitches] = useState(0);
  const [pitchTotal, setPitchTotal] = useState(20);
  const [ballIsReady, setBallIsReady] = useState(true);
  const [answerCorrect, setAnswerCorrect] = useState(null);
  const [balls, setBalls] = useState(null);
  const [ballImages, setBallImages] = useState([
    ball1,
    ball2,
    ball3,
    ball4,
    ball5,
    ball6,
    ball7,
    ball8,
    ball9,
    ball10,
    ball11,
    ball12,
    ball13,
    ball14,
    ball15,
    ball16,
    ball17,
  ]);

  const [ballPositions, setBallPositions] = useState([
    Dimensions.get('screen').width * 0.1,
    Dimensions.get('screen').width * 0.45,
    Dimensions.get('screen').width * 0.8,
  ]);

  //quiz timer

  useEffect(() => {
    let interval = null;

    if (isQuizTimerActive) {
      //console.log('start quiz timer');
      interval = setInterval(() => {
        //console.log('the seconds: ' + quizTime);

        moveBall();
        // var thrownCount1 = thrownCount + 1;
        // setThrownCount(thrownCount1);
      }, convSpeed);
    } else if (!isQuizTimerActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isQuizTimerActive, currentBallIndex]);

  useEffect(() => {
    //console.log('thrown count: ' + thrownCount);

    var ind = currentBallIndex;
    //console.log('update position: ' + ind);
    setCurrentBallPosition(ballPositions[ind]);

    console.log('new pitch index: ' + pitches[thrownCount]);

    //var cp = currentPitch + 1;
    setCurrentPitch(pitches[thrownCount]);

    if (ind % 2 == 0 && ind > 0) {
      //console.log('reset ind');
      setCurrentBallIndex(0);
    } else {
      //console.log('increment ind');
      var newInd = ind + 1;
      //console.log('new ind: ' + newInd);
      setCurrentBallIndex(newInd);
    }
  }, [thrownCount]);

  useEffect(() => {
    //setCurrentBallPosition(ballPositions[currentBallIndex]);
  }, [currentBallIndex]);

  //did mount

  useEffect(() => {
    console.log('did mount');

    console.clear();

    setCurrentBallIndex(0);
    setThrownCount(0);
    setAtBats(0);
    setHitsInRow(0);
    setHits(0);
    setCurrentBallPosition(ballPositions[1]);

    generateBallNumbers();
  }, []);

  useEffect(() => {
    //console.log('convSpeed: ' + convSpeed);
  }, [currentBallPosition]);

  useEffect(() => {
    //console.log('convSpeed: ' + convSpeed);
  }, [convSpeed]);

  //unmount

  useEffect(
    () => () => {
      //console.log('unmount');

      setQuizTime(0);
      setIsQuizTimerActive(false);
    },
    [],
  );

  const moveBall = () => {
    //console.log('ind: ' + ind);
    //console.log('moveBall thrownCount: ' + thrownCount);

    setBallIsReady(true);

    var thrownCount1 = thrownCount + 1;
    setThrownCount(thrownCount1);

    if (thrownCount == pitchTotal) {
      setIsQuizTimerActive(false);
      //setIsMoving(false);

      setTimeout(() => {
        setIsGuessing(true);
        setIsMoving(false);
      }, 1000);
    }
  };

  const startRound = () => {
    setCurrentBallIndex(0);
    setThrownCount(0);
    setCurrentBallPosition(ballPositions[1]);

    console.log('go');

    setAnswerCorrect(null);
    setRoundStarted(true);
    setIsMoving(true);
    setBallIsReady(false);

    setTimeout(() => {
      setIsQuizTimerActive(true);
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

    return ('' + number).substring(add);
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
    var currentPitch1 = getRandomInt(0, 15);
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
      var randomPitch = getRandomInt(0, 15);
      pitches1.push(randomPitch);
    }

    //shuffle array

    pitches1 = shuffle(pitches1);

    console.log('\ncurrentPitch: ' + currentPitch1);
    console.log('currentPitchCount: ' + currentPitchCount1);
    console.log('pitches: ' + pitches1);
    console.log('count: ' + pitches1.length);
    console.log(
      'percentage of pitches: ' +
        parseInt((currentPitchCount1 / pitchTotal) * 100) +
        '%',
    );

    console.log('currentBallIndex: ' + currentBallIndex);

    setCurrentBallIndex(currentPitch1);

    setCurrentPitch(currentPitch1);
    setCurrentPitchCount(currentPitchCount1);
    setPitches(pitches1);
  };

  const submitGuess = () => {
    console.log('currentPitchCount: ' + currentPitchCount);
    console.log('userGuess: ' + userGuess);

    var hits1 = hits;
    var hitsInRow1 = hitsInRow;

    if (currentPitchCount == userGuess) {
      console.log('correct');

      hits1 = hits + 1;
      hitsInRow1 = hits + 1;

      setCurrentStatus('CORRECT');
      setAnswerCorrect(true);
    } else {
      console.log('incorrect');
      hitsInRow1 = 0;

      setCurrentStatus('INCORRECT');
      setAnswerCorrect(false);
    }

    var atBats1 = atBats + 1;

    console.log('atBats: ' + atBats1);

    setIsGuessing(false);
    setUserGuess(null);
    setAtBats(atBats1);
    setHitsInRow(hitsInRow1);
    setHits(hits1);
    setRoundStarted(false);

    generateBallNumbers();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        {isMoving ? (
          <View
            style={{
              //backgroundColor: 'yellow',
              height: '100%',
            }}>
            <Image
              source={pitches[currentPitch]}
              style={[
                styles.ballMove,
                {
                  position: 'absolute',
                  top: '40%',
                  left: currentBallPosition,
                  right: 0,
                  bottom: 0,
                  opacity: ballIsReady ? 1 : 0,
                },
              ]}
            />

            {/* {balls} */}
          </View>
        ) : !isGuessing ? (
          <View
            style={{
              flexDirection: 'row',
              //backgroundColor: 'yellow',
              justifyContent: 'space-between',
              padding: 20,
              height: '100%',
            }}>
            <View
              style={[styles.leftContent, {opacity: roundStarted ? 0.1 : 1}]}>
              <Text style={styles.btnHeader}>Speed</Text>
              <View style={styles.btnItem}>
                <TouchableOpacity
                  style={{marginRight: 10}}
                  onPress={() => chooseSpeed(40)}>
                  <Image source={speed == 40 ? enabledImg : disabledImg} />
                </TouchableOpacity>
                <Text style={styles.btnText}>40 MPH</Text>
              </View>
              <View style={styles.btnItem}>
                <TouchableOpacity
                  style={{marginRight: 10}}
                  onPress={() => chooseSpeed(50)}>
                  <Image source={speed == 50 ? enabledImg : disabledImg} />
                </TouchableOpacity>
                <Text style={styles.btnText}>50 MPH</Text>
              </View>
              <View style={styles.btnItem}>
                <TouchableOpacity
                  style={{marginRight: 10}}
                  onPress={() => chooseSpeed(60)}>
                  <Image source={speed == 60 ? enabledImg : disabledImg} />
                </TouchableOpacity>
                <Text style={styles.btnText}>60 MPH</Text>
              </View>
              <View style={styles.btnItem}>
                <TouchableOpacity
                  style={{marginRight: 10}}
                  onPress={() => chooseSpeed(70)}>
                  <Image source={speed == 70 ? enabledImg : disabledImg} />
                </TouchableOpacity>
                <Text style={styles.btnText}>70 MPH</Text>
              </View>
              <View style={styles.btnItem}>
                <TouchableOpacity
                  style={{marginRight: 10}}
                  onPress={() => chooseSpeed(80)}>
                  <Image source={speed == 80 ? enabledImg : disabledImg} />
                </TouchableOpacity>
                <Text style={styles.btnText}>80 MPH</Text>
              </View>
            </View>

            <View style={styles.centerContent}>
              <View style={{opacity: roundStarted ? 0.1 : 1}}>
                <Text style={[styles.instructionsTxt]}>Movement</Text>

                <Text style={styles.instructionsTxt2}>Instructions</Text>
                <Text style={styles.basicText}>
                  Count the number of times you see the below pitch.
                </Text>
                <Text style={styles.basicText2}>Press START to begin.</Text>
              </View>

              <Image
                source={ballImages[currentBallIndex]}
                style={styles.ball}
              />

              <View style={{opacity: roundStarted ? 0.1 : 1}}>
                <Text style={styles.resultsTxt}>
                  {hits} for {atBats}
                </Text>
                <Text style={styles.resultsTxt}>{hitsInRow} hits in a row</Text>
              </View>

              <TouchableOpacity
                style={styles.startBtn}
                onPress={() => startRound()}>
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
                  onChangeText={(text) => userInput(text)}
                  value={userGuess}></TextInput>
                <TouchableOpacity
                  onPress={() => submitGuess()}
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
};

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
  scrollView: {},
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
});

export default Movement;
