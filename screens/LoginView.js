import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import base64 from 'base-64';

class LoginView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  /**
   * Logs in to the application.
   * 
   * Note that we have to follow the authorization rules; a header
   * with a base64-encoded username and password.
   * 
   * Upon response, we analyze whether or not we are successful.
   * If successful, we use a callback from App to log us in and
   * store the username and token in App.
   */
  handleLogin = async () => {
    try {
      let response = await fetch('https://mysqlcs639.cs.wisc.edu/login', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + base64.encode(this.state.username + ':' + this.state.password)
        }
      });
      let userJson = await response.json();

      if (userJson.message !== undefined) {
        if (userJson.message == "Could not verify")
          alert('Username or password is incorrect! Please try again.');
        else
          alert(userJson.message);
      }
      else
        //alert('Successfully Logged In!');
        this.props.login(this.state.username, userJson.token);
      //navigation.navigate('Profile', { token: userJson.token, username: username });

      // setUsername('')
      // setPassword('')
    }
    catch (error) {
      console.error(error);
    }
  };

  // handleLogin() {
  //   fetch('https://mysqlcs639.cs.wisc.edu/login', {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': 'Basic ' + base64.encode(this.state.username + ":" + this.state.password)
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       if (res.token) {
  //         this.props.login(this.state.username, res.token);
  //       } else {
  //         alert("Incorrect username or password! Please try again.");
  //       }
  //     });
  // }

  /**
   * Use React Navigation to switch to the Sign Up page.
   */
  handleSignup() {
    this.props.navigation.navigate('SignUp');
  }

  /**
   * Displays and collects the login information.
   * 
   * The styling could definitely be cleaned up; should be consistent!
   */
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Fitness Tracker</Text>
        <Text style={styles.inputText} accessible={true} accessibilityLabel="Enter your username and password below to login or click on the signup button at the bottom of the screen." >Welcome! Please login or signup to continue.</Text>
        <Text>Username</Text>
        <View style={styles.inputView}>

          <TextInput
            value={this.state.username}
            style={styles.inputText}
            // placeholder="Enter username"
            accessible={true}
            accessibilityLabel="Username input field"
            textContentType="username"
            accessibilityHint="Double tap and then use the keyboard to enter your username. Once you are done, click the password field below."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ username: text })} />
        </View>
        <Text style={styles.label}>Password</Text>

        <View style={styles.inputView}>
          <TextInput
            value={this.state.password}
            secureTextEntry
            style={styles.inputText}
            accessible={true}
            accessibilityLabel="Password input field"
            accessibilityHint="Double tap and then use the keyboard to enter your password. Once you are done, click the login button below"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ password: text })} />
        </View>
        <TouchableOpacity accessibilityLabel="login" accessibilityHint="Double tap to login to the application."
          style={styles.Btn} onPress={this.handleLogin}>
          <Text>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.BackGBtn} onPress={this.handleSignup}>
          <Text >Signup</Text>
        </TouchableOpacity>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
  },
  inputView: {
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
  },

  Btn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  BackGBtn: {
    width: "80%",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'grey',
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },

});

export default LoginView;
