import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';

export type BottomTabParamList = {
    More: NavigatorScreenParams<MoreStackParamList>;
};

export type BottomTabNavigationProp2 = BottomTabNavigationProp<BottomTabParamList>;

export type MoreStackParamList = {
    Profile: undefined;
    Settings: undefined;
  };

export type MoreStackNavigationProp = NativeStackNavigationProp<MoreStackParamList>;

