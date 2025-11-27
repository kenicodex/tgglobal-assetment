import { Alert, Linking } from 'react-native';

// Function to call a phone number
export const callNumber = (phone: string) => {
  const url = `tel:${phone}`;
  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        Alert.alert('Error', 'Unable to open dialer');
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error('An error occurred', err));
};

// Function to send email
export const sendEmail = (email: string) => {
  const url = `mailto:${email}`;
  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        Alert.alert('Error', 'Unable to open email client');
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error('An error occurred', err));
};


