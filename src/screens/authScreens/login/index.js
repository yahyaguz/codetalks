import React, { useState } from "react"
import { Text, View, KeyboardAvoidingView, SafeAreaView } from "react-native";
import { Dimensions, Colors } from "../../../theme";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup"
import auth from "@react-native-firebase/auth"
import { showMessage, hideMessage } from "react-native-flash-message";

import authErrorMessageParser from "../../../utils/authErrorMessageParser";
import Button from "../components/button";
import Input from "../components/input";
const Icon = styled.Image`
    tintColor: ${Colors.DARK_BLUE};
`;
const InputContainer = styled.View`
    justifyContent: center;
    alignItems: center;
`;
const Title = styled.Text`
    fontSize:80px;
    fontWeight:bold;
`;

const TextError = styled.Text`
    fontSize: 12px;
    fontWeight: 500;
    color: red;
    marginHorizontal: 20px;
`;

const initialFormValues = {
    usermail: '',
    password: '',
}

function Login({ navigation }) {

    const handleSignup = () => {
        navigation.navigate("SignScreen")
    }

    const [loading, setLoading] = useState(false);

    const validation = Yup.object().shape({
        usermail: Yup.string()
            .email("Geçrsiz E-Posta formatı.")
            .required("Bu alanı doldurmak zorunludur."),
        password: Yup.string()
            .min(6, "Şifre en az 6 karakter olmalı! ")
            .required("Bu alanı doldurmak zorunludur."),
    })

    const handleFormSubmit = async (formValues) => {
        try {
            setLoading(true)
            await auth().signInWithEmailAndPassword(
                formValues.usermail,
                formValues.password,
            );
            showMessage({
                message: "Kullanıcı girişi yapıldı",
                type: "success",
            });
            setLoading(false)
        } catch (error) {
            showMessage({
                message: authErrorMessageParser(error.code),
                type: "danger",
            });
            console.log(error)
            setLoading(false)
        }
    }




    return (
        <View style={{ height: Dimensions.SCREEN_HEIGHT, backgroundColor: Colors.SOFT_GRAY }}>
            <Title>Logo Burada Olacak</Title>
            <Formik
                initialValues={initialFormValues}
                onSubmit={handleFormSubmit}
                validationSchema={validation}
            >
                {({ values, handleChange, handleSubmit, errors, touched, handleBlur }) => (

                    <InputContainer>
                        <Input
                            icon={<Icon source={require("../../../assets/images/mail.png")} />}
                            placeholder="E-Posta"
                            onTouchStart={handleBlur("usermail")}
                            onChangeText={handleChange('usermail')}
                            value={values.usermail}
                            keyboardType="email-address"
                        />
                        {touched.usermail && errors.usermail && <TextError>{errors.usermail}</TextError>}
                        <Input
                            icon={<Icon source={require("../../../assets/images/lock.png")} />}
                            placeholder="Şifre"
                            onTouchStart={handleBlur("password")}
                            onChangeText={handleChange('password')}
                            value={values.password}
                            secureTextEntry={true}
                        />
                        {touched.password && errors.password && <TextError>{errors.password}</TextError>}

                        <Button title="Giriş Yap" onPress={handleSubmit} loading={loading} />
                        <Button title="Kayıt Ol" onPress={handleSignup} />
                    </InputContainer>
                )}
            </Formik>
        </View>
    )
}
export default Login;

