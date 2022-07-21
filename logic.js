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
//this or screen.width
con.style.maxWidth = `${window.innerWidth}px`
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
    c.height = window.innerHeight * .6
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
    } else {
        document.querySelector('html').classList.remove("brp1")
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
function myFunction2(x) {
    if (x.matches) {
        document.querySelector('html').classList.add("brp3")
    } else {
        document.querySelector('html').classList.remove("brp3")
    }
}



var x2 = window.matchMedia(`(max-width: 555px)`)
myFunction2(x2)
x2.addListener(myFunction2)
///////////
function myFunction3(x) {
    if (x.matches) {
        document.querySelector('html').classList.add("brp4")
    } else {
        document.querySelector('html').classList.remove("brp4")
    }
}



var x3 = window.matchMedia(`(max-width: 499px)`)
myFunction3(x3)
x3.addListener(myFunction3)