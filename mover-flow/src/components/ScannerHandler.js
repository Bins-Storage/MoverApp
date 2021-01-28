import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

/*
 * Handles the Scanner Lifecycle for scanning a barcode, including the following:
 * camera permission request; barcode scanning; navigation after barcode scanned.
 * 
 * @param {navigation object} navigation The navigation prop passed down from the NavigationContainer
 * 
 * Side Effect: Navigates away from the screen after confirmed bar code scanned with the bar code data.
 */
export default function ScannerHandler({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [scannerData, setScannerData] = useState(null);
  
    // gain permission to access camera
    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    // saves the data scanned and marks scanning as done
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      setScannerData(data);
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };
  
    // early exit until permissions deem user is allowed to scan
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>Must have permission to use camera!</Text>;
    }
  
    /*
     * Barcode scanner will only scan if scanned is false, else it remains dormant.
     * Buttons to rescan or finish scanning appear only after successful scan.
     * 
     * Doc on passing params to prev screens: https://reactnavigation.org/docs/params
     * Here params are passed to Job Screen, forcing a rerender (since route.params updated)
     */ 
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        {scanned && <Button title={'Tap to Finish Scanning'} onPress={() => {
            navigation.navigate('Job Screen', {
                data: scannerData,
            })
        }} />}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
  });