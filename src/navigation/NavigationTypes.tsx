import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';

export type BottomTabParamList = {
    More: NavigatorScreenParams<MoreStackParamList>;
};

export type BottomTabNavigationProp2 = BottomTabNavigationProp<BottomTabParamList>;

export type MoreStackParamList = {
    Canvas: undefined;
    Settings: undefined;
  };

export type MoreStackNavigationProp = NativeStackNavigationProp<MoreStackParamList>;

export type DashboardStackParamList = {
  Dashboards: undefined;
  Calendar: undefined;
  Agenda: undefined;
  MoodTracker: undefined;
};

export type DashboardStackNavigationProp = NativeStackNavigationProp<DashboardStackParamList>;
