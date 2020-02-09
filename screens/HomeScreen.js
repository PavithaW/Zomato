import React from 'react';
import { withNavigation } from "react-navigation";

import {
  StyleSheet,
  FlatList,
  View,
} from 'react-native';
import ListItem from "../components/ListItem/ListItem"
import { CreateDB, 
          CreateTable, 
          UpdateFavouriteStatus, 
          SelectFromDB } from "../dbManager/DBManager"
import fetchRestaurents from "../services/fetchRestaurentsData"

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurentArray: [],
    }
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    
    this._performApp();
    
    this.focusListener = navigation.addListener("didFocus", () => {
      this._reLoadRestaurentsFromDB()
    });
    
  }

  _performApp = async () => {
    await this._setUpDb();
    await this._manageAppData();
  }

  _manageAppData = async () => {
    try {
      await fetchRestaurents();
      await this._reLoadRestaurentsFromDB()
      
    } catch (e) {
      console.log(e)
    }
  }

  _reLoadRestaurentsFromDB = () => {

    SelectFromDB(offlineRestaurentArray => {
      this.setState({
        restaurentArray: offlineRestaurentArray
      });

    })
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

export default withNavigation(HomeScreen)