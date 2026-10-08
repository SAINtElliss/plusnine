import { useEffect } from 'react';

export const EVENTBRITE_EVENT_ID = '2002603444812';
export const EVENTBRITE_SCRIPT_URL = 'https://www.eventbrite.ca/static/widgets/eb_widgets.js';

declare global {
  interface Window {
    EBWidgets?: {
      createWidget: (options: {
        widgetType: 'checkout' | string;
        eventId: string;
        modal: boolean;
        modalTriggerElementId?: string;
        onOrderComplete?: () => void;
      }) => void;
    };
  }
}

let scriptLoadingPromise: Promise<void> | null = null;

/**
 * Ensures the official Eventbrite eb_widgets.js script is loaded and ready.
 */
export function loadEventbriteScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.EBWidgets) return Promise.resolve();

  if (!scriptLoadingPromise) {
    scriptLoadingPromise = new Promise<void>((resolve, reject) => {
      // Check if script tag already exists in document
      const existing = document.querySelector<HTMLScriptElement>(
        `script[src="${EVENTBRITE_SCRIPT_URL}"]`
      );

      if (existing) {
        if (window.EBWidgets) {
          resolve();
          return;
        }
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', (e) => reject(e));
        return;
      }

      const script = document.createElement('script');
      script.src = EVENTBRITE_SCRIPT_URL;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = (e) => reject(e);
      document.head.appendChild(script);
    });
  }

  return scriptLoadingPromise;
}

// Track elements initialized with EBWidgets to ensure single initialization per trigger ID
const initializedTriggerIds = new Set<string>();

export function isEventbriteInitialized(elementId: string): boolean {
  return initializedTriggerIds.has(elementId);
}

/**
 * Connects an existing button to the official Eventbrite modal checkout widget.
 * Ensures the element exists in DOM and that createWidget is invoked strictly once per trigger.
 */
export async function initEventbriteModalTrigger(
  elementId: string,
  onOrderComplete?: () => void
): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  if (initializedTriggerIds.has(elementId)) {
    return true;
  }

  try {
    await loadEventbriteScript();

    if (!window.EBWidgets) {
      console.warn('[Eventbrite] EBWidgets is not available on window.');
      return false;
    }

    if (initializedTriggerIds.has(elementId)) {
      return true;
    }

    // Wait until element is in the DOM (up to ~500ms)
    let el = document.getElementById(elementId);
    let attempts = 0;
    while (!el && attempts < 10) {
      await new Promise((r) => setTimeout(r, 50));
      el = document.getElementById(elementId);
      attempts++;
    }

    if (!el) {
      console.warn(`[Eventbrite] Trigger element '#${elementId}' not found in DOM.`);
      return false;
    }

    if (initializedTriggerIds.has(elementId)) {
      return true;
    }

    window.EBWidgets.createWidget({
      widgetType: 'checkout',
      eventId: EVENTBRITE_EVENT_ID,
      modal: true,
      modalTriggerElementId: elementId,
      onOrderComplete: () => {
        console.log('[Eventbrite] Order complete for event:', EVENTBRITE_EVENT_ID);
        if (onOrderComplete) onOrderComplete();
      }
    });

    initializedTriggerIds.add(elementId);
    return true;
  } catch (err) {
    console.error('[Eventbrite] Failed to initialize widget for trigger:', elementId, err);
    return false;
  }
}

/**
 * React hook to connect a button element to Eventbrite modal checkout once mounted.
 */
export function useEventbriteModal(elementId: string, onOrderComplete?: () => void) {
  useEffect(() => {
    let isMounted = true;

    const runInit = async () => {
      // Brief tick to ensure the DOM node is rendered
      await new Promise((r) => setTimeout(r, 60));
      if (!isMounted) return;
      await initEventbriteModalTrigger(elementId, onOrderComplete);
    };

    runInit();

    return () => {
      isMounted = false;
    };
  }, [elementId, onOrderComplete]);
}
