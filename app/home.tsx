import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Pressable, SafeAreaView, StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Feather } from '@expo/vector-icons';
import { router } from "expo-router";

export default function home() {
    const categoriesList: String[] = ["artificial intelligent", "people", "Nature", "Anime", "movie", "place",];
    const wallpaperList = [
        require('../assets/images/wall-1.jpeg'),
        require('../assets/images/wall-2.jpg'),
        require('../assets/images/wall-3.webp'),
        require('../assets/images/wall-4.jpg'),
        require('../assets/images/wall-5.jpeg'),
        require('../assets/images/wall-6.jpeg')
    ];
    return (
        <SafeAreaView style={styles.homeContainer}>
            <View style={styles.main}>
                <View style={styles.heroContainer}>
                    <Text style={styles.brandName}>Pixwalls</Text>
                    <Pressable style={styles.pfpContainer} onPress={() => router.push({ pathname: "/profile" })}>
                        <Image resizeMode="center" style={styles.pfpImg} source={require('../assets/images/default-pfp.jpg')} />
                    </Pressable>
                </View>
                <View style={styles.searchContainerMain}>
                    <View style={styles.searchContainer}>
                        <Feather name="search" size={20} color="#999" />
                        <TextInput style={styles.searchInput} placeholder="Search for photos..." placeholderTextColor="#999" />
                    </View>
                </View>
                <View style={styles.categories}>
                    <ScrollView style={styles.categoriesContainer} horizontal={true} showsHorizontalScrollIndicator={false} >
                        {
                            categoriesList.map((category, index) => {
                                return (
                                    <Pressable key={index} style={[styles.categoriesItem, index == 0 && styles.firstCategoryItem]}>
                                        <Text style={styles.categoriesItemText}>{category.toLowerCase()}</Text>
                                    </Pressable>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <View style={styles.mainContent}>
                    <ScrollView style={styles.photosContainer} showsVerticalScrollIndicator={false} >
                        <View style={styles.photosContainerItemGroup} >
                            {
                                wallpaperList.map((path, index) => {
                                    return (
                                        <TouchableOpacity key={index} style={styles.photosContainerItem}>
                                            <Image style={styles.photosContainerItemImg} resizeMode="cover" source={path} />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                </View>
            </View>
            <StatusBar style="dark" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        backgroundColor: '#eee',
    },
    main: {
        width: wp(100),
        height: hp(100),
        rowGap: 16,
    },
    heroContainer: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    brandName: {
        fontSize: hp(3),
        fontWeight: '700',
        color: '#000',
    },
    pfpContainer: {
        width: 40,
        height: 40,
        borderRadius: 50,
        overflow: 'hidden',
    },
    pfpImg: {
        width: '100%',
        height: '100%',
    },
    searchContainerMain: {
        paddingHorizontal: 20,
    },
    searchContainer: {
        backgroundColor: '#fff',
        width: '100%',
        height: hp(6),
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 16,
        gap: 8,
    },
    searchInput: {
        color: '#000',
        flex: 1,
    },
    categories: {
        width: wp(100),
        // paddingHorizontal: 20,
    },
    categoriesContainer: {
        width: 'auto',
    },
    categoriesItem: {
        marginRight: 8,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
    },
    firstCategoryItem: {
        marginLeft: 20,
    },
    categoriesItemText: {},

    mainContent: {
        width: wp(100),
        paddingHorizontal: 20,
        // backgroundColor: 'tomato',
        paddingVertical: 5,
        height: 300,
        flex: 3,
    },
    photosContainer: {
        borderRadius: 10,
        maxHeight: hp(86),
        width: '100%',
        flexGrow: 1,
    },
    photosContainerItemGroup: {
        flex: 1,
        gap: 8,
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 'auto',
        paddingBottom: 100,
    },
    photosContainerItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 300,
        flexGrow: 1,
        flexBasis: (wp(100) - 50) / 2,
        maxWidth: '50%',
        overflow: 'hidden',
    },
    photosContainerItemImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },

})