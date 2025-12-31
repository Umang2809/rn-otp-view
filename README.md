# rn-otp-view

A customizable and easy-to-use OTP (One-Time Password) input component for React Native.

## Features

- ✅ Fully customizable styling
- ✅ TypeScript support
- ✅ Auto-focus on next input
- ✅ Backspace handling
- ✅ iOS & Android support
- ✅ Keyboard dismissal
- ✅ Configurable length
- ✅ Secure text entry option
- ✅ Zero dependencies
- ✅ Lightweight

## Installation

```bash
npm install rn-otp-view
```

or

```bash
yarn add rn-otp-view
```

## Usage

### Basic Example

```tsx
import React from "react";
import { View, Alert } from "react-native";
import OTPInput from "rn-otp-view";

const App = () => {
  const handleComplete = (code: string) => {
    console.log("OTP Entered:", code);
    // Verify OTP here
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <OTPInput
        length={6}
        onComplete={handleComplete}
        focusBorderColor="#28AF60"
        defaultBorderColor="#E0E0E0"
      />
    </View>
  );
};

export default App;
```

### With Custom Styling

```tsx
<OTPInput
  length={4}
  onComplete={handleComplete}
  containerStyle={{
    gap: 15,
    paddingHorizontal: 20,
  }}
  boxStyle={{
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
  }}
  inputStyle={{
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
  }}
  focusBorderColor="#007AFF"
  defaultBorderColor="#CCCCCC"
/>
```

### Secure PIN Entry

```tsx
<OTPInput
  length={4}
  secureTextEntry={true}
  onComplete={handlePinComplete}
  focusBorderColor="#FF3B30"
/>
```

## Props

| Prop                 | Type                     | Default     | Description                            |
| -------------------- | ------------------------ | ----------- | -------------------------------------- |
| `length`             | `number`                 | `6`         | Number of OTP input boxes              |
| `onComplete`         | `(code: string) => void` | `undefined` | Callback when all inputs are filled    |
| `onChange`           | `(code: string) => void` | `undefined` | Callback on every input change         |
| `containerStyle`     | `ViewStyle`              | `undefined` | Style for the container                |
| `inputStyle`         | `TextStyle`              | `undefined` | Style for the input text               |
| `boxStyle`           | `ViewStyle`              | `undefined` | Style for each input box               |
| `focusBorderColor`   | `string`                 | `"#28AF60"` | Border color when input is focused     |
| `defaultBorderColor` | `string`                 | `"#E0E0E0"` | Border color when input is not focused |
| `autoFocus`          | `boolean`                | `true`      | Auto-focus first input on mount        |
| `secureTextEntry`    | `boolean`                | `false`     | Hide input characters (for PIN)        |

## Advanced Examples

### With Form Validation

```tsx
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import OTPInput from "rn-otp-view";

const OTPScreen = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleChange = (code: string) => {
    setOtp(code);
    setError("");
  };

  const handleComplete = async (code: string) => {
    try {
      // Verify OTP with your backend
      const response = await verifyOTP(code);
      if (response.success) {
        // Navigate to next screen
      }
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Verification Code</Text>
      <OTPInput
        length={6}
        onChange={handleChange}
        onComplete={handleComplete}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});

export default OTPScreen;
```

## Platform Compatibility

- ✅ iOS
- ✅ Android
- ✅ Expo
- ✅ React Native CLI

## Requirements

- React Native >= 0.60
- React >= 16.8

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Issues

If you encounter any issues, please report them [here](https://github.com/Umang2809/rn-otp-view/issues).

## Author

Umang Thakkar - [GitHub](https://github.com/Umang2809)

---

Made with ❤️ for React Native developers
