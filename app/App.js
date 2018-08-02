import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'

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

  _signIn() {
    GoogleSignin.hasPlayServices({ autoResolve: true })
    .then(() => {
      // play services are available. can now configure library
    })
    .catch(err => {
      console.log('Play services error', err.code, err.message);
    });
  }

  render() {
    /*return (
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
    )*/
    return (
      <View style={styles.container}>
        <GoogleSigninButton
          style={{ width: 48, height: 48 }}
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Dark}
          onPress={this._signIn}
        />
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
    color: '#fff'
  },
  google: {
    backgroundColor: 'orange'
  },
  facebook: {
    backgroundColor: '#4F0',
  },
});