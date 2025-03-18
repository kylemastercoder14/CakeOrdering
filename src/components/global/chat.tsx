"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from 'sonner';

const Chat = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message) return;

    setLoading(true);

    const options = {
      method: "POST",
      url: "https://ai-text-to-image-generator-api.p.rapidapi.com/realistic",
      headers: {
        "x-rapidapi-key": "557b91e9fcmshdc8451bcbfd8106p18f760jsn1fb6a1656ead",
        "x-rapidapi-host": "ai-text-to-image-generator-api.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        inputs: message,
      },
    };

    try {
      const res = await axios.request(options);
      setResponse(res?.data.url);
      toast.success("Message sent successfully.");
    } catch (error: unknown) {
      if(axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message)
      }else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg max-w-md">
      <h2 className="text-lg font-bold mb-2">Chat with GPT-4o</h2>
      <textarea
        className="w-full border p-2 rounded"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button
        onClick={sendMessage}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        disabled={loading}
      >
        {loading ? "Loading..." : "Send"}
      </button>
      {response && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={response} alt='Image' className='max-w-full h-[500px] rounded-lg'></img>
      )}
    </div>
  );
};

export default Chat;
