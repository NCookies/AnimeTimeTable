import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: 'red',
  }
});

class Launch extends React.Component {
  render(){
    return (
      <View {...this.props}  style={styles.container}>
          <Button onPress={Actions.pageOne}>Go to Register page</Button>
          <Button onPress={Actions.tabbar}>Go to TabBar page</Button>
          <Button onPress={Actions.myTabBar}>멘탈이 펑펑!</Button>
          <Text>Hello World</Text>
      </View>
    );
  }
}

module.exports = Launch;
