/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/docs/en/main/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { ColorModeProvider } from "./contexts/color-mode-context";

startTransition(() => {
  hydrateRoot(
    document,
    // <StrictMode>
    <ColorModeProvider>
      <RemixBrowser />
    </ColorModeProvider>
    // </StrictMode>
  );
});
