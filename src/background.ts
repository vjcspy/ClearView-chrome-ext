/**
 * ┌────────────────────────────────────────────────────────────┐
 * │                    Background Service Worker               │
 * └────────────────────────────────────────────────────────────┘
 *
 * This script runs as a background service worker for the extension.
 * It acts as the central controller for communication and extension logic.
 *
 * ✦ Responsibilities:
 *   - Handle incoming messages from popup and content scripts.
 *   - Manage long-running or asynchronous tasks (e.g., fetch, storage, alarms).
 *   - Relay messages between popup and content scripts.
 *   - Execute scripts into tabs using chrome.scripting API.
 *
 * ✦ Capabilities:
 *   - Full access to privileged Chrome APIs (e.g., tabs, storage, alarms).
 *   - Can run in the background without UI.
 *   - Can register event listeners for runtime events (onInstalled, onMessage, etc.).
 *
 * ✦ Message Flow:
 *   - Popup       → Background : chrome.runtime.sendMessage
 *   - Content     → Background : chrome.runtime.sendMessage
 *   - Background  → Content    : chrome.tabs.sendMessage (with tabId)
 *
 * ✦ Limitations:
 *   - Service workers are event-driven and non-persistent.
 *     The worker is shut down when idle and restarted when needed.
 *   - No direct DOM access (not tied to any web page).
 *
 * ⚠️ Notes:
 *   - Avoid keeping long-running state in memory. Use chrome.storage if persistence is needed.
 *   - Always return `true` from message listeners if using asynchronous `sendResponse`.
 */

function polling() {
    // console.log("polling");
    setTimeout(polling, 1000 * 30);
}

polling();
