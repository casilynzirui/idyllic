import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type BottomTabParamList = {
    More: undefined;
};

export type BottomTabNavigationProp2 = BottomTabNavigationProp<BottomTabParamList>;

export type MoreStackParamList = {
    Profile: undefined;
    Settings: undefined;
  };

export type MoreStackNavigationProp = NativeStackNavigationProp<MoreStackParamList>;
