// ==UserScript==
// @name         Putlocker.Style Expunger
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Removes obnoxious pop-up and otherwise advertisement HTML elements.
// @author       goldmund - exbotanical at gmail
// @match        *://ww1.putlocker.style/*
// @grant        none
// ==/UserScript==

function expunge() {
    'use strict';


    setTimeout(function(){
        var purpleBox = document.getElementById("rfFFeqqqOvcbZbfBcoAIgB");
        var noAdsWatermark = document.getElementsByClassName("jw-logo jw-logo-top-left jw-reset");
        var bottomAds = document.getElementsByClassName("QwdIlPdnTKdoCQyDLdWDtu");
        var fakeTexts = document.getElementsByClassName("glx-slider-container-19026");
        var topBannerAd = document.getElementsByClassName("sXMfeASJxpzWpKlhROMvce");
        var topAds = document.getElementsByClassName("GPuSNkaUEtSqyWRqGoGflW");
        var bottomInfo = document.getElementsByClassName("RFphkQCZVnXeCHDZyAudoN mFxFYdnlWjWzturBDsJCHJ");

        function removeElementsByClass(elements){
            while(elements.length > 0){
                elements[0].parentNode.removeChild(elements[0]);
            }
        }

        removeElementsByClass(topBannerAd)
        removeElementsByClass(topAds)
        removeElementsByClass(noAdsWatermark)
        removeElementsByClass(bottomAds)
        removeElementsByClass(bottomInfo)
        removeElementsByClass(fakeTexts)
        purpleBox.remove();

        /*topBannerAd.remove();
        topAds.remove();
        noAdsWatermark.remove();
        bottomAds.remove();
        fakeTexts.remove();
        bottomInfo.remove();*/
    }, 10000);
}

window.onload=expunge()