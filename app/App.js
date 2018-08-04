import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isLoading: true}
  }

  onPress(event) {
    fetch('http://192.168.1.33:3000/login/google', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      }),
    })
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson)
    })
    .catch(error => {
      console.error(error)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.onPress}
          style={[styles.button, styles.google]}
        >
          <Text>Google Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.onPress}
          style={[styles.button, styles.facebook]}
        >
          <Text>Facebook Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 4,
    padding: 10,
  },
  google: {
    backgroundColor: 'orange'
  },
  facebook: {
    backgroundColor: '#4F0',
  },
});