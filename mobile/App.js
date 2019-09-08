/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, useState } from 'react';
import { Container, Header, Content, DatePicker, Text, View, Fab } from 'native-base';

const DEFAULT_DATE = new Date(2017, 8, 28)
const MIN_DATE = new Date(2015, 8, 17)
const MAX_DATE = new Date(2019, 6, 8)
const PLACE_HOLDER = "Select Date"

const App = () => {
  const [ chosenDate, setChosenDate ] = useState(Date.now())

  return (
    <Container>
      <Header />
      <Content>
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
      </Content>
    </Container>
  );
};

export default App;
