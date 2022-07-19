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
con.style.maxWidth = `${screen.width}px`
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

//width of .tools
const tools = document.querySelector('#Tools')
window.onresize = toolsresize

function toolsresize() {
    if (conw > 1100) {
        console.log(tools)
        // tools.style.width = `${Number(conw-1)}px`
    }
    // else tools.style.width='100%'
}