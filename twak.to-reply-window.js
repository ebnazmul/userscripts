// ==UserScript==
// @name         Tawk.to reply template - nazmul.fau
// @namespace    http://tampermonkey.net/
// @version      2026-04-26
// @description  Predefined quick replies for tawk.to dashboard.
// @author       Nazmul Islam
// @match        https://dashboard.tawk.to/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const INPUT_SELECTOR = `div.tawk-message-input[contenteditable="true"]:not([style*="display: none"])`;

    let list = [];

    function loadTemplatesScript() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = "https://raw.githubusercontent.com/nazmulfau/tawk-quick-replies/main/template.js";

            script.onload = () => {
                if (window.TAWK_TEMPLATES) {
                    resolve(window.TAWK_TEMPLATES);
                } else {
                    reject("Template loaded but not found");
                }
            };

            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    function injectPanel() {
        if (document.getElementById("tmpl-panel-tawk")) return;
        if (!list.length) return;

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
            min-width: 180px;
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
                    <button data-name="${it.name}" style="
                        background: ${it.color}18;
                        color: ${it.color};
                        border: 1px solid ${it.color}44;
                        border-radius: 8px;
                        padding: 7px 12px;
                        font-size: 12px;
                        font-weight: 600;
                        cursor: pointer;
                        text-align: left;
                    ">${it.name}</button>
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
        if (!el) return console.warn("Tawk input not found");

        el.focus();

        document.execCommand('selectAll', false, null);
        document.execCommand('delete', false, null);

        const success = document.execCommand('insertText', false, text);

        if (!success || !el.textContent) {
            el.textContent = text;
            el.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }

    async function init() {
        try {
            list = await loadTemplatesScript();
        } catch (err) {
            console.error("Template load failed", err);
            list = [];
        }

        const observer = new MutationObserver(() => {
            if (document.querySelector(INPUT_SELECTOR)) {
                injectPanel();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        injectPanel();
    }

    init();

})();