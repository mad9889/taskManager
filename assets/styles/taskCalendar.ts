import { ThemeContext } from "@/app/theme";
import { Theme } from "@react-navigation/native";
import { useContext } from "react";
import { StyleSheet } from "react-native";
const { colors } = useContext(ThemeContext);

export const taskCalStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15, 
      backgroundColor: colors.background,
    },
    header: {
      padding: 17,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.card.background,
    },
    // headerButton: {
    //   padding: 5,
    // },
    // headerTitle: {
    //   color: colors.text,
    //   fontSize: 18,
    //   fontWeight: "bold",
    // },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: colors.card.background,
      zIndex: 9999,
  elevation: 99, 
    },
    pickerContainer: {
      flexDirection: 'row',
      gap: 10,
    },
    dropdownButton: {
      padding: 10,
      borderRadius: 8,
      backgroundColor: colors.card.background,
      minWidth: 80,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    dropdownText: {
      color: colors.text,
      fontWeight: '600',
    },
    daysDropdown: {
      maxHeight: 80,
      zIndex: 1,
      position: 'relative',
      backgroundColor: colors.card.background,
    },
    dropdownContainer: {
      position: 'absolute',
      top: 50,
      zIndex: 10000,
      backgroundColor: colors.card.background,
      borderRadius: 8,
      elevation: 100,
      maxHeight: 200,
      borderWidth: 1,
      borderColor: colors.border,
    },
    dropdownItem: {
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    dayButton: {
      alignItems: 'center',
      padding: 10,
      marginHorizontal: 4,
      borderRadius: 12,
      height: 60,
      minWidth: 50,
    },
    selectedDay: {
      backgroundColor: colors.primary,
    },
    dayText: {
      color: colors.text,
    },
    selectedDayText: {
      color: 'white',
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
    alignItems: 'flex-end',
    marginRight: 10,
  },
  timeText: {
    fontSize: 16,
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
