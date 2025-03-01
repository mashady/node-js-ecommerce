import nodemailer from "nodemailer";
import { emailTemplate } from "./emailTemplate.js";
import jwt from "jsonwebtoken";

export async function sendEmail(email) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "muhammedmashady@gmail.com",
      pass: "attv quud tivo jxlv",
    },
  });

  const emailToken = jwt.sign(email, "emailToken");

  const info = await transporter.sendMail({
    from: '"MASHADY" <muhammedmashady@gmail.com>',
    to: email,
    subject: "Welcome to our platform",
    text: "From Mashady ",
    html: emailTemplate(emailToken),
  });
}
