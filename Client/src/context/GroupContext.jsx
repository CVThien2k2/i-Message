import { createContext, useCallback, useState, useEffect } from "react";
import { baseUrl, getRequest } from "../utils/services";
export const GroupContext = createContext();

export const GroupContextProvider = ({ children, user }) => {
  const [userGroups, setUserGroups] = useState(null);
  const [userGroupLoading, setUserGroupLoading] = useState(false);
  const [userGroupError, setUserGroupError] = useState(null);

  useEffect(() => {
    const getUserGroups = async () => {
      setUserGroupLoading(true);

      if (user?._id) {
        const response = await getRequest(`${baseUrl}/group/${user?._id}`);
        setUserGroupLoading(false);
        if (response.error) {
          return setUserGroupError(response);
        }
        setUserGroups(response);
      }
    };
    getUserGroups();
  }, [user]);

  return (
    <GroupContext.Provider
      value={{
        userGroups,
        setUserGroups,
        userGroupLoading,
        userGroupError,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};
