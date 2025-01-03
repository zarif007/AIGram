import { getCurrentUser } from "@/lib/appwrite";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

const GlobalContext = createContext({
  user: null,
  setUser: (user: any) => {},
  isLoading: true,
  isLogged: false,
  setIsLogged: (isLogged: boolean) => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        if (res) {
          setUser(res);
          setIsLogged(true);
        } else {
          setIsLogged(false);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{ user, setUser, isLoading, isLogged, setIsLogged }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
