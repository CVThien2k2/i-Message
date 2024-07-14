const client = require("twilio")(
  process.env.SMS_API_SID,
  process.env.SMS_API_TOKEN
);

const sendSMS = async (toNumber, otp) => {
  const message = `Mã xác thực của bạn là ${otp}`;
  try {
    return client.messages
      .create({
        from: process.env.SMS_FROM,
        to: toNumber,
        body: message,
      })
      .then((message) => console.log(message.sid))
      .done();
  } catch (error) {
    return error;
  }
};
module.exports = sendSMS;
