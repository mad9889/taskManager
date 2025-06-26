import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Platform,
  Pressable,
} from "react-native";
import { ThemeContext } from "../theme";
import { useAuth } from "../contexts/auth-context";
import { getToken } from "../utils/tokenManager";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { useDebounce } from "../hooks/useDebounce";
import { BASE_URL } from '../utils/config';

export default function AddTask() {
  const { colors } = useContext(ThemeContext);
  const { user } = useAuth();
  const [message, setMessage] = useState();
  const [selectedParticipants, setSelectedParticipants] = useState<UserType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showMobileTimePicker, setShowMobileTimePicker] = useState(false);
  const [timePickerTarget, setTimePickerTarget] = useState<"start" | "end">("start");
  
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    description: "",
    start: "",
    end: "",
    category: "All",
  });

  // Simple time input handler for web
  const handleWebTimeChange = (target: "start" | "end", e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [target]: e.target.value
    }));
  };

  const handleDateChange = (event, selectedDate) => {
  setShowDatePicker(false);
  if (selectedDate) {
    const dateStr = selectedDate.toISOString().split("T")[0]; // format: yyyy-mm-dd
    setFormData(prev => ({
      ...prev,
      date: dateStr
    }));
  }
};


  const handleMobileTimePress = (target: "start" | "end") => {
    setTimePickerTarget(target);
    setShowMobileTimePicker(true);
  };

  const handleMobileTimeChange = (event: any, selectedDate?: Date) => {
    setShowMobileTimePicker(false);
    if (selectedDate) {
      const hours = selectedDate.getHours();
      const minutes = selectedDate.getMinutes();
      const timeString = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
      setFormData(prev => ({
        ...prev,
        [timePickerTarget]: timeString
      }));
    }
  };

  // Debounce the search query with 500ms delay
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const searchUsers = async (query) => {
  if (!query || query.length < 3) {
    setAvailableUsers([]);
    return;
  }

  try {
    const token = await getToken();
    const response = await axios.get(`${BASE_URL}/users?search=${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    setAvailableUsers(response.data);
  } catch (error) {
    console.error('Error searching users:', error);
  }
};

// Effect that runs when debounced search term changes
  useEffect(() => {
      searchUsers(debouncedSearchQuery);
  }, [debouncedSearchQuery]);


const addParticipant = (user: string) => {
  const alreadyAdded = selectedParticipants.find(u => u.id === user.id);
  if (!alreadyAdded) {
    setSelectedParticipants([...selectedParticipants, user]);
  }
    setSearchQuery('');
    setAvailableUsers([]);
};

const removeParticipant = (id: string) => {
  setSelectedParticipants(prev => prev.filter(u => u.id !== id));
};

  const handleSubmit = async () => {
  try {
    const token = await getToken();
    if (!token) {
      alert("Authentication required. Please login again.");
      return;
    }

    const response = await fetch(`${BASE_URL}/tasks/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...formData,
        participants: selectedParticipants.map(p => p.id),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Request failed");
    }

    const data = await response.json();
    if (data.ok) {
      setMessage(data.message);
    } else {
      throw new Error(data.message || "Operation failed");
    }

  } catch (err) {
    console.error("Submission error:", err);

    if (err.message.includes("401") || err.message.includes("Unauthorized")) {
      alert("Session expired. Please login again.");
    } else {
      alert(err.message || "An error occurred. Please try again.");
    }
  }
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15, 
      backgroundColor: colors.background,
    },
    formContainer: {
      padding: 20,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: "bold",
      color: "#161f7c",
      marginBottom: 20,
    },
    inputGroup: {
      marginBottom: 20,
    },
    inputLabel: {
      color: "#161f7c",
      fontWeight: "bold",
      marginBottom: 8,
    },
    input: {
      backgroundColor: "white",
      borderRadius: 8,
      padding: 15,
      fontSize: 16,
    },
    timeContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 2, 
    },
    timeInputGroup: {
      // margin: 20,
      width: "35%",
    },
    createButton: {
      backgroundColor: "#161f7c",
      borderRadius: 8,
      padding: 15,
      alignItems: "center",
      marginTop: 20,
    },
    createButtonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
    },
    descriptionInput: {
      height: 100,
      textAlignVertical: "top",
    },
    categoryContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 10,
    },
    categoryButton: {
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "#161f7c",
      marginRight: 10,
      marginBottom: 10,
    },
    selectedCategory: {
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 20,
      marginRight: 10,
      marginBottom: 10,
      backgroundColor: "#E2F6E9",
    },
    categoryText: {
      color: "#10425B",
    },
    selectedCategoryText: {
      color: "#146C43",
    },
    succerrMesaage: {
      backgroundColor: "#E2F6E9",
      color: "#146C43",
      padding: 10,
      marginBottom: 15,
    },
     participantContainer: {
    marginTop: 10,
  },
  selectedParticipants: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  participantBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  participantText: {
    fontSize: 17,
    color: colors.text,
  },
  removeParticipant: {
    marginLeft: 6,
  },
  removeParticipantText: {
    fontSize: 16,
    color: '#ff4444',
  },
  userList: {
    maxHeight: 150,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  userItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userEmail: {
    fontSize: 12,
    color: '#666',
  },
  });

  const categories = ["All", "UI/UX", "Web Development", "Exercise", "Marketing"];

  return (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.formContainer}>
      <Text style={styles.sectionTitle}>Add Task</Text>

      {message && <Text style={styles.succerrMesaage}>{message}</Text>}

      {/* Task Name */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Task Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Mockup design"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />
      </View>

      {/* Task Date */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Task Date</Text>
        {Platform.OS === "web" ? (
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            style={styles.webInput}
          />
        ) : (
          <Pressable onPress={() => setShowDatePicker(true)}>
            <TextInput
              style={styles.input}
              value={formData.date}
              placeholder="Select date"
              editable={false}
            />
          </Pressable>
        )}
      </View>

      {/* Start/End Time */}
      <View style={styles.inputGroup}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 16 }}>
          {["start", "end"].map((label) => (
            <View key={label} style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>
                {label === "start" ? "Starts" : "Ends"}
              </Text>

              {Platform.OS === "web" ? (
                <input
                  type="time"
                  value={formData[label]}
                  onChange={(e) => handleWebTimeChange(label, e)}
                  style={styles.webInput}
                />
              ) : (
                <Pressable onPress={() => handleMobileTimePress(label)}>
                  <TextInput
                    style={styles.input}
                    value={formData[label]}
                    placeholder={`${label === "start" ? "Start" : "End"} time`}
                    editable={false}
                  />
                </Pressable>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Category */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Category</Text>
        <View style={styles.categoryContainer}>
          {categories.map((cat) => {
            const isSelected = formData.category === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={isSelected ? styles.selectedCategory : styles.categoryButton}
                onPress={() => setFormData({ ...formData, category: cat })}
              >
                <Text style={isSelected ? styles.selectedCategoryText : styles.categoryText}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Participants */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Participants</Text>
        <View style={styles.participantContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search team members"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />

          {/* Selected participants */}
          <View style={styles.selectedParticipants}>
            {selectedParticipants.map(user => (
              <View key={user.id} style={styles.participantBadge}>
                <Text style={styles.participantText}>{user.name}</Text>
                <TouchableOpacity
                  onPress={() => removeParticipant(user.id)}
                  style={styles.removeParticipant}
                >
                  <Text style={styles.removeParticipantText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Available users */}
          <ScrollView style={styles.userList}>
            {availableUsers
              .filter(user => !selectedParticipants.some(p => p.id === user.id))
              .map(user => (
                <TouchableOpacity
                  key={user.id}
                  style={styles.userItem}
                  onPress={() => addParticipant(user)}
                >
                  <Text>{user.name}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </View>

      {/* Description */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Description</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Write anything..."
          multiline
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
        />
      </View>

      {/* Submit */}
      <TouchableOpacity style={styles.createButton} onPress={handleSubmit}>
        <Text style={styles.createButtonText}>Create</Text>
      </TouchableOpacity>
    </ScrollView>

    {/* Pickers */}
    {showDatePicker && (
      <DateTimePicker
        value={new Date()}
        mode="date"
        display="default"
        onChange={handleDateChange}
      />
    )}

    {showMobileTimePicker && (
      <DateTimePicker
        value={new Date()}
        mode="time"
        display="default"
        onChange={handleMobileTimeChange}
      />
    )}
  </SafeAreaView>
);

}



       

