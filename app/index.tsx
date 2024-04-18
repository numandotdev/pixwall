import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Redirect, router } from "expo-router";

export default function index() {
    return (
        <View style={styles.container}>
            {/* <Redirect href="/home" /> */}
            <Image
                style={styles.bgImage}
                source={require("../assets/images/Welcome.png")}
                resizeMode="cover"
            />
            <View style={styles.textContainer}>
                <Text style={styles.title}>PIXWALL</Text>
                <Text style={styles.tagline}>Every Pixel Tells A Story</Text>
                <TouchableOpacity style={styles.button} onPress={() => {
                    router.push({ pathname: '/home' })
                }}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: wp(100),
        height: hp(100),
    },
    bgImage: {
        width: wp(100),
        height: hp(100),
    },
    textContainer: {
        position: "absolute",
        bottom: 0,
        width: wp(100),
        height: hp(40),
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    title: {
        fontSize: hp(6),
        fontWeight: "800",
        color: "#000",
    },
    tagline: {
        fontSize: hp(2),
        fontWeight: "500",
        color: "#000",
    },
    button: {
        width: wp(70),
        height: hp(6),
        backgroundColor: "#000",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: hp(2),
        fontWeight: "600",
    },
});
