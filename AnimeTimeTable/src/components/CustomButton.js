import React, { Component } from 'react';
import { View, TouchableNativeFeedback } from 'react-native';


const CustomButton = (props) => {
  return <TouchableNativeFeedback
    delayPressIn={0}
    background={TouchableNativeFeedback.SelectableBackground()} // eslint-disable-line new-cap
    {...props}
  >
    {props.children}
  </TouchableNativeFeedback>;
};

module.exports = CustomButton;
