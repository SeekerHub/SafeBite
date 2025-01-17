import { View, Text, Image, FlatList } from "react-native";
import cards from "../assets/images/cards.png";
import Chips from "./Chips";
import { useState } from "react";
import { useGlobalContext } from "../context/GlobalProvider";
const Card = ({ profilePic, name, email, location }) => {
  // const [selectedItems, setSelectedItems] = useState([
  //   { id: 1, label: "Corn Flour" },
  //   { id: 2, label: "Peanuts" },
  //   { id: 3, label: "Vegetable Oil" },
  // ]);
  const { user } = useGlobalContext();
  const selectedItems = user.allergic_ingridients
    ? user.allergic_ingridients.map((element, index) => {
        return {
          id: index,
          label: element,
        };
      })
    : [];

  // const handleRemoveItem = (itemId) => {
  //   setSelectedItems((prevItems) =>
  //     prevItems.filter((item) => item.id !== itemId)
  //   );
  // };

  return (
    <View className="bg-white rounded-lg p-4 shadow-md flex-row items-center justify-start m-4">
      <Image
        source={{ uri: profilePic }}
        className="w-20 h-20 rounded-full mr-4"
      />
      <View className="flex-1">
        <Text className="text-white-50 text-lg font-bold mb-1">{name}</Text>
        <Text className="text-white-50 text-base text-white-600 mb-1">
          {email}
        </Text>
        <Text className="text-gray-50 text-base text-gray-600">{location}</Text>
        <Text className="text-gray-50 text-base text-gray-600">
          Allergic To:
        </Text>
        <View className={`flex p-4`}>
          <FlatList
            className=""
            data={selectedItems}
            horizontal
            // scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Chips
                label={item.label}
                // handleRemoveItem={handleRemoveItem}
                id={item.id}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default Card;
