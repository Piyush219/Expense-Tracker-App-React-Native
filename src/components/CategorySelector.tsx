import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

const categories = ['Food', 'Travel', 'Shopping', 'Bills', 'Other'];

export default function CategorySelector({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (category: string) => void;
}) {

  return (
    <View>
      <View style={styles.container}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.button, selected === cat && styles.selected]}
            onPress={() => onSelect(cat)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selected === 'Other' && (
        <TextInput
          placeholder="Enter custom category"
          placeholderTextColor="#999"
          onChangeText={text => {
            onSelect(text);
          }}
          style={styles.input}
          autoFocus={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    margin: 4,
  },
  selected: {
    backgroundColor: '#c3d1f7',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
    color: '#000',
  },
});
