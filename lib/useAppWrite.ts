import { useEffect, useState } from "react";
import { Models } from "react-native-appwrite";
import { Alert } from "react-native";

const useAppWrite = (fn: () => Promise<Models.Document[] | null>) => {
  const [data, setData] = useState<Models.Document[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await fn();
      setData(data);
    } catch (error) {
      Alert.alert("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, refetch, isLoading };
};

export default useAppWrite;
