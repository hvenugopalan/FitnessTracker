import React from 'react';
import LoginView from './screens/LoginView';
import SignupView from './screens/SignupView';
import TodayView from './screens/TodayView'
import ProfileView from './screens/ProfileView'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import ExercisesStackNavigator from './navigation/ExercisesStackNavigator';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      accessToken: undefined,
      username: undefined,
      goalDailyActivity: 0,
      activities: [],
      allActivities: [],
      activityDone: 0
    }
    this.getExercises = this.getExercises.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.update = this.update.bind(this);

    this.login = this.login.bind(this);
    this.revokeAccessToken = this.revokeAccessToken.bind(this);

    this.SignoutButton = this.SignoutButton.bind(this);
  }

  /**
   * Store the username and accessToken here so that it can be
   * passed down to each corresponding child view.
   */
  login(username, accessToken) {
    this.setState({
      username: username,
      accessToken: accessToken
    });
    this.update();
  }

  /**
   * Revokes the access token, effectively signing a user out of their session.
   */
  revokeAccessToken() {
    this.setState({
      accessToken: undefined
    });
  }

  /**
   * Defines a signout button... Your first TODO!
   */
  SignoutButton = () => {
    return <>
      {/* <View style={{ flexDirection: 'row', marginRight: 25 }}> */}
      <TouchableOpacity onPress={this.revokeAccessToken}>
        <Text> <Icon name="sign-out" type='font-awesome' size={30} color="#fb5b5a"></Icon></Text>
      </TouchableOpacity>
      {/* </View> */}
    </>
  }



  update() {
    this.getProfile();
    this.getExercises();
  }

  getProfile() {
    fetch('https://mysqlcs639.cs.wisc.edu/users/' + this.state.username, {
      method: 'GET',
      headers: { 'x-access-token': this.state.accessToken }
    })
      .then(res => res.json())
      .then(res => {
        //console.log(res);
        this.setState({
          goalDailyActivity: res.goalDailyActivity == 0 ? '' : res.goalDailyActivity
        });
      });
  }

  getExercises() {
    fetch('https://mysqlcs639.cs.wisc.edu/activities', {
      method: 'GET',
      headers: { 'x-access-token': this.state.accessToken }
    })
      .then(res => res.json())
      .then(res => {
        let exercises = [];
        let activityFinished = 0;
        //console.log(res.activities)
        res.activities.forEach((activity) => {
          let date = new Date(activity.date);
          let today = new Date();

          if (date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()) {
            activityFinished += activity.duration;
            exercises.push(activity);

          }
        });
        this.setState({
          activities: exercises,
          allActivities: res.activities,
          activityDone: activityFinished
        });
      });
  }

  /**
   * Note that there are many ways to do navigation and this is just one!
   * I chose this way as it is likely most familiar to us, passing props
   * to child components from the parent.
   * 
   * Other options may have included contexts, which store values above
   * (similar to this implementation), or route parameters which pass
   * values from view to view along the navigation route.
   * 
   * You are by no means bound to this implementation; choose what
   * works best for your design!
   */
  render() {

    // Our primary navigator between the pre and post auth views
    // This navigator switches which screens it navigates based on
    // the existent of an access token. In the authorized view,
    // which right now only consists of the profile, you will likely
    // need to specify another set of screens or navigator; e.g. a
    // list of tabs for the Today, Exercises, and Profile views.
    let AuthStack = createStackNavigator();
    let Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();
    const ProfileStack = createStackNavigator();
    const screenOptionStyle = {
      // headerStyle: {
      //   backgroundColor: "#9AC4F8",
      // },
      // headerTintColor: "white",
      // headerBackTitle: "Back",
    };



    const ProfileStackNavigator = () => {
      return (
        <ProfileStack.Navigator screenOptions={screenOptionStyle}>
          <ProfileStack.Screen name="Profile" options={{
            title: 'Profile',
            headerLeft: this.SignoutButton
          }} >
            {(props) => <ProfileView {...props} username={this.state.username} accessToken={this.state.accessToken} revokeAccessToken={this.revokeAccessToken} update={this.update} />}
          </ProfileStack.Screen>
        </ProfileStack.Navigator>
      );
    };

    const DayViewStackNavigator = () => {
      return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
          <Stack.Screen name="Today" options={{
            title: 'Today',
            headerLeft: this.SignoutButton
          }}>
            {(props) => <TodayView {...props} goalDailyActivity={this.state.goalDailyActivity} activities={this.state.activities} activityDone={this.state.activityDone} revokeAccessToken={this.revokeAccessToken} />}
          </Stack.Screen>
        </Stack.Navigator>
      );
    };

    // const ExercisesStackNavigator = (props) => {
    //   return (
    //     <ExercisesStack.Navigator screenOptions={screenOptionStyle}>
    //       <ExercisesStack.Screen name="Exercises" options={{
    //         title: 'Exercises',
    //         headerLeft: this.SignoutButton,
    //         headerRight: ({ nv }) => <Text onPress={() => console.log(nv)}> hello</Text>,
    //       }}>
    //         {(props) => <ExercisesView {...props} username={this.state.username} accessToken={this.state.accessToken} revokeAccessToken={this.revokeAccessToken} />}
    //       </ExercisesStack.Screen>
    //       <ExercisesStack.Screen name="AddExercise" options={{
    //         title: 'Add Exercise'
    //       }}>
    //         {(props) => <AddExerciseView {...props} username={this.state.username} accessToken={this.state.accessToken} revokeAccessToken={this.revokeAccessToken} />}
    //       </ExercisesStack.Screen>
    //     </ExercisesStack.Navigator>
    //   );
    // };


    const BottomTabNavigator = () => {
      return (
        <Tab.Navigator
          initialRouteName="Feed"
          tabBarOptions={{
            activeTintColor: '#e91e63',
          }}
        >
          <Tab.Screen name="Today" options={{
            tabBarLabel: 'Today',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="today" size={size} color={color} />
            ),
          }} component={DayViewStackNavigator} />
          <Tab.Screen name="Profile" options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }} component={ProfileStackNavigator} />
          <Tab.Screen name="Exercises" options={{
            tabBarLabel: 'Exercises',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="running" size={size} color={color} />
            ),
          }} >
            {(props) => <ExercisesStackNavigator {...props} username={this.state.username} accessToken={this.state.accessToken} revokeAccessToken={this.revokeAccessToken} update={this.update} data={this.state.allActivities}></ExercisesStackNavigator>}
          </Tab.Screen>


        </Tab.Navigator>);
    };


    return (
      <NavigationContainer>

        {!this.state.accessToken ? (
          <>
            <AuthStack.Navigator>
              <AuthStack.Screen
                name="Login"
                options={{
                  title: 'Fitness Tracker Welcome',
                }}
              >
                {(props) => <LoginView {...props} login={this.login} />}
              </AuthStack.Screen>

              <AuthStack.Screen
                name="SignUp"
                options={{
                  title: 'Fitness Tracker Signup',
                }}
              >
                {(props) => <SignupView {...props} />}
              </AuthStack.Screen>
            </AuthStack.Navigator>
          </>
        ) : (
            // <>
            //   <AuthStack.Screen name="FitnessTracker" options={{
            //     headerLeft: this.SignoutButton
            //   }}>
            //     {(props) => <ProfileView {...props} username={this.state.username} accessToken={this.state.accessToken} revokeAccessToken={this.revokeAccessToken} />}
            //   </AuthStack.Screen>
            // </>
            <BottomTabNavigator />
          )}
      </NavigationContainer >
    );
  }
}

export default App;
