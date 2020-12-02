import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';

// import disabledImg from './images/btn-disabled.png';
// import enabledImg from './images/btn-enabled.png';

const MovementSettings = ({
  speed,
  startRound,
  chooseSpeed,
  roundStarted,
  disabledImg,
  enabledImg,
  currentPitch,
  hits,
  atBats,
  hitsInRow,
  Profiles,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        //backgroundColor: 'yellow',
        justifyContent: 'space-between',
        padding: 20,
        height: '100%',
      }}>
      <View style={[styles.leftContent, {opacity: roundStarted ? 0.1 : 1}]}>
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

        <Image source={Profiles[currentPitch - 1].src} style={styles.ball} />

        <View style={{opacity: roundStarted ? 0.1 : 1}}>
          <Text style={styles.resultsTxt}>
            {hits} for {atBats}
          </Text>
          <Text style={styles.resultsTxt}>{hitsInRow} hits in a row</Text>
        </View>

        <TouchableOpacity style={styles.startBtn} onPress={() => startRound()}>
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

export default MovementSettings;
