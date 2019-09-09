/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component, useState } from 'react';
import { Container, Header, Content, DatePicker, Tab, Tabs, Text, View } from 'native-base';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'

const MIN_DATE = new Date(2015, 8, 17)
const MAX_DATE = new Date(2019, 6, 8)
const PLACE_HOLDER = "Select Date"

const HomeScreen = () => {
  const [ chosenDate, setChosenDate ] = useState(Date.now())

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>

      <DatePicker
        defaultDate={new Date()}
        minimumDate={MIN_DATE}
        maximumDate={MAX_DATE}
        locale={"en"}
        placeHolderText={PLACE_HOLDER}
        textStyle={{ color: "pink" }}
        placeHolderTextStyle={{ color: "grey" }}
        onDateChange={setChosenDate}
      />
    </View>
  );
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

export default createAppContainer(
  createBottomTabNavigator(
    {
      Home: { screen: HomeScreen },
      Settings: { screen: SettingsScreen },
    },
    {
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
    }
  )
);
