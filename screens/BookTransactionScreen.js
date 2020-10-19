import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class BookTransactionScreen extends React.Component {
constructor(){
  super ();
  this.state = {
    hasCameraPermission: null,
    scanned: false,
    scannedData: '',
    buttonState: 'normal'
  }
}

  getCameraPermissions = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted",
      buttonState: 'clicked',
      scanned: 'false'
    });
  }


  render() {
    const hasCameraPermission = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.scanned;

    if (buttonState === "clicked" && hasCameraPermission){
      return (
        <BarCodeScanner 
        onnBarCodeScanned={scanned ? undefined : this.HandleBarcodeScanned}
        style={StyleSheet.absoluteFillObject}
        />
      );
    }
     else if (buttonState === "normal"){
       return(
         <View style={StyleSheet.container}>

           <Text style={StyleSheet.dislayText}>
             {hasCameraPermission === true ? this.state.scannedData:" Request CAMERA Permissions"}
           </Text>
           <TouchableOpacity 
           onPress={this.getCameraPermissions}
           style={StyleSheet.scanButton}>
             <Text style={StyleSheet.buttonText}>Scan QR Code</Text>
           </TouchableOpacity>
         </View>
       );
     }
    }
  }

  const styles = StyleSheet.create ({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    dislayText:{
      fontSize: 15,
      textDecorationLine: 'underlne'
    },
    scanButton:{
      backgroundColor: "#2196f3",
      padding: 10,
      margin: 10
    },
    buttonText: {
      fontSize: 20,
    }
  })