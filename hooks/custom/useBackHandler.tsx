import { useCallback } from 'react';
import { BackHandler, Alert } from 'react-native';
import { useNavigation, NavigationAction } from '@react-navigation/native';

interface UseBackHandlerOptions {
  exitMessage?: string;
  exitTitle?: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const useBackHandler = (options: UseBackHandlerOptions = {}) => {
  const {
    exitMessage = 'Are you sure you want to exit?',
    exitTitle = 'Exit App',
    cancelText = 'Cancel',
    confirmText = 'Exit Anyway',
    onConfirm,
    onCancel,
  } = options;
  
  const navigation = useNavigation();

  const showExitAlert = useCallback((action?: NavigationAction) => {
    Alert.alert(
      exitTitle,
      exitMessage,
      [
        { 
          text: cancelText, 
          style: 'cancel', 
          onPress: () => onCancel?.() 
        },
        {
          text: confirmText,
          style: 'destructive',
          onPress: () => {
            if (action) {
              navigation.dispatch(action);
            } else {
              onConfirm ? onConfirm() : BackHandler.exitApp();
            }
          },
        },
      ],
      { cancelable: false }
    );
  }, [exitMessage, exitTitle, cancelText, confirmText, onConfirm, onCancel, navigation]);

  const handleBackPress = useCallback(() => {
    showExitAlert();
    return true;
  }, [showExitAlert]);

  return { handleBackPress, showExitAlert };
};