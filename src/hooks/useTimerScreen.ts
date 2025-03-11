import { useState, useCallback } from 'react';
import { useTimer } from './useTimer';
import { usePresets } from './usePresets';
import { Alert, TimerPreset } from '../types/timer';
import { TimerManager } from '../utils/TimerManager';
import React from 'react';
import { PresetManager } from '../utils/PresetManager';

export const useTimerScreen = (
  timerManagerRef: React.RefObject<TimerManager>,
  key?: number
) => {
  // États locaux
  const timeLeftInSeconds = timerManagerRef.current?.getTimeLeft() ?? 0;
  const beforeAlert = timerManagerRef.current?.getBeforeAlert();

  const [seconds, setSeconds] = useState(() => timeLeftInSeconds);
  const [inputBuffer, setInputBuffer] = useState('');
  const [isValidTime, setIsValidTime] = useState(true);

  // Hooks
  const { presets, savePreset } = usePresets();
  const { timeLeft, isRunning, state, actions } = useTimer(
    timerManagerRef,
    seconds
  );

  // Vérifier si le timer est valide
  const checkTimeValidity = useCallback((mins: number, secs: number, beforeAlertOffset?: number, isBeforeEnabled?: boolean) => {
    // Vérifier que les secondes sont valides
    if (secs >= 60) return false;

    // Si l'alerte "before" est activée, vérifier que son offset est inférieur au temps total
    if (beforeAlertOffset !== undefined && (isBeforeEnabled ?? beforeAlert?.enabled)) {
      const totalSeconds = mins * 60 + secs;
      if (totalSeconds <= beforeAlertOffset * 60) return false;
    }

    return true;
  }, [beforeAlert]);

  // Réinitialiser les états quand la key change
  React.useEffect(() => {
    const timeLeftInSeconds = timerManagerRef.current?.getTimeLeft() ?? 0;
    setSeconds(timeLeftInSeconds);
    setInputBuffer('');
    setIsValidTime(true);
  }, [key]);

  // Convertir le buffer en secondes totales
  const secondsFromBuffer = useCallback((buffer: string) => {
    setInputBuffer(buffer);

    const digits = buffer.padStart(4, '0').split('').map(Number);
    const mins = parseInt(digits.slice(0, 2).join(''), 10);
    const secs = parseInt(digits.slice(2).join(''), 10);
    
    // Toujours mettre à jour les secondes totales
    setSeconds(mins * 60 + secs);
    
    // Vérifier la validité du temps
    setIsValidTime(checkTimeValidity(mins, secs, beforeAlert?.timeOffset));
  }, [beforeAlert, checkTimeValidity]);

  // Sauvegarde automatique du timer
  const autoSaveTimer = useCallback(async () => {
    // Récupérer les alertes actuelles directement du TimerManager
    const alerts = [
      timerManagerRef.current?.getBeforeAlert(),
      timerManagerRef.current?.getEndAlert(),
      timerManagerRef.current?.getAfterAlert()
    ].filter(Boolean) as Alert[];

    // Vérifier si un preset similaire existe déjà
    const presetManager = PresetManager.getInstance();
    const existingPreset = presetManager.findSimilarPreset(seconds, alerts);

    if (!existingPreset) {
      await presetManager.createPreset(seconds, alerts);
    } else {
      await presetManager.savePreset(existingPreset);
    }
  }, [seconds]);

  // Gestion du pavé numérique
  const handleNumberPress = useCallback((num: number) => {
    if (!isRunning && inputBuffer.length < 4) {
      const newBuffer = inputBuffer + num.toString();
      secondsFromBuffer(newBuffer);
    }
  }, [isRunning, inputBuffer, secondsFromBuffer]);

  const handleBackspace = useCallback(() => {
    if (!isRunning && inputBuffer.length > 0) {
      const newBuffer = inputBuffer.slice(0, -1);
      secondsFromBuffer(newBuffer);
    }
  }, [isRunning, inputBuffer, secondsFromBuffer]);

  const handleDoubleZero = useCallback(() => {
    if (!isRunning) {
      const newBuffer = inputBuffer + '00';
      if (newBuffer.length <= 4) {
        secondsFromBuffer(newBuffer);
      }
    }
  }, [isRunning, inputBuffer, secondsFromBuffer]);

  // Chargement d'un preset
  const loadPreset = useCallback((preset: TimerPreset) => {
    setSeconds(preset.seconds);
    setInputBuffer('');
    const mins = Math.floor(preset.seconds / 60);
    const secs = preset.seconds % 60;
    
    // Mettre à jour les alertes
    preset.alerts.forEach(alert => {
      actions.updateAlert(alert);
    });
    
    // Vérifier la validité avec la nouvelle configuration
    const beforeAlertFromPreset = preset.alerts.find(a => a.id === 'before');
    setIsValidTime(checkTimeValidity(mins, secs, beforeAlertFromPreset?.timeOffset));
  }, [actions, checkTimeValidity]);

  // Surcharge des actions du timer pour ajouter la sauvegarde automatique
  const enhancedActions = {
    ...actions,
    start: async () => {
      if (!isValidTime) {
        console.log('Impossible de démarrer : temps invalide');
        return;
      }
      await autoSaveTimer();
      actions.start();
    },
    updateAlert: (alert: Alert) => {
      actions.updateAlert(alert);
      // Si c'est l'alerte "before", vérifier la validité du timer
      if (alert.id === 'before') {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        setIsValidTime(checkTimeValidity(mins, secs, alert.timeOffset, alert.enabled));
      }
    }
  };

  return {
    // États
    timeLeft,
    isRunning,
    state,
    presets,
    isValidTime,

    // Actions
    loadPreset,
    handleNumberPress,
    handleBackspace,
    handleDoubleZero,
    ...enhancedActions,
  };
}; 