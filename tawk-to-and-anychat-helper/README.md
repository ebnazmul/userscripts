# 💬 Userscripts: Quick Reply Templates

A small collection of Tampermonkey userscripts that inject quick reply buttons into chat dashboards.

Each script adds a clean floating panel with predefined response templates, styled with a modern look and a readable font.

## 🚀 Included Scripts

### `anychat-reply-window.js`
- Adds a quick reply panel for `https://app.anychat.one/*`
- Injects a compact, floating panel with buttons for common chat responses
- Supports English and Bengali templates
- Uses a clean UI style with `Segoe UI` font, subtle shadows, and color-coded buttons

### `twak.to-reply-window.js`
- Adds quick reply support for `https://dashboard.tawk.to/*`
- Detects the Tawk.to contenteditable chat input and inserts text reliably
- Includes the same English/Bengali quick reply set
- Uses a fixed floating menu with modern button styling

## 🔧 Installation

1. Install Tampermonkey or a compatible userscript manager in your browser.
2. Open the script file in your editor or browser.
3. Copy the full contents of the desired `.js` file into a new userscript in Tampermonkey.
4. Save and enable the script.
5. Open the matched website and use the quick reply panel.

## 💡 Usage

- Open the supported chat dashboard.
- Look for the floating `Quick Replies` panel.
- Click a button to fill the chat input with a predefined response.

## ✨ Customization

- Edit the `list` array in either script to add or change replies.
- Each entry includes:
  - `name`: button identifier
  - `value`: text inserted into the chat input
  - `color`: panel and button theme accent
- For Anychat, modify the textarea selector if your site layout changes.
- For Tawk.to, the script already observes dynamic content loading.

## 📌 Notes

- Both scripts are lightweight and use no special browser permissions.
- The UI uses a clean font and subtle styling for readability.
- The reply list is currently shared across both scripts for consistent messaging.
