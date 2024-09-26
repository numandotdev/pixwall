import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Pressable, SafeAreaView, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Feather } from '@expo/vector-icons';
import { router } from "expo-router";
import axios from "axios";
import { MasonryFlashList } from "@shopify/flash-list";
import ImageCard from "@/components/ImageCard";
import ModalView from "@/components/ModalView";

// Pixabay API key and base URL
const PIXABAY_API_KEY = '46127393-89bb2908b49efd25030276fa5';
const PIXABAY_API_URL = 'https://pixabay.com/api/';

// Interface for the image object
interface PixabayImage {
    id: number;
    webformatURL: string;
    largeImageURL: string;
    tags: string;
    imageHeight: number;
    imageWidth: number;
}

export default function HomeScreen() {
    const [images, setImages] = useState<PixabayImage[]>([]);
    const [selectedPhoto, setSelectedPhoto] = useState<PixabayImage | null>(null);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false); // Loading state for infinite scroll
    const [page, setPage] = useState(1); // Track the current page for pagination
    const [searchQuery, setSearchQuery] = useState('');
    const [hasMore, setHasMore] = useState(true); // To check if more images are available

    const categories = ["", "backgrounds", "fashion", "nature", "science", "education", "feelings", "health", "people", "religion", "places", "animals", "industry", "computer", "food", "sports", "transportation", "travel", "buildings", "business", "music"];

    // Fetch images from Pixabay API
    const fetchImages = async (pageNum: number, query: string = '', orientation: string = '') => {
        if (loading || loadingMore) return;

        const setLoader = pageNum === 1 ? setLoading : setLoadingMore;
        setLoader(true);
        try {
            const response = await axios.get<{ hits: PixabayImage[] }>(PIXABAY_API_URL, {
                params: {
                    key: PIXABAY_API_KEY,
                    q: query,
                    page: pageNum,
                    per_page: 40,
                    image_type: 'photo',
                    orientation: orientation,
                },
            });

            const fetchedImages = response.data.hits;
            if (fetchedImages.length === 0) {
                setHasMore(false); // No more images available
            } else {
                setImages((prevImages) => (pageNum === 1 ? fetchedImages : [...prevImages, ...fetchedImages]));
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoader(false);
        }
    };

    // Initial fetch when the component mounts
    useEffect(() => {
        fetchImages(1, searchQuery);
    }, [searchQuery]);

    // Load more images when reaching the end
    const loadMoreImages = () => {
        if (hasMore && !loadingMore) {
            setPage((prevPage) => {
                const nextPage = prevPage + 1;
                fetchImages(nextPage, searchQuery);
                return nextPage;
            });
        }
    };

    // Handle category wise search
    const handleCategorySearch = (category: string) => {
        setSearchQuery(category);
        setPage(1);
        setHasMore(true);
    };

    return (
        <SafeAreaView style={styles.homeContainer}>
            <View style={styles.main}>
                <View style={styles.heroContainer}>
                    <Text style={styles.brandName}>Pixwalls</Text>
                    <Pressable style={styles.pfpContainer} onPress={() => router.push("/profile")}>
                        <Image contentFit="cover" style={styles.pfpImg} source={require('../assets/images/default-pfp.jpg')} />
                    </Pressable>
                </View>
                <View style={styles.searchContainerMain}>
                    <View style={styles.searchContainer}>
                        <Feather name="search" size={20} color="#999" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search for photos..."
                            placeholderTextColor="#999"
                            onSubmitEditing={(event) => setSearchQuery(event.nativeEvent.text)}
                        />
                    </View>
                </View>
                <View style={styles.categories}>
                    <FlatList
                        data={categories}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                style={[styles.categoriesItem, index === 0 && styles.firstCategoryItem]}
                                onPress={() => handleCategorySearch(item)}
                            >
                                <Text>{item.toLowerCase() || "all"}</Text>
                            </TouchableOpacity>
                        )}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={styles.wallContainer}>
                    <MasonryFlashList
                        data={images}
                        numColumns={2}
                        renderItem={({ item, index }) => (
                            <ImageCard item={item} index={index} setSelectedPhoto={setSelectedPhoto} />
                        )}
                        estimatedItemSize={200}
                        onEndReached={loadMoreImages}
                        onEndReachedThreshold={0.5} // Trigger the fetch when the user is halfway through the content
                        ListFooterComponent={
                            loadingMore ? (
                                <View style={styles.loaderContainer}>
                                    <ActivityIndicator size="large" color="#ffffff" />
                                </View>
                            ) : null
                        }
                        contentContainerStyle={styles.listContainerStyle}
                    />
                </View>
                {selectedPhoto && <ModalView selectedPhoto={selectedPhoto} setSelectedPhoto={setSelectedPhoto} />}
            </View>
            <StatusBar style="dark" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        backgroundColor: '#010101',
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
        color: '#f5f5f5',
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
        backgroundColor: '#3C3D37',
        width: '100%',
        height: hp(6),
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 16,
        gap: 8,
    },
    searchInput: {
        color: '#fff',
        flex: 1,
    },
    categories: {
        width: wp(100),
    },
    categoriesItem: {
        marginRight: 8,
        backgroundColor: '#ddd',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
    },
    firstCategoryItem: {
        marginLeft: 20,
    },
    wallContainer: {
        flex: 1,
        width: wp(100),
    },
    listContainerStyle: {
        paddingHorizontal: 20,
    },
    loaderContainer: {
        paddingVertical: 20,
    },
});

