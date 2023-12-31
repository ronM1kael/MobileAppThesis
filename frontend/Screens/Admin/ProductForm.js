import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  FlatList,
  RefreshControl
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import baseURL from "../../assets/common/baseurl";
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthGlobal from "../../Context/Store/AuthGlobal"
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Toast from "react-native-toast-message";
import ListItem from "./ListItem";  // Import your ListItem component

const CertificationForm = (props) => {

  const contexts = useContext(AuthGlobal);

  const fetchFilesForUser = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem('jwt');
      const userProfile = context.stateUser.userProfile;

      if (!jwtToken || !context.stateUser.isAuthenticated || !userProfile || !userProfile.id) {
        console.error('Invalid authentication state');
        return;
      }

      const response = await axios.get(`${baseURL}get_files/${userProfile.id}`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      setFiles(response.data.files); // Assuming response.data.files contains the files array
      console.log('Files:', response.data.files);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (contexts.stateUser.isAuthenticated === true) {
        setSelectedFile(null);
        setResearchTitle('');
        setError(null);
        // Fetch files for the new authenticated user
        fetchFilesForUser(); // A function that retrieves files for the authenticated user
      } else {
        // Reset state for non-authenticated user
        setSelectedFile(null);
        setResearchTitle('');
        setError(null);
        setFiles([]);
      }
    }, [contexts.stateUser.isAuthenticated])
  );

  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [researchTitle, setResearchTitle] = useState('');
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      axios
        .get(`${baseURL}get_files`)
        .then((res) => {
          setFiles(res.data);
        });
      setRefreshing(false);
    }, 2000);
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${baseURL}get_files`);
  //       setFiles(response.data);
  //       console.log("Files:", response.data);
  //     } catch (error) {
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = await AsyncStorage.getItem('jwt');
        const userProfile = context.stateUser.userProfile;

        if (!jwtToken || !context.stateUser.isAuthenticated || !userProfile || !userProfile.id) {
          console.error('Invalid authentication state');
          return;
        }

        const response = await axios.get(`${baseURL}get_files/${userProfile.id}`, {
          headers: { Authorization: `Bearer ${jwtToken}` },
        });

        setFiles(response.data.files); // Assuming response.data.files contains the files array
        console.log('Files:', response.data.files);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchData();
  }, []);

  const deleteFile = async (fileId) => {
    try {
      await axios.delete(`${baseURL}delete_file/${fileId}`);
      setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
      Toast.show({
        type: "success",
        text1: "File deleted successfully",
      });
      onRefresh(); // Trigger refresh after file deletion
    } catch (error) {
      console.error("Error deleting file:", error); // Log the detailed error response
      Toast.show({
        type: "error",
        text1: "Error deleting file",
        text2: "Please try again.",
      });
    }
  };

  const context = useContext(AuthGlobal);

  const requestCameraRollPermission = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Camera Roll permission is required to access files.");
      }
    } catch (error) {
      console.error("Error asking for camera roll permission:", error);
    }
  };

  const handleLargeFile = async (uri) => {
    console.log(uri);
    try {
      if (!uri) {
        console.log("Invalid URI for the document");
        return;
      }

      const fileInfo = await FileSystem.getInfoAsync(uri);

      if (fileInfo) {
        const fileSize = fileInfo.size;

        if (fileSize > 10000000) {
          Alert.alert("File size exceeds the maximum limit.");
          return;
        }
      } else {
        console.log("Error getting file info for the document");
      }
    } catch (error) {
      console.error("Error handling large file:", error);
    }
  };

  const pickDocument = async () => {
    try {
      await requestCameraRollPermission();

      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result.canceled) {
        console.log("Document picking canceled");
      } else if (result.assets && result.assets.length > 0) {
        const pickedAsset = result.assets[0];

        if (pickedAsset.uri) {
          const fileInfo = await FileSystem.getInfoAsync(pickedAsset.uri);

          if (fileInfo) {
            const newUri = FileSystem.documentDirectory + fileInfo.name;

            try {
              await FileSystem.copyAsync({
                from: pickedAsset.uri,
                to: newUri,
              });

              setSelectedFile({
                name: pickedAsset.name,
                uri: newUri,
              });

              handleLargeFile(newUri);

              const fileNameWithoutExtension = pickedAsset.name.replace(/\.[^/.]+$/, '');
              setResearchTitle(fileNameWithoutExtension);

              console.log("Document picked:", result);
            } catch (copyError) {
              console.error("Error copying file:", copyError);
            }
          } else {
            console.log("Error getting file info for the picked document");
          }
        } else {
          console.log("Invalid URI for the picked document");
        }
      } else {
        console.log("Document picking failed with unexpected result:", result);
      }
    } catch (err) {
      console.error("Error picking document", err);
    }
  };

  const handleConfirmation = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem('jwt');
      const userProfile = context.stateUser.userProfile;

      if (!jwtToken || !context.stateUser.isAuthenticated || !userProfile || !userProfile.id) {
        setError("User authentication or profile information is missing");
        return;
      }

      const userId = userProfile.id;

      const formData = new FormData();
      formData.append("research_title", researchTitle);
      formData.append("research_file", {
        uri: selectedFile.uri,
        name: selectedFile.name,
        type: "application/pdf",
      });
      formData.append("user_id", userId);

      const response = await axios.post(`${baseURL}upload_file`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      console.log("File uploaded successfully", response.data);
      Toast.show({
        topOffset: 60,
        type: "success",
        text1: "File uploaded successfully.",
        text2: "You can now view your file.",
      });
      onRefresh(); // Trigger refresh after file deletion
      navigation.navigate('Home');
      //
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Error uploading file. Please try again.");
      Toast.show({
        position: 'bottom',
        bottomOffset: 20,
        type: "error",
        text1: "Error uploading file.",
        text2: "Please try again.",
      });
    }
  };

  useEffect(() => {
    // Call handleConfirmation when the component mounts
    // Ensure it's called at the appropriate time, not on every render
    // handleConfirmation();
  }, [context.stateUser.isAuthenticated, context.stateUser.userProfile]);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://www.bootdey.com/image/280x280/800000/800000",
        }}
        style={styles.background}
      />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Upload a File</Text>
        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Research Title</Text>
            <View
              style={{
                width: "100%",
                height: 100,
                borderColor: "#800000",
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Input Research Title"
                placeholderTextColor="#999"
                value={researchTitle}
                onChangeText={(text) => setResearchTitle(text)}
                style={{
                  width: "105%",
                }}
              />
            </View>
            <TextInput
              placeholder="File Name"
              value={selectedFile ? selectedFile.name : ""}
              editable={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.buttons}
              onPress={pickDocument}
            >
              <Text style={styles.buttonTexts}>Choose File</Text>
            </TouchableOpacity>
          </View>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity
            style={styles.button}
            onPress={handleConfirmation}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ borderWidth: 2, borderColor: 'maroon', margin: 10 }}>
          <Text style={{ textAlign: 'center', color: 'maroon', fontSize: 24, padding: 10 }}>
            File List
          </Text>
        </View>
        <FlatList
          data={files}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item, index }) => (
            <ListItem key={index} item={item} index={index} deleteFile={deleteFile} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
    marginTop: 20,
  },
  card: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 20,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "maroon",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  buttons: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "maroon",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTexts: {
    color: "black",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
};

export default CertificationForm;