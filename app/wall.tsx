import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import axios from 'axios';
import MasonryList from 'react-native-masonry-list';

const UNSPLASH_API_KEY = '0S96bo1yWNtTg0JMIN5GS8YLdRFSmw9yT4OFGC67MUA';

interface Photo {
  id: string;
  urls: {
    regular: string;
    full: string;
  };
}

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random?count=30&client_id=${UNSPLASH_API_KEY}`
      );
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const handlePhotoPress = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const setWallpaper = () => {
    // Implement wallpaper setting logic here
    console.log('Setting wallpaper:', selectedPhoto?.urls.full);
    closeModal();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Wallpaper App</Text>
      </View>
      <MasonryList
        images={photos.map((photo) => ({
          uri: photo.urls.regular,
          id: photo.id,
        }))}
        onPressImage={(item) => handlePhotoPress(photos.find((photo) => photo.id === item.id) as Photo)}
        spacing={2}
        columns={2}
      />
      <Modal visible={!!selectedPhoto} transparent={true} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <Image source={{ uri: selectedPhoto?.urls.full }} style={styles.fullImage} />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.button} onPress={closeModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={setWallpaper}>
              <Text style={styles.buttonText}>Set Wallpaper</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
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