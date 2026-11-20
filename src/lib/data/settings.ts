export const SETTINGS_TABS = ["General", "Call routing", "Recordings", "Notifications"] as const;
export type SettingsTab = (typeof SETTINGS_TABS)[number];

export type SettingsToggle = { key: string; label: string; hint: string };

export const SETTINGS_TOGGLES: Record<SettingsTab, SettingsToggle[]> = {
  General: [
    { key: "autoAway", label: "Auto-away", hint: "Set agents to Away after 10 minutes without activity" },
    { key: "twoFactor", label: "Two-factor sign-in", hint: "Require a code for every user at sign-in" },
    { key: "darkMode", label: "Dark mode", hint: "Use a dark theme by default" },
  ],
  "Call routing": [
    { key: "callbacks", label: "Offer callbacks", hint: "Let callers request a callback instead of waiting" },
    { key: "vipPriority", label: "VIP priority", hint: "Move VIP customers to the front of the queue" },
    { key: "autoWrap", label: "Automatic wrap-up", hint: "End wrap-up automatically when the timer runs out" },
  ],
  Recordings: [
    { key: "recordAll", label: "Record all calls", hint: "Inbound and outbound calls are recorded" },
    { key: "pauseOnPayment", label: "Pause on payment", hint: "Stop recording while card details are taken" },
    { key: "transcripts", label: "Transcripts", hint: "Create a text transcript for each recording" },
  ],
  Notifications: [
    { key: "emailAlerts", label: "Email alerts", hint: "Send alerts to supervisors by email" },
    { key: "slaAlerts", label: "Service level alerts", hint: "Notify when a queue drops below target" },
    { key: "dailySummary", label: "Daily summary", hint: "Send a summary of the day at closing time" },
  ],
};

export const SETTINGS_DEFAULTS: Record<string, boolean> = {
  darkMode: false, autoAway: true, twoFactor: true,
  callbacks: true, vipPriority: false, autoWrap: true,
  recordAll: true, pauseOnPayment: true, transcripts: false,
  emailAlerts: true, slaAlerts: true, dailySummary: false,
};
