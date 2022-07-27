//disable landscape mode
screen.orientation.lock("landscape")
//changing the tabicon depending on the browser theme
const faviconTag = document.getElementById("faviconTag");
const isDark = window.matchMedia("(prefers-color-scheme: dark)");
console.log(isDark);

const changeFavicon = () => {
    if (isDark.matches) faviconTag.setAttribute("href", "./images/pencil-white.png")
    else faviconTag.setAttribute("./images/pencil-white.png")
};
changeFavicon()

//maxwidth of content
const con = document.querySelector('#wholecontainer')
//this or screen.width or window.innerWidth
con.style.maxWidth = `${screen.width}px`
// con.style.maxWidth = `1450px`

// con.style.maxHeight=`${screen.height}px`
// console.log(window.innerWidth);
let conw = window.getComputedStyle(con).width.replace('px', '')
let conh = window.getComputedStyle(con).height.replace('px', '')
console.log(conw);
// console.log(window.getComputedStyle(document.querySelectorAll("tools").width));


//setting the canvas size
let c = document.querySelector('CANVAS');
let ctx = c.getContext('2d')
c.siteRoot = $('.site-root').val();
ctx.siteRoot = $('.site-root').val();

if (conw <= 1200 && conw > 900)
    c.width = conw * .65
else
if (conw <= 900)
    c.width = conw * .95
else
    c.width = conw * .6

// if (conw <= 555)
//     c.height = conh * .6
// else
//     c.height = conh * .85

if (conw <= 555)
    c.height = window.innerHeight - 140
else if (conw > 555 && conw <= 1100)
    c.height = window.innerHeight * .69
else c.height = window.innerHeight * .75



console.log('aaaa', window.innerWidth, );

document.querySelector('#middle').style.width = `${c.width+10}px`

//message before closing the tab
addEventListener('beforeunload', function (event) {

    event.returnValue = 'You have unsaved changes.';

});




//media queries in js
let w = window.innerWidth
console.log('w', w);


function myFunction(x) {
    if (x.matches) {
        document.querySelector('html').classList.add("brp1")

        // document.querySelector('#options').style.height=`100px`
        // document.querySelector('#savedImages').style.height=`150px`

    } else {
        document.querySelector('html').classList.remove("brp1")

        //         document.querySelector('#options').style.height=`${screen.height*.55}px`
        // document.querySelector('#savedImages').style.height=`${screen.height*.55}px`

    }
}


let x
if (w <= 1280)
    x = window.matchMedia(`(max-width: 1200px) `)
else x = window.matchMedia(`(max-width: ${w*0.94}px) `)
myFunction(x)
x.addListener(myFunction)
////////////////////
function myFunction1(x) {
    if (x.matches) {
        document.querySelector('html').classList.add("brp2")
    } else {
        document.querySelector('html').classList.remove("brp2")
    }
}



let x1
if (w <= 1280) x1 = window.matchMedia(`(max-width: 1100px) `)
else x1 = window.matchMedia(`(max-width: ${w*0.77}px) `)
myFunction1(x1)
x1.addListener(myFunction1)
///////
function myFunction5(x) {
    if (x.matches) {
        document.querySelector('html').classList.add("brp6")
    } else {
        document.querySelector('html').classList.remove("brp6")
    }
}



let x5 = window.matchMedia(`(max-width: 815px)`)
myFunction5(x5)
x5.addListener(myFunction5)
//////////
function myFunction2(x) {
    if (x.matches) {
        document.querySelector('html').classList.add("brp3")
    } else {
        document.querySelector('html').classList.remove("brp3")
    }
}



let x2 = window.matchMedia(`(max-width: 555px)`)
myFunction2(x2)
x2.addListener(myFunction2)
///////////
function myFunction3(x) {
    if (x.matches) {
        document.querySelector('html').classList.add("brp4")
        // $('#right').css('height', `${window.innerHeight}px`)
        // $('#savedImages').css('height', `100%`)
    } else {
        document.querySelector('html').classList.remove("brp4")
    }
}



let x3 = window.matchMedia(`(max-width: 499px)`)
myFunction3(x3)
x3.addListener(myFunction3)
//////////////////////////
function myFunction4(x) {
    if (x.matches) {
        document.querySelector('html').classList.add("brp5")

    } else {
        document.querySelector('html').classList.remove("brp5")
    }
}



let x4 = window.matchMedia(`(max-width: 360px)`)
myFunction4(x4)
x4.addListener(myFunction4)




//swipeing
let touchstartX = 0
let touchendX = 0
$("#right").data("closed", true); //true if #right is fully closed
$("#right").data("opened", false); //true if #right is fully opened

function checkDirection(a) {

    $('#options').css('transition', '')
    $('#right').css('transition', '')


    // to left
    if (touchendX < touchstartX) {

        if (-touchendX + touchstartX <= 200 && !a && !$("#right").data("opened"))
            $('#right').css('left', `calc(100% - ${-touchendX+touchstartX}px)`)


        if ((-touchendX + touchstartX) / w > 0.2 && a && !$("#right").data("opened")) {
            $('#right').css('transition', '.5s ease-out')
            $('#right').css('left', `calc(100% - 200px)`)
            // alert('aa')
            $("#right").data("closed", false);
            $("#right").data("opened", true);
        }
        if ((-touchendX + touchstartX) / w <= 0.2 && a && !$("#right").data("opened")) {
            $('#right').css('transition', '.1s ease-out')
            $('#right').css('left', `100%`)

            // alert('bb')
            $("#right").data("closed", true);
            $("#right").data("opened", false);

        }
        // console.log('left', $('#right').css('left'));

    }

    //to right
    if (touchendX > touchstartX) {
        if (w >= touchendX - touchstartX && $("#right").data("closed"))
            $('#options').css('left', `${-100+(touchendX-touchstartX)/w*100}%`)

        if ((touchendX - touchstartX) / w > 0.3 && a && $("#right").data("closed")) {
            $('#options').css('transition', '.5s ease-out')
            $('#options').css('left', `0%`)
        }
        if ((touchendX - touchstartX) / w <= 0.3 && a && $("#right").data("closed")) {
            $('#options').css('transition', '.1s ease-out')
            $('#options').css('left', `-100%`)

        }
        // console.log('data', $( "#right" ).data("closed") );



        if ($("#right").data("closed") == false) {
            console.log('lefttt', $('#right').css('left'));

            $('#right').css('left', `calc(100% - 200px + ${(touchendX-touchstartX)}px)`)
            $("#right").data("opened", false);
        }
        if ((+touchendX - touchstartX) / w <= 0.2 && a && !$("#right").data("opened") && $('#right').data("closed") == false) {
            $('#right').css('transition', '.3s ease-out')
            $('#right').css('left', `calc(100% - 200px)`)
            // alert('aa')
            $("#right").data("closed", false);
            $("#right").data("opened", true);
        }
        if ((+touchendX - touchstartX) / w > 0.2 && a && !$("#right").data("opened") && $('#right').data("closed") == false) {
            $('#right').css('transition', '.3s ease-out')
            $('#right').css('left', `100%`)

            // alert('bb')
            $("#right").data("closed", true);
            $("#right").data("opened", false);

        }

    }
    //   && $('#right').css('left')!='calc(100% - 200px)'
    //   && $('#right').css('transform')!='matrix(1, 0, 0, 1, -200, 0)'
}

document.querySelector('#swiper').addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
})

document.querySelector('#swiper').addEventListener('touchmove', e => {
    touchendX = e.changedTouches[0].screenX
    checkDirection()
})


document.querySelector('#swiper').addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    checkDirection(true)
})
///
function opt(a){
    $('#options').css('transition', '')


    //to left
    if(touchendX < touchstartX ){
        $('#options').css('left', `${0+(touchendX-touchstartX)/w*100}%`)

        if ((-touchendX + touchstartX) / w < 0.3 && a ) {
            $('#options').css('transition', '.1s ease-out')
            $('#options').css('left', `0%`)
        }
        if ((-touchendX + touchstartX) / w >= 0.3 && a ) {
            // alert('a')
            $('#options').css('transition', '.5s ease-out')
            $('#options').css('left', `-100%`)

        }
    }


    //to right
    if (touchendX > touchstartX) {
        if (w >= touchendX - touchstartX )
            $('#options').css('left', `${-100+(touchendX-touchstartX)/w*100}%`)

      
    }
}
document.querySelector('#options').addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
    
})

document.querySelector('#options').addEventListener('touchmove', e => {
    touchendX = e.changedTouches[0].screenX
    let id = e.target.id
    let parent = e.target.parentElement
    // console.log('x', e.target.parentElement);

    if(id==='options' && w<499)
    opt()
    
    if(id==='red' || id==='green' || id==='blue' || id==='lightness'){
        for(let x of Array.from(document.getElementById('colorsOptions').children)) {
        if(x.id!==parent.id)
        x.style.opacity='0'
        }
    }
    //console.log('touch',touchendX)
})

document.querySelector('#options').addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    console.log('targetend', e.target.id);
    if(e.target.id==='options')
    opt(true)

    let id = e.target.id
    let parent = e.target.parentElement
    if(id==='red' || id==='green' || id==='blue' || id==='lightness'){
        for(let x of Array.from(document.getElementById('colorsOptions').children)) {
       // if(x.id!==parent.id)
        x.style.opacity='1'
        }
    }
})


document.getElementById('middle').addEventListener('touchend', ()=>{
    $('#right').css('transition', '.1s ease-out')
    $('#right').css('left', `100%`)
    $("#right").data("closed", true);
    $("#right").data("opened", false);
})
document.querySelector('#right').addEventListener('click', (e)=>{


 if(e.target.id.slice(0,14)==='imageConverted' || e.target.id.slice(0,14)==='closeright')
 {
    $('#right').css('transition', '.1s ease-out')
    $('#right').css('left', `100%`)
    $("#right").data("closed", true);
    $("#right").data("opened", false);
 }
})

