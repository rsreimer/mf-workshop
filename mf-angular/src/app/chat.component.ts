import { Component, inject, signal } from "@angular/core";
import { FormGroup, FormControl, ReactiveFormsModule } from "@angular/forms";
import { MESSAGE_QUEUE } from "./core/message-queue";

@Component({
  selector: "app-chat",
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    @for (message of messages(); track $index) {
      <pre>{{ message }}</pre>
    }
    <form [formGroup]="form" (ngSubmit)="sendMessage()">
      <input formControlName="message" />
    </form>
  `,
})
export class ChatComponent {
  #mq = inject(MESSAGE_QUEUE);

  form = new FormGroup({ message: new FormControl("") });
  messages = signal<string[]>([]);

  ngOnInit() {
    this.#mq.subscribe(this.listener, { replay: true });
  }

  ngOnDestroy() {
    this.#mq.unsubscribe(this.listener);
  }

  listener = (key: string, data: unknown) => {
    if (key === "chat") {
      this.messages.update((messages) => {
        return [...messages, data as string];
      });
    }
  };

  sendMessage() {
    const message = this.form.value.message;
    if (!message) return;

    this.#mq.send("chat", message);
    this.form.controls.message.setValue("");
  }
}
