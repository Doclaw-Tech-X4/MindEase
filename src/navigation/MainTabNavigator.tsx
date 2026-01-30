import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MainTabParamList, TaskStackParamList, EmailStackParamList, CalendarStackParamList, AnalyticsStackParamList, ProfileStackParamList } from '../types';
import { useAuth } from '../context/AuthContext';
import { useDynamicColors } from '../constants/dynamicColors';

// Import screens
import DashboardScreen from '../screens/DashboardScreen';
import TaskListScreen from '../screens/TaskListScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import RoutinesScreen from '../screens/RoutinesScreen';
import InboxScreen from '../screens/InboxScreen';
import EmailDetailScreen from '../screens/EmailDetailScreen';
import ComposeScreen from '../screens/ComposeScreen';
import EmailSettingsScreen from '../screens/EmailSettingsScreen';
import CalendarViewScreen from '../screens/CalendarViewScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import AddEventScreen from '../screens/AddEventScreen';
import OverviewScreen from '../screens/OverviewScreen';
import ReportsScreen from '../screens/ReportsScreen';
import InsightsScreen from '../screens/InsightsScreen';
import ProfileScreenDetail from '../screens/ProfileScreenDetail';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();
const TaskStack = createNativeStackNavigator<TaskStackParamList>();
const EmailStack = createNativeStackNavigator<EmailStackParamList>();
const CalendarStack = createNativeStackNavigator<CalendarStackParamList>();
const AnalyticsStack = createNativeStackNavigator<AnalyticsStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

// Task Stack Navigator
const TaskStackNavigator = () => (
  <TaskStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <TaskStack.Screen name="TaskList" component={TaskListScreen} />
    <TaskStack.Screen name="AddTask" component={AddTaskScreen} />
    <TaskStack.Screen name="TaskDetail" component={TaskDetailScreen} />
    <TaskStack.Screen name="Routines" component={RoutinesScreen} />
  </TaskStack.Navigator>
);

// Email Stack Navigator
const EmailStackNavigator = () => (
  <EmailStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <EmailStack.Screen name="Inbox" component={InboxScreen} />
    <EmailStack.Screen name="EmailDetail" component={EmailDetailScreen} />
    <EmailStack.Screen name="Compose" component={ComposeScreen} />
    <EmailStack.Screen name="Settings" component={EmailSettingsScreen} />
  </EmailStack.Navigator>
);

// Calendar Stack Navigator
const CalendarStackNavigator = () => (
  <CalendarStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <CalendarStack.Screen name="CalendarView" component={CalendarViewScreen} />
    <CalendarStack.Screen name="EventDetail" component={EventDetailScreen} />
    <CalendarStack.Screen name="AddEvent" component={AddEventScreen} />
  </CalendarStack.Navigator>
);

// Analytics Stack Navigator
const AnalyticsStackNavigator = () => (
  <AnalyticsStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AnalyticsStack.Screen name="Overview" component={OverviewScreen} />
    <AnalyticsStack.Screen name="Reports" component={ReportsScreen} />
    <AnalyticsStack.Screen name="Insights" component={InsightsScreen} />
  </AnalyticsStack.Navigator>
);

// Profile Stack Navigator
const ProfileStackNavigator = () => (
  <ProfileStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <ProfileStack.Screen name="Profile" component={ProfileScreenDetail} />
    <ProfileStack.Screen name="Settings" component={SettingsScreen} />
    <ProfileStack.Screen name="About" component={AboutScreen} />
  </ProfileStack.Navigator>
);

// Main Tab Navigator
const MainTabNavigator = () => {
  const { user } = useAuth();
  const colors = useDynamicColors();

  const ProfileTabIcon = ({ focused, size }: { focused: boolean; size: number }) => {
    if (user?.profilePicture) {
      return (
        <Image 
          source={{ uri: user.profilePicture }} 
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 2,
            borderColor: focused ? colors.primary : 'transparent',
          }} 
        />
      );
    }
    
    return (
      <View style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: focused ? colors.primary : 'transparent',
      }}>
        <Text style={{
          color: colors.white,
          fontSize: size * 0.6,
          fontWeight: 'bold',
        }}>
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </Text>
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Profile') {
            return <ProfileTabIcon focused={focused} size={size} />;
          }

          let iconName: string;

          switch (route.name) {
            case 'Dashboard':
              iconName = 'dashboard';
              break;
            case 'Tasks':
              iconName = 'assignment';
              break;
            case 'Email':
              iconName = 'email';
              break;
            case 'Calendar':
              iconName = 'calendar-today';
              break;
            case 'Analytics':
              iconName = 'analytics';
              break;
            default:
              iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TaskStackNavigator}
        options={{
          tabBarLabel: 'Tasks',
        }}
      />
      <Tab.Screen
        name="Email"
        component={EmailStackNavigator}
        options={{
          tabBarLabel: 'Email',
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarStackNavigator}
        options={{
          tabBarLabel: 'Calendar',
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsStackNavigator}
        options={{
          tabBarLabel: 'Analytics',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
