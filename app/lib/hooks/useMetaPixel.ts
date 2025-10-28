import { useCallback } from "react";

declare global {
  interface Window {
    fbq?: (event: string, name: string, data?: Record<string, unknown>) => void;
  }
}

export function useMetaPixel() {
  const trackEvent = useCallback(
    (eventName: string, data?: Record<string, unknown>) => {
      if (window.fbq) {
        window.fbq("track", eventName, data);
      }
    },
    [],
  );

  const trackLead = useCallback(
    (data?: Record<string, unknown>) => {
      trackEvent("Lead", data);
    },
    [trackEvent],
  );

  const trackInitiateCheckout = useCallback(
    (data?: Record<string, unknown>) => {
      trackEvent("InitiateCheckout", data);
    },
    [trackEvent],
  );

  const trackCompleteRegistration = useCallback(
    (data?: Record<string, unknown>) => {
      trackEvent("CompleteRegistration", data);
    },
    [trackEvent],
  );

  return {
    trackEvent,
    trackLead,
    trackInitiateCheckout,
    trackCompleteRegistration,
  };
}
