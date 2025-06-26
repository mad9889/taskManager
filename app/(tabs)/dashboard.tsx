import { useFocusEffect } from "@react-navigation/native";
import { Redirect } from "expo-router";
import { ThemeContext } from "../theme";
import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from "react-native";
import { useAuth } from "../contexts/auth-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FlatList } from "react-native-gesture-handler";
import { BASE_URL } from "../utils/config";
import { getToken, deleteToken } from "../utils/tokenManager";

const DashboardScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    ongoing: 0,
    completed: 0,
    canceled: 0,
    pending: 0
  });
  const { user } = useAuth();
  const { colors } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTasks = async () => {
  try {
    const token = await getToken();
    if (!token) throw new Error("No authentication token found");

    const response = await fetch(`${BASE_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch tasks");

    const data = await response.json();
    setTasks(data.taskData || []);

    const ongoing = data.taskData.filter(t => t.status !== 'completed' && t.status !== 'canceled').length;
    const completed = data.taskData.filter(t => t.status == 'completed').length;
    const canceled = data.taskData.filter(t => t.status == 'canceled').length;
    const pending = data.taskData.filter(t => t.status == 'pending').length;

    setStats({ ongoing, completed, canceled, pending });
  } catch (error) {
    alert("Failed to load tasks. Please try again.");
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
};


  // Fetch tasks on initial load
  useEffect(() => {
    fetchTasks();
  }, []);

  // Refresh when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    fetchTasks();
  };

  const completeTask = async (id: string) => {
  try {
    const token = await getToken();

    const response = await fetch(`${BASE_URL}/tasks/${id}/complete`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to update task");

    fetchTasks();
  } catch (error) {
    await deleteToken();
    alert("Failed to update task. Please try again.");
  }
};


  const deleteTask = async (id: string) => {
  try {
    const token = await getToken();

    const response = await fetch(`${BASE_URL}/tasks/${id}/delete`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to delete task");

    fetchTasks();
  } catch (error) {
    alert("Failed to delete task. Please try again.");
  }
};


  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15, 
      backgroundColor: colors.background,
    },
    header: {
      padding: 20,
    },
    greeting: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#161f7c",
    },
    welcome: {
      fontSize: 16,
      color: colors.text,
      marginTop: 4,
    },
    searchInput: {
      height: 40,
      backgroundColor: "#fff",
      borderRadius: 10,
      paddingHorizontal: 15,
      marginTop: 20,
    },
    dateContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      marginVertical: 15,
    },
    dateText: {
      color: colors.card.text,
      fontSize: 14,
      fontWeight: "400",
    },
    today: {
      color: colors.card.text,
      fontSize: 19,
      fontWeight: "600",
    },
    calendarStrip: {
      paddingHorizontal: 15,
      marginBottom: 20,
    },
    dayContainer: {
      padding: 15,
      marginRight: 10,
      backgroundColor: colors.card.background,
      borderRadius: 10,
    },
    dayText: {
      color: colors.card.text,
      fontWeight: "500",
    },
    sectionContainer: {
      paddingHorizontal: 20,
      marginVertical: 15,
    },
    sectionTitle: {
      color: colors.card.text,
      fontSize: 18,
      fontWeight: "500",
      marginBottom: 15,
    },
    statsContainer: {
      margin: 20,
      paddingHorizontal: 8,
    },
    statRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    statItem: {
      borderRadius: 10,
      width: "48%",
      padding: 20,
      alignItems: "center",
      elevation: 2, // Android shadow
      shadowColor: "#000", // iOS shadow
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
    },
    statNumber: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 14,
      textAlign: "center",
    },
    projectItem: {
      backgroundColor: colors.card.background,
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
    },
    projectText: {
      color: colors.card.text,
      fontSize: 16,
    },
    taskItem: {
      backgroundColor: colors.card.background,
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
    },
    taskTitle: {
      color: colors.card.text,
      fontSize: 16,
      fontWeight: "500",
    },
    taskDate: {
      color: colors.secondary,
      marginTop: 5,
    },
    startEndContainer:{
      flexDirection: "column",
      gap: 25,
    },
    timelineContainer: {
      paddingHorizontal: 20,
      marginBottom: 30,
    },
    timelineItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    taskCard: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 8,
    elevation: 2,
  },
  timeColumn: {
    width: 60,
    alignItems: 'flex-column',
    gap: 20,
    marginRight: 10,
  },
  timeText: {
    fontSize: 14,
    color: '#666',
  },
  contentColumn: {
    flex: 1,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  taskDesc: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  statusBadge: {
    fontSize: 12,
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  actionBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  completeBtn: {
    height: 30,
    backgroundColor: '#48c774',
  },
  undoBtn: {
    backgroundColor: '#ffdd57',
  },
  btnText: {
    fontWeight: '600',
    color: '#fff',
  },
  noTask: {
    textAlign: 'center',
    color: '#888',
    padding: 20,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  });

  // Format time in 24-hour format (HH:MM)
  const formatTime12Hour = (timeStr) => {
  if (!timeStr) return '';
  
  try {
    // Split the time string into hours, minutes, seconds
    const [hoursStr, minutesStr] = timeStr.split(':');
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    // Validate hours (0-23) and minutes (0-59)
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      return timeStr; // Return original if invalid
    }

    // Determine AM/PM
    const period = hours >= 12 ? 'PM' : 'AM';
    
    // Convert to 12-hour format
    const twelveHour = hours % 12 || 12; // Converts 0 to 12 for midnight
    
    // Format as "HH:MM AM/PM" with proper padding
    return `${twelveHour}:${minutes.toString().padStart(2, '0')} ${period}`;
  } catch (error) {
    // console.error('Error formatting time:', error);
    return timeStr; // Fallback to original string if formatting fails
  }
};

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi, {user?.name || "User"}!</Text>
        <Text style={styles.welcome}>Welcome Back</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Task..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        {user?.avatar && (
          <Image source={{ uri: user.avatar }} style={styles.image} />
        )}
      </View>

      {/* Date */}
      <View style={styles.dateContainer}>
        <Text style={styles.today}>Today</Text>
        <Text style={styles.dateText}>
          <FontAwesome name="calendar" /> {new Date().toLocaleDateString()}
        </Text>
      </View>

      {/* Overview Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statRow}>
          <View style={[styles.statItem, { backgroundColor: "#73b3fc" }]}>
            <FontAwesome name="tasks" size={24} color="#3071af" />
            <Text style={[styles.statNumber, { color: "#3071af" }]}>
              {stats.ongoing}
            </Text>
            <Text style={[styles.statLabel, { color: "#3071af" }]}>Ongoing</Text>
          </View>
          <View style={[styles.statItem, { backgroundColor: "#9ffb7d" }]}>
            <FontAwesome name="flag-checkered" size={24} color="#38a938" />
            <Text style={[styles.statNumber, { color: "#38a938" }]}>
              {stats.completed}
            </Text>
            <Text style={[styles.statLabel, { color: "#38a938" }]}>Completed</Text>
          </View>
        </View>

        <View style={styles.statRow}>
          <View style={[styles.statItem, { backgroundColor: "#ffafaf" }]}>
            <FontAwesome6 name="ban" size={24} color="#ff3434" />
            <Text style={[styles.statNumber, { color: "#ff3434" }]}>
              {stats.canceled}
            </Text>
            <Text style={[styles.statLabel, { color: "#ff3434" }]}>Canceled</Text>
          </View>
          <View style={[styles.statItem, { backgroundColor: "#e0f7fa" }]}>
            <MaterialIcons name="pending-actions" size={24} color="#00acc1" />
            <Text style={[styles.statNumber, { color: "#00acc1" }]}>
              {stats.pending}
            </Text>
            <Text style={[styles.statLabel, { color: "#00acc1" }]}>Pending</Text>
          </View>
        </View>
      </View>

      {/* Timeline */}
      <FlatList
  data={filteredTasks}
  keyExtractor={(item) => item._id || item.id}
  renderItem={({ item }) => (
    <View style={styles.taskCard}>
      {/* Time */}
      <View style={styles.timeColumn}>
        <Text style={styles.timeText}>{formatTime12Hour(item.start_time)}</Text>{item.end_time && <Text style={styles.timeText}>{formatTime12Hour(item.end_time)}</Text>}
      </View>

      {/* Content */}
      <View style={styles.contentColumn}>
        <View style={styles.taskHeader}>
          <Text
            style={[
              styles.taskTitle,
              item.status === "completed" && styles.completedTitle,
            ]}
          >
            {item.name}
          </Text>
          <Text
            style={[
              styles.statusBadge,
              { backgroundColor: item.status === "completed" ? "#ccc" : "#48c774" },
            ]}
          >
            {item.status === "completed" ? "Completed" : "Ongoing"}
          </Text>
        </View>
        {item.description && (
          <Text style={styles.taskDesc}>{item.description}</Text>
        )}

        {/* Actions */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[
              styles.actionBtn,
              item.status === "completed" ? styles.undoBtn : styles.completeBtn,
            ]}
            onPress={() => completeTask(item._id || item.id)}
          >
            <Text style={styles.btnText}>
              {item.status === "completed" ? "Undo" : "✓ Done"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => deleteTask(item._id || item.id)}
          >
            <Text style={[styles.btnText, { color: "red" }]}>🗑️ Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )}
  ListEmptyComponent={
    <Text style={styles.noTask}>
      {searchQuery ? "No matching tasks found" : "No tasks available"}
    </Text>
  }
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
  }
  contentContainerStyle={styles.timelineContainer}
/>

    </SafeAreaView>
  );
};

export default DashboardScreen;
