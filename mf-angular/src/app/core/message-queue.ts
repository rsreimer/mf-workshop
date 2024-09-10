import { InjectionToken } from "@angular/core";

declare global {
  interface Window {
    __MF_MESSAGE_QUEUE__?: MessageQueue;
  }
}

export type MessageQueueListener = (key: string, data: unknown) => void;

export interface MessageQueue {
  send(key: string, data: unknown): void;
  subscribe(
    listener: MessageQueueListener,
    options?: { replay?: boolean },
  ): void;
  unsubscribe(listener: MessageQueueListener): void;
}

export const MESSAGE_QUEUE = new InjectionToken<MessageQueue>("MESSAGE_QUEUE", {
  factory: () =>
    window.__MF_MESSAGE_QUEUE__ ?? {
      send: () => {},
      subscribe: () => {},
      unsubscribe: () => {},
    },
});