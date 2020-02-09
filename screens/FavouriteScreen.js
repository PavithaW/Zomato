import React from 'react';
import { View, FlatList,StyleSheet } from 'react-native';
import {getData} from "../components/AsyncStorage/AsyncStorage"

export default function FavouriteScreen() {
var restaurents = getData();

const _renderItem = ({ item, index }) => (
  <ListItem
    item={item}
    index={index}
    isOnline={this.state.connection}
    onPressItem={this._onPressItem}
    isFavourite = {this.state.isFavourite}
  />
);
const _keyExtractor = (item, index) => index.toString();
  return (
    <View style={styles.container}>
      <FlatList
        data={restaurents}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
      />

    </View>
  );
}

FavouriteScreen.navigationOptions = {
  title: 'My Favourites ',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
