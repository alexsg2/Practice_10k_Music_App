import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// Import our custom screens here
import Home from './Home';
import Practice from './Practice';
import Progress from './Progress';
import Journal from './Journal';
import Profile from './Profile';

const Tab = createBottomTabNavigator();
import AppHeader from '../../components';

function AppNavigation()
{
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} 
                    options={{tabBarIcon: (tabInfo) => (<Ionicons name="home-outline" size={24} color={tabInfo.focused ? "#5982C2" : "#000000"}/>), 
                              headerTitle: () => <AppHeader title="Home"/>, 
                              headerStyle: styles.header,
                            }}/>
                <Tab.Screen name="Practice" component={Practice} 
                    options={{tabBarIcon: (tabInfo) => (<Ionicons name="play" size={24} color={tabInfo.focused ? "#5982C2" : "#000000"}/>), 
                              headerTitle: () => <AppHeader title="Practice"/>, 
                              headerStyle: styles.header,
                            }}/>
                <Tab.Screen name="Progress" component={Progress} 
                    options={{tabBarIcon: (tabInfo) => (<AntDesign name="barschart" size={24} color={tabInfo.focused ? "#5982C2" : "#000000"}/>), 
                              headerTitle: () => <AppHeader title="Progress"/>, 
                              headerStyle: styles.header,
                            }}/>
                <Tab.Screen name="Journal" component={Journal}
                    options={{tabBarIcon: (tabInfo) => (<Ionicons name="journal-outline" size={24} color={tabInfo.focused ? "#5982C2" : "#000000"}/>),
                              headerTitle: () => <AppHeader title="Journal"/>, 
                              headerStyle: styles.header,
                            }}/>
                <Tab.Screen name="Profile" component={Profile}
                    options={{tabBarIcon: (tabInfo) => (<AntDesign name="user" size={24} color={tabInfo.focused ? "#5982C2" : "#000000"}/>),
                              headerTitle: () => <AppHeader title="Profile"/>, 
                              headerStyle: styles.header,
                            }}/>
              </Tab.Navigator>
          </NavigationContainer>
    );
}

export default AppNavigation;

const styles = StyleSheet.create(
{
    header: {
        height: 115,
    },
});
