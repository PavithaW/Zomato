import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Linking,
  Platform
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { sendData } from "../helper/networkManager";
import ListItem from "../components/ListItem/ListItem"
import { CreateDB, CreateTable, InsertValues, SelectFromDB } from "../dbManager/DBManager"

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurentArray: [],
      connection: false
    }
  }

  componentDidMount = () => {
    this.checkInternt();
  }

  checkInternt = () => {
    Linking.canOpenURL('https://google.com').then(connection => {
      if (!connection) {
        this.setState({ connection: false });
        this._manageAppData(this.state.connection)
      } else {
        fetch('https://google.com').then(res => {
          this.setState({ connection: res.status == 200 ? true : false })
          this._manageAppData(this.state.connection)
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
      isOnline = {this.state.connection}
      onPressItem={this._onPressItem}
    />
  );
  _onPressItem = (index, item) => {
    //this.props.navigation.navigate('BookDetails', { item: item });
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
