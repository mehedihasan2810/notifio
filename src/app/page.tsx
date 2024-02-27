"use client";

import MailForm from "@/components/MailForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";
import { ReloadIcon } from "@radix-ui/react-icons";
import { SyntheticEvent, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { isValidPhoneNumber } from "react-phone-number-input";

export default function Home() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [captcha, setCaptcha] = useState<string | null>(null);

  console.log(captcha);

  const onHandleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!isValidPhoneNumber(phone) || message === "" || !captcha) {
      setStatus(
        "Invalid data! Please provide your valid phone number also write some messages"
      );

      return;
    }

    try {
      setStatus("");
      setIsLoading(true);
      const res = await fetch("/api/sms", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          phone: phone,
          message: message,
          captcha: captcha,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.status === "success") {
        setStatus(`SMS has been sent successfully. sid: ${data.sid}`);
      } else {
        setStatus("Something went wrong! Try again");
      }
      setIsLoading(false);
    } catch (error) {
      setStatus("Something went wrong! Try again");
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <main className="flex flex-col items-center py-16 px-4 gap-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome to Notifio</h1>
        <p className="mt-2">Manage your SMS and email from one place</p>
      </div>
      <div className="flex flex-col xl:flex-row gap-10">
        <MailForm />
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-center">Send SMS</CardTitle>
          </CardHeader>
          <CardContent>
            {status !== "" && (
              <div className="mb-4 border rounded-md p-2 text-sm border-primary">
                {status}
              </div>
            )}
            <form onSubmit={onHandleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label className="font-semibold" htmlFor="phone">
                    Phone
                  </Label>
                  <PhoneInput
                    id="phone"
                    onChange={(v) => setPhone(v)}
                    value={phone}
                    placeholder="Enter a phone number..."
                    defaultCountry="BD"
                    international
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label className="font-semibold" htmlFor="message">
                    Message
                  </Label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    id="message"
                    placeholder="Type your message here..."
                  />
                </div>
                <ReCAPTCHA
                  onChange={setCaptcha}
                  className="mx-auto"
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  // onClick={onHandleSubmit}
                  className="w-full"
                >
                  {isLoading && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading ? "Sending..." : "Send"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
