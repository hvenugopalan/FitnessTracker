import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, ActionSheetIOS } from 'react-native';
import { Card } from 'react-native-elements'



class TodayView extends React.Component {
    constructor(props) {
        super(props);

        this.getExercisesView = this.getExercisesView.bind(this);
    }


    getExercisesView() {
        let cards = [];
        //console.log("Here: " + this.props.activities);
        this.props.activities.forEach((activity) => {
            cards.push(
                <Card key={activity.id}>
                    <Text style={styles.title}>{activity.name}</Text>
                    <Card.Divider />
                    <Text>Date: {new Date(activity.date).toLocaleString()} UTC</Text>
                    <Text>Duration: {activity.duration}</Text>
                    <Text>Calories burned: {activity.calories}</Text>
                </Card>
            );
        });
        return cards;
    }


    render() {
        return (
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.subheading}>Goals</Text>

                <Card key="dailyGoal">
                    <Text style={styles.title}> Daily activity </Text>
                    <Card.Divider />

                    <Text>{this.props.activityDone}/{this.props.goalDailyActivity} minutes done.</Text>
                </Card>
                <Text style={styles.subheading}>Exercises</Text>
                {this.getExercisesView()}

            </ScrollView>);
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
export default TodayView;