import("./bootstrap").then(async (module) => {
  const appRef = await module.appRefPromise;
  const { AppComponent } = await import("./app/app.component");

  appRef.bootstrap(AppComponent);
});
