import { useContext } from "react";
import { GroupContext } from "../context/GroupContext";

const GroupChat = () => {
    const {userGroups,
        setUserGroups,
        userGroupLoading,
        userGroupError} = useContext(GroupContext)
        console.log(userGroups)
    return (<>
    Chat
    </>)
}
export default GroupChat;