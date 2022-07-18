const faviconTag = document.getElementById("faviconTag");
const isDark = window.matchMedia("(prefers-color-scheme: dark)");
console.log(isDark);

const changeFavicon = () => {
    if (isDark.matches) faviconTag.setAttribute("href", "./images/pencil-white.png")
    else faviconTag.setAttribute("./images/pencil-white.png")
  };
changeFavicon()

  
let c = document.querySelector('CANVAS');
let ctx = c.getContext('2d')
c.siteRoot = $('.site-root').val();
ctx.siteRoot = $('.site-root').val();

if (window.innerWidth <= 1200 && window.innerWidth > 1000)
    c.width = window.innerWidth * .65
else
if (window.innerWidth <= 1100)
    c.width = window.innerWidth * .95
else
    c.width = window.innerWidth * .6

if (window.innerWidth <= 555)
    c.height = window.innerHeight * .6
else
    c.height = window.innerHeight * .75
document.querySelector('#middle').style.width = `${c.width+10}px`