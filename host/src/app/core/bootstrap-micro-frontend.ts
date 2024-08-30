export interface MicroFrontend {
  name: string;
  url: string;
}

declare global {
  const __webpack_init_sharing__: (parameter: string) => Promise<void>;
  const __webpack_share_scopes__: { default: any };
}

export async function bootstrapMicroFrontend({ name, url }: MicroFrontend) {
  const path = `${url}/remoteEntry.js`;

  await __webpack_init_sharing__("default");

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");

    script.src = path;
    script.onerror = (e) => reject(e);
    script.onload = () => resolve();

    document.head.appendChild(script);
  });

  const container = (window as any)[name];

  await container.init(__webpack_share_scopes__.default);

  const factory = await container.get("./bootstrap");

  await factory();
}
