/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import HomeScreen from './screens/HomeScreen'
import ReportScreen from './screens/ReportScreen'

const AppContainer = createAppContainer(
  createBottomTabNavigator(
    {
      Home: { screen: HomeScreen },
      Report: { screen: ReportScreen },
    },
    {
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
    }
  )
)

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: 'http://localhost:1108/graphql/'
})


const client = new ApolloClient({
  cache,
  link
})

const App = () => (
  <ApolloProvider client={client}>
    <AppContainer />
  </ApolloProvider>
)

export default App
