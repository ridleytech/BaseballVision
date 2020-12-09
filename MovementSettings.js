import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

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
  BallImages,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        //backgroundColor: "yellow",
        justifyContent: "space-between",
        padding: 20,
        //marginTop: "20%",
        //height: "100%",
      }}
    >
      <View style={[styles.leftContent, { opacity: roundStarted ? 0.1 : 1 }]}>
        <Text style={styles.btnHeader}>Speed</Text>
        <View style={styles.btnItem}>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => chooseSpeed(40)}
          >
            <Image
              style={styles.btnImg}
              source={speed == 40 ? enabledImg : disabledImg}
            />
          </TouchableOpacity>
          <Text style={styles.btnText}>40 MPH</Text>
        </View>
        <View style={styles.btnItem}>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => chooseSpeed(50)}
          >
            <Image
              style={styles.btnImg}
              source={speed == 50 ? enabledImg : disabledImg}
            />
          </TouchableOpacity>
          <Text style={styles.btnText}>50 MPH</Text>
        </View>
        <View style={styles.btnItem}>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => chooseSpeed(60)}
          >
            <Image
              style={styles.btnImg}
              source={speed == 60 ? enabledImg : disabledImg}
            />
          </TouchableOpacity>
          <Text style={styles.btnText}>60 MPH</Text>
        </View>
        <View style={styles.btnItem}>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => chooseSpeed(70)}
          >
            <Image
              style={styles.btnImg}
              source={speed == 70 ? enabledImg : disabledImg}
            />
          </TouchableOpacity>
          <Text style={styles.btnText}>70 MPH</Text>
        </View>
        <View style={styles.btnItem}>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => chooseSpeed(80)}
          >
            <Image
              style={styles.btnImg}
              source={speed == 80 ? enabledImg : disabledImg}
            />
          </TouchableOpacity>
          <Text style={styles.btnText}>80 MPH</Text>
        </View>
      </View>

      <View style={styles.centerContent}>
        <View style={{ opacity: roundStarted ? 0.1 : 1 }}>
          <Text style={[styles.instructionsTxt]}>Movement</Text>

          <Text style={styles.instructionsTxt2}>Instructions</Text>
          <Text style={styles.basicText}>
            Count the number of times you see the below pitch.
          </Text>
          <Text style={styles.basicText2}>Press START to begin.</Text>
        </View>

        <Image source={BallImages[currentPitch - 1].src} style={styles.ball} />

        <View style={{ opacity: roundStarted ? 0.1 : 1 }}>
          <Text style={styles.resultsTxt}>
            {hits} for {atBats}
          </Text>
          <Text style={styles.resultsTxt}>{hitsInRow} hits in a row</Text>
        </View>

        <TouchableOpacity style={styles.startBtn} onPress={() => startRound()}>
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

      <View style={[styles.rightContent]}></View>
    </View>
  );
};
const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  ball: {
    width: height > 450 ? 150 : 75,
    height: height > 450 ? 150 : 75,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: height > 450 ? 35 : 15,
    marginBottom: height > 450 ? 35 : 15,
  },
  btnImg: {
    width: height > 450 ? 80 : 35,
    height: height > 450 ? 80 : 35,
    marginRight: 10,
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
    flex: 4,
    //backgroundColor: 'green',
  },
  scrollView: {},
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
    marginTop: height > 450 ? 40 : 25,
    // minWidth: 50,
    // maxWidth: 115,
    //backgroundColor: "red",
    alignItems: "center",
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
    fontSize: height > 450 ? 28 : 15,
    fontWeight: "bold",
  },
  btnHeader: { fontSize: height > 450 ? 30 : 18 },
});

export default MovementSettings;
