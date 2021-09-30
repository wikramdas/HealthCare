import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from "moment"
import store from '../redux/Reducers';
import { connect } from 'react-redux';
import { BIRTH_DATA } from '../redux/Constants';

const Home = (props) => {
    const { navigation } = props
    const [isLoading, setLoading] = useState(false)
    const [selectedDates, setSelectedDates] = useState(null)
    const [nextDate, setNextDate] = useState(null)
    const [nextDayParams, setNextDateParams] = useState({ nextDay: "00", nextMonth: "00" })

    const handleOnSubmit = () => {
        let url = "https://history.muffinlabs.com/date/" + nextDayParams.nextMonth + "/" + nextDayParams.nextDay
        console.log("url == ", url)
        setLoading(true)
        fetch(url, {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: ""
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("RESPONSE==>", JSON.stringify(responseJson.data.Births, null, 3))
                store.dispatch({ type: BIRTH_DATA, data: responseJson.data.Births })
                navigation.navigate("DataList")
                setLoading(false)
            }).catch((error) => {
                setLoading(false)
                console.log("======error=====", error)
            });
    }
    return (
        <View style={{ flex: 1, marginTop: 60, margin: 20 }}>
            <Calendar
                current={'2021-09-30'}
                onDayPress={(day) => {
                    var new_date = moment(day.dateString, "YYYY-MM-DD").add(1, 'days');
                    var nextDate = new_date.format('YYYY-MM-DD');

                    var nextDay = new_date.format('DD');
                    var nextMonth = new_date.format('MM');
                    setSelectedDates(day)
                    setNextDate(nextDate)
                    setNextDateParams({ nextDay, nextMonth })
                }}
                // monthFormat={'yyyy MM'}
                hideArrows={false}
                disableMonthChange={true}
                firstDay={1}
                hideDayNames={true}
                showWeekNumbers={true}
                disableArrowLeft={true}
                disableArrowRight={true}
                disableAllTouchEventsForDisabledDays={true}
                enableSwipeMonths={true}
            />
            <View style={{
                padding: 20, marginVertical: 50
            }}>
                <View style={styles.flexRow}>
                    <Text style={{
                        flex: 1, fontSize: 18
                    }}>Selected Date: </Text>
                    <Text style={{
                        fontSize: 18
                    }}>{selectedDates != null ? selectedDates.dateString : ""}</Text>
                </View>
                <View style={styles.flexRow}>
                    <Text style={{
                        marginVertical: 10,
                        flex: 1, fontSize: 18
                    }}>Next Date: </Text>
                    <Text style={{
                        fontSize: 18
                    }}>{nextDate != null ? nextDate : ""}</Text>
                </View>
            </View>
            <View style={{
                flex: 1
            }}>
                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => handleOnSubmit()}
                    style={{
                        borderRadius: 100, backgroundColor: "skyblue",
                        padding: 15, alignItems: "center"
                    }}
                    disabled={isLoading}
                >
                    {isLoading ?
                        <ActivityIndicator size={"small"} />
                        :
                        <Text style={{
                            fontSize: 20
                        }}>Submit</Text>
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    flexRow: {
        flexDirection: "row", alignItems: "center"
    }
})
mapStateToProps = (state) => {
    return {
        BirthsData: state.reducer.BirthsData,
    }
}
export default connect(mapStateToProps, null)(Home)