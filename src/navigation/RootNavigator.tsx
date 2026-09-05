import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabNavigator } from './MainTabNavigator';
import { MarketplaceListingScreen } from '../screens/shop/MarketplaceListingScreen';
import { ProductDetailsScreen } from '../screens/shop/ProductDetailsScreen';
import { MarketplaceConfirmationScreen } from '../screens/shop/MarketplaceConfirmationScreen';
import { RootStackParamList } from './types';
import { colors, fontSize, fontWeight } from '../theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.textPrimary,
          headerTitleStyle: { fontSize: fontSize.md, fontWeight: fontWeight.semibold },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen
          name="MarketplaceListing"
          component={MarketplaceListingScreen}
          options={{ title: '1Fi Marketplace' }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{ title: 'Product details' }}
        />
        <Stack.Screen
          name="MarketplaceConfirmation"
          component={MarketplaceConfirmationScreen}
          options={{ title: 'Confirmation', headerBackVisible: false, gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
