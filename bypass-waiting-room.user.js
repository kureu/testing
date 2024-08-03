// ==UserScript==
// @name         Bypass Waiting Room Popup and Enable Interactions
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  Hide waiting room popup, enable interactions with the page
// @match        https://beta.dopple.ai/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to hide or remove the waiting room popup
    function handlePopup() {
        const popupElements = document.querySelectorAll('.DialogOverlay, .DialogContent');
        popupElements.forEach(el => {
            el.style.display = 'none'; // Hide the element
            el.style.pointerEvents = 'none'; // Disable pointer events on the element
        });
    }

    // Function to enable interactions by overriding pointer-events only on critical areas
    function enableInteractions() {
        // Check and enable pointer events for the body or specific areas if necessary
        const body = document.body;
        if (body) {
            body.style.pointerEvents = 'auto';
        }
    }

    // Function to click the "Skip Waiting Room" button
    function clickSkipButton() {
        const skipButton = document.querySelector('button:contains("Skip Waiting Room")');
        if (skipButton) {
            skipButton.click();
        }
    }

    // Run the functions after the page is loaded
    window.addEventListener('load', () => {
        handlePopup();
        enableInteractions();
        clickSkipButton();
    });

    // Optionally, use MutationObserver to watch for changes and apply the functions
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                handlePopup();
                enableInteractions();
                clickSkipButton();
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
