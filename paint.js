///stylowanie: długość rendżów, jak się najedzie na rendże to widać wartość, własne kursory, efekty przycisków, jakaś szerokość poszczególnych opcji, textarea. brak scrolla na ekranach, checkboxy

//js:   images, modify, lineJoin, kolor szary jeśli fill lub strok enie są zaznaczone, nawigacja klawiszami, message jeśli ani fill ani stroke nie są zaznaczone, text;  wysokość canvasa a wysokoś urządzenia, rozszerzyć textarea przy pisaniu na mobilnych, kursor na środku image, jak jest duża textarea to nie da sę sktolować w textOptions n największym ekranie

//html: więcej opcji jak czcionki i gradienty

//border w savedImages, jakieś info na dole, kursory, range min max, 

let c = document.querySelector('CANVAS');
let ctx = c.getContext('2d')
c.siteRoot = $('.site-root').val();
ctx.siteRoot = $('.site-root').val();

if (window.innerWidth <= 1200 && window.innerWidth > 1000)
    c.width = window.innerWidth * .65
else
if (window.innerWidth <= 1000)
    c.width = window.innerWidth * .9
else
    c.width = window.innerWidth * .6

if (window.innerWidth <= 555)
    c.height = window.innerHeight * .7
else
    c.height = window.innerHeight * .75
document.querySelector('#middle').style.width = `${c.width+10}px`


$(document).ready(function () {


    //e.log(c, ctx);

    const $c = $('canvas')
    const $ctx = $($c)[0].getContext('2d')
    //  $c.css('width', `${window.innerWidth}`)
    // $c.css('height', `${window.innerWidth}`)
    //    $c.width(window.innerWidth)
    //    $c.height(window.innerHeight - 120)
    $ctx.fillStyle = 'white'
    $ctx.fillRect(0, 0, $c.width(), $c.height())
    let whichBtn = 'pencil'
    console.log($(window).width());



    let restore_array = []
    let index = -1
    restore_array.push($ctx.getImageData(0, 0, $c.width(), $c.height()))
    index++




    // const $reader = new FileReader()
    // const $img = new Image()
    // const uploadImage = (e)=>{
    //     $reader.onload= function (){
    //         $img.onload=function (){
    //             $ctx.drawImage($img, 0, 0)
    //         }
    //         $img.src=reader.result
    //     }
    //     $reader.readAsDataURL(e.target.files[0])
    // }

    //     $('#uploaderbtn').on('click', uploadImage)

    $('#undo').on('click', () => {
        if (index <= 0) {

            $ctx.fillStyle = 'white'
            $ctx.fillRect(0, 0, $c.width(), $c.height())
            //restore_array.pop()
            //index = -1
        } else {
            index -= 1
            restore_array.pop()
            $ctx.putImageData(restore_array[index], 0, 0)
        }

        console.log(index, restore_array)

    })

    $('#clear').on('click', (e) => {

        $ctx.fillStyle = 'white'
        $ctx.fillRect(0, 0, $c.width(), $c.height())
        undofn(e)
        // console.log('czyszczę', $c.width());
        isLine = false

    })
    let dataURI = []
    let savedimage = []
    let i = 0
    let overlay = []

    $('#save').on('click', () => {
        dataURI[i] = $c[0].toDataURL()
        // dataURI[i].slice(5, 13)
        console.log('data', dataURI[i].slice(5, 14));

        if (i == 0)
            $('#savedImages').html('')

        savedimage[i] = $(`<image src="${dataURI[i]}" class="savedImage" id="imageConverted${i}" style="border: 1px solid black" 
        />`)

        overlay[i] = $(`<div id='overlay' class='overlays' style="height: 100%; width: 100%; background: black; opacity: 0" onclick="undofn(e)"></div>`)
        // console.log(dataURI);
        // console.log('save');
        //const imag = $('<image/>')

        //imag.src=dataURI
        // console.log($('#imageConverted').src);
        savedimage[i].prepend(overlay[i])
        // savedimage[i].attr('src', dataURI[i])
        $('#savedImages').prepend(savedimage[i])
        console.log('saveImage', savedimage[0]);



        i++

        $('#middle > span').html("You created a new draft! Click on it in order to display it again on the canvas.")
    })

    //let elemnt = window.dzieci

    $(document).on('click', (e) => {
        //console.log('ss', e.target.id.slice(0, 14));


        if (e.target.id.slice(0, 14) == 'imageConverted') {
            const image = e.target
            //console.log('over', e.target.src);
            $ctx.drawImage(image, 0, 0)
        }
        if (e.target.id == 'download' || e.target.id == 'download1' || e.target.id == 'download2') {
            const a = document.createElement('a')

            a.href = $c[0].toDataURL()
            a.download = 'canvas-image.png'
            a.click()
        }

        for (let i = 0; i < 3; i++) {
            if ($('.radioPencil').eq(i).is(':checked')) {
                $('.labelPencil').eq(i).css('color', 'white')
            } else $('.labelPencil').eq(i).css('color', 'grey')

            if ($('.radioLine').eq(i).is(':checked')) {
                $('.labelLine').eq(i).css('color', 'white')
            } else $('.labelLine').eq(i).css('color', 'grey')

            if ($('.radioShape').eq(i).is(':checked')) {
                $('.labelShape').eq(i).css('color', 'white')
            } else $('.labelShape').eq(i).css('color', 'grey')

            if ($('.radioText').eq(i).is(':checked')) {
                $('.labelText').eq(i).css('color', 'white')
            } else $('.labelText').eq(i).css('color', 'grey')


        }
        //imagessss
        if (e.target.id.slice(0, 3) == 'img') {
            window.imagee = e.target
            console.log('a', e.target.width)


        }
    })









    function imageFn(e) {
        e.preventDefault()

        let ratio = $('#imageSize').val()

        if ($('#imageSize').val() > 6 && window.imagee !== undefined) {
            $ctx.drawImage(window.imagee, e.clientX - $c.offset().left, e.clientY - $c.offset().top, window.imagee.width * (ratio - 5), window.imagee.height * (ratio - 5))
        } else if ($('#imageSize').val() < 6 && window.imagee !== undefined) {
            size = (1 / $('#imageSize').val())
            $ctx.drawImage(window.imagee, e.clientX - $c.offset().left, e.clientY - $c.offset().top, window.imagee.width * (1 - 1.5 * size), window.imagee.height * (1 - 1.5 * size))
        } else if ($('#imageSize').val() == 6 && window.imagee !== undefined) $ctx.drawImage(window.imagee, e.clientX - $c.offset().left - window.imagee.width / 2, e.clientY - $c.offset().top - window.imagee.height / 2, window.imagee.width, window.imagee.height)




        //console.log($('#imageSize').val(), "aa", ratio)

        //console.log($ctx.getImageData(0, 0, $c.width(), $c.height()));


    }

    $c.on('mousemove', (e) => {
        // let before = $ctx.getImageData(0, 0, $c.width(), $c.height())

        if (whichBtn == 'images' && document.body.scrollTop == 0 && document.documentElement.scrollTop == 0) {




            isImage = true
            $ctx.putImageData(restore_array[index], 0, 0);
            imageFn(e)
            // undofn(e)
            e.preventDefault()
        }
    })

    $c.on('mouseout', (e) => {
        if (whichBtn == 'images' && document.body.scrollTop == 0 && document.documentElement.scrollTop == 0)
            $ctx.putImageData(restore_array[index], 0, 0);
    })

    let isImage
    $c.on('mousedown', (e) => {
        if (whichBtn == 'images' && document.body.scrollTop == 0 && document.documentElement.scrollTop == 0) {
            isImage = true
            imageFn(e)
            undofn(e)
            e.preventDefault()
        }
    })












































    //default:
    $('.labelPencil').eq(0).css('color', 'white')
    $('.labelLine').eq(0).css('color', 'white')
    $('.labelShape').eq(0).css('color', 'white')
    $('.labelText').eq(0).css('color', 'white')


    // for(let i=0; i<$('#savedImages').children.length; i++){
    //     $('#savedImages').children[i].on('mousedown', ()=>{
    //     alert('aa')
    //    })
    // }


    $('#pencil').on('click', () => {

        whichBtn = 'pencil'
        for (let i = 0; i < $('.Options').length; i++) {
            $('.Options').css('display', 'none')
        }
        $('#pencilOptions').slideDown(200)
        $('#pencilOptions').css('display', 'flex')

    })
    $('#line').on('click', () => {

        whichBtn = 'line'
        for (let i = 0; i < $('.Options').length; i++) {
            $('.Options').css('display', 'none')
        }
        $('#lineOptions').slideDown(200)

        $('#lineOptions').css('display', 'flex')

    })
    $('#shape').on('click', () => {
        whichBtn = 'shape'
        for (let i = 0; i < $('.Options').length; i++) {
            $('.Options').css('display', 'none')
        }
        $('#shapeOptions').slideDown(200)

        $('#shapeOptions').css('display', 'flex')
    })
    $('#text').on('click', () => {
        whichBtn = 'text'
        for (let i = 0; i < $('.Options').length; i++) {
            $('.Options').css('display', 'none')
        }
        $('#textOptions').slideDown(200)

        $('#textOptions').css('display', 'flex')
        //e.preventDefault()
        $('#text').get(0).blur()
        $('#textContent').get(0).focus()

        $('#textOptions').get(0).scrollTop = 0

    })


    $('#modify').on('click', () => {
        whichBtn = 'modify'
        for (let i = 0; i < $('.Options').length; i++) {
            $('.Options').css('display', 'none')
        }
        $('#modifyOptions').css('display', 'flex')

    })
    $('#images').on('click', () => {
        whichBtn = 'images'
        for (let i = 0; i < $('.Options').length; i++) {
            $('.Options').css('display', 'none')
        }
        $('#imagesOptions').slideDown(200)
        $('#imagesOptions').css('display', 'flex')
    })
    // $('#uploaderbtn').on('change', (e)=>{
    //     let image = $('#output')
    //     image.src = URL.createObjectURL(e.target.files[0])
    //     const fi = $("#uploaderbtn");
    //     if (fi.files.length > 0) {
    //         for (const i = 0; i <= fi.files.length - 1; i++) {
    //             const fsize = fi.files.item(i).size;
    //             const file = Math.round((fsize / 1024));}}
    //     console.log(image);

    // }, false)


    // $('#download').on('click', () => {
    //     //przydałoby się jeszcze może do IE
    //     const a = document.createElement('a')

    //     a.href = $c[0].toDataURL()
    //     a.download = 'canvas-image.png'
    //     a.click()
    // })
    //////////////////////////////////////////////////////////////

    const ua = navigator.userAgent;

    // let lineWidthPencil;
    // $('#lineWidthPencil').on('change', (e) => {

    //     lineWidthPencil = $('#lineWidthPencil').val()
    //     //console.log($('#pencilOptions > .lineWidth').val());
    //     //$('#pencilOptions > .lineWidth').val() = lineWidth
    // })
    // let colorPencil;
    // $('#colorPencil').on('change', (e) => {

    //     colorPencil = $('#colorPencil').val()
    //     //console.log($('#pencilOptions > .lineWidth').val());
    //     //$('#pencilOptions > .lineWidth').val() = lineWidth
    // })
    // let lineCapPencil;
    // $('#radiosPencil').on('change', (e) => {
    //     console.log('jestem');

    //     lineCapPencil 
    //     console.log($('[name=lineCapPencil]:checked').val());
    //     //$('#pencilOptions > .lineWidth').val() = lineWidth
    // })

    function undofn(e) {
        if (e.type != 'mouseout') {
            restore_array.push($ctx.getImageData(0, 0, $c.width(), $c.height()))
            index += 1
        }
        // console.log(index, restore_array)
    }

    let isPencil
    $c.on('mousedown touchstart', (e) => {
        //tyuf
        console.log(e.type)


        if (whichBtn == 'pencil' && document.documentElement.scrollTop == 0 && document.body.scrollTop == 0) {
            isPencil = true


            $ctx.beginPath();


            if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) ||
                /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
                let touch = e.originalEvent.touches[0]

                var x = touch.pageX;
                var y = touch.pageY;

                $ctx.moveTo(x - $c.offset().left, y - $c.offset().top);

            } else {
                $ctx.moveTo(e.clientX - $c.offset().left, e.clientY - $c.offset().top);
            }

            e.preventDefault()
        }
    })

    $c.on('mouseup touchend', (e) => {
        if (document.documentElement.scrollTop > 0 || document.body.scrollTop > 0)
            document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
    })

    $c.on('mousemove touchmove', (e) => {

        //  $('body').css('cursor', `url('ja.jpg')`)


        if (isPencil && whichBtn == 'pencil' && document.documentElement.scrollTop == 0 && document.body.scrollTop == 0) {
            console.log(e.type)



            if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) ||
                /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
                let touch = e.originalEvent.touches[0]
                var x = touch.pageX;
                var y = touch.pageY;

                $ctx.lineTo(x - $c.offset().left, y - $c.offset().top);



            } else {
                $ctx.lineTo(e.clientX - $c.offset().left, e.clientY - $c.offset().top);
            }

            //$ctx.stroke(); // Draw it

            $ctx.lineJoin = 'round'
            $ctx.lineCap = $('[name=lineCapPencil]:checked').val()

            $ctx.lineWidth = $('#lineWidthPencil').val()

            $ctx.strokeStyle = $('#colorPencil').val()

            // console.log(e.clientX - $c.offset().left);
            $ctx.stroke()
            //console.log(e.offsetX, e.clientX - $c.offset().left);
            // if(e.clientX - $c.offset().left == 0)
            // isPencil=false

        }
    }).on('mouseleave touchcancel', (e) => {
        isPencil = false

        // if(whichBtn == 'pencil')
        // undofn(e)
        //$ctx.closePath()
    })
    // .on('mouseenter', ()=>{
    //     if(isPencil==true)
    //     $ctx.beginPath()
    // })

    $c.on('mouseup touchend', (e) => {
        isPencil = false
        $ctx.closePath()

        if (whichBtn == 'pencil')
            undofn(e)
        // $ctx.save()

    })



    //is








    // let lineWidthLine;
    // $('#lineWidthLine').on('change', (e) => {

    //     lineWidthLine = $('#lineWidthLine').val()
    //     //console.log($('#pencilOptions > .lineWidth').val());
    //     //$('#pencilOptions > .lineWidth').val() = lineWidth
    // })
    // let colorLine;
    // $('#colorLine').on('change', (e) => {

    //     colorLine = $('#colorLine').val()
    //     //console.log($('#pencilOptions > .lineWidth').val());
    //     //$('#pencilOptions > .lineWidth').val() = lineWidth
    // })
    // let lineCapLine;
    // $('#radiosLine').on('change', (e) => {
    //     console.log('jestem');

    //     lineCapLine = $('[name=lineCap]:checked').val()
    //     console.log($('[name=lineCap]:checked').val());
    //     //$('#pencilOptions > .lineWidth').val() = lineWidth
    // })
    $('#join').on('click', () => {
        console.log('JOIN', $('#join').is(':checked'));
    })


    function drawLine($ctx, line) {
        const {
            start,
            end,
            lineWidth = $('#lineWidthLine').val(),
            lineCap = $('[name=lineCap]:checked').val(),
            strokeStyle = $('#colorLine').val(),
        } = line

        // if (!start || !end) {
        //     throw new Error('Start or end of line not defined.')
        // }
        // console.log('DRAWLINE', $ctx, line);
        if (whichBtn == 'line') {
            $ctx.beginPath()
            $ctx.moveTo(start.x, start.y)
            $ctx.lineTo(end.x, end.y)
            $ctx.lineWidth = lineWidth
            $ctx.lineCap = lineCap
            $ctx.strokeStyle = strokeStyle
            $ctx.stroke()
        }
    }




    //let isJoin = $('#join').is(':checked')
    let isLine
    let mouseDownPos = null
    $c.on('mousedown touchstart', (e) => {
        // console.log('down');
        // console.log('join lines', isJoin);
        if (whichBtn == 'line' && document.body.scrollTop == 0 && document.documentElement.scrollTop == 0) {
            isLine = true
            //isJoin = true
            if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) ||
                /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
                let touch = e.originalEvent.touches[0]
                var x = touch.pageX;
                var y = touch.pageY;
                mouseDownPos = {
                    x: x - $c.offset().left,
                    y: y - $c.offset().top
                }

            } else {
                mouseDownPos = {
                    x: e.clientX - $c.offset().left,
                    y: e.clientY - $c.offset().top
                }
            }


            //console.log('mousedownpos', mouseDownPos);

            const line = {
                start: mouseDownPos,
                end: mouseDownPos,
            }

            drawLine($ctx, line)
            // let imgData = $ctx.getImageData(0, 0, $c.width(), $c.height());
            $(this).data('imgData', $ctx.getImageData(0, 0, $c.width(), $c.height()))
        }
    }).on('mousemove touchmove', (e) => {

        //console.log('MOVE');

        if (isLine && whichBtn == 'line') {
            let imgData = $(this).data('imgData')
            console.log('imgdata', imgData);

            if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) ||
                /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
                let touch = e.originalEvent.touches[0]
                var x = touch.pageX;
                var y = touch.pageY;
                currentPos = {
                    x: x - $c.offset().left,
                    y: y - $c.offset().top
                }

            } else {
                currentPos = {
                    x: e.clientX - $c.offset().left,
                    y: e.clientY - $c.offset().top
                }
            }

            let line = {
                start: mouseDownPos,
                end: currentPos
            }
            $ctx.clearRect(0, 0, $c.width(), $c.height())
            $ctx.putImageData(imgData, 0, 0);
            //console.log(imgData);

            drawLine($ctx, line)

        }
        e.preventDefault()
    })
    $c.on('mouseup touchend', (e) => {
        //console.log('UP');
        if (whichBtn == 'line')
            undofn(e)
        isLine = false
    })


    ////////titaj chciałem zrobić łączone linie ale nie wyszło/////////////
    // $c.on('mousemove', (e) => {



    //     if ( whichBtn == 'line' ) {
    //         //let imgData = $(this).data('imgData')

    //         let currentPos = {
    //             x: e.clientX - $c.offset().left,
    //             y: e.clientY - $c.offset().top
    //         }

    //         let line = {
    //             start: mouseDownPos,
    //             end: currentPos
    //         }
    //         //$ctx.clearRect(0, 0, $c.width(), $c.height())
    //        // $ctx.putImageData(imgData, 0, 0);


    //         drawLine($ctx, line)

    //     }

    // })

















    // let strokeWidth;
    // $('#shapeOptions > .style > .lineWidthShape').on('change', (e) => {

    //     strokeWidth = $('#shapeOptions > .style > .lineWidthShape').val()
    //     console.log('strokeWIdth', strokeWidth);

    //     //console.log($('#pencilOptions > .lineWidth').val());
    //     //$('#pencilOptions > .lineWidth').val() = lineWidth
    // })
    // let colorStroke;
    // $('#shapeOptions > .style > .colorStroke').on('change', (e) => {

    //     colorStroke = $('#shapeOptions > .style > .colorStroke').val()
    //     console.log('colorStroke', colorStroke);

    //     //console.log($('#pencilOptions > .lineWidth').val());
    //     //$('#pencilOptions > .lineWidth').val() = lineWidth
    // })
    // let colorFill;
    // $('#shapeOptions > .style > .colorFill').on('change', (e) => {

    //     colorFill = $('#shapeOptions > .style > .colorFill').val()
    //     console.log('colorFill', colorFill);
    //     // console.log(colorFill);
    //     //$('#pencilOptions > .lineWidth').val() = lineWidth
    // })
    // let whichShape;
    // $('#shapeOptions > .shape').on('change', (e) => {


    //     whichShape = $('[name=shape]:checked').val()
    //     console.log('whichShape', whichShape);
    //     //$('#pencilOptions > .lineWidth').val() = lineWidth
    // })
    // let whichStyle
    // $('#shapeOptions > .style').on('change', (e) => {
    //     whichStyle = $('[name=style]:checked').val()
    //     console.log('whichStyle', whichStyle);

    // })
    function drawShape($ctx, shape) {
        const {
            start,
            end,
            fillStyle = $('#colorFill').val(),
            colorStroke = $('#colorStroke').val(),
            strokeWidth = $('#lineWidthShape').val(),
            whichShape = $('[name=shape]:checked').val(),
            isChecked1 = $('#stroke').is(':checked'),
            isChecked2 = $('#fill').is(':checked'),
        } = shape

        // if (!start || !end) {
        //     throw new Error('Start or end of line not defined.')
        // }
        //console.log('DRAWSHAPE', $ctx, shape);
        $ctx.beginPath()

        if (isChecked1) {
            $ctx.lineWidth = strokeWidth;
            $ctx.strokeStyle = colorStroke;
        }
        if (isChecked2) {
            $ctx.fillStyle = fillStyle;
        }


        //tutaj poprawić parametry, jakoś oblczyć długość i wysokoś 
        if (whichShape == 'square')
            $ctx.rect(start.x, start.y, end.x - start.x, end.y - start.y);
        else
            $ctx.arc(start.x, start.y, Math.sqrt((start.x - end.x) * (start.x - end.x) + (start.y - end.y) * (start.y - end.y)), 0, 2 * Math.PI);

        if (isChecked1) {
            $ctx.stroke()
        }
        if (isChecked2) {
            $ctx.fill()
        }
        $ctx.closePath()




    }



    let isShape
    let mouseDownPosS = null
    $c.on('mousedown touchstart', (e) => {
        // console.log('down');


        if (whichBtn == 'shape' && document.body.scrollTop == 0 && document.documentElement.scrollTop == 0) {
            isShape = true



            if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) ||
                /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
                let touch = e.originalEvent.touches[0]
                var x = touch.pageX;
                var y = touch.pageY;
                mouseDownPosS = {
                    x: x - $c.offset().left,
                    y: y - $c.offset().top
                }


            } else {
                mouseDownPosS = {
                    x: e.clientX - $c.offset().left,
                    y: e.clientY - $c.offset().top
                }
            }
            //console.log('mousedownpos', mouseDownPos);

            const shape = {
                start: mouseDownPosS,
                end: mouseDownPosS,
            }

            drawShape($ctx, shape)
            // console.log('qw', $ctx, shape);

            // let imgData = $ctx.getImageData(0, 0, $c.width(), $c.height());
            $(this).data('imgData', $ctx.getImageData(0, 0, $c.width(), $c.height()))
        }
    }).on('mousemove touchmove', (e) => {

        //console.log('MOVE');

        if (isShape && whichBtn == 'shape') {
            let imgData = $(this).data('imgData')

            if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) ||
                /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
                let touch = e.originalEvent.touches[0]
                var x = touch.pageX;
                var y = touch.pageY;
                currentPosS = {
                    x: x - $c.offset().left,
                    y: y - $c.offset().top
                }

            } else {
                currentPosS = {
                    x: e.clientX - $c.offset().left,
                    y: e.clientY - $c.offset().top
                }
            }

            let shape = {
                start: mouseDownPosS,
                end: currentPosS
            }
            $ctx.clearRect(0, 0, $c.width(), $c.height())
            $ctx.putImageData(imgData, 0, 0);
            //console.log(imgData);

            drawShape($ctx, shape)

        }

    })
    $c.on('mouseup touchend', (e) => {
        //console.log('UP');
        if (whichBtn == 'shape')
            undofn(e)
        isShape = false
    })







    // $('#text').on('click', (e) => {
    //     e.preventDefault()
    //     $('#text').get(0).blur()
    //     $('#textContent').get(0).focus()
    // })
    //texttt
    function textFn(e) {
        e.preventDefault()
        console.log('value', $('#textContent').val())
        if ($('#textContent').val() == '') {

            if (e.type !== 'mousemove') {
                $('textarea')[0].animate({
                    border: '3px solid red',
                    background: 'rgba(225, 0, 0, .5)'
                }, 100);
            }

            e.preventDefault()
            $('#text').get(0).blur()
            $('#textContent').get(0).focus()

            if (e.type !== 'mousemove') {
                $('#middle > span').html('You have to type some text firstly.')
            }

        } else $('#middle > span').html('&nbsp;')


        let isChecked1 = $('#strokeText').is(':checked');
        let isChecked2 = $('#fillText').is(':checked');
        // $ctx.beginPath();
        //$ctx.moveTo(e.clientX - $c.offset().left, e.clientY - $c.offset().top);
        $ctx.font = ` ${$('[name=radiosText]:checked').val()}   ${$('#textSize').val()}px 
    ${$('#fontSelect').val()}
    `;
        //console.log($('#textSize').val());

        if (isChecked1) {
            $ctx.lineWidth = $('#textStrokeWidth').val()
            $ctx.strokeStyle = $('#colorStrokeText').val()
            $ctx.strokeText(`${$('#textContent').val()}`, e.clientX - $c.offset().left, e.clientY - $c.offset().top);
        }
        if (isChecked2) {
            $ctx.fillStyle = $('#colorFillText').val()
            // console.log($('#colorFillText').val());

            $ctx.fillText(`${$('#textContent').val()}`, e.clientX - $c.offset().left, e.clientY - $c.offset().top);
        }
    }

    $c.on('mousemove', (e) => {
        // let before = $ctx.getImageData(0, 0, $c.width(), $c.height())
        if (whichBtn == 'text' && document.body.scrollTop == 0 && document.documentElement.scrollTop == 0) {
            isText = true
            $ctx.putImageData(restore_array[index], 0, 0);
            textFn(e)
            // undofn(e)
            e.preventDefault()
        }
    })

    $c.on('mouseout', (e) => {
        if (whichBtn == 'text' && document.body.scrollTop == 0 && document.documentElement.scrollTop == 0)
            $ctx.putImageData(restore_array[index], 0, 0);
    })

    let isText
    $c.on('mousedown', (e) => {
        if (whichBtn == 'text' && document.body.scrollTop == 0 && document.documentElement.scrollTop == 0) {
            isText = true

            textFn(e)
            if ($('#textContent').val() !== '')
                undofn(e)
            e.preventDefault()
        }
    })













    //modify
    // $('#scaleCanvas').on('change', () => {
    //     // let x = $ctx.getImageData(0, 0, $c.width(), $c.height())


    //     console.log('skaluję', $('#scaleCanvas').val(), restore_array[index]);

    //     $ctx.scale($('#scaleCanvas').val(), $('#scaleCanvas').val())
    //     $ctx.drawImage(restore_array[index], 0, 0)



    // })


    // var image = new Image(); // see note on creating an image
    // image.src = "https://www.mantruckandbus.com/fileadmin/_processed_/1/1/csm_man-holger-von-der-heide-interview-header_02ae36db18.jpg";
    // console.log(image.style.width);

    // image.width = '100px'
    // image.onload = function () {
    //     $ctx.drawImage(this, 0, 0);
    // }

    //this is to prevent scrolling whole div while changing the range value on mobile devices
    $('input[type=range]').on('touchstart', (e) => {
        $("body").css("overflow", "hidden")
    })


});




// let dataURI = []
// let savedimage = []
// let i = 0

// $('#save').on('click', () => {
//     dataURI[i] = $c[0].toDataURL()
//     console.log('data',dataURI[i]);

//     savedimage[i] = $(`<img src="${dataURI[i]}"  id="imageConverted${i}" style="border: 1px solid white; width: 400px; height: 200px"/>`)
//     // console.log(dataURI);
//     // console.log('save');
//     //const imag = $('<image/>')

//     //imag.src=dataURI
//     // console.log($('#imageConverted').src);

//     savedimage[i].attr('src', dataURI[i])
//     $('#savedImages').prepend(savedimage[i])

//     i++
// })