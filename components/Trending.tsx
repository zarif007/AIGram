import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Models } from "react-native-appwrite";
import Animatable from "react-native-animatable";

const TrendingItem = () => {
  return <Animatable.View></Animatable.View>;
};

const Trending = ({ posts }: { posts: Models.Document[] | null }) => {
  const [activeItem, setActiveItem] = useState(posts ? posts[0] : null);
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => <TrendingItem />}
      horizontal
      ListEmptyComponent={() => (
        <Text className="text-white text-center">No posts found</Text>
      )}
    />
  );
};

export default Trending;

const styles = StyleSheet.create({});
