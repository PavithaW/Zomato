import NetInfo from '@react-native-community/netinfo';

export default checkInternet = () => {
    const connectionStatus = NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      //this.setState({ connection: state.isConnected });

      return state.isConnected;
    });
    console.log(connectionStatus.then)
  };