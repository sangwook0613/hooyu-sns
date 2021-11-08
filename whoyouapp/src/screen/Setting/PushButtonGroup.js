import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PushButtonGroup = ({ isPushSyncEnabled }) => {

  const [selection, setSelection] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.btnGroup}>
        <TouchableOpacity
          style={[
            styles.btn,
            { borderBottomLeftRadius: 20, borderTopLeftRadius: 20, },
            selection === 1 ? { backgroundColor: `${isPushSyncEnabled ? "#F38181" : "#c9c9c9"}` } : null
          ]}
          onPress={() => setSelection(1)}
        >
          <Text style={[styles.btnText, selection === 1 ? { color: "white" } : { color: "#E5E5E5" }]}>20m</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, selection === 2 ? { backgroundColor: `${ isPushSyncEnabled ? "#F38181" : "#c9c9c9"}`} : null]} onPress={() => setSelection(2)}>
          <Text style={[styles.btnText, selection === 2 ? { color: "white" } : { color: "#E5E5E5" }]}>100m</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, selection === 3 ? { backgroundColor: `${ isPushSyncEnabled ? "#F38181" : "#c9c9c9"}`} : null]} onPress={() => setSelection(3)}>
          <Text style={[styles.btnText, selection === 3 ? { color: "white" } : { color: "#E5E5E5" }]}>500m</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btn,
            { borderBottomRightRadius: 20, borderTopRightRadius: 20, },
            selection === 4 ? { backgroundColor: `${isPushSyncEnabled ? "#F38181" : "#c9c9c9"}` } : null
          ]}
          onPress={() => setSelection(4)}
        >
          <Text style={[styles.btnText, selection === 4 ? { color: "white" } : { color: "#E5E5E5" }]}>2km</Text>
        </TouchableOpacity>
      </View>
        
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnGroup: {
    flexDirection: 'row',
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#6B7280',
    borderRadius: 20,
  },
  btn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#6B7280'
  },
  btnText: {
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 14,
  }
});

export default PushButtonGroup;