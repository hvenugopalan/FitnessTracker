import React from 'react';

import { StyleSheet, View } from 'react-native';
import Exercise from './Exercise';

class ExercisesView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.editExercise = this.editExercise.bind(this);
        this.deleteExercise = this.deleteExercise.bind(this);
    }

    editExercise(exerciseId) {
        this.props.navigation.navigate('EditExercise', {
            mode: "edit",
            activityId: exerciseId,
            accessToken: this.props.accessToken
        });
    }

    deleteExercise(exerciseId) {
        fetch('https://mysqlcs639.cs.wisc.edu/activities/' + exerciseId, {
            method: 'DELETE',
            headers: {
                'x-access-token': this.props.accessToken
            }
        })
            .then(res => res.json())
            .then(res => {
                alert("Exercise deleted!");
                this.props.update();
            })
            .catch(err => {
                alert("Something went wrong! Please try deleting again.");
            });
    }

    getCard(food) {
        return (
            <Exercise key={food.id} data={food} edit={this.editExercise} delete={this.deleteExercise} ></Exercise>
        );
    }

    getCards() {
        let cards = [];
        this.props.data.forEach((food) => {
            cards.push(this.getCard(food));
        });
        return cards;
    }

    render() {
        return (
            <View style={styles.container}>
                {this.getCards()}
            </View>
        );
    }
}

const styles = StyleSheet.create({

});

export default ExercisesView;