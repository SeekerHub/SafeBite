import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Redirect, router } from "expo-router";
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import CustomButton from "../../components/CustomButton";
import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import { EmptyState, SearchInput, Trending, VideoCard } from "../../components";
import Card from "../../components/Cards";
import Chips from "../../components/Chips";
import { useGlobalContext } from "../../context/GlobalProvider";
import Table from "../../components/Table";
const Home = () => {
  // const { data: posts, refetch } = useAppwrite(getAllPosts);
  // const { data: latestPosts } = useAppwrite(getLatestPosts);
  const [uploading, setUploading] = useState(false);
  const { user } = useGlobalContext();
  useEffect(() => {
    // Alert.alert("User-", JSON.stringify(user));
  }, []);
  // const [refreshing, setRefreshing] = useState(false);
  const [selectedItems, setSelectedItems] = useState([
    { id: 1, label: "Peanuts" },
    { id: 2, label: "Corn Flour" },
    { id: 3, label: "Vegetable Oil" },
  ]);

  const handleRemoveItem = (itemId) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };
  // const onRefresh = async () => {
  //   setRefreshing(true);
  //   await refetch();
  //   setRefreshing(false);
  // };

  // one flatlist
  // with list header
  // and horizontal flatlist

  //  we cannot do that with just scrollview as there's both horizontal and vertical scroll (two flat lists, within trending)
  const submit = async () => {
    // if (
    //   (form.prompt === "") |
    //   (form.title === "") |
    //   !form.thumbnail |
    //   !form.video
    // ) {
    //   return Alert.alert("Please provide all fields");
    // }
    router.push("/create");
    // setUploading(true);
    try {
      // await createVideoPost({
      //   ...form,
      //   userId: user.$id,
      // });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/create");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });

      // setUploading(false);
    }
  };
  return (
    <SafeAreaView className="px-4 my-6 bg-primary h-full">
      <Text className="text-2xl text-white font-psemibold">Homes</Text>
      <View className="flex items-center bg-50 ">
        {/* <View className=""> */}
        <Card
          profilePic="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"
          name={user.name}
          email={user.email}
          location="New York, USA"
        />

        {/* </View> */}
      </View>
      <Table />
      {/* <View className={`flex-1 p-4`}>
        <FlatList
          className=""
          data={selectedItems}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Chips
              label={item.label}
              handleRemoveItem={handleRemoveItem}
              id={item.id}
            />
          )}
        />
      </View> */}
      <CustomButton
        title="Upload Ingredients"
        handlePress={submit}
        containerStyles="mr-2 ml-2 mt-10"
        isLoading={uploading}
      />
    </SafeAreaView>
    // <SafeAreaView className="bg-primary">
    //   <FlatList
    //     data={posts}
    //     keyExtractor={(item) => item.$id}
    //     renderItem={({ item }) => (
    //       <VideoCard
    //         title={item.title}
    //         thumbnail={item.thumbnail}
    //         video={item.video}
    //         creator={item.creator.username}
    //         avatar={item.creator.avatar}
    //       />
    //     )}
    //     ListHeaderComponent={() => (
    //       <View className="flex my-6 px-4 space-y-6">
    //         <View className="flex justify-between items-start flex-row mb-6">
    //           <View>
    //             <Text className="font-pmedium text-sm text-gray-100">
    //               Welcome Back
    //             </Text>
    //             <Text className="text-2xl font-psemibold text-white">
    //               JSMastery
    //             </Text>
    //           </View>

    //           <View className="mt-1.5">
    //             <Image
    //               source={images.logoSmall}
    //               className="w-9 h-10"
    //               resizeMode="contain"
    //             />
    //           </View>
    //         </View>

    //         <SearchInput />

    //         <View className="w-full flex-1 pt-5 pb-8">
    //           <Text className="text-lg font-pregular text-gray-100 mb-3">
    //             Latest Videos
    //           </Text>

    //           <Trending posts={latestPosts ?? []} />
    //         </View>
    //       </View>
    //     )}
    //     ListEmptyComponent={() => (
    //       <EmptyState
    //         title="No Videos Found"
    //         subtitle="No videos created yet"
    //       />
    //     )}
    //     refreshControl={
    //       <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    //     }
    //   />
    // </SafeAreaView>
  );
};

export default Home;
