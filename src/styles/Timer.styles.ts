import { StyleSheet, Platform } from 'react-native';
import { theme } from '../theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  timerContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.large,
    borderRadius: theme.borders.radius.large,
    overflow: 'hidden',
    zIndex: 2,
  },
  timerAndControlsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borders.radius.large,
    marginBottom: theme.spacing.medium,
    minWidth: 350,
  },
  timeDisplayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.large,
  },
  timeDisplay: {
    alignItems: 'center',
  },
  timeText: {
    fontSize: theme.typography.fontSize.timer,
    fontWeight: theme.typography.fontWeight.bold,
    fontFamily: Platform.OS === 'web' ? 'monospace' : undefined,
  },
  inputModeText: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.gray.light,
    marginTop: theme.spacing.xs,
  },
  stopSoundButton: {
    position: 'absolute',
    right: 0,
    width: 40,
    height: 40,
    borderRadius: theme.borders.radius.round,
    backgroundColor: theme.colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keypad: {
    marginBottom: theme.spacing.small,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.spacing.small,
  },
  keypadButton: {
    width: theme.layout.keypad.buttonSize,
    height: theme.layout.keypad.buttonSize,
    margin: theme.spacing.xs,
    borderRadius: theme.borders.radius.round,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keypadButtonText: {
    fontSize: theme.typography.fontSize.large,
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeight.bold,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.large,
    marginBottom: theme.spacing.large,
  },
  controlButton: {
    padding: theme.spacing.small,
    borderRadius: theme.borders.radius.medium,
    backgroundColor: theme.colors.gray.light,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButtonDisabled: {
    opacity: theme.effects.opacity.disabled,
  },
  startButton: {
    backgroundColor: theme.colors.primary,
  },
  stopButton: {
    backgroundColor: theme.colors.danger,
  },
  pauseButton: {
    backgroundColor: theme.colors.secondary,
  },
  alertsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.large,
  },
  alertStopButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: theme.colors.gray.medium,
    borderRadius: 24,
    padding: 8,
    elevation: 4,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  addTimeContainer: {
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borders.radius.large,
    marginBottom: theme.spacing.small,
    minWidth: 350
  },
});