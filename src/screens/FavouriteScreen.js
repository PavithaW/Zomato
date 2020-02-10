import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { withNavigation } from "react-navigation";

import {
  SelectFavouriteRestaurents,
  UpdateFavouriteStatus
} from "../dbManager/DBManager"

class FavouriteScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favRestaurentArray: [],
    }
    this._loadRestaurents = this._loadRestaurents.bind(this)
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this._loadRestaurents()
    });
  }

  _loadRestaurents = async () => {
    await SelectFavouriteRestaurents(faveRestaurentArray => {
      this.setState({
        favRestaurentArray: faveRestaurentArray
      });
    })

  }

  _onPressItem = async (index, item, isFavourite) => {
    await UpdateFavouriteStatus(item.id, isFavourite)
    await this._loadRestaurents();
  }

  _renderItem = ({ item, index }) => (
    <ListItem
      item={item}
      index={index}
      isOnline={this.state.connection}
      onPressItem={this._onPressItem}
      isFavourite={this.state.isFavourite}
    />
  );
  _keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.favRestaurentArray}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />

      </View>
    );
  }
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

export default withNavigation(FavouriteScreen)