import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function FavouriteScreen() {
  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
      
    </ScrollView>
  );
}

FavouriteScreen.navigationOptions = {
  title: 'My Favourites ',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
