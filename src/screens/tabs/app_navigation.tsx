import React from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { IPracticeDataProps } from '../../redux/reducers';
import { AppHeader, PracticeTimerHeader, JournalDetailsHeader, EditHeader } from '../../components';

import Home from './Home';
import Practice from './Practice';
import PracticeTimer from './PracticeTimer';
import Progress from './Progress';
import Journal from './Journal';
import JournalDetail from './JournalDetail';
import Profile from './Profile';
import EditProfile from './EditProfile';

const Tab = createBottomTabNavigator();

export type PracticeStackParamList = {
    Practice: undefined;
    PracticeTimer: { item: IPracticeDataProps[] };
};
const PracticeStack = createNativeStackNavigator();

export type JournalStackParamList = {
    Journal: undefined;
    JournalDetail: {item: any};
};
const JournalStack = createNativeStackNavigator();

export type ProfileStackParamList = {
    Profile: undefined;
    EditProfile: undefined;
};
const ProfileStack = createNativeStackNavigator();


function AppNavigation()
{
    const PracticeNavigationStack = () => (
        <PracticeStack.Navigator screenOptions={{ headerShown: false }}>
            <PracticeStack.Screen name="PracticeScreen" component={Practice}/>
            <PracticeStack.Screen name="PracticeTimer" component={PracticeTimer}/>
        </PracticeStack.Navigator>
    )
    
    const JournalNavigationStack = () => (
        <JournalStack.Navigator screenOptions={{ headerShown: false }}>
            <JournalStack.Screen name="JournalScreen" component={Journal}/>
            <JournalStack.Screen name="JournalDetail" component={JournalDetail}/>
        </JournalStack.Navigator>
    )

    const ProfileNavigationStack = () => (
        <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
            <ProfileStack.Screen name="ProfileScreen" component={Profile}/>
            <ProfileStack.Screen name="EditProfile" component={EditProfile}/>
        </ProfileStack.Navigator>
    );

    
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} 
                    options={{tabBarIcon: (tabInfo) => (<Ionicons name='home-outline' size={24} color={tabInfo.focused ? '#5982C2' : '#000000'}/>), 
                              headerTitle: () => <AppHeader name="Home"/>, 
                              headerStyle: { height: 115 },
                            }}/>
                <Tab.Screen name="Practice" component={PracticeNavigationStack} 
                    options={({ route }) => ({tabBarIcon: (tabInfo) => (<Ionicons name='play' size={24} color={tabInfo.focused ? '#5982C2' : '#000000'}/>), 
                                              headerTitle: () => {
                                                    const routeName = getFocusedRouteNameFromRoute(route);
                                                    if (routeName === 'PracticeTimer') {
                                                        return <PracticeTimerHeader/>;
                                                    } else {
                                                        return <AppHeader name="Practice"/>;
                                                    }
                                             },
                                             headerStyle: { height: 115 },
                                            })}/>
                <Tab.Screen name="Progress" component={Progress} 
                    options={{tabBarIcon: (tabInfo) => (<AntDesign name='barschart' size={24} color={tabInfo.focused ? '#5982C2' : '#000000'}/>), 
                              headerTitle: () => <AppHeader name="Progress"/>, 
                              headerStyle: { height: 115 },
                            }}/>
                <Tab.Screen name="Journal" component={JournalNavigationStack}
                    options={({ route }) => ({tabBarIcon: (tabInfo) => (<Ionicons name='journal-outline' size={24} color={tabInfo.focused ? '#5982C2' : '#000000'}/>), 
                                              headerTitle: () => {
                                                    const routeName = getFocusedRouteNameFromRoute(route);
                                                    if (routeName === 'JournalDetail') {
                                                        return <JournalDetailsHeader/>;
                                                    } else {
                                                        return <AppHeader name="Journal"/>;
                                                    }
                                             },
                                             headerStyle: { height: 115 },
                                            })}/>
                <Tab.Screen name="Profile" component={ProfileNavigationStack}
                    options={({ route }) => ({tabBarIcon: (tabInfo) => (<AntDesign name='user' size={24} color={tabInfo.focused ? '#5982C2' : '#000000'}/>), 
                                              headerTitle: () => {
                                                    const routeName = getFocusedRouteNameFromRoute(route);
                                                    if (routeName === 'EditProfile') {
                                                        return <EditHeader/>;
                                                    } else {
                                                        return <AppHeader name="Profile"/>;
                                                    }
                                             },
                                             headerStyle: { height: 115 },
                                            })}/>
              </Tab.Navigator>
          </NavigationContainer>
    );
}

export default AppNavigation;
