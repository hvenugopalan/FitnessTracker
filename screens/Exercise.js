import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
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
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.title}>{this.props.data.name}</Text>
                        <View style={{ flexDirection: 'row', flex: 0.2, textAlign: 'right' }}>
                            <Entypo name="edit" accessible={true} accessibilityLabel="Edit exercise" accessibilityHint={"Double tap to edit your exercise " + this.props.data.name + " done on " + new Date(this.props.data.date).toLocaleString() + " UTC"}
                                size={24} color="black" onPress={() => { this.props.edit(this.props.data.id) }} />
                            <MaterialIcons name="delete" accessible={true} accessibilityLabel="Delete exercise" accessibilityHint={"Double tap to delete your exercise " + this.props.data.name + " done on " + new Date(this.props.data.date).toLocaleString() + " UTC"} size={24} color="black" onPress={() => { this.props.delete(this.props.data.id) }} />

                        </View>

                    </View>
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
        flex: 1
    },

});

export default Exercise;