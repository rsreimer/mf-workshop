import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";
import {
  MessageQueue,
  MessageQueueService,
} from "./app/core/message-queue.service";
import {
  ApiRegister,
  ApiRegisterService,
} from "./app/core/api-register.service";
import { NgZone } from "@angular/core";

declare global {
  interface Window {
    __MF_SHARED_ZONE__: NgZone;
    __MF_MESSAGE_QUEUE__: MessageQueue;
    __MF_API_REGISTER__: ApiRegister;
  }
}

(async () => {
  const appRef = await bootstrapApplication(AppComponent, appConfig);

  window.__MF_SHARED_ZONE__ = appRef.injector.get(NgZone);
  window.__MF_MESSAGE_QUEUE__ = appRef.injector.get(MessageQueueService);
  window.__MF_API_REGISTER__ = appRef.injector.get(ApiRegisterService);
})();
