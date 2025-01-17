import { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
// import { router } from "expo-router";
import { icons } from "../../constants";
import { images } from "../../constants";
import { createUser } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
import Card from "../../components/Cards";
import { useGlobalContext } from "../../context/GlobalProvider";

const PATH =
  "/Users/bhavesh.gandhi/Desktop/practice/react-native/node-allergy-backend/";
const Profile = () => {
  // axios.defaults.headers.common[
  //   "Authorization"
  // ] = `Bearer ${AsyncStorage.getItem("userToken")}`;
  // console.log(AsyncStorage.getItem("userToken"));
  // axios.defaults.headers.common["Content-Type"] = "application/json";

  const { setUser, setIsLogged, user, ip } = useGlobalContext();
  const [resp, setResponse] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const [profileForm, setProfileprofileForm] = useState({
    username: "Baburao ",
    email: "babu@gmail.com",
    image: null,
  });
  const [presUri, setPresUri] = useState(null);
  const [presImgs, setPresImgs] = useState(null);
  const [presImg, setPresImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("Image ", result);
    if (!result.canceled) {
      const { uri } = result.assets[0];
      setPresUri(uri);
      uploadImage(uri);
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };
  // useEffect(() => {
  //   const fetchImages = async () => {
  //     let temp = [];
  //     console.log(user.prescription);
  //     temp = user.prescription.map(async (pth) => {
  //       try {
  //         const response = await axios.get(`${ip}7000/prescription/${pth}`, {
  //           responseType: "blob",
  //         });
  //         const imageBlob = new Blob([response.data], { type: "image/jpg" });
  //         const imageObjectUrl = URL.createObjectURL(imageBlob);
  //         return imageObjectUrl;
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     });
  //     console.log("prescription_images", temp);
  //     setPresImgs(temp);
  //   };
  //   fetchImages();
  // }, [user]);
  const getPrescriptionImages = () => {
    return user.prescription.map((ty, id) => {
      return (
        <Image
          key={id}
          source={{ uri: `${ip}7000/prescription/${ty}` }}
          resizeMode="cover"
          className="w-full h-64 rounded-2xl mt-7"
        />
      );
    });
  };
  const uploadImage = async (uri) => {
    const formData = new FormData();
    formData.append("image", {
      uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    try {
      let tok = await AsyncStorage.getItem("userToken");
      // console.log("token", tok);
      // console.log(`${ip}7000/upload`, tok);
      // console.log(AsyncStorage.getItem("userToken"));
      const response = await axios.post(`${ip}7000/upload`, formData, {
        headers: {
          Authorization: "Bearer " + tok,
          "Content-Type": "multipart/form-data",
        },
      });
      Alert.alert(
        "Upload Successful",
        `Image uploaded to: ${response.data.filePath}`
      );
      console.log(`${PATH}${response.data.filePath}`);
      setPresImg(`${PATH}${response.data.filePath}`);
      // console.log(uploadType);
      // if (uploadType == "ingredients") {
      //   setForm({
      //     ...form,
      //     ingredient_image: `/Users/swanmoy.nag/workcreation/ml-ai/img-server/${response.data.filePath}`,
      //   });
      // }
      // if (uploadType == "prescription") {
      //   setForm({
      //     ...form,
      //     prescription_image: `/Users/swanmoy.nag/workcreation/ml-ai/img-server/${response.data.filePath}`,
      //   });
      // }
    } catch (error) {
      Alert.alert(
        "Upload Failed",
        "An error occurred while uploading the image"
      );
      if (error.response.status == 401) {
        router.push("/sign-in");
      }
    }
  };

  const submit = async () => {
    // if (profileForm.username === "" || profileForm.email === "") {
    //   Alert.alert("Error", "Please fill in all fields");
    // }
    // // let payload = {
    // //   "name": profileForm.username,
    // //   "email": profileForm.email,
    // //   "password": profileForm.password
    // // }

    // setSubmitting(true);
    // try {
    //   // const result = await createUser(profileForm.email, profileForm.password, profileForm.username);
    //   // setUser(result);
    //   // const response = await axios.post('http://10.0.2.2:11111/users/register', payload);

    //   // const response = await axios.post('http://192.168.139.87:11111/user/register', payload);
    //   // 192.168.139.140

    //   // setResponse(response.data);
    //   // console.log(response.data);
    //   setIsLogged(true);

    //   router.replace("/home");
    // } catch (error) {
    //   Alert.alert("Error", error.message);
    // } finally {
    //   setSubmitting(false);
    // }
    const tok = await AsyncStorage.getItem("userToken");
    const resp = await axios.post(
      `${ip}7000/llm/get_ingridients`,
      {
        image_path: presImg,
      },
      {
        headers: {
          Authorization: `Bearer ${tok}`,
        },
      }
    );
    console.log(resp.data.result);
    axios
      .put(
        `${ip}7000/user/update`,
        {
          allergic_ingridients: resp.data.result,
          email: user.email,
        },
        {
          headers: {
            Authorization: `Bearer ${tok}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp.data);
        setUser(resp.data.user);
        setLoading(false);
        setPresImg(null);
        setPresUri(null);
        router.push("/home");
      })
      .catch((err) => console.log(err));
  };

  // const openPicker = async (selectType) => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
  //   console.log("Image ", result);
  //   if (!result.canceled) {
  //     // if (selectType === "image") {
  //     setProfileprofileForm({
  //       ...profileForm,
  //       image: result.assets[0].uri,
  //     });
  //     // }

  //     // if (selectType === "video") {
  //     //   setForm({
  //     //     ...form,
  //     //     video: result.assets[0],
  //     //   });
  //     // }
  //   } else {
  //     setTimeout(() => {
  //       Alert.alert("Document picked", JSON.stringify(result, null, 2));
  //     }, 100);
  //   }
  // };
  const handleSaveButtonPress = () => {
    setLoading(true);
    submit();
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 400,
          }}
        >
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB7nGnR96Z2EFpN8sshbAMKkVmNE_wDfkkeA&s",
            }}
            className="w-20 h-20 rounded-full mr-4"
          />

          <FormField
            title="Name"
            value={user.name}
            handleChangeText={(e) =>
              setProfileprofileForm({ ...profileForm, username: e })
            }
            otherStyles="mt-10"
            readOnlySet={true}
          />

          <FormField
            title="Email"
            value={user.email}
            handleChangeText={(e) =>
              setProfileprofileForm({ ...profileForm, email: e })
            }
            otherStyles="mt-7"
            keyboardType="email-address"
            readOnlySet={true}
          />

          {/* <FormField
            title="Phone"
            value={profileForm.password}
            handleChangeText={(e) => setProfileprofileForm({ ...profileForm, password: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Age"
            value={profileForm.password}
            handleChangeText={(e) => setProfileprofileForm({ ...profileForm, password: e })}
            otherStyles="mt-7"
          /> */}
          <Text className="text-base text-gray-100 font-pmedium mt-7">
            Prescription
          </Text>
          {profileForm.image ? (
            <Image
              source={{ uri: profileForm.image.uri }}
              resizeMode="cover"
              className="w-full h-64 rounded-2xl"
            />
          ) : null}
          <TouchableOpacity
            onPress={() => openPicker("image")}
            className="mt-3"
          >
            <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
              <Image
                source={icons.upload}
                resizeMode="contain"
                alt="upload"
                className="w-5 h-5"
              />
              <Text className="text-sm text-gray-100 font-pmedium">
                Choose a file
              </Text>
            </View>
          </TouchableOpacity>
          {user.prescription.length > 0 ? getPrescriptionImages() : null}
          {presUri ? (
            <Image
              source={{ uri: presUri }}
              resizeMode="cover"
              className="w-full h-64 rounded-2xl mt-7"
            />
          ) : null}
          {loading ? (
            <ActivityIndicator size="200" color="#0000ff" className="mt-5" />
          ) : (
            <CustomButton
              title="Save"
              handlePress={handleSaveButtonPress}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
