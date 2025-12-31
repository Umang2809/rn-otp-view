// OTPInput.tsx
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ViewStyle,
  TextStyle,
} from "react-native";

export interface OTPInputProps {
  length?: number;
  onComplete?: (code: string) => void;
  onChange?: (code: string) => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  boxStyle?: ViewStyle;
  focusBorderColor?: string;
  defaultBorderColor?: string;
  autoFocus?: boolean;
  secureTextEntry?: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  onComplete,
  onChange,
  containerStyle,
  inputStyle,
  boxStyle,
  focusBorderColor = "#28AF60",
  defaultBorderColor = "#E0E0E0",
  autoFocus = true,
  secureTextEntry = false,
}) => {
  const [values, setValues] = useState<string[]>(
    Array.from({ length }, () => "")
  );
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputsRef = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => focusInput(0), 100);
    }
  }, [autoFocus]);

  const focusInput = (index: number) => {
    inputsRef.current[index]?.focus();
  };

  const handleChangeText = (text: string, index: number) => {
    const filtered = text.replace(/[^0-9]/g, "");

    if (filtered.length === 0) {
      const newVals = [...values];
      newVals[index] = "";
      setValues(newVals);
      onChange?.(newVals.join(""));
      return;
    }

    const newVals = [...values];
    newVals[index] = filtered[0];
    setValues(newVals);
    onChange?.(newVals.join(""));

    if (index < length - 1) {
      focusInput(index + 1);
    } else {
      Keyboard.dismiss();
    }

    if (newVals.every((v) => v !== "")) {
      onComplete?.(newVals.join(""));
    }
  };

  const handleKeyPress = (
    e: { nativeEvent: { key: string } },
    index: number
  ) => {
    if (
      e.nativeEvent.key === "Backspace" &&
      values[index] === "" &&
      index > 0
    ) {
      focusInput(index - 1);
      const newVals = [...values];
      newVals[index - 1] = "";
      setValues(newVals);
      onChange?.(newVals.join(""));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, containerStyle]}>
        {Array.from({ length }).map((_, i) => {
          const isFocused = focusedIndex === i;
          return (
            <View
              key={i}
              style={[
                styles.box,
                boxStyle,
                {
                  borderColor: isFocused
                    ? focusBorderColor
                    : defaultBorderColor,
                },
              ]}
            >
              <TextInput
                ref={(el) => {
                  inputsRef.current[i] = el;
                }}
                value={values[i]}
                keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
                style={[styles.input, inputStyle]}
                maxLength={1}
                onFocus={() => setFocusedIndex(i)}
                onBlur={() => setFocusedIndex(null)}
                onChangeText={(text) => handleChangeText(text, i)}
                onKeyPress={(e) => handleKeyPress(e, i)}
                textAlign="center"
                autoCorrect={false}
                autoCapitalize="none"
                secureTextEntry={secureTextEntry}
              />
            </View>
          );
        })}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  box: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  input: {
    width: "100%",
    height: "100%",
    fontSize: 22,
    padding: 0,
    textAlign: "center",
  },
});

export default OTPInput;
