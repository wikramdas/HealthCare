import moment from "moment";
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { connect } from 'react-redux';

const DataList = (props) => {
    const { BirthsData, navigation } = props
    console.log("RESPONSE==>", JSON.stringify(BirthsData, null, 3))
    return (
        <View style={{ flex: 1, marginTop: 60, margin: 20 }}>
            <FlatList
                data={BirthsData}
                renderItem={({ item, index }) => (
                    <View key={index.toString()}
                        style={{
                            paddingHorizontal: 20, flexDirection: "row",
                            borderBottomColor: "#ccc", borderBottomWidth: 1,
                            paddingVertical: 15, alignItems: "center"
                        }}>
                        <Text style={{
                            flex: 2, fontSize: 17
                        }}>{item.text}</Text>
                        <Text style={{
                            fontSize: 17, flex: 1,
                            alignItems: "flex-end", justifyContent: "flex-end", textAlign: "right"
                        }}>{item.year}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.5}
            // onEndReached={handleLoadMore}
            // onRefresh={() => {
            //     fetchData()
            // }}
            />
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
export default connect(mapStateToProps, null)(DataList)