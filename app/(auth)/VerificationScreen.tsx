import { View, Text,BackHandler, Alert } from 'react-native'
import React from 'react'
import { useFocusEffect,useNavigation } from '@react-navigation/native';
import { useBackHandler } from '@/hooks/custom/useBackHandler';


const VerificationScreen = () => {
  const navigation = useNavigation();
  const { handleBackPress } = useBackHandler({
    exitMessage: 'Are you sure you want to exit?',
    // other custom options
  });

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      };
    }, [handleBackPress])
  );
  const showExitAlert = (action:any) => {
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
    <View style={{display:"flex",width:"100%",flex:1,flexDirection:"column",alignItems:"center",justifyContent:"space-between"}}>
      <View style={{display:"flex",justifyContent:"flex-start",width:"100%"}}><Text style={{fontSize:20,padding:10,fontWeight:"bold"}}>Hi,User</Text></View>
      <View>      <Text style={{fontWeight:"bold",fontSize:20}}>Documents Verification Screen</Text></View>
      <View></View>

    </View>
  )
}

export default VerificationScreen