import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
} from 'react-native';
import { sendData } from "../helper/networkManager";
import ListItem from "../components/ListItem/ListItem"

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurentArray: [],
    }
  }

  componentDidMount = () => {
    this._fetchData();
  }
  _fetchData = () => {
    const data = {
      entity_id: 10240,
      entity_type: "city",
      count: 10,
      sort: "rating"
    };

    var sendRequest = sendData(data);
    sendRequest.then((result) => {
      this.setState({
        restaurentArray: result.restaurants
      }
      );

      console.log(this.state.restaurentArray)
    })
  }
  _renderItem = ({ item, index }) => (
    <ListItem
      item={item}
      index={index}
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
