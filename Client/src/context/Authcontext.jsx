import { createContext, useCallback, useState,useEffect } from "react";
import { baseUrl, postRequest } from "../utils/services";



export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
     //Thông tin người dùng
     const [user, setUser] = useState(null)
     //Đăng ký
     //Lỗi đăng ký, Loading và thông tin
     const [registerError, setRegisterError] = useState(null)
     const [isRegisterLoading, SetIsRegisterLoading] = useState(false)
     const [registerInfo, setRegisterInfo] = useState({
          name: "",
          email: "",
          password: "",
          numberPhone: "",
     })
     const registerUser = useCallback(async (e) => {
          //hàm không khởi tao lại restart lại trang
          e.preventDefault()
          //set đang Loadding và chưa có lỗi
          SetIsRegisterLoading(true)
          setRegisterError(null)
          const response = await postRequest(`${baseUrl}/auth/create`, JSON.stringify(registerInfo))
          //Loadding xong
          SetIsRegisterLoading(false)
          if (response.error) {
               //Lấy lỗi
               return setRegisterError(response)
          }
          //Lưu thông tin
          localStorage.setItem("User", JSON.stringify(response))
          setUser(response)
     }, [registerInfo])
     //Cập nhật thông tin từ form
     const updateRegisterInfo = useCallback((info) => {
          setRegisterInfo(info)
     }, [])

     //Đăng nhập
     const [loginError, setLoginError] = useState(null)
     const [isLoginLoading, setLoginLoading] = useState(false)
     const [loginInfo, setLoginInfo] = useState({
          email: "",
          password: "",
     })
     const loginUser = useCallback(async(e)=>{

          console.log(loginInfo)
          e.preventDefault()
          setLoginError(null);
          setLoginLoading(true)
          const response = await postRequest(`${baseUrl}/auth/login`, JSON.stringify(loginInfo))
          setLoginLoading(false)
          if (response.error) {
               //Lấy lỗi
               return setLoginError(response)
          }
          localStorage.setItem("User", JSON.stringify(response))
          setUser(response)
     },[loginInfo])
     //Cập nhật thông tin từ form
     const updateLoginInfo = useCallback((info) => {
          setLoginInfo(info)
     }, [])

     //SetUser
     useEffect(()=>{
          const user = localStorage.getItem("User")
          setUser(JSON.parse(user))
     },[])
     
     //Đăng xuất
     const logOutUser = useCallback(()=>{
          localStorage.removeItem("User");
          setUser(null);
     })

    

     return <AuthContext.Provider value={
          { registerInfo, 
          updateRegisterInfo,
           registerUser, 
           isRegisterLoading, 
           registerError,
           logOutUser ,
           user,
           loginUser,
           updateLoginInfo,
           loginError,
           isLoginLoading,
           loginInfo

          }}>
          {children}
     </AuthContext.Provider>
}