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
import {geminiCleaner} from "./cleaner/gemini.cleaner";
import {setBodyColor} from "./cleaner/utils";

// At the top of the file, add this variable to track the interval
let geminiCleanerInterval: number | null = null;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("Message", message, sender, sendResponse);
  try{
    if (message.action === "applyCustomUI") {
      console.log("Received UI customization trigger from popup.");

      const currentURL = message.payload.currentURL;

      if(currentURL.includes("chatgpt.com")) {
        console.log("chatgpt.com");
        chatgptCleaner();
      }else if(currentURL.includes("notegpt.io")) {
        console.log("notegpt.io");
        notegptCleaner();
      } else if(currentURL.includes("gemini.google.com")) {
        console.log("gemini.google.com");
        setBodyColor("#0C1018");
        geminiCleaner();
        if (!geminiCleanerInterval) {
            geminiCleanerInterval = setInterval(geminiCleaner, 1000 * 3);
        }
    }

      sendResponse({ status: "done" });
    }
  }catch(e){
    console.error(`Error in content script: ${e}`);
  }

});