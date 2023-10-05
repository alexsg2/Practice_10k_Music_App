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
import TabHeader from '../../components/tabHeader';

function AppNavigation()
{
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} 
                    options={{tabBarIcon: (tabInfo) => (<Ionicons name="home-outline" size={24} color={tabInfo.focused ? "#5982C2" : "#000000"}/>), 
                              headerTitle: () => <TabHeader title="Home"/>, 
                              headerStyle: styles.header,
                            }}/>
                <Tab.Screen name="Practice" component={Home} 
                    options={{tabBarIcon: (tabInfo) => (<Ionicons name="play" size={24} color={tabInfo.focused ? "#5982C2" : "#000000"}/>), 
                              headerTitle: () => <TabHeader title="Practice"/>, 
                              headerStyle: styles.header,
                            }}/>
                <Tab.Screen name="Progress" component={Home} 
                    options={{tabBarIcon: (tabInfo) => (<AntDesign name="barschart" size={24} color={tabInfo.focused ? "#5982C2" : "#000000"}/>), 
                              headerTitle: () => <TabHeader title="Progress"/>, 
                              headerStyle: styles.header,
                            }}/>
                <Tab.Screen name="Journal" component={Journal}
                    options={{tabBarIcon: (tabInfo) => (<Ionicons name="journal-outline" size={24} color={tabInfo.focused ? "#5982C2" : "#000000"}/>),
                              headerTitle: () => <TabHeader title="Journal"/>, 
                              headerStyle: styles.header,
                            }}/>
                <Tab.Screen name="Profile" component={Profile}
                    options={{tabBarIcon: (tabInfo) => (<AntDesign name="user" size={24} color={tabInfo.focused ? "#5982C2" : "#000000"}/>),
                              headerTitle: () => <TabHeader title="Profile"/>, 
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
        height: 100,
    },
});
