import { useEffect, useState } from "react";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import AlertBox from "../../components/AlertBox";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useGlobalContext } from "../../context/GlobalProvider";
const PATH =
  "/Users/bhavesh.gandhi/Desktop/practice/react-native/node-allergy-backend/";
import axios from "axios";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
} from "react-native";

import { icons } from "../../constants";
import { createVideoPost } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
// import RNFS from "react-native-fs";

const Create = () => {
  const { user, ip, allergicList, setAllergyList, data, setData } =
    useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finalResp, setFinalResp] = useState("");
  const [inguri, setInguri] = useState(null);
  const [alguri, setAlguri] = useState(null);
  const [imgPath, setImgPath] = useState(null);
  const [alertType, setAlertType] = useState("bad");
  const [form, setForm] = useState({
    title: "",
    video: null,
    prescription_image: null,
    ingredient_image: null,
    prompt: "",
  });
  const [label, setLabel] = useState("");
  const [ingList, setIngList] = useState([]);
  const [presList, setPresList] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  useEffect(() => {
    if (user.length == 0) {
      Alert.alert("Please upload a prescription first to continue!!!");
      router.push("/profile");
    }
  }, []);
  const submitNew = (resp) => {
    // Alert.alert(
    //       "You can safely consume this  product"
    //       // properties[0].description
    //     );
    // <AlertBox
    setAlertMessage("Highly Allergic for you! Please don't consume");
    setShowAlert(true);
  };
  const requestStoragePermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission Required",
            message: "This app needs access to your storage to save photos",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const uploadImage = async (uri, uploadType) => {
    const formData = new FormData();
    formData.append("image", {
      uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    try {
      const tok = await AsyncStorage.getItem("userToken");
      console.log(`${ip}7000/upload`);
      const response = await axios.post(`${ip}7000/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${tok}`,
        },
      });
      Alert.alert(
        "Upload Successful",
        `Image uploaded to: ${response.data.filePath}`
      );
      setImgPath(response.data.imgName);
      console.log(uploadType);
      if (uploadType == "ingredients") {
        setForm({
          ...form,
          ingredient_image: `${PATH}${response.data.filePath}`,
        });
      }
      if (uploadType == "prescription") {
        setForm({
          ...form,
          prescription_image: `${PATH}${response.data.filePath}`,
        });
      }
    } catch (error) {
      console.error("Upload failed", error);
      Alert.alert(
        "Upload Failed",
        "An error occurred while uploading the image"
      );
    }
  };

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
      if (selectType === "ingredients") {
        setInguri(uri);
      } else {
        setAlguri(uri);
      }
      uploadImage(uri, selectType);
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };
  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const data_formatter = (data) => {
    let temp = data.substring(5, data.length - 1);
    // const text = data;
    // const pattern = /"([^"]+)": "([^"]+)"/g;

    // // Find all matches
    // const matches = [...text.matchAll(pattern)];

    // // Construct array of objects
    // const properties = matches.map((match) => {
    //   const [, property, description] = match;
    //   return { property, description };
    // });

    // // Convert to JSON format
    // const jsonOutput = properties;
    // console.log(properties);
    // // const jsonOutput = JSON.stringify(properties, null, 2);
    // const allergicList = [];
    // // if(jsonOutput[0].property=="allergic list"){
    // //     allergicList = jsonOutput[0]["description"].split(",")
    // // }
    // // Print the JSON output
    // console.log("jsn", properties[0].description.split(","));
    // // const listallergy = properties[0].description.split(","))
    // setAllergyList(() => [
    //   ...allergicList,
    //   properties[0].description.split(","),
    // ]);
    // setData(properties);
    // const temp = JSON.parse(data);
    console.log(temp);
    // if (properties.length > 0) {
    //   Alert.alert(
    //     "Please do not consume this product !!, as it contains",
    //     properties[0].description
    //   );
    // } else {
    //   Alert.alert(
    //     "You can safely consume this  product"
    //     // properties[0].description
    //   );
    // }

    // console.log(allergicList);
  };
  const submit = async (type) => {
    const tok = await AsyncStorage.getItem("userToken");
    // if (
    //   (form.prompt === "") |
    //   (form.title === "") |
    //   !form.image |
    //   !form.video
    // ) {
    //   return Alert.alert("Please provide all fields");
    // }
    // console.log(form);
    // console.log("FORM", form.prescription_image);
    let response_ing;
    // let response_pres;
    // let payload_pres = {
    //   image_path: form.prescription_image,
    // };
    let payload_ing = {
      image_path: form.ingredient_image,
    };
    console.log(payload_ing);

    // try {
    // console.log("fadfdfadsgas");
    // response_pres = await axios.post(
    //   `${ip}7000/llm/get_ingridients`,
    //   payload_ing
    // );
    // console.log("Resp", response_pres.data.result);
    // setPresList(response_pres.data.result);
    //   setIngList(resp)
    //   // Alert.alert(response);
    // } catch (err) {
    //   console.log("Error", err);
    // }
    // let wait = new Promise((resolve, reject) => {
    //   setInterval(() => {
    //     resolve("Hello");
    //   }, 30000);
    // });
    // let wa = await wait(50000);
    try {
      response_ing = await axios.post(
        `${ip}7000/llm/get_ingridients`,
        {
          image_path: form.ingredient_image,
        },
        {
          headers: {
            Authorization: `Bearer ${tok}`,
          },
        }
      );
      setIngList(response_ing.data.result);
      console.log(response_ing.data.result);
    } catch (err) {
      console.log("Error", err);
    }

    let payload_compare = {
      user_ingridients: response_ing.data.result,
      allergic_ingridients: user.allergic_ingridients,
    };
    wa = await wait(30000);
    try {
      const response_final = await axios.post(
        `${ip}7000/llm/compare_ingridients`,
        {
          user_ingridients: response_ing.data.result,
          allergic_ingridients: user.allergic_ingridients,
        },
        {
          headers: {
            Authorization: `Bearer ${tok}`,
          },
        }
      );

      console.log("Final Resp --> ", response_final.data.result);
      const gh = JSON.parse(response_final.data.result);
      let hisresp = null;
      if (Array.isArray(gh)) {
        hisresp = await axios.post(
          `${ip}7000/user/history`,
          {
            details: response_final.data.result,
            image: imgPath,
            label: label,
            type: gh.length > 0 ? "bad" : "good",
          },
          {
            headers: {
              Authorization: `Bearer ${tok}`,
            },
          }
        );
      } else {
        hisresp = await axios.post(
          `${ip}7000/user/history`,
          {
            details: response_final.data.result,
            image: imgPath,
            label: label,
            type: Object.keys(gh).length > 0 ? "bad" : "good",
          },
          {
            headers: {
              Authorization: `Bearer ${tok}`,
            },
          }
        );
      }
      if (hisresp.data.history.type == "bad") {
        setAlertMessage("Highly Allergic for you! Please don't consume");
        setAlertType("bad");
        setShowAlert(true);
      } else {
        setAlertMessage(
          "The Product is allergen free!!! You can safely consume it"
        );
        setAlertType("good");
        setShowAlert(true);
      }
      // Alert.alert("Allergic Ingridien-", response_final.data.result);
      setFinalResp(response_final.data.result);
      // data_formatter(response_final.data.result);
      setLoading(false);
      // Alert.alert(response);
      // setIngList(response_final.data.result);
    } catch (err) {
      console.log("Error", err);
    }

    setUploading(true);
    try {
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        image: null,
        prompt: "",
      });

      setUploading(false);
    }
  };
  const handleUploadButtonPress = () => {
    setLoading(true);
    submit();
    // submitNew();
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Create</Text>

        {/* <FormField
          title="Image Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        /> */}
        <FormField
          title="Product Label"
          value={label}
          handleChangeText={(e) => setLabel(e)}
          otherStyles="mt-7"
          keyboardType="email-address"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Ingredient Image
          </Text>
          {form.ingredient_image ? (
            <Image
              source={{ uri: inguri }}
              resizeMode="cover"
              className="w-full h-64 rounded-2xl"
            />
          ) : null}
          <TouchableOpacity onPress={() => openPicker("ingredients")}>
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
        </View>
        {loading ? (
          <ActivityIndicator size="200" color="#0000ff" className="mt-5" />
        ) : (
          <Text className="mt-5 text-lg text-yellow-300">{finalResp}</Text>
        )}
        {form.ingredient_image && (
          <CustomButton
            title="Start Checking"
            handlePress={handleUploadButtonPress}
            containerStyles="mt-7"
            isLoading={uploading}
          />
        )}
        {showAlert && (
          <AlertBox
            message={alertMessage}
            onClose={handleCloseAlert}
            type={alertType}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
