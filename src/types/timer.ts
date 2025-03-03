export type AlertEffect = 'flash' | 'pulse' | 'shake';
export type AlertSound = 'gong' | 'bell' | 'chime' | 'alarm';

export type Alert = {
  id: string;
  name: string;
  enabled: boolean;
  timeOffset: number;
  sound: AlertSound;
  effect: AlertEffect;
  lastTriggered?: number;
};

export type TimerPreset = {
  id: string;
  name: string;
  minutes: number;
  alerts: Alert[];
  created_at: string;
};