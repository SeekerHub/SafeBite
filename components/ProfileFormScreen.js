import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

const ProfileFormScreen = () => {
  // State variables to store profile details
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [phoneNumber, setPhoneNumber] = useState('1234567890');

  // Function to handle form submission
  const handleSubmit = () => {
    // Perform validation if needed

    // Display alert with updated profile details
    Alert.alert(
      'Profile Updated',
      `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nPhone Number: ${phoneNumber}`
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={text => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={text => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
        keyboardType="phone-pad"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default ProfileFormScreen;
