import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Pressable,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { taskCalStyles } from "@/assets/styles/taskCalendar";
import { ThemeContext } from '../theme';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { BASE_URL } from "../utils/config";
import { getToken } from '../utils/tokenManager';

const router = useRouter();
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const currentYear = new Date().getFullYear();
const years = Array.from({length: 10}, (_, i) => currentYear - 5 + i);

const TaskCalendar = () => {
  const { colors } = useContext(ThemeContext);
  const [tasks, setTasks] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [days, setDays] = useState([]);
  const styles = useMemo(() => taskCalStyles(colors), [colors]);
  
  const monthPickerRef = useRef();
  const yearPickerRef = useRef();

  const getDaysInMonth = useCallback((month, year) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push({
        id: date.toDateString(),
        date: date.getDate(),
        day: date.toLocaleString("default", { weekday: "short" }).toUpperCase(),
        fullDate: date.toISOString().split('T')[0]
      });
      date.setDate(date.getDate() + 1);
    }
    return days;
  }, []);

 const fetchTasks = useCallback(async () => {
  setLoading(true);
  try {
    const token = await getToken();
    const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
    const response = await axios.get(`${BASE_URL}/tasks`, {
      params: { date: dateStr },
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    
    if (response.data.success) {
      // Transform participants data if needed
      const tasksWithParticipants = response.data.taskData.map(task => ({
        ...task,
        participants: task.participants || []
      }));
      setTasks(tasksWithParticipants);
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("API Error:", error);
    Alert.alert("Error", "Could not fetch tasks");
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
}, [selectedDate, selectedMonth, selectedYear]);

  useEffect(() => {
    setDays(getDaysInMonth(selectedMonth, selectedYear));
    fetchTasks();
  }, [selectedMonth, selectedYear, selectedDate, getDaysInMonth, fetchTasks]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchTasks();
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowMonthPicker(false);
    setShowYearPicker(false);
  };

  return (
    // <TouchableWithoutFeedback onPress={() => {
    //   setShowMonthPicker(false);
    //   setShowYearPicker(false);
    // }}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={{ 
          padding: 20, 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          backgroundColor: colors.card.background,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}>
          <Pressable onPress={() => router.back()}>
            <Icon name="arrow-back" size={24} color={colors.text} />
          </Pressable>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <TouchableOpacity>
              <Icon name="search" size={24} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/notification')}>
              <Icon name="notifications" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Month/Year Selector */}
        <View style={styles.headerContainer}>
          <View style={styles.pickerContainer}>
            {/* Month Picker */}
            <View ref={monthPickerRef}>
              <TouchableOpacity 
                style={styles.dropdownButton}
                onPress={(e) => {
                  e.stopPropagation();
                  setShowMonthPicker(!showMonthPicker);
                  setShowYearPicker(false);
                }}
              >
                <Text style={styles.dropdownText}>{months[selectedMonth]}</Text>
              </TouchableOpacity>
                </View>
              
              {showMonthPicker && (
                <ScrollView 
                  style={[styles.dropdownContainer, 
              ]}
                  nestedScrollEnabled={true}
                >
                  {months.map((month, index) => (
                    <TouchableOpacity
                      key={month}
                      style={styles.dropdownItem}
                      onPress={(e) => {
                        e.stopPropagation();
                        setSelectedMonth(index);
                        setShowMonthPicker(false);
                      }}
                    >
                      <Text style={{ 
                        color: selectedMonth === index ? colors.primary : colors.text,
                        fontWeight: selectedMonth === index ? 'bold' : 'normal'
                      }}>
                        {month}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            {/* </View> */}

            {/* Year Picker */}
            <View ref={yearPickerRef}>
              <TouchableOpacity 
                style={styles.dropdownButton}
                onPress={(e) => {
                  e.stopPropagation();
                  setShowYearPicker(!showYearPicker);
                  setShowMonthPicker(false);
                }}
              >
                <Text style={styles.dropdownText}>{selectedYear}</Text>
              </TouchableOpacity>
              
              {showYearPicker && (
                <ScrollView 
                  style={[styles.dropdownContainer, { left: 90 }]}
                  nestedScrollEnabled={true}
                >
                  {years.map(year => (
                    <TouchableOpacity
                      key={year}
                      style={styles.dropdownItem}
                      onPress={(e) => {
                        e.stopPropagation();
                        setSelectedYear(year);
                        setShowYearPicker(false);
                      }}
                    >
                      <Text style={{ 
                        color: selectedYear === year ? colors.primary : colors.text,
                        fontWeight: selectedYear === year ? 'bold' : 'normal'
                      }}>
                        {year}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>
          </View>
        </View>

        {/* Calendar Days */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={[styles.daysDropdown, { backgroundColor: colors.card.background }]}
        >
          <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
            {days.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.dayButton,
                  selectedDate === item.date && styles.selectedDay
                ]}
                onPress={() => handleDateSelect(item.date)}
              >
                <Text style={[
                  styles.dayText,
                  selectedDate === item.date && styles.selectedDayText
                ]}>
                  {item.day}
                </Text>
                <Text style={[
                  { fontWeight: 'bold' },
                  styles.dayText,
                  selectedDate === item.date && styles.selectedDayText
                ]}>
                  {item.date}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Task List */}
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ flex: 1 }} />
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl 
                refreshing={refreshing} 
                onRefresh={handleRefresh}
                colors={[colors.primary]}
              />
            }
            ListEmptyComponent={
              <Text style={{ 
                textAlign: 'center', 
                padding: 20,
                color: colors.text 
              }}>
                No tasks for this day
              </Text>
            }
           renderItem={({ item }) => (
  <View style={{ 
    backgroundColor: colors.card.background,
    padding: 15,
    margin: 10,
    borderRadius: 10,
    elevation: 2
  }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 15 }}>
      <View>
    <Text style={{ 
      color: colors.card.text,
      fontSize: 16,
      fontWeight: '500'
    }}>
      {item.name}
    </Text>
    
    {item.description && (
      <Text style={{ 
        color: colors.secondary,
        marginTop: 5
      }}>
        {item.description}
      </Text>
    )}
    </View>
    <View>
    {/* Participants Section */}
    {item.participants?.length > 0 && (
      <View style={{ marginTop: 5 }}>
        <Text style={{ 
          color: colors.text,
          fontSize: 14,
          marginBottom: 5
        }}>
          Participants:
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
          {item.participants.map(participant => (
            <View key={participant.id} style={{
              backgroundColor: colors.primary + '20', // 20% opacity
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <Text style={{ 
                color: colors.text,
                fontSize: 12
              }}>
                {participant.name}
              </Text>
            </View>
          ))}
        </View>
      </View>
    )}
    </View>
    </View>
  </View>
)}
          />
        )}
      </SafeAreaView>
    // </TouchableWithoutFeedback>
  );
};

export default TaskCalendar;
