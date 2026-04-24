// ==UserScript==
// @name         Tawk.to reply template - nazmul.fau
// @namespace    http://tampermonkey.net/
// @version      2026-04-24
// @description  Predefined quick replies for tawk.to dashboard.
// @author       Nazmul Islam
// @match        https://dashboard.tawk.to/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const list = [
  // 🔹 Greeting
  { name: "hi_en", value: "Hello there, welcome to our chat support! How can I help you today?", color: "#4f8ef7" },
  { name: "hi_bn", value: "হ্যালো, আমাদের চ্যাট সাপোর্টে আপনাকে স্বাগতম। আপনাকে কিভাবে সাহায্য করতে পারি?", color: "#e0634a" },

  // 🔹 Asking info
  { name: "ask_details_en", value: "Could you please provide more details about the issue?", color: "#f59e0b" },
  { name: "ask_details_bn", value: "দয়া করে সমস্যাটি সম্পর্কে আরও বিস্তারিত জানাবেন।", color: "#f59e0b" },

  { name: "ask_screenshot_en", value: "Can you please share a screenshot of the issue? That will help me understand better.", color: "#f97316" },
  { name: "ask_screenshot_bn", value: "সমস্যাটির একটি স্ক্রিনশট শেয়ার করবেন? এতে বুঝতে সুবিধা হবে।", color: "#f97316" },


  { name: "hold_en", value: "Please give me a moment while I check this for you.", color: "#16a34a" },
  { name: "hold_bn", value: "অনুগ্রহ করে একটু সময় দিন, আমি বিষয়টি যাচাই করছি।", color: "#16a34a" },


  { name: "wait_en", value: "Thanks for your patience. I'm looking into this right now.", color: "#22c55e" },
  { name: "wait_bn", value: "আপনার ধৈর্যের জন্য ধন্যবাদ। আমি বিষয়টি এখনও দেখছি।", color: "#22c55e" },


  { name: "clear_cache_en", value: "Please try clearing your browser cache or use an incognito window and check again.", color: "#0ea5e9" },
  { name: "clear_cache_bn", value: "অনুগ্রহ করে ব্রাউজারের ক্যাশ ক্লিয়ার করে অথবা ইনকগনিটো মোডে আবার চেষ্টা করুন।", color: "#0ea5e9" },


  // 🔹 Resolution
  { name: "fixed_en", value: "The issue has been resolved. Please check and confirm from your side.", color: "#10b981" },
  { name: "fixed_bn", value: "সমস্যাটি সমাধান করা হয়েছে। অনুগ্রহ করে চেক করে জানান।", color: "#10b981" },

  { name: "escalate_en", value: "I’m escalating this issue to our technical team. We’ll update you shortly.", color: "#ef4444" },
  { name: "escalate_bn", value: "আমি বিষয়টি আমাদের টেকনিক্যাল টিমে পাঠাচ্ছি। শীঘ্রই আপডেট জানানো হবে।", color: "#ef4444" },



  // 🔹 Closing
  { name: "closing_en", value: "Is there anything else I can help you with today?", color: "#84cc16" },
  { name: "closing_bn", value: "আজকে আর কোনো বিষয়ে কি আমি আপনাকে সাহায্য করতে পারি?", color: "#84cc16" },

  { name: "bye_en", value: "Thank you for contacting us. Have a great day!", color: "#65a30d" },
  { name: "bye_bn", value: "আমাদের সাথে যোগাযোগ করার জন্য ধন্যবাদ। আপনার দিনটি শুভ হোক!", color: "#65a30d" }
];

    // ✅ Correct selector for visible contenteditable input
    const INPUT_SELECTOR = `div.tawk-message-input[contenteditable="true"]:not([style*="display: none"])`;

    function injectPanel() {
        if (document.getElementById("tmpl-panel-tawk")) return;

        const design = `
        <div id="tmpl-panel-tawk" style="
            position: fixed;
            bottom: 90px;
            right: 20px;
            background: #1e1f26;
            border: 1px solid #2e3040;
            border-radius: 12px;
            padding: 10px;
            z-index: 9999;
            box-shadow: 0 8px 32px rgba(0,0,0,0.35);
            min-width: 160px;
            font-family: 'Segoe UI', sans-serif;
        ">
            <div style="
                font-size: 10px;
                font-weight: 600;
                letter-spacing: 0.1em;
                text-transform: uppercase;
                color: #6b7280;
                margin-bottom: 8px;
            ">Quick Replies</div>

            <div style="display: flex; flex-direction: column; gap: 6px;">
                ${list.map(it => `
                    <button
                        data-name="${it.name}"
                        style="
                            background: ${it.color}18;
                            color: ${it.color};
                            border: 1px solid ${it.color}44;
                            border-radius: 8px;
                            padding: 7px 12px;
                            font-size: 12px;
                            font-weight: 600;
                            cursor: pointer;
                            text-align: left;
                        "
                    >${it.name}</button>
                `).join("")}
            </div>
        </div>`;

        document.body.insertAdjacentHTML("beforeend", design);

        document.getElementById("tmpl-panel-tawk").addEventListener('click', (e) => {
            const btn = e.target.closest("button[data-name]");
            if (!btn) return;

            const item = list.find(it => it.name === btn.dataset.name);
            if (item) fillInput(item.value);
        });
    }

    function fillInput(text) {
        const el = document.querySelector(INPUT_SELECTOR);
        if (!el) {
            console.warn("Tawk input not found");
            return;
        }

        el.focus();

        // Clear existing text like a real user
        document.execCommand('selectAll', false, null);
        document.execCommand('delete', false, null);

        // Insert text (THIS is the key fix)
        const success = document.execCommand('insertText', false, text);

        // Fallback (rare)
        if (!success || !el.textContent) {
            el.textContent = text;
            el.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }

    // Observe SPA changes (Tawk loads dynamically)
    const observer = new MutationObserver(() => {
        if (document.querySelector(INPUT_SELECTOR)) {
            injectPanel();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Try immediately
    injectPanel();

})();