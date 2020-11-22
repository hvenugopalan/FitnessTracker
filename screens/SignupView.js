import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

class SignupView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }

    this.handleCreateAccount = this.handleSignUp.bind(this);
    this.backToLogin = this.backToLogin.bind(this);
  }

  /**
   * Make a POST request to create a new user with the entered information.
   * 
   * This POST request requires us to specify a requested username and password,
   * Additionally, we are sending a JSON body, so we need to specify
   * Content-Type: application/json
   * 
   * Note that we very cheaply check if the responded message is what we expect,
   * otherwise we display what we get back from the server. A more sophisticated
   * implementation would check the status code and give custom error messages
   * based on the response.
   */
  handleSignUp = async () => {
    try {
      let response = await fetch('https://mysqlcs639.cs.wisc.edu/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "username": this.state.username,
          "password": this.state.password
        })
      });
      let postResponse = await response.json();

      alert(postResponse.message);
      if (postResponse.message == 'User created!')
        this.props.navigation.navigate('Login');

    }
    catch (error) {
      console.error(error);
    }

  };

  /**
   * Use React Navigation to switch to the Log In page.
   */
  backToLogin() {
    this.props.navigation.navigate("Login");
  }

  /**
   * Displays and collects the sign up information.
   * 
   * The styling could definitely be cleaned up; should be consistent!
   */
  render() {
    return (
      <View style={styles.container} >
        <Text style={styles.logo}>Fitness Tracker</Text>
        <Text style={styles.inputText}>Welcome! Please login or signup to continue.</Text>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Username"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ username: text })} />
        </View>
        <View style={styles.inputView} >
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ password: text })} />
        </View>
        <TouchableOpacity style={styles.Btn} onPress={this.handleSignUp}>
          <Text>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.BackGBtn} onPress={this.backToLogin}>
          <Text>Login</Text>
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

export default SignupView;
