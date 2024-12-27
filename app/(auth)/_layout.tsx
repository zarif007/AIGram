import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="Sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Sign-up"
          options={{
            headerShown: false,
          }}
        />

        <StatusBar backgroundColor="#161622" style="light" />
      </Stack>
    </>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
