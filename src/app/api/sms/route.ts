import { NextResponse } from "next/server";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
// const client = require("twilio")(accountSid, authToken);
import twilio from "twilio";
const client = twilio(accountSid, authToken);

export const POST = async (req: Request) => {
  try {
    const { phone, message, captcha } = await req.json();
    console.log(phone, message);

    const res = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${captcha}`,
      {
        method: "POST",
      }
    );
    const recaptchaRes = await res.json();

    console.log(recaptchaRes);

    if (!recaptchaRes.success) {
      return NextResponse.json(
        { status: "error", sid: recaptchaRes.error },
        { status: 400 }
      );
    }

    const msg = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    console.log(msg);

    return NextResponse.json(
      { status: "success", sid: msg.sid },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { status: "error", sid: "server error" },
      { status: 400 }
    );
  }
};
