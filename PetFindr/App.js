/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Animated,
  Easing,
  Button,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  StackActions,
  NavigationActions
} from "react-navigation";
import { Icon } from "native-base";

class App extends Component {
  static navigationOptions = { title: "Welcome", header: null };
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{ width: "100%", height: "100%" }}
          source={require("./dogggo.jpg")}
        >
          <Text style={styles.AppName}>PetFindr</Text>
          <View
            style={{
              width: 200,
              height: 50,
              marginLeft: 100
            }}
          >
            <Button
              onPress={() => {
                this.props.navigation.dispatch(
                  StackActions.push({
                    routeName: "LandingPage"
                  })
                );
              }}
              title="Enter"
              color="#23BAC4"
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

class LandingPage extends Component {
  static navigationOptions = { title: "Welcome", header: null };
  render() {
    return (
      <View
        style={{ backgroundColor: "#EFEFEF", width: "100%", height: "100%" }}
      >
        <Text
          style={{
            fontSize: 50,
            textAlign: "center",
            marginTop: 115,
            color: "#524F4F"
          }}
        >
          Who are you?
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
            padding: 0,
            marginTop: 20
          }}
        >
          <TouchableOpacity
            style={{
              width: 120,
              height: 200,
              alignItems: "center"
            }}
          >
            <Image
              style={{
                borderRadius: 100 / 2,
                width: 100,
                height: 100,
                marginTop: 20
              }}
              source={require("./assets/media/shelter.jpg")}
            />
            <Text style={{ fontSize: 26, color: "#524F4F", marginTop: 20 }}>
              Shelter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.dispatch(
                StackActions.push({
                  routeName: "UserLogin"
                })
              );
            }}
            style={{ width: 120, height: 200, alignItems: "center" }}
          >
            <Image
              style={{
                borderRadius: 100 / 2,
                width: 100,
                height: 100,
                marginTop: 20
              }}
              source={require("./assets/media//animal-blond-hair-bright-1612861.jpg")}
            />
            <Text style={{ fontSize: 26, color: "#524F4F", marginTop: 20 }}>
              Adopter
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              borderColor: "#535353",
              width: 40,
              height: 40,
              borderRadius: 40 / 2,

              borderWidth: 1,

              marginTop: 120,
              marginLeft: 180
            }}
            onPress={() => {
              this.props.navigation.dispatch(
                StackActions.pop({
                  n: 1
                })
              );
            }}
          >
            <Icon
              style={{ color: "#535353", marginLeft: 9, marginTop: 5 }}
              name="arrow-back"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class UserLogin extends Component {
  static navigationOptions = {
    title: "User Sign Up",
    headerTitleStyle: {
      fontWeight: "bold",
      marginLeft: 90
    },
    headerTintColor: "#fff",
    headerStyle: { backgroundColor: "#21CDCD" }
  };
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      zip: ""
    };
  }
  render() {
    return (
      <View
        style={{ backgroundColor: "#EFEFEF", width: "100%", height: "100%" }}
      >
        <View>
          <TextInput
            style={{
              width: 307,
              height: 50,
              borderRadius: 6,
              borderColor: "#CCCCCC",
              borderWidth: 1,
              alignSelf: "center",
              color: "#848080",
              marginTop: 30,
              paddingLeft: 5,
              backgroundColor: "white"
            }}
            onSubmitEditing={() => {
              this.secondTextInput.focus();
            }}
            blurOnSubmit={false}
            placeholder="Email"
            returnKeyType="next"
            placeholderTextColor="#ACACAC"
            onChange={text => this.setState({ email: text })}
            value={this.state.password}
          />
        </View>
        <View>
          <TextInput
            style={{
              width: 307,
              height: 50,
              borderRadius: 6,
              borderColor: "#CCCCCC",
              borderWidth: 1,
              alignSelf: "center",
              color: "#848080",
              marginTop: 30,
              paddingLeft: 5,
              backgroundColor: "white"
            }}
            onSubmitEditing={() => {
              this.thirdTextInput.focus();
            }}
            blurOnSubmit={false}
            ref={input => {
              this.secondTextInput = input;
            }}
            placeholder="Password"
            returnKeyType="next"
            secureTextEntry={true}
            placeholderTextColor="#ACACAC"
            onChange={text => this.setState({ password: text })}
            value={this.state.password}
          />
        </View>
        <View>
          <TextInput
            style={{
              width: 307,
              height: 50,
              borderRadius: 6,
              borderColor: "#CCCCCC",
              borderWidth: 1,
              alignSelf: "center",
              color: "#848080",
              marginTop: 30,
              paddingLeft: 5,
              backgroundColor: "white"
            }}
            onSubmitEditing={() => {
              this.fourthTextInput.focus();
            }}
            blurOnSubmit={false}
            ref={input => {
              this.thirdTextInput = input;
            }}
            returnKeyType="next"
            placeholder="Confirm Password"
            secureTextEntry={true}
            placeholderTextColor="#ACACAC"
            onChange={text => this.setState({ confirmPassword: text })}
            value={this.state.confirmPassword}
          />
        </View>
        <View>
          <TextInput
            style={{
              width: 307,
              height: 50,
              borderRadius: 6,
              borderColor: "#CCCCCC",
              borderWidth: 1,
              alignSelf: "center",
              color: "#848080",
              marginTop: 30,
              paddingLeft: 5,
              backgroundColor: "white"
            }}
            ref={input => {
              this.fourthTextInput = input;
            }}
            keyboardType="number-pad"
            placeholder="Zip"
            placeholderTextColor="#ACACAC"
            onChange={text => this.setState({ zip: text })}
            value={this.state.zip}
          />
        </View>
        <View />
        <TouchableOpacity
          style={{
            marginTop: 30,
            width: 307,
            height: 50,
            backgroundColor: "#3AC5CE",
            alignSelf: "center"
          }}
        >
          <Text
            style={{
              color: "white",
              alignSelf: "center",
              fontSize: 26,
              fontWeight: "bold",
              marginTop: 5
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 30,
            width: 307,
            height: 50,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#A5A5A5",
            alignSelf: "center"
          }}
          onPress={() => {
            this.props.navigation.dispatch(
              StackActions.pop({
                n: 1
              })
            );
          }}
        >
          <Text
            style={{
              color: "#A5A5A5",
              alignSelf: "center",
              fontSize: 26,
              fontWeight: "bold",
              marginTop: 5
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  AppName: {
    fontFamily: "Playball-Regular",
    fontSize: 60,
    color: "#ffff",
    fontWeight: "300",
    textAlign: "center",
    marginTop: 120,
    marginBottom: 400
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

let SlideFromRight = (index, position, width) => {
  const inputRange = [index - 1, index, index + 1];
  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [width, 0, 0]
  });
  const slideFromRight = { transform: [{ translateX }] };
  return slideFromRight;
};

const TransitionConfiguration = () => {
  return {
    transitionSpec: {
      duration: 650,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const width = layout.initWidth;
      const { index, route } = scene;
      const params = route.params || {};
      const transition = params.transition || "default";
      return {
        default: SlideFromRight(index, position, width)
      }[transition];
    }
  };
};

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: App
    },
    LandingPage: {
      screen: LandingPage
    },
    UserLogin: { screen: UserLogin }
  },
  {
    initialRouteName: "Home",
    transitionConfig: TransitionConfiguration
  }
);

export default createAppContainer(AppNavigator);
