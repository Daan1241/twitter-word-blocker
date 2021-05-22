// ==UserScript==
// @name         NFT yeeter 4000
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

//    var scriptObject=document.createElement('script');
//    scriptObject.src='https://api.daanklein.nl/NFT_YEETER_SCRIPT.js';
//    document.body.appendChild(scriptObject);
    console.log("NFT Yeeter 4000 initialized and ready to block tweets.");

    // ________                         ____________ _____ ________
// ___  __ \______ _______ ________ __<  /__|__ \__  // /__<  /
// __  / / /_  __ `/_  __ `/__  __ \__  / ____/ /_  // /___  /
// _  /_/ / / /_/ / / /_/ / _  / / /_  /  _  __/ /__  __/_  /
// /_____/  \__,_/  \__,_/  /_/ /_/ /_/   /____/   /_/   /_/
//
// This TamperMonkey script automatically blurs tweets that contain any of the blocked words you define in the 'blocked_words' array.
// Feel free to personalize my code, but do not redistribute without my permission. Instead, link back to my page where you downloaded this script.
// My GitHub: https://www.github.com/Daan1241

// Write down all words you want to block; don't worry about caps-sensitivity.
var blocked_words = [
    "nft",
    "cryptoart",
    "btc",
    "bitcoin",
    "ethereum"
];


'use strict';
var universal_classname = "css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0";
var userdata, username, visibletweets;
var blockedusers = [];
let articlecount_last = 0;


// Checks every (interval) miliseconds if there are new tweets visible in the timeline, which will happen when scrolling.
// Could also be done with an onScroll event, but I prefer it this way.
setInterval(function () {
    let articlecount_now = document.getElementsByTagName("Article").length;

    if (articlecount_last != articlecount_now) {// did not scroll, do nothing
        console.log("New tweets detected. Now in view: " + articlecount_now);
        articlecount_last = articlecount_now;
        checkNFT();
    }

}, 100);


// Main function that gets called when new tweets are visible
function checkNFT() {
    visibletweets = document.getElementsByTagName("Article");

    for (let i = 0; i < visibletweets.length; i++) {
        checkVisibleTweets(visibletweets[i]);
    }

}


// Runs for every visible tweet and extracts tweet contents, username and usertag.
function checkVisibleTweets(visibletweet) {
    var tempTweetContents = document.createElement('span');
    tempTweetContents.innerHTML = visibletweet.childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[1].innerHTML;
    var view_tweet = tempTweetContents.textContent;
    var view_username = visibletweet.childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].innerHTML;
    var view_usertag = visibletweet.childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].innerHTML

    var detectNFT_result = detectNFT(view_username, view_usertag, view_tweet);
    console.log(detectNFT_result);
    // Example result: array[true, @noob_user, 'hey, have you heard thing called <blocked word here>, its so cool and I cant stop shitposting about it'];

    if (detectNFT_result[0] == true) { // User has become slave to NFT
        // What to do with tweets containing blocked words, which is in this case getting blurred.
        visibletweet.parentElement.parentElement.parentElement.style.filter = "blur(2.5px)";

        // Note: You can use display:none, however this can make twitter suspicious if you have a lot of tweets getting blocked in a quick succession,
        // resulting in twitter having to load a ton of new tweets very fast. Shouldn't be too much of a problem in the average timeline though.

        // Adds blocked tweet's owners to an array containing all blocked users. Not really used, but useful to keep in nonetheless.
        blockedusers.push(detectNFT_result[1]);
    } else {
        // Do nothing with tweets that do not contain any of the blocked words.
    }

}


// Receives username, usertag and input; returns an array that tells if one or more blocked words have been detected.
function detectNFT(user, usertag, input) {
    var input_lowercase = input.toLowerCase();
    var tmparray;

    for (let i = 0; i < blocked_words.length; i++) {
        if (input_lowercase.includes(blocked_words[i].toLowerCase())) {
            tmparray = [true, usertag, input_lowercase];
            break; // Stop loop, match found.
        } else {
            tmparray = [false, usertag, input_lowercase];
            // No break here, because there can still be a match to find.
        }

    }
    return tmparray; //
}

})();
