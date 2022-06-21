let c = document.querySelector('CANVAS');
let ctx = c.getContext('2d')
c.siteRoot = $('.site-root').val();
ctx.siteRoot = $('.site-root').val();

c.width = window.innerWidth * .6
c.height = window.innerHeight * .75
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


    $('#clear').on('click', () => {
        $ctx.fillStyle = 'white'
        $ctx.fillRect(0, 0, $c.width(), $c.height())
        // console.log('czyszczę', $c.width());
        isLine = false

    })
    $('#save').on('click', () => {
        const dataURI = $c[0].toDataURL()
        // console.log(dataURI);
        // console.log('save');
        //const imag = $('<image/>')
        //imag.src=dataURI
        // console.log($('#imageConverted').src);

        $('#imageConverted').attr('src', dataURI)



    })
    $('#pencil').on('click', () => {
        whichBtn = 'pencil'
        for (let i = 0; i < $('.Options').length; i++) {
            $('.Options').css('display', 'none')
        }
        $('#pencilOptions').css('display', 'flex')

    })
    $('#line').on('click', () => {
        whichBtn = 'line'
        for (let i = 0; i < $('.Options').length; i++) {
            $('.Options').css('display', 'none')
        }
        $('#lineOptions').css('display', 'flex')

    })
    $('#shape').on('click', () => {
        whichBtn = 'shape'
        for (let i = 0; i < $('.Options').length; i++) {
            $('.Options').css('display', 'none')
        }
        $('#shapeOptions').css('display', 'flex')
    })
    $('#text').on('click', () => {
        whichBtn = 'text'
        for (let i = 0; i < $('.Options').length; i++) {
            $('.Options').css('display', 'none')
        }
        $('#textOptions').css('display', 'flex')
    })
    $('#download').on('click', () => {
        //przydałoby się jeszcze może do IE
        const a = document.createElement('a')

        a.href = $c[0].toDataURL()
        a.download = 'canvas-image.png'
        a.click()
    })
    //////////////////////////////////////////////////////////////



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



    let isPencil
    $c.on('mousedown', (e) => {

        if (whichBtn == 'pencil') {
            isPencil = true
            $ctx.beginPath();
            $ctx.moveTo(e.clientX - $c.offset().left, e.clientY - $c.offset().top);
            e.preventDefault()
        }
    })


    $c.on('mousemove', (e) => {
        // funkcja rysująca pencil

        // if (e.offsetX < 0 || e.offsetX > c.width) isDrawing = false

        if (isPencil && whichBtn == 'pencil') {


            $ctx.lineTo(e.clientX - $c.offset().left, e.clientY - $c.offset().top);
            //$ctx.stroke(); // Draw it

            $ctx.lineJoin = 'round'
            $ctx.lineCap = $('[name=lineCapPencil]:checked').val()

            $ctx.lineWidth = $('#lineWidthPencil').val()

            $ctx.strokeStyle = $('#colorPencil').val()
            console.log('colorPencil', $('#colorPencil').val());
            $ctx.stroke()
            //console.log(e.offsetX, e.clientX - $c.offset().left);

        }
    })
    $c.on('mouseup', (e) => {
        isPencil = false
        $ctx.closePath()
        $ctx.save()
    })












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

    let isLine
    $c.on('mousedown', (e) => {

        if (whichBtn == 'line') {
            isLine = true
            $ctx.beginPath();
            //$ctx.save()
            $ctx.moveTo(e.clientX - $c.offset().left, e.clientY - $c.offset().top);
            e.preventDefault()
            //let imgData = $ctx.getImageData(0, 0, $c.width(), $c.height());
            $(this).data('imgData', $ctx.getImageData(0, 0, $c.width(), $c.height()))
        }
    }).on('mousemove', (e) => {
        //let imgData = ctx.createImageData($c.width(), $c.height());

        if (isLine && whichBtn == 'line') {
            //$ctx.save()


            //console.log(imgData);
            console.log('zapisuję');

            $ctx.lineTo(e.clientX - $c.offset().left, e.clientY - $c.offset().top);
            //$ctx.stroke(); // Draw it
            $ctx.lineCap = $('[name=lineCap]:checked').val()
            $ctx.lineWidth = $('#lineWidthLine').val()
            $ctx.strokeStyle = $('#colorLine').val()

            // 

            $ctx.clearRect(0, 0, $c.width(), $c.height())
            const imgData = $(this).data('imgData')
            $ctx.putImageData(imgData, 0, 0);
            console.log(imgData);

            $ctx.stroke()



            $ctx.closePath();

        }

    }).on('mouseup', (e) => {

        if (isLine && whichBtn == 'line') {
            isLine = false
            //e.log($('#lineWidthLine').val());
            $ctx.lineTo(e.clientX - $c.offset().left, e.clientY - $c.offset().top);
            //$ctx.stroke(); // Draw it
            $ctx.lineCap = $('[name=lineCap]:checked').val()
            $ctx.lineWidth = $('#lineWidthLine').val()
            $ctx.strokeStyle = $('#colorLine').val()
            $ctx.stroke()
            //console.log(e.offsetX, e.clientX - $c.offset().left);
            $ctx.closePath()
        }
    })






















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
    let isShape
    $c.on('mousedown', (e) => {

        isShape = true
        $(this).data('cursorDownX', e.clientX - $c.offset().left)
        $(this).data('cursorDownY', e.clientY - $c.offset().top)
    }).on('mouseup', (e) => {


        //console.log('q ', cursorDownY);

        if (isShape && whichBtn == 'shape') {
            let cursorDownX = $(this).data('cursorDownX')
            let cursorDownY = $(this).data('cursorDownY')

            let colorFill = $('#colorFill').val()
            let colorStroke = $('#colorStroke').val()
            let strokeWidth = $('#lineWidthShape').val()
            let whichShape = $('[name=shape]:checked').val()
            let isChecked1 = $('#stroke').is(':checked');
            let isChecked2 = $('#fill').is(':checked');
            //e.log('grubość', strokeWidth);


            if (isChecked1) {
                $ctx.lineWidth = strokeWidth;
                $ctx.strokeStyle = colorStroke;
            }
            if (isChecked2) {
                $ctx.fillStyle = colorFill;
            }

            //tutaj poprawić parametry, jakoś oblczyć długość i wysokoś 
            if (whichShape == 'square')
                $ctx.rect(cursorDownX, cursorDownY, 10, -100);
            else
                $ctx.arc(100, 100, 50, 0, 2 * Math.PI);

            if (isChecked1) {
                $ctx.stroke()
            }
            if (isChecked2) {
                $ctx.fill()
            }
            $ctx.closePath()
        }
    })



    let isText
    $c.on('mousedown', (e) => {

        if (whichBtn == 'text') {
            isText = true
            let isChecked1 = $('#strokeText').is(':checked');
            let isChecked2 = $('#fillText').is(':checked');
            // $ctx.beginPath();
            //$ctx.moveTo(e.clientX - $c.offset().left, e.clientY - $c.offset().top);
            $ctx.font = ` ${$('[name=radiosText]:checked').val()}   ${$('#textSize').val()}px Georgia`;
            console.log($('#textSize').val());

            if (isChecked1) {
                $ctx.lineWidth = $('#textStrokeWidth').val()
                $ctx.strokeStyle = $('#colorStrokeText').val()
                $ctx.strokeText(`${$('#textContent').val()}`, e.clientX - $c.offset().left, e.clientY - $c.offset().top);
            }
            if (isChecked2) {
                $ctx.fillStyle = $('#colorFillText').val()
                console.log($('#colorFillText').val());

                $ctx.fillText(`${$('#textContent').val()}`, e.clientX - $c.offset().left, e.clientY - $c.offset().top);
            }


            e.preventDefault()
        }
    })






});