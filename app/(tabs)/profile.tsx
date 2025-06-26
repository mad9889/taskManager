// "exception thrown when executing UiFrameGuarded. error while updating 'source' of a view managed by: RCtImageview null vlaue for uri cannot be cast from double string" this error occurs in expo go.

import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  View,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import profileImg from "../../assets/images/emoji1.png";
import { ThemeContext } from "../theme";
import { Redirect, router } from "expo-router";
import { useAuth } from "../contexts/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { BASE_URL } from '../utils/config';
import { getToken } from '../utils/tokenManager';

const Profile = () => {
  const { colors } = useContext(ThemeContext);
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
const [oldPassword, setOldPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

//Image handler
const handleImagePick = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled) {
    const token = await getToken();
    const uri = result.assets[0].uri;
    const formData = new FormData();

    if (Platform.OS === "web") {
      const response = await fetch(uri);
      const blob = await response.blob();
      formData.append("image", blob, "profile.jpg");
    } else {
      formData.append("image", {
        uri: uri,
        name: "profile.jpg",
        type: "image/jpeg",
      });
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/upload-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;
      if (data.success) {
        setProfile((prev) => ({ ...prev, image: data.path }));
      } else {
        Alert.alert("Upload failed", JSON.stringify(data));
      }
    } catch (err) {
      console.log("Upload error:", err.response?.data || err.message);
      Alert.alert("Error", "Image upload failed");
    }
  }
};


const handleChangePassword = async () => {
  if (newPassword !== confirmPassword) {
    Alert.alert("Error", "Passwords do not match");
    return;
  }

  try {
    const token = await getToken();
    const res = await axios.post(
      `${BASE_URL}/change-password`,
      {
        old_password: oldPassword,
        new_password: newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.data;
    if (data.success) {
      alert("Success", data.message);
      setModalVisible(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      alert("Failed", data.message || "Something went wrong");
    }
  } catch (err) {
    console.error(err);
    alert("Error", "Network error");
  }
};


 useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = await getToken();
      const response = await fetch(`${BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setProfile(data);
    } catch (err) {
      console.error("Error fetching user profile", err);
    }
  };

  fetchProfile();
}, []);


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: 20,
    },
    profileHeader: {
      alignItems: "center",
      marginBottom: 30,
      padding: 30,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
      color: colors.text,
      backgroundColor: colors.card.background,
    },
    headerButton: {
      padding: 5,
    },
    headerTitle: {
      fontSize: 18,
      color: colors.text,
      fontWeight: "bold",
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: "#2196F3",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 15,
    },
    avatarText: {
      fontSize: 32,
      fontWeight: "bold",
      color: colors.text,
    },
    name: {
      color: colors.text,
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 5,
    },
    title: {
      fontSize: 16,
      color: colors.text,
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 30,
    },
    statItem: {
      backgroundColor: "#d6b2ff",
      width: "48%",
      borderRadius: 10,
      padding: 20,
      alignItems: "center",
    },
    statNumber: {
      fontSize: 24,
      color: "#722fff",
      fontWeight: "bold",
      marginBottom: 5,
    },
    statLabel: {
      fontSize: 14,
      color: "#722fff",
      textAlign: "center",
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 15,
      color: colors.text,
    },
    menuContainer: {
      backgroundColor: colors.card.background,
      borderRadius: 10,
      padding: 15,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    menuText: {
      flex: 1,
      color: colors.text,
      fontSize: 16,
      marginLeft: 15,
    },
    modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#222",
    textAlign: "center",
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 4,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
  },
  cancelButton: {
    backgroundColor: "#eee",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color="#999" />
        </Pressable>
        <Text style={styles.headerTitle}>Profile</Text>
        <Pressable style={styles.headerButton}>
          <Icon name="menu" size={24} color="#999" />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Pressable onPress={handleImagePick}>
            <Image source={{ uri: profile?.image || profileImg }} style={styles.avatar} />
          </Pressable>
          <Text style={styles.name}>{user && user?.name}</Text>
          <Text style={styles.title}>UI/UX Designer</Text>
        </View>

        {/* Account Options */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>My Account</Text>

          <Pressable style={styles.menuItem} onPress={() => {
            console.log("click");
            setModalVisible(true)}}>
            <Icon name="lock-outline" size={24} color="#666" />
            <Text style={styles.menuText}>Change Password</Text>
            <Icon name="chevron-right" size={24} color="#999" />
          </Pressable>

          <TouchableOpacity style={styles.menuItem}>
            <Icon name="work-outline" size={24} color="#666" />
            <Text style={styles.menuText}>Project You Are in</Text>
            <Icon name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon name="logout" size={24} color="#666" />
            <Text style={styles.menuText}>Log Out</Text>
            <Icon name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
        </View>
      </ScrollView>


<Modal visible={modalVisible} transparent animationType="slide">
  <View style={styles.modalOverlay}>
    <View style={styles.modalCard}>
      <Text style={styles.modalTitle}>🔒 Change Password</Text>

      <TextInput
        placeholder="Old Password"
        placeholderTextColor="#888"
        secureTextEntry
        style={styles.inputField}
        value={oldPassword}
        onChangeText={setOldPassword}
      />
      <TextInput
        placeholder="New Password"
        placeholderTextColor="#888"
        secureTextEntry
        style={styles.inputField}
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        placeholder="Confirm New Password"
        placeholderTextColor="#888"
        secureTextEntry
        style={styles.inputField}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <View style={styles.modalActions}>
        <TouchableOpacity
          style={[styles.modalButton, styles.saveButton]}
          onPress={handleChangePassword}
        >
          <Text style={styles.buttonText}>✅ Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.modalButton, styles.cancelButton]}
          onPress={() => setModalVisible(false)}
        >
          <Text style={[styles.buttonText, { color: "#999" }]}>❌ Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

    </SafeAreaView>
  );
};

export default Profile;
