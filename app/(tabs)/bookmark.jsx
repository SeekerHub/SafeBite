import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import Icon from "react-native-vector-icons/FontAwesome";
import { Redirect } from "expo-router";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalContext } from "../../context/GlobalProvider";
import axios from "axios";
const Bookmark = () => {
  const history = [
    {
      id: 1,
      label: "kurkure",
      image:
        "https://i0.wp.com/foodnetindia.in/wp-content/uploads/2016/09/kurekure-ingredients1-e1473162379997.jpg",
      type: "good",
    },
    {
      id: 1,
      label: "Lays",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/412717-2_2-lays-potato-chips-indian-magic-masala.jpg",
      type: "bad",
    },
    {
      id: 1,
      label: "Real Fruit Juice",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYItqyNsz6oR2r9-iYS_kjHHnVUiaIA3giOA&s",
      type: "good",
    },
    {
      id: 1,
      label: "kurkure",
      image:
        "https://i0.wp.com/foodnetindia.in/wp-content/uploads/2016/09/kurekure-ingredients1-e1473162379997.jpg",
      type: "bad",
    },
    {
      id: 1,
      label: "Lays",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/412717-2_2-lays-potato-chips-indian-magic-masala.jpg",
      type: "bad",
    },
    {
      id: 1,
      label: "Real Fruit Juice",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYItqyNsz6oR2r9-iYS_kjHHnVUiaIA3giOA&s",
      type: "bad",
    },
  ];
  const [hist, setHist] = useState([]);
  const { ip } = useGlobalContext();
  useEffect(() => {
    const getHistories = async () => {
      const tok = await AsyncStorage.getItem("userToken");
      const hisresp = await axios.get(`${ip}7000/user/history`, {
        headers: { Authorization: `Bearer ${tok}` },
      });
      let temp = hisresp.data.history.map((ty) => {
        ty.image = `${ip}7000/prescription/${ty.image}`;
        return ty;
      });
      if (temp.length != hist.length) {
        setHist(temp);
      }
    };
    getHistories();
  });
  // const handleCross = () => {
  //   return <Redirect href="/home"/>
  // }
  return (
    <SafeAreaView className="px-4 my-6 bg-primary h-full">
      <Text className="text-2xl text-white font-psemibold mb-">History</Text>
      <View className="mt-2.7">
        {history.map((el, ind) => {
          return (
            <View
              key={ind}
              className="flex flex-row rounded m-3 border-2 border-gray-200 p-3.5 justify-between  items-center"
            >
              <Image
                source={{
                  uri: el.image,
                }}
                className="w-10 h-10 rounded-full mr-4"
              />
              <Text className="text-sm text-white font-psemibold">
                {el.label}
              </Text>
              {/* <TouchableOpacity onPress={handleCross}> */}
              <Icon
                name={el.type == "good" ? "thumbs-up" : "exclamation-circle"}
                size={24}
                color={el.type == "good" ? "#4CAF50" : "#F44336"}
                style={styles.icon}
              />
              {/* </TouchableOpacity> */}
              {/* <Image
                source={icons.cross}
                resizeMode="contain"
                // tintColor={color}
                className="w-2 h-2"
              /> */}
            </View>
          );
        })}
      </View>

      {/* <View className="flex flex-row">
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB7nGnR96Z2EFpN8sshbAMKkVmNE_wDfkkeA&s",
            }}
            className="w-10 h-10 rounded-full mr-4"
          />
        <Text className="text-sm text-white font-psemibold">Kurkure Label</Text>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   ...StyleSheet.absoluteFillObject,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
  // },
  // alert: {
  //   backgroundColor: 'white',
  //   padding: 20,
  //   borderRadius: 10,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  icon: {
    marginRight: 10,
  },
  // message: {
  //   flex: 1,
  //   fontSize: 16,
  //   marginRight: 10,
  // },
  // closeButton: {
  //   padding: 5,
  // },
});

export default Bookmark;
