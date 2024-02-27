import { NextResponse } from "next/server";

import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (req: Request) => {
  try {
    const { sender, receiver, subject, message } = await req.json();
    console.log(sender, receiver, subject, message);

    const res = await resend.emails.send({
      from: sender,
      to: receiver,
      subject,
      text: message,
    });
    console.log(res);

    if (res.error) {
      return NextResponse.json({ status: "error", id: "" }, { status: 400 });
    }
    return NextResponse.json(
      { status: "success", id: res.data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: "error", id: "" }, { status: 400 });
  }
};
