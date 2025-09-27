// Comprehensive shim for react-native-calendars
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Calendar component with basic month view
export const Calendar = ({ onDayPress, markedDates, ...props }: any) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const renderDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <View key={`empty-${i}`} style={styles.dayCell} />
      );
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isMarked = markedDates && markedDates[dateString];
      
      days.push(
        <TouchableOpacity
          key={day}
          style={[styles.dayCell, isMarked && styles.markedDay]}
          onPress={() => onDayPress && onDayPress({ dateString })}
        >
          <Text style={[styles.dayText, isMarked && styles.markedDayText]}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    }
    
    return days;
  };
  
  return (
    <View style={[styles.calendar, props.style]}>
      <View style={styles.header}>
        <Text style={styles.monthYear}>
          {monthNames[month]} {year}
        </Text>
      </View>
      
      <View style={styles.weekHeader}>
        {dayNames.map(day => (
          <View key={day} style={styles.weekDay}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.daysContainer}>
        {renderDays()}
      </View>
    </View>
  );
};

// CalendarList component
export const CalendarList = (props: any) => {
  return <Calendar {...props} />;
};

// Agenda component
export const Agenda = ({ items, renderItem, ...props }: any) => {
  return (
    <View style={[styles.agenda, props.style]}>
      <Text style={styles.agendaTitle}>Agenda</Text>
      {items && Object.keys(items).map(date => (
        <View key={date} style={styles.agendaSection}>
          <Text style={styles.agendaDate}>{date}</Text>
          {items[date].map((item: any, index: number) => (
            <View key={index} style={styles.agendaItem}>
              {renderItem ? renderItem(item) : (
                <Text style={styles.agendaItemText}>{item.name || item.title || 'Event'}</Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  monthYear: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  weekHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDay: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  weekDayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  dayText: {
    fontSize: 16,
    color: '#333',
  },
  markedDay: {
    backgroundColor: '#A2AB9B',
  },
  markedDayText: {
    color: 'white',
    fontWeight: 'bold',
  },
  agenda: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  agendaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  agendaSection: {
    marginBottom: 16,
  },
  agendaDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#A2AB9B',
  },
  agendaItem: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  agendaItemText: {
    fontSize: 14,
    color: '#333',
  },
});

export default {
  Calendar,
  CalendarList,
  Agenda,
};