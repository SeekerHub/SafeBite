import React from "react";
import { TouchableOpacity, Text } from "react-native";
// import tw from "tailwind-rn";

const Chips = ({ label, onPress, handleRemoveItem, id }) => (
  <TouchableOpacity
    className={`bg-gray-200 px-5 py-2 rounded-full m-1 flex flex-row items-center justify-center h-8`}
  >
    <Text className={`text-gray-700 text-xs mr-2`}>{label}</Text>
    {/* <Text
      className={`text-red-600 text-xl`}
      onPress={() => handleRemoveItem(id)}
    >
      {"X"}
    </Text> */}
  </TouchableOpacity>
);

export default Chips;
