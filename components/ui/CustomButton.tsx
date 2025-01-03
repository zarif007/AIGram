import { TouchableOpacity, Text, View } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  handlePress,
  containerStyle,
}: {
  title: string;
  handlePress: () => void;
  containerStyle: string;
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className="my-2 bg-gray-50 w-full rounded-md min-h-[62px] justify-center items-center"
    >
      <Text className="text-primary font-semibold text-lg">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
