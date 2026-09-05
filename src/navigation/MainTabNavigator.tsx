import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { ShopScreen } from '../screens/shop/ShopScreen';
import { PortfolioScreen } from '../screens/PortfolioScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { TabParamList } from './types';
import { colors } from '../theme';

const Tab = createBottomTabNavigator<TabParamList>();

const tabIcons: Record<keyof TabParamList, keyof typeof Ionicons.glyphMap> = {
  Home: 'home',
  Shop: 'bag',
  Portfolio: 'pie-chart',
  Profile: 'person',
};

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: { borderTopColor: colors.border },
        tabBarIcon: ({ color, size, focused }) => {
          const baseName = tabIcons[route.name as keyof TabParamList];
          const name = focused ? baseName : (`${baseName}-outline` as keyof typeof Ionicons.glyphMap);
          return <Ionicons name={name} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Shop" component={ShopScreen} />
      <Tab.Screen name="Portfolio" component={PortfolioScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
