import React, {useCallback, useEffect, useState} from "react";
import {createRoot} from "react-dom/client";

/**
 * ┌────────────────────────────────────────────────────────────┐
 * │                         Popup Script                        │
 * └────────────────────────────────────────────────────────────┘
 *
 * This script runs inside the popup window shown when the user clicks
 * the extension icon in the Chrome toolbar.
 *
 * ✦ Responsibilities:
 *   - Render the popup UI (HTML/CSS/JS).
 *   - Interact with users through buttons, forms, etc.
 *   - Send commands or requests to the background script.
 *   - Communicate with the current active tab via content scripts.
 *
 * ✦ Capabilities:
 *   - Can use Chrome extension APIs like chrome.runtime, chrome.tabs, chrome.storage.
 *   - Can access and control tabs via chrome.tabs API (with permission).
 *
 * ✦ Message Flow:
 *   - Popup → Background Script : chrome.runtime.sendMessage
 *   - Popup → Content Script   : chrome.tabs.sendMessage (must query active tab first)
 *
 * ✦ Limitations:
 *   - Cannot directly receive messages from content scripts.
 *   - Cannot directly modify webpage DOM (must delegate to content script).
 *
 * ⚠️ Notes:
 *   - The popup is short-lived; it is destroyed when closed or focus is lost.
 *   - Avoid storing state in popup memory; use chrome.storage if persistence is needed.
 */

const Popup = () => {
    const [currentURL, setCurrentURL] = useState<string>();

    useEffect(() => {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            setCurrentURL(tabs[0].url);
        });
    }, []);

    const cleanView = useCallback(() => {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            const tab = tabs[0];
            if (tab.id) {
                chrome.tabs.sendMessage(
                    tab.id,
                    {
                        action: "applyCustomUI", payload: {
                            currentURL
                        }
                    },
                    (msg) => {
                        console.log("result message:", msg);
                    }
                );
            }
        });
    }, [currentURL]);

    return (
        <>
            <ul>
                <li>Current URL: {currentURL}</li>
            </ul>
            <button onClick={cleanView}>Clean</button>
        </>
    );
};

const root = createRoot(document.getElementById("root")!);

root.render(
    <React.StrictMode>
        <Popup/>
    </React.StrictMode>
);
