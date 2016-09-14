var lock = false; // so we don't trigger hotSwap() as we manipulate the dom in hotSwap()

var facebookStoryClass = ".userContentWrapper";
var hotSwap = function(regex) {
    if (lock) {
        return;
    }
    lock = true;
    jQuery(facebookStoryClass + ":not(.hotswappost)")
        .filter(function() {
            if (jQuery(this).closest(facebookStoryClass + ".hotswappostB").length > 0) {
                return false; // don't add stuff more than once per story
            }
            var matches = regex.exec(this.textContent);
            if (matches !== null) {
                var matchingString = matches.join(", ");
                var story = jQuery(this);
                var theUniqueID = this.closest("._5jmm").id

                if ($(".theStoryBox_" + theUniqueID)[0]) {} else {
                    story.attr('class', 'theStoryBox_' + theUniqueID)
                    story.css('display', 'none');
                }

                var possibleGIFStrings = ["h8E7oT2FGEJkQ", "JXgiBRPBQJu8w", "XuOOXWY29Y4z6", "moyzrwjUIkdNe", "7NUdxH6uzeI1i", "cIEXiVCWFzlyU", "ROk2npu67RUNW", "4DBiNfyQMAT3a", "1Sa05RVertjNe", "l41lIioP4RFRmIVB6", "immFYe2gQStuU", "5xtDarEXlXBmnOuTh0k", "cdTUkj59dLFmg", "tsIFjie7obBM4", "cKmwAbwsqiQBG", "3oGRFvUEbJdLWlawLu", "PkVHsFmmLeBfa", "Yb8ebQV8Ua2Y0", "3ornjU8Cd8FW1nhG6s", "Eq7T3GwDAlggE", "8Y1szTiUdynwA", "ogxciSvn6yqic", "ResYeqDBi3bYA"]

                var theChosenGIF = possibleGIFStrings[randomInt(0, possibleGIFStrings.length)]

                var possibleContent = [
                    "<p>We think dogs are better than those subtly racist comments your aunt\'s brother\'s second cousin is posting right now.</p>",
                    "<p>Doge for president 2016!</p>",
                    "<p>Want to make a difference? <a href='http://www.rockthevote.com/get-informed/elections/am-i-registered-to-vote/' target='_blank'>Make sure you're registered to vote!</a> If you aren't registered, <a href='https://register2.rockthevote.com/?partner=35445' target='_blank'> register now!</a></p>",
                    "<p>Want some non-partisan political news? <a href='https://ajplus.net/english/' target='_blank'>Check out AJ+</a> for some great content.</p>",
                    "<p>Was your feed super biased before Hot Swap? Check out <a href='http://www.allsides.com/' target='_blank'>AllSides</a> for a look at what news is coming from the other side.</p>",
                    "<p>Did you know 32 of America's 44 presidents had dogs? Martin Van Buren also breifly owned two tiger cubs.</p>",
                    "<p>Teddy Roosevelt had 31 pets during his time as president, including nine dogs, five guinea pigs, two cats, and a small bear.</p>",
                    "<p>November is about more than just the president. Learn about the rest of your county's ballot on <a href='http://vote-usa.org/' target='_blank'>Vote USA</a>."
                ]
                var theContent = possibleContent[randomInt(0, possibleContent.length)]

                if ($(".theGIFdiv_" + theUniqueID)[0]) {} else {
                    var GIFdiv = document.createElement('div')
                    GIFdiv.innerHTML = "<div class='theActualBox'><iframe id='theGIFiFrame' src='//giphy.com/embed/" + theChosenGIF + "' width='470' height='235' frameBorder='0' margin-top='5px' allowFullScreen></iframe><br /><h1 class='swapHeading'>This used to be a post about the 2016 election.</h1><h1 class='swapHeading'>We swapped it out for a GIF of a dog.</h1>" + theContent + "<br /></div>"
                    GIFdiv.setAttribute('style', 'display: block')
                        // console.log(this.closest("._5jmm").id)

                    GIFdiv.setAttribute('class', 'theGIFdiv_' + theUniqueID)
                    console.log('theGIFdiv_' + theUniqueID)

                    story.parent().append(GIFdiv)

                    var buttonDiv = document.createElement('div');
                    buttonDiv.setAttribute('class', 'theButtonDiv')


                    var theButton = document.createElement("BUTTON");
                    var theText = "Show me the Post"
                    var btnText = document.createTextNode(theText);
                    theButton.appendChild(btnText);
                    theButton.setAttribute('value', theText)
                    theButton.setAttribute('class', 'theShowButton')
                    theButton.setAttribute('id', 'theButtonID')
                    theButton.setAttribute('innerHTML', 'HELLO!')
                    theButton.style.cssText = 'left-margin:250'

                    theButton.onclick = function() {
                        $(".theStoryBox_" + theUniqueID).toggle()
                        $(".theGIFdiv_" + theUniqueID).toggle()
                        console.log(document.getElementById('theButtonID').value)

                        if (theButton.innerHTML == "Show me the Post") {
                            theButton.innerHTML = "Hide the Post Again"
                        } else if (theButton.innerHTML == "Hide the Post Again") {
                          theButton.innerHTML = "Show me the Post"
                        }

                        console.log('#theGIFdiv_' + theUniqueID)
                    }
                    buttonDiv.appendChild(theButton)
                    story.parent().append(buttonDiv);
                }
                return true;
            }
            return false;
        })
        .addClass("hotswappostB");
    lock = false;
}

function makeRegex(blacklist) {
    var bannedWords = blacklist.split(/,\s*/); // comma-separated, optional whitespace
    // only match on word boundaries
    bannedWords = bannedWords.map(function(word) {
        return "\\b" + escape(word) + "\\b";
    });
    return new RegExp(bannedWords.join("|"), "i");
}

function escape(str) {
    // source: http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript/3561711#3561711
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

var filterTerms = "trump, republican, democrat, hillary, donald, clinton, election, Debbie Wasserman Schultz"
var regex = makeRegex(filterTerms);

document.addEventListener("DOMNodeInserted", function() {
    // this runs pretty slow-- it'd be better to hook into whatever event Facebook
    // uses to trigger loading additional content, I think.
    hotSwap(regex);
});

hotSwap(regex);
