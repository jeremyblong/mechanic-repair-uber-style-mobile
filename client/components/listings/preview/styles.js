import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    containerScoll: {    
        minHeight: height,
        width,
        backgroundColor: "white"
    },
    container: {
        backgroundColor: 'white',
        minHeight: "100%",
        height: "100%", 
        width
    },
    slideUpContainer: {
        backgroundColor: 'white',
        minHeight: height,
        height: height, 
        width
    },
    spacetop: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        marginTop: 30
    },
    slideUpButton: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    textInput: {    
        minHeight: 50,
        width: "100%",
        borderWidth: 2, 
        borderColor: "lightgrey",
        padding: 14
    },
    topTop: {
        flexDirection: "row",
        margin: 20,
        marginTop: 20
    },
    headerIcon: {
        maxWidth: 35, 
        maxHeight: 35
    },
    headerText: {
        textAlign: "center",
        fontSize: 18, 
        fontWeight: "bold"
    },
    heartButton: {
        right: -20
    },
    customTextThree: {
        fontSize: 18, 
        color: "blue", 
        marginTop: 10, 
        marginLeft: 5
    },
    rowCustomTwo: {
        maxHeight: 75,
        flexDirection: "row"
    },
    category: {
        fontSize: 30,
        textAlign: "left",
        fontWeight: "bold",
        marginTop: 20
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    minButton: {
        backgroundColor: "#c40d00",
        width: width * 0.80,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    title: {
        fontSize: 18,
        textAlign: "left", 
        marginTop: 100,
        marginBottom: 10
    },
    row: {
        flexDirection: "row"
    },
    medal: {
        maxWidth: 15, 
        marginRight: 10, 
        maxHeight: 15, 
        marginLeft: 14, 
        tintColor: "red"
    },
    location: {
        textDecorationLine: 'underline'
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1,
        marginTop: 30
    },
    mildBoldText: {
        fontWeight: "bold",
        fontSize: 24
    },
    containerTwo: {
        width,
        marginLeft: 20
    },
    rowMargin: {
        margin: 0,
        flexDirection: "row"
    },
    marginMargin: {
        margin: 20
    },
    hrTwo: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1,
        marginTop: 20
    },
    hrFour: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1
    },
    hrThree: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1,
        marginTop: 10
    },
    p: {
        fontSize: 18
    },
    descriptionTitle: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10
    },
    column: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        width: width * 0.25,
        minHeight: 100
    },
    columnCustom: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        width: width * 0.2,
        minHeight: 100
    },
    centeredText: {
        textAlign: "center"
    },
    centeredTextCustom: {
        textAlign: "right",
        fontSize: 18,
        color: "blue"
    },
    columnColumn: {
        maxHeight: 100,
        width: width * 0.25,
        flexDirection: "column"
    },
    bottomView: {
        position: "absolute",
        bottom: 20
    },
    desc: {
        fontSize: 28,
        color: "white",
        fontWeight: "bold",
        padding: 20,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        marginBottom: 15
    },
    slideshowBtn: {
        borderWidth: 2,
        borderColor: "black",
        marginLeft: 20,
        backgroundColor: "white"
    },
    marginCentered: {
        margin: 20,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    backgroundSlider: {
        minHeight: 350,
        width: width * 0.65
    },
    columnColumnLeft: {
        maxHeight: 100,
        width: width * 0.75,
        flexDirection: "column"
    },
    rowRow: {
        flexDirection: "row"
    },
    contentContent: {
        borderColor: "white"
    },  
    map: {
        flex: 1,
        marginTop: 30,
        minWidth: width * 0.85,
        minHeight: 300
    },
    innerPaneButton: {
        backgroundColor: "#8884FF",
        borderWidth: 2,
        borderColor: "black",
        width: width * 0.85,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    bottomSlideUpContainer: {
        position: "absolute",
        bottom: 10,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    }
});
    