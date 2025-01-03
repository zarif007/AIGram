import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";

import { images } from "../../constants";
import FormFields from "@/components/FormFields";
import CustomButton from "@/components/ui/CustomButton";
import { Link, router } from "expo-router";
import { registerUser } from "@/lib/appwrite";

const Signup = () => {
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitForm = async () => {
    if (isLoading) return;
    if (!form.email || !form.username || !form.password) {
      Alert.alert("Please fill all the fields");
      return;
    }

    setIsLoading(true);
    try {
      const result = await registerUser(
        form.email,
        form.password,
        form.username
      );

      if (result.success) {
        router.replace("/home");
      } else {
        Alert.alert("Error", result.error);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-[75vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-semibold">
            Create account to to AIGram
          </Text>
          <View className="my-3">
            <FormFields
              title="User name"
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e })}
              otherStyles="mt-7"
              keyboardType="username"
            />
            <FormFields
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
            />
            <FormFields
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
              keyboardType="password"
            />
          </View>

          <CustomButton
            title="Sign Up"
            handlePress={handleSubmitForm}
            containerStyle="mt-7"
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-gray-100 text-lg font-regular">
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-semibold text-blue-500"
            >
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({});
