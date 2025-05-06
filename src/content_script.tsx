/**
 * ┌────────────────────────────────────────────────────────────┐
 * │                      Content Script                        │
 * └────────────────────────────────────────────────────────────┘
 *
 * This script runs in the context of web pages.
 *
 * ✦ Responsibilities:
 *   - Access and manipulate the DOM of the current webpage.
 *   - Listen for messages from the background script or popup.
 *   - Send messages to the background script.
 *   - Use limited Chrome APIs (e.g., chrome.runtime, chrome.storage).
 *
 * ✦ Limitations:
 *   - Cannot use privileged Chrome APIs like chrome.tabs or chrome.windows.
 *   - Cannot communicate directly with the popup script (must go through background).
 *
 * ✦ Message Flow:
 *   - Background → Content Script: chrome.runtime.onMessage.addListener
 *   - Content Script → Background: chrome.runtime.sendMessage
 *   - Popup → Content Script: chrome.tabs.sendMessage (via background or popup with tab ID)
 *
 * 🚫 Invalid / Unsupported:
 *   - Content Script → Popup (no direct channel exists)
 */
import {chatgptCleaner} from "./cleaner/chatgpt.cleaner";
import {notegptCleaner} from "./cleaner/notegpt.cleaner";

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("Message", message, sender, sendResponse);
  try{
    if (message.action === "applyCustomUI") {
      console.log("Received UI customization trigger from popup.");

      const currentURL = message.payload.currentURL;

      if(currentURL.includes("chatgpt.com")) {
        chatgptCleaner();
      }else if(currentURL.includes("notegpt.io")) {
        notegptCleaner();
      }

      sendResponse({ status: "done" });
    }
  }catch(e){
    console.error(`Error in content script: ${e}`);
  }

});
