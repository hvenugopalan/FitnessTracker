import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import { Dimensions } from 'react-native';

class ProfileView extends React.Component {

  /**
   * Specifies the default values that will be shown for a split second
   * while data is loading in from the server.
   */
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      goalDailyCalories: 0.0,
      goalDailyProtein: 0.0,
      goalDailyCarbohydrates: 0.0,
      goalDailyFat: 0.0,
      goalDailyActivity: 0.0
    };

    this.backToDayView = this.backToDayView.bind(this);
    this.handleSaveProfile = this.handleSaveProfile.bind(this);
  }

  /**
   * Fetch the data from the API after mounting; this may take a few seconds.
   * Once the data is fetched, it is stored into the state and then displayed
   * onto the fields.
   * 
   * This GET request requires us to specify our username and x-access-token,
   * both of which we inherit through props.
   */
  componentDidMount() {
    fetch('https://mysqlcs639.cs.wisc.edu/users/' + this.props.username, {
      method: 'GET',
      headers: { 'x-access-token': this.props.accessToken }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          firstName: res.firstName,
          lastName: res.lastName,
          goalDailyCalories: res.goalDailyCalories == 0 ? '' : res.goalDailyCalories,
          goalDailyProtein: res.goalDailyProtein == 0 ? '' : res.goalDailyProtein,
          goalDailyCarbohydrates: res.goalDailyCarbohydrates == 0 ? '' : res.goalDailyCarbohydrates,
          goalDailyFat: res.goalDailyFat == 0 ? '' : res.goalDailyFat,
          goalDailyActivity: res.goalDailyActivity == 0 ? '' : res.goalDailyActivity
        });
      });
  }

  /**
   * Make a PUT request to save all the entered information onto the server.
   * Note, we must check if what the user entered is a number. Once the state
   * is guarnteed to be set, we call the fetch function.
   * 
   * This PUT request requires us to specify our username and x-access-token,
   * both of which we inherit through props. Additionally, we are sending a
   * JSON body, so we need to specify Content-Type: application/json
   */
  handleSaveProfile() {
    this.setState({
      goalDailyCalories: parseFloat(this.state.goalDailyCalories),
      goalDailyProtein: parseFloat(this.state.goalDailyProtein),
      goalDailyCarbohydrates: parseFloat(this.state.goalDailyCarbohydrates),
      goalDailyFat: parseFloat(this.state.goalDailyFat),
      goalDailyActivity: parseFloat(this.state.goalDailyActivity)
    }, () => fetch('https://mysqlcs639.cs.wisc.edu/users/' + this.props.username, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.accessToken
      },
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        goalDailyCalories: this.state.goalDailyCalories,
        goalDailyProtein: this.state.goalDailyProtein,
        goalDailyCarbohydrates: this.state.goalDailyCarbohydrates,
        goalDailyFat: this.state.goalDailyFat,
        goalDailyActivity: this.state.goalDailyActivity
      })
    })
      .then(res => res.json())
      .then(res => {
        this.props.update();
        this.props.navigation.navigate('Today');
      })
      .catch(err => {
        alert("Something went wrong! Verify you have filled out the fields correctly.");
      }));

  }

  backToDayView() {
    this.props.navigation.navigate('Today');
  }

  /**
   * Displays and collects the profile information.
   * 
   * The styling could definitely be cleaned up; should be consistent!
   */
  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.logo}>About me</Text>
        <Text style={styles.inputText}>Let's get to know you! Specify your information below.</Text>
        <Text style={styles.subheading}>Personal Information</Text>
        <Text style={styles.label}>First Name</Text>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            value={this.state.firstName}
            placeholder="Bucky"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ firstName: text })} />
        </View>
        <Text style={styles.label}>Last Name</Text>
        <View style={styles.inputView} >
          <TextInput
            value={this.state.lastName}
            style={styles.inputText}
            placeholder="Badger"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ lastName: text })} />
        </View>
        <Text style={styles.subheading}>Fitness Goals</Text>
        <Text style={styles.label}>Daily Calories (kcal)</Text>
        <View style={styles.inputView} >
          <TextInput
            value={this.state.goalDailyCalories + ""}
            style={styles.inputText}
            placeholder="0"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ goalDailyCalories: text })} />
        </View>
        <Text style={styles.label}>Daily Protein (grams)</Text>
        <View style={styles.inputView} >
          <TextInput
            value={this.state.goalDailyProtein + ""}
            style={styles.inputText}
            placeholder="0"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ goalDailyProtein: text })} />
        </View>
        <Text style={styles.label}>Daily Carbs (grams)</Text>
        <View style={styles.inputView} >
          <TextInput
            value={this.state.goalDailyCarbohydrates + ""}
            style={styles.inputText}
            placeholder="0"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ goalDailyCarbohydrates: text })} />
        </View>
        <Text style={styles.label}>Daily Fat (grams)</Text>
        <View style={styles.inputView} >
          <TextInput
            value={this.state.goalDailyFat + ""}
            style={styles.inputText}
            placeholder="0"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ goalDailyFat: text })} />
        </View>
        <Text style={styles.label}>Daily Activity (mins)</Text>
        <View style={styles.inputView} >
          <TextInput
            value={this.state.goalDailyActivity + ""}
            style={styles.inputText}
            placeholder="0"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ goalDailyActivity: text })} />
        </View>
        <Text style={styles.subheading}>Looks good! All set?</Text>

        <TouchableOpacity style={styles.Btn} onPress={this.handleSaveProfile}>
          <Text>SAVE PROFILE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Btn} onPress={this.backToDayView}>
          <Text >EXIT</Text>
        </TouchableOpacity>


      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  scrollView: {
    flexGrow: 1,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },

  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
  },
  subheading: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#fb5b5a",
    marginBottom: 40
  },
  labels: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fb5b5a",
    marginBottom: 20
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

});

export default ProfileView;
