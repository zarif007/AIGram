import {
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

const Signin = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmitForm = () => {};
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-fu;; justify-center h-full px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-semibold">
            Log in to AIGram
          </Text>
          <View className="my-3">
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
            title="Sign in"
            handlePress={handleSubmitForm}
            containerStyle="mt-7"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;

const styles = StyleSheet.create({});
