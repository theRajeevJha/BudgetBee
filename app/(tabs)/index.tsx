import React, { useState, useEffect } from 'react';
import Svg, { Rect, Circle, Path } from 'react-native-svg'; // Importing necessary SVG elements

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { getExpensesByDate, getRecentExpenses, getCategories } from '../repository/expenseRepo';
import { format } from 'date-fns';

const screenWidth = Dimensions.get('window').width;

export default function ExpenseList() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedMonth, setSelectedMonth] = useState<number | undefined>(undefined);
  const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);

  useEffect(() => {
    setExpenses(getRecentExpenses());
    setCategories(getCategories());
  }, []);

  useEffect(() => {
    filterExpenses();
  }, [selectedCategory, selectedMonth, selectedYear, expenses]);

  const filterExpenses = () => {
    let filtered = expenses;

    if (selectedCategory) {
      filtered = filtered.filter(expense => expense.category === selectedCategory);
    }

    if (selectedMonth && selectedYear) {
      filtered = filtered.filter(expense => {
        const expenseDate = new Date(expense.date);
        return (
          expenseDate.getMonth() + 1 === selectedMonth && expenseDate.getFullYear() === selectedYear
        );
      });
    }

    setFilteredExpenses(filtered);
  };

  const calculateTotalExpenses = () => {
    return filteredExpenses.reduce((total, expense) => {
      const price = parseFloat(expense.price) || 0;
      return total + price;
    }, 0);
  };

  const resetFilters = () => {
    setSelectedCategory(undefined);
    setSelectedMonth(undefined);
    setSelectedYear(undefined);
    setFilteredExpenses(expenses);
  };

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

    <ScrollView style={styles.container}>
      {/* Filter Section */}
      <View style={styles.filterContainer}>
        <View style={styles.filterRow}>
          {/* Category Filter */}
          <View style={styles.filterItem}>
            <Text style={styles.label}>Category</Text>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={itemValue => setSelectedCategory(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="All Categories" value={undefined} />
              {categories.map((category, index) => (
                <Picker.Item key={index} label={category} value={category} />
              ))}
            </Picker>
          </View>

          {/* Month Filter */}
          <View style={styles.filterItem}>
            <Text style={styles.label}>Month</Text>
            <Picker
              selectedValue={selectedMonth}
              onValueChange={itemValue => setSelectedMonth(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="All Months" value={undefined} />
              {[...Array(12)].map((_, index) => (
                <Picker.Item key={index} label={`${index + 1}`} value={index + 1} />
              ))}
            </Picker>
          </View>

          {/* Year Filter */}
          <View style={styles.filterItem}>
            <Text style={styles.label}>Year</Text>
            <Picker
              selectedValue={selectedYear}
              onValueChange={itemValue => setSelectedYear(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="All Years" value={undefined} />
              {[...Array(10)].map((_, index) => (
                <Picker.Item key={index} label={`${2020 + index}`} value={2020 + index} />
              ))}
            </Picker>
          </View>

          {/* Reset Filters Button */}
          <TouchableOpacity style={styles.smallResetButton} onPress={resetFilters}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Total Expenses */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Expenses: ${calculateTotalExpenses().toFixed(2)}</Text>
      </View>

      {/* Expenses Table */}
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Item</Text>
          <Text style={styles.tableHeaderText}>Price</Text>
          <Text style={styles.tableHeaderText}>Category</Text>
          <Text style={styles.tableHeaderText}>Date</Text>
        </View>

        {/* Table Row Scroll */}
        <ScrollView style={styles.tableBody}>
          <FlatList
            data={filteredExpenses}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              const isEvenRow = index % 2 === 0; // Alternate row colors
              return (
                <View style={[styles.tableRow, { backgroundColor: isEvenRow ? '#f9f9f9' : '#ffffff' }]}>
                  <Text style={styles.tableCell}>{item.itemName}</Text>
                  <Text style={styles.tableCell}>${parseFloat(item.price).toFixed(2)}</Text>
                  <Text style={styles.tableCell}>{item.category}</Text>
                  <Text style={styles.tableCell}>{format(new Date(item.date), 'yyyy-MM-dd')}</Text>
                </View>
              );
            }}
          />
        </ScrollView>
      </View>
    </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    // SVG Background Style
    svgBackground: {
      position: 'absolute', // Position SVG at the back
      top: 0,
      left: 0,
      zIndex: -1, // Ensures the SVG stays behind other elements
    },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterItem: {
    flex: 1,
    marginHorizontal: 5,
  },
  picker: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  smallResetButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignSelf: 'flex-end',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalContainer: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#28a745', // Changed to a green shade
    padding: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 5,
  },
  tableHeaderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
  tableBody: {
    maxHeight: 350,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});
