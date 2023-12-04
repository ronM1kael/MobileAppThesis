import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    Modal,
    Image,
    Alert,  // Import Alert for potential error messages
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import axios from 'axios';  // Import Axios for making HTTP requests
import baseURL from "../../assets/common/baseurl";

import Toast from "react-native-toast-message";

import { useNavigation, useFocusEffect } from '@react-navigation/native';

var { width } = Dimensions.get("window");

const ListAnnouncement = ({ item, index, deleteFile }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            underlayColor="#E8E8E8"
                            onPress={() => {
                                setModalVisible(false);
                            }}
                            style={{
                                alignSelf: "flex-end",
                                position: "absolute",
                                top: 5,
                                right: 10,
                            }}
                        >
                            <Icon name="close" size={20} />
                        </TouchableOpacity>
                        <EasyButton
                            medium
                            secondary
                            // onPress={() => [navigation.navigate("ProductForm", { item }),
                            // setModalVisible(false)
                            // ]}
                            title="Edit"
                        >
                            <Text style={styles.textStyle}>Edit</Text>
                        </EasyButton>
                        <EasyButton medium danger onPress={() => handleDelete()} title="Delete">
                            <Text style={styles.textStyle}>Delete</Text>
                        </EasyButton>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity
                onLongPress={() => {
                    setModalVisible(true);
                }}
                style={[
                    styles.container,
                    { backgroundColor: index % 2 === 0 ? "white" : "gainsboro" },
                ]}
            >

                <View style={styles.containers}>
                    <View style={styles.content}>
                        <View style={styles.contentHeader}>
                            <Text style={styles.name}>Title: {item.title}</Text>
                        </View>
                        <Text rkType="primary3 mediumLine">Content: {item.content}</Text>
                    </View>
                </View>

            </TouchableOpacity>
        </View>
    );
};



export default ListAnnouncement