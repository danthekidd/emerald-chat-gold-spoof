// ==UserScript==
// @name         Emerald Chat Gold Spoof
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Spoofs gold status on Emerald Chat by setting App.user.gold to true
// @author       You
// @match        https://emeraldchat.com/app
// @grant        none
// @icon         https://emeraldchat.com/favicon.ico
// ==/UserScript==

(function() {
    'use strict';
    const interval = setInterval(() => {
        if (typeof App !== 'undefined' && App.user) {
            App.user.gold = true;
            clearInterval(interval);
        }
    }, 100);
})();
