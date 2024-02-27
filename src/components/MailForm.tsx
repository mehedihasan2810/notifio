import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { SyntheticEvent, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

const MailForm = () => {
  const [sender, setSender] = useState("onboarding@resend.dev");
  const [receiver, setReceiver] = useState("mdmehedihasan2810@gmail.com");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onHandleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(sender, receiver, subject, message);

    try {
      setStatus("");
      setIsLoading(true);
      const res = await fetch("/api/mail", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: sender,
          receiver: receiver,
          subject: subject,
          message: message,
        }),
      });
      const data = await res.json();
      console.log(data);

      setStatus(`Mail has been sent successfully`);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setStatus("Something went wrong! Try again");
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-center">Send mail</CardTitle>
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
              <Label className="font-semibold" htmlFor="sender-email">
                Sender
              </Label>
              <Input
                required
                value={sender}
                readOnly
                // onChange={(e) => setSender(e.target.value)}
                type="email"
                id="sender-email"
                placeholder="Enter Sender email..."
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="font-semibold" htmlFor="receiver-email">
                Receiver
              </Label>
              <Input
                required
                value={receiver}
                readOnly
                // onChange={(e) => setReceiver(e.target.value)}
                type="email"
                id="receiver-email"
                placeholder="Enter receiver email..."
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="font-semibold" htmlFor="subject">
                Subject
              </Label>
              <Textarea
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                id="subject"
                placeholder="Write subject here..."
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="font-semibold" htmlFor="message">
                Message
              </Label>
              <Textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                id="message"
                placeholder="Write message here..."
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MailForm;
