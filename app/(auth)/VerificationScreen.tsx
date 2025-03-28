import { View, Text,BackHandler, Alert } from 'react-native'
import React from 'react'
import { useFocusEffect,useNavigation } from '@react-navigation/native';


const VerificationScreen = () => {
  const navigation = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Return true to stop the back action
        // Optionally show confirmation dialog
        showExitAlert()
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );
  const showExitAlert = (action) => {
    Alert.alert(
      'Are you sure you want to exit?',
      '',
      [
        { text: 'Cancel', style: 'cancel', onPress: () => {} },
        {
          text: 'Exit Anyway',
          style: 'destructive',
          // Only navigate if action was provided (from beforeRemove)
          onPress: () => { if (action) {
            // If coming from beforeRemove event, dispatch the action
            navigation.dispatch(action);
          } else {
            // If coming from hardware back button, exit the app
            BackHandler.exitApp();
          }},
        },
      ]
    );
  };
  return (
    <View style={{display:"flex",width:"100%",flex:1,alignItems:"center",justifyContent:"center"}}>
      <Text style={{fontWeight:"bold",fontSize:20}}>Verification Screen</Text>
    </View>
  )
}

export default VerificationScreen