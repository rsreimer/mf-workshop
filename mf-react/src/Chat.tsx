import { useState, useEffect, FormEvent } from "react";
import { MessageQueueListener, MESSAGE_QUEUE } from "./core/message-queue";

export function Chat(props: { color: string }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const listener: MessageQueueListener = (key, data) => {
      if (key === "chat") {
        setMessages((messages) => [...messages, data as string]);
      }
    };

    MESSAGE_QUEUE.subscribe(listener, { replay: true });

    return () => MESSAGE_QUEUE.unsubscribe(listener);
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (message) {
      MESSAGE_QUEUE.send("chat", message);
      setMessage("");
    }
  };

  return (
    <>
      <div style={{ backgroundColor: props.color }}>
        {messages.map((m) => (
          <pre>{m}</pre>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
      </form>
    </>
  );
}
