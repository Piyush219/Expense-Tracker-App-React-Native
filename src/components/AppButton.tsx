import { Pressable, Text, StyleSheet } from 'react-native';

export function AppButton({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={12}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#2196F3',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});
