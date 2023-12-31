import React, { useState, useContext, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import { loginUser } from '../../Context/Actions/Auth.actions'
import AuthGlobal from '../../Context/Store/AuthGlobal'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import FormContainer from "../../Shared/Form/FormContainer";
import Error from "../../Shared/Error";
import COLORS from '../../Constants/color';

import baseURL from "../../assets/common/baseurl";

import Toast from "react-native-toast-message";

import { Ionicons } from "@expo/vector-icons";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const context = useContext(AuthGlobal);
    const navigation = useNavigation();

    const [isPasswordShown, setIsPasswordShown] = useState(false);

    useFocusEffect(
        useCallback(() => {
            if (context.stateUser.isAuthenticated === true) {
              // console.log(context)
                navigation.navigate("UserProfile")
            }
            else
            {
                setEmail('')
                setPassword('')
            }
        }, [context.stateUser.isAuthenticated, navigation, setEmail, setPassword])
      )

      console.log(context.stateUser.isAuthenticated);

    // const handleSubmit = async () => {
    //     try {
    //         if (!email || !password) {
    //             setError("Please fill in your credentials");
    //             return;
    //         }

    //         const response = await fetch(`${baseURL}login-mobile`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ email, password }),
    //         });

    //         const data = await response.json();

    //         console.log(data);

    //         if (data.status === 200) {
    //             AsyncStorage.setItem('userData', JSON.stringify(data.user));
    //             context.dispatch({ type: 'LOGIN', payload: data.user });
    //             Toast.show({
    //               topOffset: 60,
    //               type: "success",
    //               text1: "Logged in Successfully",
    //           });
    //             navigation.navigate("User Profile");
    //         } else {
    //             setError(data.errors || "Login failed");
    //         }
    //     } catch (error) {
    //         console.error('Error during login', error);
    //         setError("An error occurred during login");
    //     }
    // };

    const handleSubmit = () => {

        if (email === "" || password === "") {
          setError("Please fill in your credentials");
    
        } else {
            loginUser(email,password,navigation, context.dispatch);
        //   console.log("error")
        }
        // console.log(user)
      }

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >
            <FormContainer style={styles.container}>
                <Text style={styles.heading}>Welcome Back!</Text>

                <View style={styles.inputContainer}>
                    <Image style={[styles.icon, { tintColor: 'maroon' }]} source={{ uri: 'https://img.icons8.com/ios-filled/512/circled-envelope.png' }} />
                    <TextInput
                        style={styles.inputs}
                        keyboardType="email-address"
                        placeholder={"Enter your Email Address"}
                        value={email}
                        onChangeText={(text) => setEmail(text.toLowerCase())}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Image style={[styles.icon, { tintColor: 'maroon' }]} source={{ uri: 'https://img.icons8.com/ios-glyphs/512/key.png' }} />
                    <TextInput
                        style={styles.inputs}
                        placeholder={"Enter your Password"}
                        secureTextEntry={!isPasswordShown}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == false ? (
                                    <Ionicons name="eye-off" size={24} color='#800000' />
                                ) : (
                                    <Ionicons name="eye" size={24} color='#800000' />
                                )
                            }

                        </TouchableOpacity>

                </View>

                <TouchableOpacity style={styles.restoreButtonContainer}>
                    <Text>Forgot Password?</Text>
                </TouchableOpacity>

                <View style={styles.buttonGroup}>
                    {error ? <Error message={error} /> : null}
                </View>

                <TouchableOpacity
                    style={[styles.buttonContainer, styles.loginButton, { backgroundColor: 'maroon' }]}
                    onPress={() => handleSubmit()}
                >
                    <Text style={styles.loginText}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("Choose")}>
                    <Text style={styles.middleText}>Don't Have an Account? </Text>
                    <Text style={[styles.loginText, { color: 'maroon' }]}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.buttonContainer,
                        styles.googleButton,
                        {
                            backgroundColor: 'white',
                            borderColor: 'maroon',
                            borderWidth: 1,
                        }
                    ]}
                >
                    <View style={styles.socialButtonContent}>
                        <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/color/70/000000/google-logo.png' }} />
                        <Text style={[styles.loginText, { color: 'black' }]}>Sign in with Google</Text>
                    </View>
                </TouchableOpacity>
            </FormContainer>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 30,
        color: COLORS.black,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B0E0E6',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    icon: {
        width: 25,
        height: 25,
        marginLeft: 10, // Adjusting the marginLeft to shift the image to the right
    },
    restoreButtonContainer: {
        width: 250,
        marginBottom: 15,
        alignItems: 'flex-end',
    },
    buttonGroup: {
        width: "80%",
        margin: 10,
        alignItems: "center",
    },
    loginButton: {
        backgroundColor: 'maroon',
    },
    googleButton: {
        backgroundColor: '#ff0000',
    },
    loginText: {
        color: 'white',
    },
    middleText: {
        color: 'black',
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    socialButtonContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Login;