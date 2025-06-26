import { createTransport } from "nodemailer";

const transport = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_PASSWORD,
  },
});

const sendEmail = async (email, subject, body) => {
  await transport.sendMail({
    from: process.env.GOOGLE_EMAIL,
    to: email,
    subject: subject,
    html: body,
  });
};
export { transport, sendEmail };
