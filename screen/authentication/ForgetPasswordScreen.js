import React, { useReducer, useState, useCallback } from 'react'
import { Keyboard, Alert } from 'react-native'
import { Pressable, Center, Box, Button, KeyboardAvoidingView } from 'native-base'
import auth from "@react-native-firebase/auth"
import CustomInput from "../../components/UI/CustomInput"

const UPDATE_FORGET_PASSWORD = "UPDATE_FORGET_PASSWORD"

const forgetPasswordReducer = (state, action) => {
    if (action.type === UPDATE_FORGET_PASSWORD) {
        const updatedForgottenPassword = {
            ...state.forgetPasswordValue,
            [action.input]: action.value
        }
        const updatedForgottenPasswordValidities = {
            ...state.forgetPasswordValidity,
            [action.input]: action.isValid
        }
        let updatedForgottenIsValid = true;
        for (key in updatedForgottenPasswordValidities) {
            updatedForgottenIsValid =
                updatedForgottenIsValid && updatedForgottenPasswordValidities[key]
        }
        return {
            forgetPasswordisValid: updatedForgottenIsValid,
            forgetPasswordValue: updatedForgottenPassword,
            forgetPasswordValidity: updatedForgottenPasswordValidities
        }
    }
    return state
}
const ForgetPasswordScreen = props => {
    const [inputError, setInputError] = useState(false);

    const [forgetPasswordState, dispatchForgetPassword] = useReducer(forgetPasswordReducer, {
        forgetPasswordValue: {
            forgetPassword: ''
        },
        forgetPasswordValidity: {
            forgetPassword: false
        },
        forgetPasswordisValid: false
    })

    const inputChangeHandler = useCallback(
        (id, forgetPasswordValue, forgetPasswordValidity) => {
            dispatchForgetPassword(
                {
                    type: UPDATE_FORGET_PASSWORD,
                    value: forgetPasswordValue,
                    isValid: forgetPasswordValidity,
                    input: id
                })
        }, [dispatchForgetPassword])
    const forgotPassword = (Email) => {
        auth().sendPasswordResetEmail(Email)
            .then(() => {
                Alert.alert("Sent successfully!", "Please check your email!", [{ text: "Okay" }]);
            })
            .catch((error) => {
                if (error.code === "auth/invalid-email") {
                    Alert.alert("Email Error!", "Invalid Email!", [{ text: "Okay" }]);
                } else if (error.code === "auth/user-not-found") {
                    Alert.alert("Email Error!", "User not found.", [{ text: "Okay" }]);
                } else if (error.code === "auth/too-many-requests") {
                    Alert.alert("Email Error!", "Too many request try again later!.", [{ text: "Okay" }]);
                }

            })
    }
    const confirmHandler = () => {
        Keyboard.dismiss()
        if (!forgetPasswordState.forgetPasswordisValid) {
            setInputError(true)
            return
        }
        forgotPassword(forgetPasswordState.forgetPasswordValue.forgetPassword)


    }
    return (
        <KeyboardAvoidingView
            behavior="position"
            flex='1'
            bgColor="white">
            <Pressable onPress={Keyboard.dismiss} >
                <Box alignItems="center" >
                    <Box
                        mt="50%"
                        maxWidth="375"
                        maxHeight="250"
                        h="100%"
                        w="100%"
                        borderRadius="sm"
                        overflow="hidden"
                        padding="10"
                        borderWidth="1"
                        shadow="1"
                        bg="gray.200">
                        <CustomInput
                            //props from customInput 
                            initialValue=''
                            initiallyValid={false}
                            required
                            mail
                            isRequired={true}
                            errorOnClick={inputError}
                            label='Email'
                            pHolder="Enter your Email"
                            errorMessage="Invalid email"
                            //props to add on custom input
                            id="forgetPassword"
                            onInputChange={inputChangeHandler}
                            returnKeyType="done"
                        />

                        <Button onPress={confirmHandler}
                            marginTop={1} isLoadingText="Loading...">
                            CONFIRM
                        </Button>
                    </Box >
                </Box >
            </Pressable >
        </KeyboardAvoidingView >
    )
}

export default ForgetPasswordScreen