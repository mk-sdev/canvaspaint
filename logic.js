
// window.addEventListener("load", event => {
//     var image = document.querySelector('#img1');
//     var isLoaded = image.complete && image.naturalHeight !== 0;
//     // alert(isLoaded);
// });

// document.querySelector('#showImgBtn').addEventListener('click', e=>{
//     document.querySelector('#img2').style.display='block'
// })

//disable landscape mode
// screen.orientation.lock("landscape")
window.screen.orientation
    .lock("portrait")
    .then(
        success => console.log(success),
        failure => console.log(failure)
    )
//changing the tabicon depending on the browser theme
const faviconTag = document.getElementById("faviconTag");
const isDark = window.matchMedia("(prefers-color-scheme: dark)");
//console.log(isDark);

const changeFavicon = () => {
    if (isDark.matches) faviconTag.setAttribute("href", "./images/pencil-white.png")
    else faviconTag.setAttribute("./images/pencil-white.png")
};
changeFavicon()

//maxwidth of content
const con = document.querySelector('#wholecontainer')
//this or screen.width or window.innerWidth
// con.style.maxWidth = `${screen.width}px`
// con.style.maxWidth = `1450px`
// con.style.height = `${window.innerHeight + 220}px`;
// con.style.maxHeight=`${screen.height}px`
// console.log(window.innerWidth);
// con.style.maxWidth=`${screen.width}px`
let conw = window.getComputedStyle(con).width.replace('px', '')
let conh = window.getComputedStyle(con).height.replace('px', '')
//console.log(conw);
// console.log(window.getComputedStyle(document.querySelectorAll("tools").width));


//setting the canvas size
let c = document.querySelector('#canvas');
// let cA = document.querySelector('#canvasA');
let ctx = c.getContext('2d')
c.siteRoot = $('.site-root').val();
ctx.siteRoot = $('.site-root').val();

if (conw <= 1200 && conw > 900){
    //wcześneiej tu było .65
    c.width = conw * .85
    // cA.width = conw * .65
}
else
if (conw <= 900){
    c.width = conw * .95
    // cA.width = conw * .95
}
else{
    c.width = conw -550
    // cA.width = conw -550
}
// if (conw <= 555)
//     c.height = conh * .6
// else
//     c.height = conh * .85

if (conw <= 555)
    c.height = window.innerHeight - 125
else if (conw > 555 && conw <= 1100)
    c.height = window.innerHeight * .69
else c.height = window.innerHeight * .75

// if (conw <= 555)
//     cA.height = window.innerHeight - 125
// else if (conw > 555 && conw <= 1100)
//     cA.height = window.innerHeight * .69
// else cA.height = window.innerHeight * .75

//console.log('aaaa', window.innerWidth, );
const middle=document.querySelector('#middle')
// middle.style.width = `${c.width+10}px`

//message before closing the tab
addEventListener('beforeunload', function (event) {

    event.returnValue = 'You have unsaved changes.';

});



















//media queries in js
let w = window.innerWidth
//console.log('w', w);


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
// if (w <= 1280)
    x = window.matchMedia(`(max-width: 1200px) `)
// else x = window.matchMedia(`(max-width: ${w*0.94}px) `)
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
// if (w <= 1280)
 x1 = window.matchMedia(`(max-width: 900px) `)
// else x1 = window.matchMedia(`(max-width: ${w*0.77}px) `)
myFunction1(x1)
x1.addListener(myFunction1)

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

        if (-touchendX + touchstartX <= 200 && !a && $("#right").data("closed")) {
            $('#right').css('left', `calc(100% - ${-touchendX+touchstartX}px)`)
            // console.log('RIOGHT',-touchendX + touchstartX );
            if (-touchendX + touchstartX == 200)
                $("#right").data("opened", true);
            else
                $("#right").data("opened", false);

        }


        if ((-touchendX + touchstartX) / w > 0.2 && a && !$("#right").data("opened")) {
            $('#right').css('transition', '.5s ease-out')
            $('#right').css('left', `calc(100% - 200px)`)
            // alert('aa')
            $("#right").data("closed", false);
            $("#right").data("opened", true);

        }
        if ((-touchendX + touchstartX) / w <= 0.2 && a && !$("#right").data("opened")) {
            // console.log('qq',$('#right').css('left')==='200px')
            $('#right').css('transition', '.1s ease-out')
            $('#right').css('left', `100%`)
            //console.log('bb');

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
            // console.log('lefttt', $('#right').css('left'));
            //console.log('qqqqqqqqqq')
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
function opt(a) {
    $('#options').css('transition', '')


    //to left
    if (touchendX < touchstartX) {
        $('#options').css('left', `${0+(touchendX-touchstartX)/w*100}%`)

        if ((-touchendX + touchstartX) / w < 0.3 && a) {
            $('#options').css('transition', '.1s ease-out')
            $('#options').css('left', `0%`)
        }
        if ((-touchendX + touchstartX) / w >= 0.3 && a) {
            // alert('a')
            $('#options').css('transition', '.5s ease-out')
            $('#options').css('left', `-100%`)

        }
    }


    //to right
    // if (touchendX > touchstartX) {
    //     console.log('RIGHT')
    //     // if (w >= touchendX - touchstartX )
    //     //     $('#options').css('left', `${-100+(touchendX-touchstartX)/w*100}%`)


    // }
}
document.querySelector('#options').addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX

})

document.querySelector('#options').addEventListener('touchmove', e => {
    touchendX = e.changedTouches[0].screenX
    let id = e.target.id
    let parent = e.target.parentElement
    // console.log('x', e.target.parentElement);
    //console.log('zzzzz',e.target.type)
    if (e.target.type !== 'range' && w < 499)
        opt()

    if (id === 'red' || id === 'green' || id === 'blue' || id === 'lightness') {
        for (let x of Array.from(document.getElementById('colorsOptions').children)) {
            if (x.id !== parent.id)
                x.style.opacity = '0'
        }
    }
    //console.log('touch',touchendX)
})

document.querySelector('#options').addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    // console.log('targetend', e.target.id);
    if (e.target.type !== 'range')
        opt(true)
    //console.log('ididid', e.target.id);

    let id = e.target.id
    let parent = e.target.parentElement
    if (id === 'red' || id === 'green' || id === 'blue' || id === 'lightness') {
        for (let x of Array.from(document.getElementById('colorsOptions').children)) {
            // if(x.id!==parent.id)
            x.style.opacity = '1'
        }
    }
})


document.getElementById('middle').addEventListener('touchend', () => {

    if($('html').hasClass('brp4')){
    $('#right').css('transition', '.1s ease-out')
    $('#right').css('left', `100%`)
    $("#right").data("closed", true);
    $("#right").data("opened", false);
    }
})
document.querySelector('#right').addEventListener('click', (e) => {


    if ((e.target.id.slice(0, 14) === 'imageConverted' || e.target.id.slice(0, 14) === 'closeright') && $('html').hasClass('brp4')) {
        $('#right').css('transition', '.1s ease-out')
        $('#right').css('left', `100%`)
        $("#right").data("closed", true);
        $("#right").data("opened", false);
    }
})
///zoom canvas
const zoom = document.querySelector("#zoomable");

const content = document.getElementById('canvas');


content.addEventListener('mousemove', e => {
    // console.log('scroll', e.offsetY);

    // return(e.offsetX, e.offsetY)
    window.xPos = e.offsetX*1;
    window.yPos = e.offsetY*1
})

// const contentInitialHeight=getComputedStyle(content).height.replace('px','');
// alert(getComputedStyle(content).transformOrigin)
const initialOrigin = getComputedStyle(content).transformOrigin
var zX = 1;
document.querySelector('#zoomable').addEventListener('wheel', function (e) {
    // var dir;

    if (e.ctrlKey) {
        // dir = (e.deltaY > 0) ? 0.1 : -0.1;

        if (e.deltaY < 0) {
            if (zX < 5)
                zX += 0.1;
        } else {
            if (zX > 0.2)
                zX -= 0.1

        }


        content.style.transform = `scale( ${zX})`;

        if (zX > 1)
            content.style.transformOrigin = '0 0'
        else
            content.style.transformOrigin = initialOrigin

        zoom.scrollTop = window.yPos
        zoom.scrollLeft = window.xPos

        return;
    }
    return;
});


///prevent zooming while pressing ctrl
document.querySelector('#wholecontainer').addEventListener('wheel', function (e) {
    // var dir;
    if (e.ctrlKey) {

        e.preventDefault()
    }
    return;
})
//////inputs type number




const numbers  = document.querySelectorAll('input[type=number]')
// console.log('inputy: ', numbers[0])
let ranges=[]
for(let i=0; i<numbers.length; i++){
 ranges[i] = numbers[i].parentElement.nextElementSibling
// console.log('rodzic', ranges);
}

for(let i=0; i<ranges.length; i++){
ranges[i].addEventListener('input', (e)=>{
    numbers[i].value=ranges[i].value
})
}

var invalidChars = [
    // "-",
    "+",
    "e",
  ];

  for(let i=0; i<numbers.length; i++){
  numbers[i].addEventListener("keydown", function(e) {
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  });
}

for(let i=0; i<numbers.length; i++){
numbers[i].addEventListener('input', e=>{
// alert(pencilNr.max)
if(numbers[i].value>Number(numbers[i].max))
numbers[i].value=Number(numbers[i].max)
if(numbers[i].value<Number(numbers[i].min))
numbers[i].value=Number(numbers[i].min)

    ranges[i].value=numbers[i].value

    if(numbers[i].value=='')
    ranges[i].value=Number(numbers[i].min)
    // alert(e.target.value)
})
}






/////////////// opening navs

document.querySelector('#options').addEventListener('mouseenter', e=>{
    if(document.querySelector('html').classList.contains('brp1')){
    e.target.style.left='0px'
    e.target.style.overflow='auto'
    }
 
})
document.querySelector('#options').addEventListener('mouseleave', e=>{
    if(document.querySelector('html').classList.contains('brp1')){
    e.target.style.left='-240px'
    e.target.style.overflow='hidden'
e.target.scrollTop=0
// alert('a')
    }
})
//
document.querySelector('#right').addEventListener('mouseenter', e=>{
    if(document.querySelector('html').classList.contains('brp1')){
    e.target.style.right='0px'
    e.target.style.transition='right .7s'}

})
document.querySelector('#right').addEventListener('mouseleave', e=>{
    if(document.querySelector('html').classList.contains('brp1')){
    e.target.style.right='-240px'
    e.target.style.transition='right .7s'}

})
window.addEventListener("resize", e=>{
    if($('body').css('width').replace('px','')>1200){
        $('#options').css('left','0')
        $('#right').css('right','0')
    }else{
        $('#options').css('left','-240px')
        $('#right').css('right','-240px')

    }
    
});
