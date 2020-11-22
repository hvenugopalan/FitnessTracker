import React from 'react';
import DateTimePickerView from './DateTimePickerView';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Button } from 'react-native';


class AddExercisesView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            exerciseName: '',
            duration: 0,
            caloriesBurnt: 0
        }
        this.handleSaveExercise = this.handleSaveExercise.bind(this);


    }


    setDateTime = (dateTime) => {
        this.setState({ date: dateTime });
    }

    handleSaveExercise() {
        if (this.props.mode === "add") {
            this.setState({
                exerciseName: this.state.exerciseName,
                duration: parseFloat(this.state.duration),
                date: this.state.date,
                caloriesBurnt: parseFloat(this.state.caloriesBurnt)
            }, () => fetch('https://mysqlcs639.cs.wisc.edu/activities/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': this.props.accessToken
                },
                body: JSON.stringify({
                    name: this.state.exerciseName,
                    duration: this.state.duration,
                    date: this.state.date,
                    calories: this.state.caloriesBurnt
                })
            })
                .then(res => res.json())
                .then(res => {
                    alert("Exercise added!");
                    this.props.update();
                    this.props.navigation.navigate('Exercises');

                })
                .catch(err => {
                    alert("Something went wrong! Verify you have filled out the fields correctly.");
                }));
        }
        else if (this.props.mode === "edit") {
            this.setState({
                exerciseName: this.state.exerciseName,
                duration: parseFloat(this.state.duration),
                date: this.state.date,
                caloriesBurnt: parseFloat(this.state.caloriesBurnt)
            }, () => fetch('https://mysqlcs639.cs.wisc.edu/activities/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': this.props.accessToken
                },
                body: JSON.stringify({
                    name: this.state.exerciseName,
                    duration: this.state.duration,
                    date: this.state.date,
                    calories: this.state.caloriesBurnt
                })
            })
                .then(res => res.json())
                .then(res => {
                    alert("Exercise updated!");
                    this.props.update();
                    this.props.navigation.navigate('Exercises');
                })
                .catch(err => {
                    alert("Something went wrong! Verify you have filled out the fields correctly.");
                }));
        }

    }


    render() {
        return (
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.subheading}>Exercise Details</Text>
                <Text style={styles.label}>Exercise Name</Text>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        value={this.state.exerciseName}
                        placeholder="Bucky"
                        placeholderTextColor="#003f5c"
                        onChangeText={(text) => this.setState({ exerciseName: text })} />
                </View>

                <Text style={styles.label}>Duration (minutes)</Text>
                <View style={styles.inputView} >
                    <TextInput
                        value={this.state.duration + ""}
                        style={styles.inputText}
                        placeholder="0"
                        placeholderTextColor="#003f5c"
                        onChangeText={(text) => this.setState({ duration: text })} />
                </View>
                <Text style={styles.label}>Calories Burnt</Text>
                <View style={styles.inputView} >
                    <TextInput
                        value={this.state.caloriesBurnt + ""}
                        style={styles.inputText}
                        placeholder="0"
                        placeholderTextColor="#003f5c"
                        onChangeText={(text) => this.setState({ caloriesBurnt: text })} />
                </View>
                <Text style={styles.label}>Exercise Date and Time</Text>
                <DateTimePickerView setDateTime={this.setDateTime} />
                <Text style={styles.inputText}>{this.state.date.toLocaleString()}</Text>
                <Text style={styles.subheading}>Looks good! All set?</Text>

                <TouchableOpacity style={styles.Btn} onPress={this.handleSaveExercise}>
                    <Text>SAVE EXERCISE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Btn} onPress={() => this.props.navigation.navigate('Exercises')}>
                    <Text >NEVERMIND</Text>
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

export default AddExercisesView;