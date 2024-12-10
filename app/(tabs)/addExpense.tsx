import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import Svg, { Rect, Circle, Path } from 'react-native-svg'; // Importing necessary SVG elements
import ExpenseService from "../service/ExpenseService"
import { Expense } from '../model/expense';

// Dynamic categories with emojis
const categories = [
  { label: '🍔 FastFood', value: 'FastFood', emoji: '🍔' },
  { label: '🍲 Food', value: 'Food', emoji: '🍲' },
  { label: '📱 Mobile', value: 'Mobile', emoji: '📱' },
  { label: '🎭 Entertainment', value: 'Entertainment', emoji: '🎭' },
];

const expenseService = ExpenseService.getInstance();

export default function AddExpense() {
  const [category, setCategory] = useState(categories[0].value);
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');

  const handleAddExpense = () => {
    if (!itemName || !price) {
      console.log("error!fill the detilas!")
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    const newExpense = new Expense({
      user_id: 'b8ca07a1-5186-4c57-ad25-e1b623bc165e',  // Replace with actual user ID from your app
      amount: parseFloat(price), // Convert price string to number
      category,
      name: itemName,
      updated_at: new Date(),  // Set current date as updated_at
    });

    expenseService.addExpense(newExpense); // Use the repo method to add expense
    Alert.alert('Success', `Expense added in ${category}!`);
    // Clear inputs after adding expense
    setItemName('');
    setPrice('');
  };


  const selectedCategory = categories.find((cat) => cat.value === category);

  return (
    <LinearGradient
      colors={['#F8F9FA', '#BBDEFB', '#E3F2FD']}
      style={styles.container}
    >
      {/* SVG Background */}
      <Svg height="100%" width="100%" style={styles.svgBackground}>
        {/* Background Rect */}
        <Rect width="100%" height="100%" fill="#BBDEFB" />
        {/* Subtle pattern or abstract shapes */}
        <Path
          d="M0,0 C100,150 200,50 300,100 L300,0 Z"
          fill="rgba(0, 0, 0, 0.1)"
        />
        <Circle cx="250" cy="200" r="100" fill="rgba(255, 255, 255, 0.1)" />
      </Svg>

      {/* Main Form */}
      <View style={styles.card}>
        <Text style={styles.label}>Category:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
          >
            {categories.map((item, index) => (
              <Picker.Item key={index} label={item.label} value={item.value} color="#555" />
            ))}
          </Picker>
        </View>

        <Text style={styles.emoji}>{selectedCategory?.emoji}</Text>

        <Text style={styles.label}>Item Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter item name"
          value={itemName}
          onChangeText={(text) => setItemName(text)}
        />

        <Text style={styles.label}>Price:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter price"
          value={price}
          keyboardType="numeric"
          onChangeText={(text) => setPrice(text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddExpense}>
          <LinearGradient colors={['#3949AB', '#6F79A8']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Add Expense</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // SVG Background Style
  svgBackground: {
    position: 'absolute', // Position SVG at the back
    top: 0,
    left: 0,
    zIndex: -1, // Ensures the SVG stays behind other elements
  },
  card: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A237E',
    textAlign: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    color: '#555',
  },
  emoji: {
    fontSize: 80,
    textAlign: 'center',
    marginVertical: 10,
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#F5F5F5',
    marginBottom: 15,
  },
  button: {
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
