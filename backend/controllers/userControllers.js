const users = require("../models/userSchema");
const userOtp = require("../models/userOtp");
const nodemailer = require("nodemailer");

// email config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

exports.userregister = async (req, res) => {
  const { fname, email, number } = req.body;

  if (!fname || !email || !number) {
    return res.status(400).json({ error: "Please Enter All Input Data" });
  }

  try {
    const presuer = await users.findOne({ email: email });

    if (presuer) {
      return res.status(400).json({ error: "This User Already exists in our database" });
    } else {
      const userregister = new users({
        fname,
        email,
        number,
      });

      const storeData = await userregister.save();
      return res.status(200).json(storeData);
    }
  } catch (error) {
    return res.status(400).json({ error: "Invalid Details", error });
  }
};

// user send otp
exports.userOtpSend = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Please Enter Your Email" });
  }

  try {
    const presuer = await users.findOne({ email: email });

    if (presuer) {
      const OTP = Math.floor(100000 + Math.random() * 900000);

      const existEmail = await userOtp.findOne({ email: email });

      if (existEmail) {
        const updateData = await userOtp.findByIdAndUpdate(
          { _id: existEmail._id },
          {
            otp: OTP,
          },
          { new: true }
        );

        await updateData.save();

        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Sending Email For OTP Validation",
          text: `OTP:- ${OTP}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            return res.status(400).json({ error: "email not send" });
          } else {
            console.log("Email sent", info.response);
            return res.status(200).json({ message: "Email sent Successfully" });
          }
        });
      } else {
        const saveOtpData = new userOtp({
          email,
          otp: OTP,
        });
        await saveOtpData.save();
        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Sending Email For OTP Validation",
          text: `OTP:- ${OTP}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            return res.status(400).json({ error: "email not send " });
          } else {
            console.log("Email sent", info.response);
            return res.status(200).json({ message: "Email sent Successfully" });
          }
        });
      }
    } else {
      return res.status(400).json({ error: "This user does not exist in our db" });
    }
  } catch (error) {
    return res.status(400).json({ error: "Invalid Details", error });
  }
};

exports.userLogin = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Please Enter Your OTP And Email" });
  }

  try {
    const otpVerification = await userOtp.findOne({ email: email });

    if (otpVerification.otp === otp) {
      const preUser = await users.findOne({ email: email });

      // token generate
      const token = await preUser.generateAuthToken();
      return res.status(200).json({message:"User login successfully done",userToken:token});
      
      
    } else {
      return res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    return res.status(400).json({ error: "Invalid Details", error });
  }
};
