const express = require("express");
const router = express.Router();
const accessController = require("../controllers/access.controller");
const passport = require("passport");
const { asyncHandler } = require("../utils/asyncHandler");
const {
  authentication,
  authenticationRefreshToken,
  verifyOtp,
  addTypeSignup,
  addTypeForgotPassword,
} = require("../auth/authUtils");
//Resetpassword
router.post("/forgot-password",addTypeForgotPassword, asyncHandler(accessController.sendOtp));
router.post("/verify-forgot-password",verifyOtp,asyncHandler(accessController.forgotPassword));
router.post("/reset-password", asyncHandler(accessController.resetPassword));
//Login with app
router.post("/signup",addTypeSignup, asyncHandler(accessController.sendOtp));
router.post("/resend-otp", asyncHandler(accessController.reSendOtp));
router.post("/verify-signup", verifyOtp, asyncHandler(accessController.signUp));
router.post("/login", asyncHandler(accessController.login));
//Login & register with google
router.get(
  "/login/google/",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: "login",
  })
);
router.get(
  "/signup/google/",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: "signup",
  })
);
router.get(
  "/auth/google/callback",
  (req, res, next) => {
    passport.authenticate("google", (err, profile) => {
      req.profile = profile;
      next();
    })(req, res, next);
  },
  asyncHandler(accessController.authWithOAuth)
);
//Login with facebook
router.get(
  "/signup/facebook",
  passport.authenticate("facebook", {
    scope: "email",
    state: "signup",
  })
);
router.get(
  "/login/facebook",
  passport.authenticate("facebook", {
    scope: "email",
    state: "login",
  })
);

router.get(
  "/auth/facebook/callback",
  (req, res, next) => {
    passport.authenticate("facebook", (err, profile) => {
      req.profile = profile;
      next();
    })(req, res, next);
  },
  asyncHandler(accessController.authWithOAuth)
);
router.post("/oauth/login", asyncHandler(accessController.loginWithOAuth));
//getToken
router.post(
  "/refreshToken",
  authenticationRefreshToken,
  asyncHandler(accessController.handlerRefreshToken)
);
router.use(authentication);
router.post("/logout", asyncHandler(accessController.logout));

module.exports = router;
/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Xác thực người dùng
 *     summary: Người dùng đăng nhập
 *     description: Người dùng sử dụng tài khoản và mật khẩu để đăng nhập ứng dụng.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_name
 *               - password
 *             properties:
 *               user_name:
 *                 type: string
 *                 example: caovanthien9102002@gmail.com
 *                 description: Tài khoản của người dùng (email hoặc số điện thoại).
 *               password:
 *                 type: string
 *                 example: 123456
 *                 description: Mật khẩu của người dùng.
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login success!"
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     tokens:
 *                       $ref: '#/components/schemas/Tokens'
 
 *       400:
 *         description: Tài khoản chưa được đăng ký
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:  
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "User name not registered"
 *       401:
 *         description: Mật khẩu không đúng
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:  
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 code:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Invalid password"
 *       500:
 *         description: Lỗi của máy chủ
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:  
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 * /signup:
 *   post:
 *     tags:
 *       - Xác thực người dùng
 *     summary: Người dùng đăng ký  tài khoản
 *     description: Người dùng nhập thông tin để đăng ký ứng dụng.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_name
 *               - given_name
 *               - family_name
 *               - doB
 *               - gender 
 *               - password
 *             properties:
 *               user_name:
 *                 type: string
 *                 description: Tài khoản của người dùng (email hoặc số điện thoại).
 *                 example: caovanthien9102002@gmail.com
 *               given_name:
 *                 type: string
 *                 description: Tên người dùng.
 *                 example: Cao Van
 *               family_name:
 *                 type: string
 *                 description: Tên người dùng.
 *                 example: Thien
 *               doB:
 *                 type: integer
 *                 description: Ngày sinh người dùng (ms).
 *                 example: 2000
 *               gender:
 *                 type: string
 *                 description: Giới tính người dùng.
 *                 example: male
 *               password:
 *                 type: string
 *                 description: Mật khẩu của người dùng.
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Đã gửi yêu cầu đăng ký thành công, bạn sẽ nhận được OTP qua email hoặc số điện thoại đăng ký và token qua response, sử dụng chúng để hoàn tất đăng ký
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP has been sent"
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     token: 
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 
 *       400:
 *         description: Tài khoản không hợp lệ
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:  
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Invalid email or phone number"
 *       409:
 *         description: Email hoặc số điện thoại đã được sử dụng để đăng ký
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:  
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 code:
 *                   type: integer
 *                   example: 409
 *                 message:
 *                   type: string
 *                   example: "User name is use"
 *       500:
 *         description: Lỗi của máy chủ
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:  
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 * /verify-signup:
 *   post:
 *     tags:
 *       - Xác thực người dùng
 *     summary: Người dùng xác thực đăng ký sau khi gửi đăng ký, nhận OTP và Token
 *     description: Người dùng sử dụng thông tin đã nhận được để đhoàn tất đăng ký.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - otp
 *             properties:
 *               token:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 description: Token xác thực đăng ký.
 *               otp:
 *                 type: integer
 *                 example: 123456
 *                 description: OTP xác thực đăng ký.
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Register OK"
 *                 status:
 *                   type: string
 *                   example: "Created"
 *                 code:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     tokens:
 *                       $ref: '#/components/schemas/Tokens'
 *       400:
 *         description: Không tồn tại OTP trong yêu cầu
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:  
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Invalid otp"
 *       408:
 *         description: OTP đã hết hạn, gửi lại - Token hết hạn, vui lòng đăng ký lại
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:  
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 code:
 *                   type: integer
 *                   example: 408
 *                 message:
 *                   type: string
 *                   example: "OTP has expired"
 *       401:
 *         description: OTP Không đúng
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:  
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 code:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Authentication otp error"
 *       500:
 *         description: Lỗi của máy chủ
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:  
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 * /forgot-password:
 *   post:
 *     tags:
 *       - Xác thực người dùng
 *     summary: Người dùng gửi yêu cầu khôi phục mật khẩu, nhận lại OTP qua tài email hoặc số điện thoại, và token xác thực
 *     description: Người dùng nhập tài khoản để gửi yêu cầu khôi phục mật khẩu.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_name
 *             properties:
 *               user_name:
 *                 type: string
 *                 description: Tài khoản của người dùng (email hoặc số điện thoại).
 *                 example: caovanthien9102002@gmail.com
 *     responses:
 *       200:
 *         description: Đã gửi yêu cầu khôi phục, bạn sẽ nhận được OTP qua email hoặc số điện thoại đăng ký và token qua response, sử dụng chúng để xác minh
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP has been sent"
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     token: 
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Tài khoản không hợp lệ
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:  
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Invalid email or phone number"
 *       404:
 *         description: Email hoặc số điện thoại chưa được sử dụng để đăng ký
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:  
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "User name not found"
 *       500:
 *         description: Lỗi của máy chủ
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:  
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 * /verify-forgot-password:
 *   post:
 *     tags:
 *       - Xác thực người dùng
 *     summary: Người dùng sau khi gửi yêu cầu khôi phục mật khẩu, nhận OTP và Token, sử dụng chúng để xác thực đây là chủ sở hữu.
 *     description: Người dùng sử dụng thông tin đã nhận được để đhoàn tất xác thực.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - otp
 *             properties:
 *               token:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 description: Token xác thực người dùng.
 *               otp:
 *                 type: integer
 *                 example: 123456
 *                 description: OTP xác thực người dùng.
 *     responses:
 *       200:
 *         description: Xác thực thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Verify otp succes"
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                    token:
 *                      type: string
 *                      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                      description: Token dùng để reset mật khẩu.
 *       400:
 *         description: Không tồn tại OTP trong yêu cầu
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:  
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Invalid otp"
 *       408:
 *         description: OTP đã hết hạn, gửi lại - Token hết hạn, vui lòng gửi lại yêu cầu
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:  
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 code:
 *                   type: integer
 *                   example: 408
 *                 message:
 *                   type: string
 *                   example: "OTP has expired"
 *       401:
 *         description: OTP Không đúng
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:  
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 code:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Authentication otp error"
 *       500:
 *         description: Lỗi của máy chủ
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:  
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 * /reset-password:
 *   post:
 *     tags:
 *       - Xác thực người dùng
 *     summary: Người dùng sử dụng token đã nhận được để reset mật khẩu.
 *     description: Người dùng sử dụng thông tin đã nhận được để hoàn tất đặt lại mật khẩu.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 description: Token xác thực người dùng.
 *               password:
 *                 type: string
 *                 example: "123456"
 *                 description: Mật khẩu mới của người dùng.
 *     responses:
 *       200:
 *         description: Đặt lại mật khẩu thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reset password success"
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                    user:
 *                       $ref: '#/components/schemas/User'
 *       500:
 *         description: Lỗi của máy chủ
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:  
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 * /resend-otp:
 *   post:
 *     tags:
 *       - Xác thực người dùng
 *     summary: Người dùng sử dụng token đã nhận được khi ở đang nhận yêu cầu xác thực OTP để lấy lại OTP.
 *     description: Người dùng sử dụng thông tin đã nhận được để lấy lại OTP.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 description: Token xác thực người dùng.
 *     responses:
 *       200:
 *         description: Gửi lại OTP thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP has been resent"
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                      token:
 *                        type: string
 *                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                        description: Token xác thực người dùng.
 *       500:
 *         description: Lỗi của máy chủ
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:  
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 * /login/google:
 *   get:
 *     tags:
 *       - Oauth2
 *     summary: Đăng nhập bằng google
 *     description: Đăng nhập bằng google, sau khi xác nhận, ứng dụng sẽ  redirect về `${process.env.URL_CLIENT}/login?token=${token}` nếu xác thực thành công hoặc  `${process.env.URL_CLIENT}/not-found-account?state=not-found-account` nếu tài khoản chưa được đăng ký
 * /login/facebook:
 *   get:
 *     tags:
 *       - Oauth2
 *     summary: Đăng nhập bằng facebook
 *     description: Đăng nhập bằng facebook, sau khi xác nhận, ứng dụng sẽ  redirect về `${process.env.URL_CLIENT}/login?token=${token}` nếu xác thực thành công hoặc  `${process.env.URL_CLIENT}/not-found-account?state=not-found-account` nếu tài khoản chưa được đăng ký
 * /signup/google:
 *   get:
 *     tags:
 *       - Oauth2
 *     summary: Đăng ký bằng google
 *     description: Đăng ký bằng google, sau khi xác nhận, ứng dụng sẽ  redirect về `${process.env.URL_CLIENT}/login?token=${token}` nếu xác thực thành công hoặc  `${process.env.URL_CLIENT}/account-registered?state=account-registered` nếu tài khoản đã được đăng ký
 * /signup/facebook:
 *   get:
 *     tags:
 *       - Oauth2
 *     summary: Đăng ký bằng facebook
 *     description: Đăng ký bằng facebook, sau khi xác nhận, ứng dụng sẽ  redirect về `${process.env.URL_CLIENT}/login?token=${token}` nếu xác thực thành công hoặc  `${process.env.URL_CLIENT}/account-registered?state=account-registered` nếu tài khoản đã được đăng ký
 * /oauth/login:
 *   post:
 *     tags:
 *       - Oauth2
 *     summary: Đăng nhập bằng token nhận được từ máy chủ sau khi xác thực bằng các ứng dụng oauth2
 *     description: Đăng nhập bằng token nhận được từ máy chủ sau khi xác thực bằng các ứng dụng oauth2.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 description: Token nhận được sau khi xác thực qua Oauth2
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login success!"
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     tokens:
 *                       $ref: '#/components/schemas/Tokens'
 
 *       404:
 *         description: Không tồn tại tài khoản
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:  
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Login failed"
 *       500:
 *         description: Lỗi của máy chủ
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:  
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
