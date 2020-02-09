import { StyleSheet } from 'react-native';

export default StyleSheet.create({
rowContainer: {
    color: "#e7ebc3",
    flexDirection: 'row',
},
imageContainer: {
    width: "100%",
    height: 250,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor:"#f0edeb",
},
nameText: {
    marginTop:160,
    color: "#ffffff",
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    justifyContent:'flex-end', 
    marginLeft:5
},
addressText: {
    marginTop:2,
    color: "#ffffff",
    fontSize: 10,
    textAlign: 'left',
    justifyContent:'flex-end',
    marginLeft:5
},
buttonLayout: {
    marginTop:20,
    width:30,
    marginRight:10,
    alignSelf:'flex-end',
    alignItems:'center',
    justifyContent:'center',
    height:30,
    backgroundColor: "rgba(0,0,0,0)",
},
buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', 
    marginRight:5
},
linearGradient:{
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
}
});