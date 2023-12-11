import { createContext, useContext, useState, useEffect } from "react";
import { GroupContext } from "./GroupContext";
import { baseUrl, getRequest, postRequest } from "../utils/services";

export const FriendContext = createContext();
const FriendContextProvider = ({ children, user }) => {
  const { allUser } = useContext(GroupContext);
  const [friends, setFriends] = useState(null);
  const [notfriends, setNotFriends] = useState(null);

  useEffect(() => {
    const getFriends = async () => {
      if (user?._id) {
        const response = await postRequest(
          `${baseUrl}/auth/friends`,
          JSON.stringify({
            user_id: user?._id,
          })
        );
        if (response.error) {
          return console.log("Error Fetching User", response);
        }

        setFriends(response);
      }
    };
    getFriends();
  }, [user]);
  useEffect(() => {
    if (friends) {
      const users = allUser.filter((user) => !friends.includes(user._id));
      const resultUsers = allUser.filter((user) => friends.includes(user._id));
      setNotFriends(users);
    }
  }, [friends]);
  return (
    <FriendContext.Provider value={{ friends, notfriends }}>
      {children}
    </FriendContext.Provider>
  );
};

export default FriendContextProvider;
