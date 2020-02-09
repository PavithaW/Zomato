import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
} from 'react-native';
import ListItem from "../components/ListItem/ListItem"
import { CreateDB, CreateTable, UpdateFavouriteStatus, SelectFromDB } from "../dbManager/DBManager"
import { setData } from "../components/AsyncStorage/AsyncStorage"
import fetchRestaurents from "../services/fetchRestaurentsData"

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurentArray: [],
      connection: false,
      isFavourite: false,
      favouriteRestaurentsArray: [],
    }
  }

  componentDidMount = () => {
    this._performApp();
  }

  _performApp = async () => {
    await this._setUpDb();
    await this._manageAppData();
  }

  _manageAppData = async () => {
    try {
      await fetchRestaurents();

      await SelectFromDB(offlineRestaurentArray => {
        this.setState({
          restaurentArray: offlineRestaurentArray
        });

        console.log('offlineArray:: ', this.state.restaurentArray);

      })
    } catch (e) {
      console.log(e)
    }
  }

  _setUpDb = () => {
    CreateDB("Restaurents");
    CreateTable();
  }
  _renderItem = ({ item, index }) => (
    <ListItem
      item={item}
      index={index}
      onPressItem={this._onPressItem}
    />
  );

  _onPressItem = async(index, item, isFavourite) => {
    console.log("Clicked::", index, "isFavourite: ", isFavourite, "item::", item)
    await UpdateFavouriteStatus(item.id,isFavourite)
    await SelectFromDB(offlineRestaurentArray => {


      console.log('offlineArray:: ', offlineRestaurentArray);

    })
  //} 
    // if(isFavourite){
    //   this._addToFavouriteArray(item);
    // } else {
    //   this._removeFromFavouriteArray(item);
    // }
    // let favouriteRestaurent = this.state.isFavourite;
    // this.setState({
    //   isFavourite: !favouriteRestaurent
    // });
    // setIsFavourite(favouriteRestaurent)

  }
  _addToFavouriteArray = (item) => {
    this.state.favouriteRestaurentsArray.push(item)
    setData(this.state.favouriteRestaurentsArray)
    console.log("Add:: ", this.state.favouriteRestaurentsArray)
  }
  _removeFromFavouriteArray = (item) => {
    var itemIdToRemove = item.restaurant.id
    for (var i = 0; i < this.state.favouriteRestaurentsArray.length; i++) {
      var favResId = this.state.favouriteRestaurentsArray[i].restaurant.id;
      console.log("favResId:: ", favResId, "itemIdToRemove:: ", itemIdToRemove)
      if (favResId == itemIdToRemove) {
        this.state.favouriteRestaurentsArray.splice(i, 1);
      }
    }
    console.log("Remove:: ", this.state.favouriteRestaurentsArray)
    setData(this.state.favouriteRestaurentsArray)
  }
  _keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.restaurentArray}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />

      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  title: 'Abbotsford',
  headerTintColor: '#000000',
  headerStyle: {
    backgroundColor: '#f0edeb'
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
