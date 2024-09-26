import { View, Pressable, StyleSheet } from 'react-native';
import React, { FC, useMemo, useCallback } from 'react';
import { Image } from 'expo-image';
import { widthPercentageToDP } from 'react-native-responsive-screen';

// Define PixabayImage interface
interface PixabayImage {
    id: number;
    webformatURL: string;
    largeImageURL?: string;
    imageHeight: number;
    imageWidth: number;
}

// Define the props interface
interface ImageCardProps {
    item: PixabayImage;
    index: number;
    setSelectedPhoto: any;
}

const ImageCard: FC<ImageCardProps> = ({ item, index, setSelectedPhoto }) => {
    const getImageHeight = () => {
        const aspectRatio = item.imageWidth / item.imageHeight;
        const imageWidth = widthPercentageToDP(48); // Two-column layout
        return { height: imageWidth / aspectRatio };
    };

    const dynamicImageStyle = useMemo(() => {
        return [styles.image, getImageHeight()];
    }, [item.imageHeight, item.imageWidth]);

    const handleImagePress = useCallback(() => {
        setSelectedPhoto(item);
    }, [item, setSelectedPhoto]);

    return (
        <Pressable 
            style={[styles.imageWrapper, index % 2 === 0 && styles.spaceXEnd]} 
            onPress={handleImagePress}
        >
            <Image
                style={dynamicImageStyle}
                source={{ uri: item.webformatURL }}
                transition={100}
                contentFit="cover"
                onError={() => console.log(`Failed to load image with ID: ${item.id}`)}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    imageWrapper: {
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: widthPercentageToDP(2),
        borderColor: '#3C3D37',
        borderWidth: 1,
    },
    image: {
        width: '100%',
    },
    spaceXEnd: {
        marginRight: widthPercentageToDP(2),
    }
});

export default ImageCard;
