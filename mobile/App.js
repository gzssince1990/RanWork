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

const PLACE_HOLDER = "Select Date"

const HomeScreen = () => {
  const [ chosenDate, setChosenDate ] = useState(Date.now())

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>

      <DatePicker
        defaultDate={new Date()}
        locale={"en"}
        placeHolderText={PLACE_HOLDER}
        textStyle={{ color: "pink" }}
        placeHolderTextStyle={{ color: "grey" }}
        onDateChange={setChosenDate}
      />
    </View>
  );
}

const ReportsScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Reports!</Text>
    </View>
  );
}

export default createAppContainer(
  createBottomTabNavigator(
    {
      Home: { screen: HomeScreen },
      Reports: { screen: ReportsScreen },
    },
    {
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
    }
  )
);
