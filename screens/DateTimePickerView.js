import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Button } from 'react-native';


class DateTimePickerView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            mode: 'date',
            show: false,
        }

    }

    componentDidMount() {

    }

    showMode = (currentMode) => {
        this.setState({ show: true });
        this.setState({ mode: currentMode });
    };

    showDatepicker = () => {
        this.showMode('date')
    };

    showTimepicker = () => {
        this.showMode('time')

    };

    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date;
        this.setState({ show: Platform.OS === 'ios' });
        this.setState({ date: currentDate });
        this.props.setDateTime(currentDate);
    };


    render() {
        return (
            <View style={styles.inputView}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.sideBtn} onPress={this.showDatepicker}>
                        <Text>Set Date</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sideBtn} onPress={this.showTimepicker}>
                        <Text >Set Time</Text>
                    </TouchableOpacity>
                </View>


                {this.state.show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.date}
                        mode={this.state.mode}
                        is24Hour={true}
                        display="default"
                        onChange={this.onChange}
                    />
                )}
            </View>
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
    sideBtn: {
        width: "50%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        marginTop: 40,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default DateTimePickerView;