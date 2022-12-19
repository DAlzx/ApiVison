import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';



export default function Home({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Click here for test Api Vision</Text>
      <Text style={styles.arrow}>I</Text>
      <Text style={styles.arrow}>V</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('FormApi')} ><Text>Try Api Vision</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  title: {
    marginTop: 70,
    marginBottom: 10,
    fontSize: 25,
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: '#f1f1f1',
    width: 200,
  },
  arrow: {
    
    fontSize: 25,
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: '#f1f1f1',
  },
  button: {
    color: '#000',
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    padding: 10,
  }
});
