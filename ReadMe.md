# Process to use this package

1. Install this package.
2. npm package url: https://www.npmjs.com/package/react-native-otp-plus

![New Project (1)](https://user-images.githubusercontent.com/107117774/236638581-3d623c38-b228-4681-95fd-d4a2ecd1b8b8.png)


3. use this below written code

   ``
   
import { View, Text, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomInputOTP from './CustomInputOTP'

const App = () => {

  const [myOTP, setMyOTP] = useState(null);
  const [isFocused, setIsFocused] = useState(true);

  handleOTPChange = (otp) => {
    setMyOTP(otp);
  }

  clearOTP = () => {
    setMyOTP(null);
  }

  autoFill = () => {
    setMyOTP('1122');
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <CustomInputOTP
        value={myOTP}
        onChange={handleOTPChange}
        tintColor="#ff0000"
        offTintColor="#BBBCBE"
        otpLength={4}
        fieldBorderRadius={16}
        fieldPaddingVertical={12}
        fieldWidth={50}
        fieldMargin={8}
        fieldTextAlign='center'
        fieldFontSize={16}
        fieldColor='#000'
        fieldBorderWidth={1.5}
        onOTPFieldFocus={isFocused}
      />

      <View style={{ height: 16 }}></View>
      <Button onPress={clearOTP} title="Clear OTP" />
      <View style={{ height: 16 }}></View>
      <Button onPress={autoFill} title="Auto fill OTP" />

    </View>
  )
}

export default App

   ``
