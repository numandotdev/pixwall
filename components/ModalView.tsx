import { Image, Modal, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { FC, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';

interface PixabayImage {
    id: number;
    webformatURL: string;
    largeImageURL?: string;
    imageHeight: number;
    imageWidth: number;
}

interface ModalViewProps {
    selectedPhoto: PixabayImage;
    setSelectedPhoto: any;
}

const ModalView: FC<ModalViewProps> = ({ selectedPhoto, setSelectedPhoto }) => {
    const closeModal = () => {
        setSelectedPhoto(null);
    };

    // Function to request media library permissions
    const requestPermission = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'You need to grant storage permissions to download the image.');
            return false;
        }
        return true;
    };

    const downloadImage = async () => {
        try {
            const hasPermission = await requestPermission();
            if (!hasPermission) return;

            // Define the URI of the image to download
            const imageUri = selectedPhoto?.largeImageURL || selectedPhoto?.webformatURL;
            const fileUri = `${FileSystem.cacheDirectory}${selectedPhoto?.id}.jpg`;

            // Download the image to cache directory
            const { uri } = await FileSystem.downloadAsync(imageUri, fileUri);

            // Save the image to the media library (gallery)
            const asset = await MediaLibrary.createAssetAsync(uri);
            await MediaLibrary.createAlbumAsync('Downloads', asset, false);

            Alert.alert('Download Complete', 'The image has been downloaded and saved to your gallery.');
        } catch (error) {
            console.error('Error downloading image:', error);
            Alert.alert('Download Failed', 'There was an error downloading the image.');
        }
    };

    return (
        <Modal visible={!!selectedPhoto} transparent={true} onRequestClose={closeModal}>
            <View style={styles.modalContainer}>
                <Image source={{ uri: selectedPhoto?.webformatURL }} style={styles.fullImage} />
                <View style={styles.modalButtons}>
                    <TouchableOpacity style={styles.button} onPress={closeModal}>
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={downloadImage}>
                        <Text style={styles.buttonText}>Download</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ModalView;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullImage: {
        width: '100%',
        height: '80%',
        resizeMode: 'contain',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#ffffff',
        padding: 12,
        borderRadius: 8,
        minWidth: 120,
        alignItems: 'center',
    },
    buttonText: {
        color: '#333333',
        fontWeight: 'bold',
    },
});
