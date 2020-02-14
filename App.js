import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.body}>
        <TouchableOpacity
          style={{...styles.button, backgroundColor: 'red'}}
          onPress={() => Alert.alert('Mata o outro bruxo')}>
          <Text style={styles.textButton}>AvadaKedavra</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.button, backgroundColor: 'green'}}
          onPress={() => Alert.alert('Tortura o outro bruxo')}>
          <Text style={styles.textButton}>Crucius</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.button, backgroundColor: 'blue'}}
          onPress={() => Alert.alert('Controla o outro bruxo')}>
          <Text style={styles.textButton}>Imperio</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    flex: 1,
    backgroundColor: Colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button: {
    height: 50,
    width: 100,
    margin: 10,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: '#FFF',
    textAlign: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
