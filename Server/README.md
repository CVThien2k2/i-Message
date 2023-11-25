# API
## 1. AUTH
### Get all user: 
+ GET: http://localhost:8081/auth/ 
- Login: 
+ POST: http://localhost:8081/auth/login
+ Body: {
                    "email" : "Email",
                    "password": "pass"
                }
        
- Register: 
+ POST: http://localhost:8081/auth/create
+ Body: Example:
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
- Find user: 
+ GET: http://localhost:8081/auth/find/userId
### 2.GROUP: 
    - Create group: 
        + POST: 
