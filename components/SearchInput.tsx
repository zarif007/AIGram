import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";

interface FormFieldsProps {
  title?: string;
  value?: string;
  placeholder?: string;
  handleChangeText?: (text: string) => void;
  otherStyles?: string;
  [key: string]: any;
}

import { icons } from "../constants";

const SearchInput: React.FC<FormFieldsProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 mt-1 bg-slate-950 rounded-md focus:border-slate-300 items-center flex-row space-x-4">
      <TextInput
        className="flex-1 text-white font-semibold text-base"
        value={value}
        placeholder="Search"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
      />

      <TouchableOpacity
        onPress={() => setShowPassword(!showPassword)}
        className="flex items-center justify-center"
      >
        <Image source={icons.search} resizeMode="contain" className="w-5 h-5" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({});
