import React from 'react';
import { Text, View, TouchableHighlight,Image, ImageBackground } from 'react-native';
import styles from './Styles'
import { LinearGradient } from 'expo-linear-gradient';

export default ListItem = props => {
    // _onPress = () => {
    //     this.props.onPressItem(this.props.index, this.props.item);
    // }
    let restaurentItem = props.item.restaurant;
    let Image_URL;
    if(restaurentItem.featured_image != ""){
        Image_URL = { uri:restaurentItem.featured_image };
    } else {
        Image_URL = require('../../assets/images/default.jpg')

    }
    return (
        <TouchableHighlight
            onPress={props.onPressItem(props.index, props.item)}
            underlayColor='#dddddd'>
            <View>
                <View style={styles.rowContainer}>
                    <View style={styles.imageContainer}>
                    <ImageBackground source={Image_URL} style = {{flex:1, resizeMode : 'stretch' }} > 
                    <LinearGradient  colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.0)']} style={styles.linearGradient}>
                    <Text style={styles.nameText}
                            numberOfLines={1}>{restaurentItem.name}</Text>
                        <Text style={styles.addressText}
                            numberOfLines={1}>{restaurentItem.location.address}</Text> 
                            </LinearGradient>
                            </ImageBackground> 
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );

}