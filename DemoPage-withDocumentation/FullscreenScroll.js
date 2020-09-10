window.onload = function () {
    var scrollPos = 0;
    var touchStart_Y, touchEnd_Y;
    var lockScroll = false;

    const screens = document.querySelectorAll(".screen");
    const screensLength = screens.length;
    const screenAnchors=[];
    for(var i=0;i<screensLength;i++){
        var screensName = screens[i].dataset.anchorname;
        screensName = encodeURI(screensName); 
        screenAnchors.push(screensName);
    }

    const showNav = (document.querySelector(".fullscroll").dataset.dotnav == 'true'); //check if data-dotnav isset and set const
    
    var scrollSpeed = 10;
    if (typeof document.querySelector(".fullscroll").dataset.scrollspeed !== 'undefined') { //check if data-scrollspeed isset and update scrollspeed var
        var scrollSpeed = Math.floor(document.querySelector(".fullscroll").dataset.scrollspeed);
    }
    
    var progressElement = document.getElementsByClassName("fullscroll-progress")[0];
    var progress = "number";
    var showProgressIndicator = false;
    var progressBarInner;
    if (typeof progressElement !== 'undefined') {
        if(typeof progressElement.dataset.progresstype !== 'undefined'){//check if progress type is deffined
            progress = progressElement.dataset.progresstype;
        }
        showProgressIndicator = true;
    }
    if(showProgressIndicator && progress == "bar"){ //create the bar element
        let progressBar = document.createElement('div');
        progressBar.className = "fullscroll-bar-outer";
        progressBar.innerHTML = '<div class="fullscroll-bar-inner"></div>';
        progressElement.appendChild(progressBar);
        progressBarInner = document.getElementsByClassName("fullscroll-bar-inner")[0];
    }

    //generate side Nav
    let navDot = document.createElement('div');
    var navItems = "";
    for(var i = 0;i < screensLength;i++){
        navItems = navItems+'<a href="#'+ screenAnchors[i] +'" class="navBall"></a>';
    } 
    navDot.className = 'fullscroll-dotNav';
    navDot.innerHTML = navItems; 
    if(showNav){document.querySelector(".fullscroll").appendChild(navDot);}
    var navBalls = document.querySelectorAll(".navBall");
    const navBallsLength = navBalls.length;

    //fill out text Nav
    var showTextNav = false;
    var fullscrollTextNav,fullscrollTextNavLength
    if(!!document.querySelector(".fullscroll-textNav")){
        showTextNav = true;
        for(var i=0;i<screensLength;i++){
            let navTxtElm = document.createElement('a');
            navTxtElm.href = '#'+ screenAnchors[i];
            navTxtElm.innerHTML = screens[i].dataset.anchorname; 
            document.querySelector(".fullscroll-textNav").appendChild(navTxtElm);
        }
        fullscrollTextNav = document.querySelector(".fullscroll-textNav").children;
        fullscrollTextNavLength = fullscrollTextNav.length;
    }

    window.addEventListener("resize", function(){scrlElmTop();})

    // check for initial load windowHash and update scroll pos var ore set window hash to scroll pos
    if (window.location.hash !== "") {
        updateWindowHash();
        scrlElmTop();
        screens[scrollPos].scrollIntoView();
    }else{
        window.location.hash = screenAnchors[scrollPos];
        window.scrollTo(0,0);
    }

    // check for hash change and initiate scroll
    window.addEventListener("hashchange", function(){
        updateWindowHash();
        scrlElmTop();
    });


    // update scroll pos to window hash
    function updateWindowHash(){
        var windowHash = window.location.hash.toString().replace("#","");
        scrollPos = screenAnchors.indexOf(windowHash);
        if(showNav){updateNavPoints()}
        if(showTextNav){updateTextNav()}
        if(showProgressIndicator){updateProgressIndicator()}
    }

    //check for mousewheel action and change window hash
    window.addEventListener("wheel", function(scroll){
        if(scroll.deltaY < 0){
            adjustScrollPosVar("up");
        }else{
            adjustScrollPosVar("down");
        }
    });

    //check for touch action 
    window.addEventListener("touchstart", function(touch){
        if(touch.touches.length == 1){
            touchStart_Y = touch.touches[0].clientY;
        }
    });
    window.addEventListener("touchend", function(touchEnd){
        if(touchEnd.changedTouches.length == 1){
            touchEnd_Y = touchEnd.changedTouches[0].clientY;
        }
        touchDirection();
    });
    
    //check touch drecktion and change window hash
    function touchDirection(){
        if(touchStart_Y < touchEnd_Y && (touchEnd_Y - touchStart_Y) >= 50){
            adjustScrollPosVar("up");
        }
        if(touchStart_Y > touchEnd_Y && (touchStart_Y - touchEnd_Y) >= 50){
            adjustScrollPosVar("down");
        }
    }

    //adjustScrollPosVarOne and update window hash
    function adjustScrollPosVar(direction){
        if(!lockScroll){
            lockScroll = true;
            if(direction == "down"){
                if((scrollPos+1)<screensLength){
                    scrollPos++;
                }
            }else{
                if((scrollPos-1)>=0){
                    scrollPos--;
                }
            }
            window.location.hash = screenAnchors[scrollPos];
            setTimeout(function(){ lockScroll = false },600);
        }
    }

    // scroll current scrollPos element to top of window
    function scrlElmTop(){
        var elementFromTop = screens[scrollPos].getBoundingClientRect().top;
        if(elementFromTop > 0){
            // if positiv
            if(scrollSpeed > elementFromTop){
                window.scrollBy(0,1);
            }else{
                window.scrollBy(0,scrollSpeed);
            }
        }else{
            // if negativ
            if(-scrollSpeed < elementFromTop){
                window.scrollBy(0,-1);
            }else{
                window.scrollBy(0,-scrollSpeed);
            }
        }
        if(screens[scrollPos].getBoundingClientRect().top != 0){
            setTimeout(scrlElmTop,1);
        }
    }

    //update nav
    function updateNavPoints(){
        for(var i=0;i<navBallsLength;i++){
            navBalls[i].classList.remove("ballActive");
        }
        navBalls[scrollPos].classList.add("ballActive");
    }
    //update text nav
    function updateTextNav(){
        for(var i=0;i<fullscrollTextNavLength;i++){
            fullscrollTextNav[i].classList.remove("navTxtElmActive");
        }
        fullscrollTextNav[scrollPos].classList.add("navTxtElmActive");
    }
    //update progress indicator
    function updateProgressIndicator(){
        if(progress == "number"){
            progressElement.innerHTML = (scrollPos +1) +" / "+ screensLength
        }
        if(progress == "bar"){
            progressBarInner.style.width = 100 / (screensLength -1) * scrollPos +"%";
        }
    }
}