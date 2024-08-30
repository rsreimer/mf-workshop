import { Injectable } from "@angular/core";

export type SubscribeOptions = { replay?: boolean };
export type Message = { key: string; data: unknown };
export type MessageQueueListener = (key: string, data: unknown) => void;

export interface MessageQueue {
  send(key: string, data: unknown): void;
  subscribe(listener: MessageQueueListener, options?: SubscribeOptions): void;
  unsubscribe(listener: MessageQueueListener): void;
}

@Injectable({ providedIn: "root" })
export class MessageQueueService implements MessageQueue {
  #queue: Message[] = [];
  #listeners: MessageQueueListener[] = [];

  send(key: string, data: unknown) {
    const message = { key, data };

    this.#queue.push(message);
    this.#listeners.forEach((listener) => listener(key, data));
  }

  subscribe(listener: MessageQueueListener, { replay }: SubscribeOptions = {}) {
    if (replay) {
      this.#queue.forEach(({ key, data }) => listener(key, data));
    }

    this.#listeners.push(listener);
  }

  unsubscribe(listener: MessageQueueListener) {
    this.#listeners = this.#listeners.filter((l) => l !== listener);
  }
}
