import React,{ useState } from 'react';
import { Text, View, TouchableHighlight, Image, ImageBackground } from 'react-native';
import styles from './Styles'
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

export default ListItem = props => {

    const [isFavourite, setIsFavourite] = useState(true);

    const connection = props.isOnline;
    let restaurentItem
    let location;
    if (connection) {
        restaurentItem = props.item.restaurant;
        location = restaurentItem.location.address;
    } else {
        restaurentItem = props.item;
        location = restaurentItem.address;
    }

    let Image_URL;
    if (restaurentItem.featured_image != "") {
        Image_URL = { uri: restaurentItem.featured_image, cache: 'force-cache' };
    } else {
        Image_URL = require('../../assets/images/default.jpg')
    }
    const icon = <Icon name='search' size={30} color='#4a4948' />

    return (
        <TouchableHighlight
            underlayColor='#dddddd'>
            <View>
                <View style={styles.rowContainer}>
                    <View style={styles.imageContainer}>
                        <ImageBackground source={Image_URL} style={{ flex: 1, resizeMode: 'stretch' }} >
                            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']} style={styles.linearGradient}>
                            <TouchableHighlight underlayColor='rgba(0,0,0,0)' style = {styles.buttonLayout} onPress={() => {props.onPressItem(props.index, props.item,isFavourite, setIsFavourite)}}>
                                { isFavourite ?  <Icon name='heart-o' size={30} color='#ffffff' /> :  <Icon name='heart' size={30} color='#ffffff' /> }
                                </TouchableHighlight>
                                <Text style={styles.nameText}
                                    numberOfLines={1}>{restaurentItem.name}</Text>
                                <Text style={styles.addressText}
                                    numberOfLines={1}>{location}</Text>
                            </LinearGradient>
                        </ImageBackground>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );

}