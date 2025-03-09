import { useEffect, useState } from 'react';
import { Alert } from '../types/timer';
import { SettingsManager } from '../utils/SettingsManager';

// Alertes par défaut
const DEFAULT_ALERTS: Alert[] = [
  {
    id: 'before',
    name: 'Bientôt fini',
    enabled: true,
    timeOffset: 5,
    sound: 'bell',
    effects: ['flash'],
    effectDuration: 5,
    lastTriggered: 0
  },
  {
    id: 'end',
    name: 'Temps écoulé',
    enabled: true,
    timeOffset: 0,
    sound: 'gong',
    effects: ['flash'],
    effectDuration: 5,
    lastTriggered: 0
  },
  {
    id: 'after',
    name: 'Temps dépassé',
    enabled: true,
    timeOffset: 5,
    sound: 'alarm',
    effects: ['shake'],
    vibrationDuration: 10,
    lastTriggered: 0
  }
];

// Durée des alertes par défaut (en secondes)
const DEFAULT_ALERT_DURATION = 5;

export type Settings = {
  defaultTimerMinutes: number;
  defaultAlerts: Alert[];
  defaultAlertDuration: number;
};

export const useSettings = () => {
  const settingsManager = SettingsManager.getInstance();
  const [defaultTimerMinutes, setDefaultTimerMinutes] = useState(
    settingsManager.getDefaultTimerMinutes()
  );
  const [defaultAlertDuration, setDefaultAlertDuration] = useState(
    settingsManager.getDefaultAlertDuration()
  );
  const [beforeAlert, setBeforeAlert] = useState(
    settingsManager.getBeforeAlert()
  );
  const [endAlert, setEndAlert] = useState(
    settingsManager.getEndAlert()
  );
  const [afterAlert, setAfterAlert] = useState(
    settingsManager.getAfterAlert()
  );

  useEffect(() => {
    const onDefaultTimerMinutesChange = (minutes: number) => {
      setDefaultTimerMinutes(minutes);
    };

    const onDefaultAlertDurationChange = (duration: number) => {
      setDefaultAlertDuration(duration);
    };

    const onBeforeAlertChange = (alert: Alert) => {
      setBeforeAlert(alert);
    };

    const onEndAlertChange = (alert: Alert) => {
      setEndAlert(alert);
    };

    const onAfterAlertChange = (alert: Alert) => {
      setAfterAlert(alert);
    };

    settingsManager.addEventListener('defaultTimerMinutesChange', onDefaultTimerMinutesChange);
    settingsManager.addEventListener('defaultAlertDurationChange', onDefaultAlertDurationChange);
    settingsManager.addEventListener('beforeAlertChange', onBeforeAlertChange);
    settingsManager.addEventListener('endAlertChange', onEndAlertChange);
    settingsManager.addEventListener('afterAlertChange', onAfterAlertChange);

    return () => {
      settingsManager.removeEventListener('defaultTimerMinutesChange', onDefaultTimerMinutesChange);
      settingsManager.removeEventListener('defaultAlertDurationChange', onDefaultAlertDurationChange);
      settingsManager.removeEventListener('beforeAlertChange', onBeforeAlertChange);
      settingsManager.removeEventListener('endAlertChange', onEndAlertChange);
      settingsManager.removeEventListener('afterAlertChange', onAfterAlertChange);
    };
  }, []);

  return {
    defaultTimerMinutes,
    defaultAlertDuration,
    defaultAlerts: [beforeAlert, endAlert, afterAlert],
    setDefaultTimerMinutes: (minutes: number) => {
      settingsManager.setDefaultTimerMinutes(minutes);
    },
    setDefaultAlertDuration: (duration: number) => {
      settingsManager.setDefaultAlertDuration(duration);
    },
    updateDefaultAlert: (alert: Alert) => {
      switch (alert.id) {
        case 'before':
          settingsManager.updateBeforeAlert(alert);
          break;
        case 'end':
          settingsManager.updateEndAlert(alert);
          break;
        case 'after':
          settingsManager.updateAfterAlert(alert);
          break;
      }
    },
  };
};