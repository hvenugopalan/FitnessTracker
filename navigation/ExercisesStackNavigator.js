import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExercisesView from '../screens/ExercisesView'
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import AddExercisesView from '../screens/AddExerciseView'
import EditExerciseView from '../screens/EditExerciseView'
class ExercisesStackNavigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }

    // componentDidMount() {
    //     this.getExercises();
    // }


    // getExercises() {
    //     fetch('https://mysqlcs639.cs.wisc.edu/activities', {
    //         method: 'GET',
    //         headers: { 'x-access-token': this.props.accessToken }
    //     })
    //         .then(res => res.json())
    //         .then(res => {
    //             //console.log(res.activities)
    //             this.setState({
    //                 activities: res.activities
    //             });
    //             this.props.update();

    //         });
    // }



    AddExerciseButton = () => {
        return <>
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddExercise')}>
                    <Text> <AntDesign name="plus" size={30} color="#fb5b5a" /></Text>
                </TouchableOpacity>
            </View>
        </>
    }

    SignoutButton = () => {
        return <>
            {/* <View style={{ flexDirection: 'row', marginRight: 25 }}> */}
            <TouchableOpacity onPress={this.props.revokeAccessToken}>
                <Text> <Icon name="sign-out" type='font-awesome' size={30} color="#fb5b5a"></Icon></Text>
            </TouchableOpacity>
            {/* </View> */}
        </>
    }


    render() {
        const ExercisesStack = createStackNavigator();
        return (
            <ExercisesStack.Navigator>
                <ExercisesStack.Screen name="Exercises" options={{
                    title: 'Exercises',
                    headerLeft: this.SignoutButton,
                    headerRight: this.AddExerciseButton,
                }}>
                    {(props) => <ExercisesView {...props} accessToken={this.props.accessToken} revokeAccessToken={this.props.revokeAccessToken} data={this.props.data} update={this.props.update} />}
                </ExercisesStack.Screen>
                <ExercisesStack.Screen name="AddExercise" options={{
                    title: 'Add Exercise'
                }}>
                    {(props) => <AddExercisesView {...props} accessToken={this.props.accessToken} revokeAccessToken={this.props.revokeAccessToken} mode="add" update={this.props.update} activityId="" />}
                </ExercisesStack.Screen>
                <ExercisesStack.Screen name="EditExercise" options={{
                    title: 'Edit Exercise'
                }}>
                    {(props) => <EditExerciseView {...props} accessToken={this.props.accessToken} revokeAccessToken={this.props.revokeAccessToken} update={this.props.update} />}
                </ExercisesStack.Screen>

            </ExercisesStack.Navigator>
        );
    }
}

const styles = StyleSheet.create({

});

export default ExercisesStackNavigator;