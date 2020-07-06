// ==UserScript==
// @name         Putlocker.Style Expunger
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Removes obnoxious pop-up and otherwise advertisement HTML elements. Use with adblocker.
// @author       goldmund - github.com/MatthewZito
// @match        *://ww1.putlocker.style/*
// @grant        none
// ==/UserScript==

function expunge() {

    setTimeout(() => {
        const purpleBox = document.getElementById("rfFFeqqqOvcbZbfBcoAIgB");

        const listOfClassElements = [
            "jw-logo jw-logo-top-left jw-reset", "QwdIlPdnTKdoCQyDLdWDtu", "glx-slider-container-19026", "sXMfeASJxpzWpKlhROMvce",
            "GPuSNkaUEtSqyWRqGoGflW", "RFphkQCZVnXeCHDZyAudoN mFxFYdnlWjWzturBDsJCHJ", "_3Bol3ODqe6DQJAPToqCQkW", "sadhjasdjkASDd",
            "fxENybRWtDjvFjLZqIBCjA OuKBMPrpMoTwbCcBfVoGgY"
            ];


        const removeElementsByClass = (el) => {
            while(el.length > 0){
                el[0].parentNode.removeChild(el[0]);
            }
        }

        listOfClassElements.forEach(element => removeElementsByClass(document.getElementsByClassName(element)));

        purpleBox.remove();
        window.config_player.config.advertising = {};

    }, 10000);
}

window.onload=expunge()