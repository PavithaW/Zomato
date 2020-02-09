import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Linking,
  AsyncStorage,
} from 'react-native';
import { sendData } from "../helper/networkManager";
import ListItem from "../components/ListItem/ListItem"
import { CreateDB, CreateTable, InsertValues, SelectFromDB } from "../dbManager/DBManager"
import {setData} from "../components/AsyncStorage/AsyncStorage"

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
    this.checkInternet();
  }

  checkInternet = () => {
    Linking.canOpenURL('https://google.com').then(connection => {
      if (!connection) {
        this.setState({ connection: false });
        this._manageAppData(this.state.connection)
        alert("Offline1")
      } else {
        fetch('https://google.com').then(res => {
          this.setState({ connection: res.status == 200 ? true : false })
          this._manageAppData(this.state.connection)
          alert(this.state.connection)
        }
        );
      }
    });
  };
  _manageAppData = isOnline => {

    this._setUpDb();

    if (isOnline) {
      console.log('Retrieve from API');
      this._fetchData();
    } else {
      console.log('Retrieve from DB');
      try {
        SelectFromDB(offlineRestaurentArray => {
          this.setState({
            restaurentArray: offlineRestaurentArray
          });
        })

      } catch (e) {
        console.log(e)
      }
    }
  }
  _setUpDb = () => {
    CreateDB("Restaurents");
    CreateTable();
  }

  _fetchData = async () => {

    const data = {
      entity_id: 10240,
      entity_type: "city",
      count: 10,
      sort: "rating"
    };

    var sendRequest = sendData(data);
    await sendRequest.then((result) => {
      this._handleResponse(result)
    })

  }
  _handleResponse = (result) => {
    this.setState({
      restaurentArray: result.restaurants
    });

    this._saveRestaurentToDb(result.restaurants)

  }
  _saveRestaurentToDb = (array) => {
    for (var i = 0; i < array.length; i++) {

      let restaurant = array[i].restaurant;

      let restaurentId = restaurant.id;
      let restaurentName = restaurant.name;
      let restaurentAddress = restaurant.location.address;
      let restaurentImage = restaurant.featured_image;

      InsertValues(restaurentId, restaurentName, restaurentAddress, restaurentImage);
    }
  }

  _renderItem = ({ item, index }) => (
    <ListItem
      item={item}
      index={index}
      isOnline={this.state.connection}
      onPressItem={this._onPressItem}
      isFavourite = {this.state.isFavourite}
    />
  );
  _onPressItem = (index, item, isFavourite, setIsFavourite) => {
    console.log("Clicked::", index, "isFavourite: ",isFavourite)
    if(isFavourite){
      this._addToFavouriteArray(item);
    } else {
      this._removeFromFavouriteArray(item);
    }
    let favouriteRestaurent = this.state.isFavourite;
    this.setState({
      isFavourite: !favouriteRestaurent
    });
    setIsFavourite(favouriteRestaurent)

  }
  _addToFavouriteArray = (item) => {
    this.state.favouriteRestaurentsArray.push(item)
    setData(this.state.favouriteRestaurentsArray)
    console.log("Add:: ",this.state.favouriteRestaurentsArray)
  }
  _removeFromFavouriteArray = (item) => {
    var itemIdToRemove = item.restaurant.id
    var index;
    for(var i=0;i<this.state.favouriteRestaurentsArray.length;i++){
      var favResId = this.state.favouriteRestaurentsArray[i].restaurant.id;
      console.log("favResId:: ",favResId,"itemIdToRemove:: ",itemIdToRemove)
      if(favResId == itemIdToRemove){
        this.state.favouriteRestaurentsArray.splice(i, 1);
      }
    }
    console.log("Remove:: ",this.state.favouriteRestaurentsArray)
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
