import React from 'react';

import { StyleSheet, Text } from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { Card } from 'react-native-elements';


class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    componentDidMount() {

    }

    render() {
        return (
            <>
                <Card key={this.props.data.id}>
                    <Text style={styles.title}>{this.props.data.name}</Text>
                    <Text style={styles.actions}>
                        <Entypo name="edit" size={24} color="black" onPress={() => { this.props.edit(this.props.data.id) }} />
                        <MaterialIcons name="delete" size={24} color="black" onPress={() => { this.props.delete(this.props.data.id) }} />
                    </Text>
                    <Card.Divider />
                    <Text>Date: {new Date(this.props.data.date).toLocaleString()} UTC</Text>
                    <Text>Duration: {this.props.data.duration}</Text>
                    <Text>Calories burned: {this.props.data.calories}</Text>
                </Card>
            </>);
    }
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#fb5b5a",
        textAlign: 'left',
    },
    actions: {
        textAlign: 'right',
    }
});

export default Exercise;