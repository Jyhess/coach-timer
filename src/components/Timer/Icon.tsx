import React from 'react';
import { Image, ImageStyle } from 'react-native';

const iconMap = {
  add: require('../../../assets/icons/add.png'),
  add_alert: require('../../../assets/icons/add_alert.png'),
  add_circle: require('../../../assets/icons/add_circle.png'),
  alarm_add: require('../../../assets/icons/alarm_add.png'),
  arrow_back: require('../../../assets/icons/arrow_back.png'),
  arrow_drop_down: require('../../../assets/icons/arrow_drop_down.png'),
  backspace: require('../../../assets/icons/backspace.png'),
  bolt: require('../../../assets/icons/bolt.png'),
  bookmark: require('../../../assets/icons/bookmark.png'),
  celebration: require('../../../assets/icons/celebration.png'),
  change_circle: require('../../../assets/icons/change_circle.png'),
  check: require('../../../assets/icons/check.png'),
  check_circle: require('../../../assets/icons/check_circle.png'),
  church: require('../../../assets/icons/church.png'),
  circle_notifications: require('../../../assets/icons/circle_notifications.png'),
  close: require('../../../assets/icons/close.png'),
  crisis_alert: require('../../../assets/icons/crisis_alert.png'),
  doorbell: require('../../../assets/icons/doorbell.png'),
  edit: require('../../../assets/icons/edit.png'),
  flash: require('../../../assets/icons/flash.png'),
  foggy: require('../../../assets/icons/foggy.png'),
  gong: require('../../../assets/icons/gong.png'),
  highlight: require('../../../assets/icons/highlight.png'),
  minus_circle: require('../../../assets/icons/minus_circle.png'),
  music_note: require('../../../assets/icons/music_note.png'),
  no_sound: require('../../../assets/icons/no_sound.png'),
  notifications: require('../../../assets/icons/notifications.png'),
  notifications_active: require('../../../assets/icons/notifications_active.png'),
  pause: require('../../../assets/icons/pause.png'),
  pause_circle: require('../../../assets/icons/pause_circle.png'),
  pets: require('../../../assets/icons/pets.png'),
  palette: require('../../../assets/icons/palette.png'),
  play_arrow: require('../../../assets/icons/play_arrow.png'),
  play_circle: require('../../../assets/icons/play_circle.png'),
  remove: require('../../../assets/icons/remove.png'),
  restart: require('../../../assets/icons/restart.png'),
  resume: require('../../../assets/icons/resume.png'),
  ring_volume: require('../../../assets/icons/ring_volume.png'),
  room_service: require('../../../assets/icons/room_service.png'),
  save: require('../../../assets/icons/save.png'),
  schedule: require('../../../assets/icons/schedule.png'),
  self_improvement: require('../../../assets/icons/self_improvement.png'),
  settings: require('../../../assets/icons/settings.png'),
  siren: require('../../../assets/icons/siren.png'),
  star: require('../../../assets/icons/star.png'),
  stop: require('../../../assets/icons/stop.png'),
  stop_circle: require('../../../assets/icons/stop_circle.png'),
  target: require('../../../assets/icons/target.png'),
  toggle_on: require('../../../assets/icons/toggle_on.png'),
  toggle_off: require('../../../assets/icons/toggle_off.png'),
  vibration: require('../../../assets/icons/vibration.png'),
  volume_off: require('../../../assets/icons/volume_off.png'),
  volume_up: require('../../../assets/icons/volume_up.png'),
  warning: require('../../../assets/icons/warning.png'),
  watch: require('../../../assets/icons/watch.png'),
};

export type IconName = keyof typeof iconMap;

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  style?: ImageStyle;
};

export function Icon({ name, size = 24, color, style }: IconProps) {
  return (
    <Image
      source={iconMap[name]}
      style={[
        {
          width: size,
          height: size,
          tintColor: color,
        },
        style,
      ]}
    />
  );
}
