// ==UserScript==
// @name         Censor Whatsapp Images
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Censor someone's (or everyone's) images in whatsapp groups
// @author       eSantini
// @match        https://web.whatsapp.com/
// @grant        none
// ==/UserScript==

(function() {
    /*
		Censor someone's (or everyone's) images in whatsapp groups
			You may click the image to view it, but they'll remain censored in chat.
	*/
    
    //	group/member. both CASE SENSITIVE
    var groupMember = { // group and member's names can be partial
        'groupName1': ['*'], // use ['*'] to censor all
        'groupName2': ['person', '1234'] // use name or number to censor individuals
    };

    // false = blur, true = 'CENSORED' image
    var censorImg = false;
    // if censorImg is true use the following image:
    if(censorImg)
   	    var imgURL = 
            'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Censored_rubber_stamp.svg/2000px-Censored_rubber_stamp.svg.png';

    var intId = setInterval(function() {
        if(document.getElementById('main')) {
            setMutation();
            clearInterval(intId);
        }
    }, 500);

    function setMutation(){
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {

                    for(var key in groupMember){
                        // skip loop if the property is from prototype
                        if (!groupMember.hasOwnProperty(key)) continue;

                        if(document.querySelector('.chat-title[dir=auto] span').innerHTML.includes(key)){ // check group name

                            var messages = document.body.querySelectorAll('.msg.msg-group .message-author .text-clickable');

                            var obj = groupMember[key];
                            for(var prop in obj) { // loop censored members

                                for (var i = 0; i < messages.length; i++) {

                                    //	check if message is from a censored member
                                    if(obj[prop] == '*' || messages[i].innerText.includes( obj[prop] ) ) {
                                        var el = findAncestor(messages[i], 'msg-group');
                                        var continues = true;
                                        while(continues){
                                            continues = el.classList.contains('msg-continuation');
                                            if(el.querySelector('.message-image')){
                                                censorImg(el);
                                            }
                                            el = el.nextSibling;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        function findAncestor (el, cls) {
            while ((el = el.parentElement) && !el.classList.contains(cls));
            return el;
        }

    }

    if(censorImg) {
        censorImg = function(el) {
            el.querySelector('.image-thumb img').src = imgURL;
        };
    } else {
        censorImg = function(el) {
            el.querySelector('.image-thumb img').style.webkitFilter = 'blur(20px)';
        };
    }

})();
