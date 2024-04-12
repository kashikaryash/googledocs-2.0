import { createTransport } from "nodemailer";

const transporter = createTransport({
  port: 587,
  host: "smtp.gmail.com",
  auth: {
    user: "kashikaryash@gmail.com",
    pass: "lyizepymrfidgreo",
  },
  secure: false,
});

export default transporter;