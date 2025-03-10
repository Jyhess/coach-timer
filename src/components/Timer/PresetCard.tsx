import React from 'react';
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { TimerPreset, ALERT_SOUNDS } from '../../types/timer';
import { Icon } from './Icon';
import { formatTime } from '../../utils/time';

type PresetCardProps = {
  preset: TimerPreset;
  style?: StyleProp<ViewStyle>;
  timeStyle?: StyleProp<TextStyle>;
  iconColor?: string;
  iconSize?: number;
};

export const PresetCard = ({ 
  preset, 
  style, 
  timeStyle,
  iconColor = "#fff",
  iconSize = 20 
}: PresetCardProps) => {
  return (
    <View style={style}>
      <Text style={timeStyle}>
        {formatTime(preset.seconds)}
      </Text>
      <View style={{ flexDirection: 'row', gap: 4, justifyContent: 'center' }}>
        {preset.alerts
          .map((alert) => (
            <Icon
              key={alert.id}
              name={ALERT_SOUNDS[alert.sound].iconName as any}
              size={iconSize}
              color={alert.enabled ? iconColor : "#777"}
            />
          ))}
      </View>
    </View>
  );
}; 