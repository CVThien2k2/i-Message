# API Documentation

## 1. Authentication: Login and Register

### 1.1 Get all users

- **GET:** `http://localhost:8081/auth/`
- **Return:** 
    ```json
    [
        "user1",
        "user2",
        ...
    ]
    ```

### 1.2 Login

- **POST:** `http://localhost:8081/auth/login`
- **Body:**
    ```json
    {
        "email": "Email",
        "password": "pass"
    }
    ```
- **Return:**
    - Example:
        ```json
        {
            "_id": "654f7962c49e23adbebe2c39",
            "name": "Cao Văn Thiện",
            "gender": "male",
            "numberPhone": 395797020,
            "address": "123 Main Street",
            "avatar": "user-avatar.jpg",
            "role": "user",
            "typeLogin": "local",
            "email": "caovanthien@gmail.com",
            "createdAt": "2023-11-11T12:53:54.864Z",
            "updatedAt": "2023-11-11T12:53:54.864Z",
            "__v": 0,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."
        }
        ```
    - Or: "Thông tin tài khoản hoặc mật khẩu không chính xác"

### 1.3 Register

- **POST:** `http://localhost:8081/auth/create`
- **Body:**
    ```json
    {
        "name": "Cao Văn Long",
        "gender": "male",
        "numberPhone": "0395797021",
        "address": "123 Main Street",
        "avatar": "user-avatar.jpg",
        "role": "user",
        "email": "caovanthie1n@gmail.com",
        "password": "Caothien09102002??",
        "typeLogin": "local"
    }
    ```
- **Return:**
    - Example:
        ```json
        {
            "_id": "654f7962c49e23adbebe2c39",
            "name": "Cao Văn Thiện",
            "gender": "male",
            "numberPhone": 395797020,
            "address": "123 Main Street",
            "avatar": "user-avatar.jpg",
            "role": "user",
            "typeLogin": "local",
            "email": "caovanthien@gmail.com",
            "createdAt": "2023-11-11T12:53:54.864Z",
            "updatedAt": "2023-11-11T12:53:54.864Z",
            "__v": 0,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."
        }
        ```
    - Or: "Email đã được sử dụng"

## 2. Group

### 2.1 Find Group

- **GET:** `http://localhost:8081/group/find/idUser1/idUser2`
- **Return:**
    ```json
    [
        {
            "_id": "655cd618fac542778117b106",
            "name": null,
            "avatar": null,
            "userCount": 2,
            "messCount": 0,
            "members": [
                "654f7962c49e23adbebe2c39",
                "654f7992c49e23adbebe2c3d"
            ],
            "createdAt": "2023-11-21T16:08:56.029Z",
            "updatedAt": "2023-11-21T16:08:56.029Z",
            "__v": 0
        }
    ]
    ```

### 2.2 Get User's Groups

- **GET:** `http://localhost:8081/group/userID`
- **Return:**
    ```json
    [
        {
            "_id": "655cd618fac542778117b106",
            "name": null,
            "avatar": null,
            "userCount": 2,
            "messCount": 0,
            "members": [
                "654f7962c49e23adbebe2c39",
                "654f7992c49e23adbebe2c3d"
            ],
            "createdAt": "2023-11-21T16:08:56.029Z",
            "updatedAt": "2023-11-21T16:08:56.029Z",
            "__v": 0
        }
    ]
    ```

### 2.3 Create Group

- **POST:** `http://localhost:8081/group/`
- **Body:**
    ```json
    {
        "firstID": "ID người dùng 1",
        "secondID": "ID người dùng 2"
    }
    ```
- **Return:**
    ```json
    {
        "_id": "655cd618fac542778117b106",
        "name": null,
        "avatar": null,
        "userCount": 2,
        "messCount": 0,
        "members": [
            "654f7962c49e23adbebe2c39",
            "654f7992c49e23adbebe2c3d"
        ],
        "createdAt": "2023-11-21T16:08:56.029Z",
        "updatedAt": "2023-11-21T16:08:56.029Z",
        "__v": 0
    }
    ```

## 3. Messages

### 3.1 Send Message

- **POST:** `http://localhost:8081/message/`
- **Body:**
    ```json
    {
        "text": "Nội dung tin nhắn",
        "user_id": "654f7962c49e23adbebe2c39",
        "group_id": "655cd618fac542778117b106"
    }
    ```
- **Return:**
    ```json
    {
        "text": "Nội dung tin nhắn",
        "user_id": "654f7962c49e23adbebe2c39",
        "group_id": "655cd618fac542778117b106",
        "_id": "656243458e190d7afadf9458",
        "createdAt": "2023-11-25T18:56:05.951Z",
        "updatedAt": "2023-11-25T18:56:05.951Z",
        "__v": 0
    }
    ```
