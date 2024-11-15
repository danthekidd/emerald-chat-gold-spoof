// ==UserScript==
// @name         Emerald Chat Platinum Spoof
// @namespace    http://tampermonkey.net/
// @version      1.1.0
// @description  Spoofs platinum on Emerald Chat
// @author       danthekidd
// @match        https://emeraldchat.com/app*
// @match        https://beta.emeraldchat.com/app*
// @grant        none
// @icon         https://emeraldchat.com/favicon.ico
// ==/UserScript==

(function() {
    'use strict';

    const interval = setInterval(() => {
        if (typeof App !== 'undefined' && App.user) {
            App.user.platinum = true;
            App.user.has_premium_badge = true;
        }
    }, 1000);

    // METHOD BELOW IS FOR BETA

    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
        this._url = url;
        return originalOpen.apply(this, [method, url, ...rest]);
    };

    XMLHttpRequest.prototype.send = function(...args) {
        this.addEventListener('readystatechange', function() {
            if (this.readyState === 4 && this.status === 200 &&
                (this._url.endsWith("current_user") || this._url.endsWith("current_user_json"))) {
                try {
                    let responseData = JSON.parse(this.responseText);
                    responseData.platinum = true;
                    responseData.has_premium_badge = true;

                    console.log('%cPLATINUM SUCCESSFULLY SPOOFED', 'font-size: 40px; font-weight: bold; color: blue;');

                    Object.defineProperty(this, 'responseText', {
                        get: () => JSON.stringify(responseData)
                    });
                } catch (e) {
                    console.error("Error spoofing platinum:", e);
                }
            }
        });

        return originalSend.apply(this, args);
    };
})();