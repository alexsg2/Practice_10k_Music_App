import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

// Import our custom screens here
import JournalScreen from './screens/JournalScreen';
import HomeScreen from './screens/HomeScreen';

const Tab = createBottomTabNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options={{tabBarIcon: (tabInfo) => (
            <Ionicons name="home-outline" size={24} color={tabInfo.focused ? "#5982C2" : "#000000"} />
          ),
        }}/>
        <Tab.Screen name="Journal" component={JournalScreen} options={{
          tabBarIcon: (tabInfo) => (
            <Ionicons name="journal-outline" size={24} color={tabInfo.focused ? "#5982C2" : "#000000"} />
          ),
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;