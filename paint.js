let c = document.querySelector('CANVAS');
let ctx = c.getContext('2d')
c.siteRoot = $('.site-root').val();
ctx.siteRoot = $('.site-root').val();

c.width = window.innerWidth * .6
c.height = window.innerHeight * .75
$(document).ready(function () {

    console.log(c, ctx);

    const $c = $('canvas')
    const $ctx = $($c)[0].getContext('2d')
    //  $c.css('width', `${window.innerWidth}`)
    // $c.css('height', `${window.innerWidth}`)
    //    $c.width(window.innerWidth)
    //    $c.height(window.innerHeight - 120)

    let whichBtn = 'pencil'
    $('#clear').on('click', () => {
        $ctx.fillStyle = 'white'
        $ctx.fillRect(0, 0, $c.width(), $c.height())
        console.log('czyszczę', $c.width());

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




    let lineWidthPencil;
    $('#lineWidthPencil').on('change', (e) => {

        lineWidthPencil = $('#lineWidthPencil').val()
        //console.log($('#pencilOptions > .lineWidth').val());
        //$('#pencilOptions > .lineWidth').val() = lineWidth
    })
    let colorPencil;
    $('#colorPencil').on('change', (e) => {

        colorPencil = $('#colorPencil').val()
        //console.log($('#pencilOptions > .lineWidth').val());
        //$('#pencilOptions > .lineWidth').val() = lineWidth
    })
    let lineCapPencil;
    $('#radiosPencil').on('change', (e) => {
        console.log('jestem');

        lineCapPencil = $('[name=lineCapPencil]:checked').val()
        console.log($('[name=lineCapPencil]:checked').val());
        //$('#pencilOptions > .lineWidth').val() = lineWidth
    })



    let isPencil
    $c.on('mousedown', (e) => {
        isPencil = true
        $ctx.beginPath();
        $ctx.moveTo(e.clientX - $c.offset().left, e.clientY - $c.offset().top);
        e.preventDefault()
    })


    $c.on('mousemove', (e) => {
        // funkcja rysująca pencil

        // if (e.offsetX < 0 || e.offsetX > c.width) isDrawing = false

        if (isPencil && whichBtn == 'pencil') {
            $ctx.lineTo(e.clientX - $c.offset().left, e.clientY - $c.offset().top);
            //$ctx.stroke(); // Draw it


            $ctx.lineCap = lineCapPencil
            $ctx.lineWidth = lineWidthPencil;
            console.log('linewidth pencil: ', $ctx.lineWidth);
            $ctx.strokeStyle = colorPencil; // Green path
            $ctx.stroke()
            //console.log(e.offsetX, e.clientX - $c.offset().left);

        }
    })
    $c.on('mouseup', (e) => {
        isPencil = false
        $ctx.closePath()
    })












    let lineWidthLine;
    $('#lineWidthLine').on('change', (e) => {

        lineWidthLine = $('#lineWidthLine').val()
        //console.log($('#pencilOptions > .lineWidth').val());
        //$('#pencilOptions > .lineWidth').val() = lineWidth
    })
    let colorLine;
    $('#colorLine').on('change', (e) => {

        colorLine = $('#colorLine').val()
        //console.log($('#pencilOptions > .lineWidth').val());
        //$('#pencilOptions > .lineWidth').val() = lineWidth
    })
    let lineCapLine;
    $('#radiosLine').on('change', (e) => {
        console.log('jestem');

        lineCapLine = $('[name=lineCap]:checked').val()
        console.log($('[name=lineCap]:checked').val());
        //$('#pencilOptions > .lineWidth').val() = lineWidth
    })

    let isLine
    $c.on('mousedown', (e) => {
        isLine = true
        $ctx.beginPath();
        $ctx.moveTo(e.clientX - $c.offset().left, e.clientY - $c.offset().top);
        e.preventDefault()
    })
    $c.on('mouseup', (e) => {
        console.log(whichBtn == 'line');
        if (isLine && whichBtn == 'line') {
            $ctx.lineTo(e.clientX - $c.offset().left, e.clientY - $c.offset().top);
            //$ctx.stroke(); // Draw it
            $ctx.lineCap = lineCapLine
            $ctx.lineWidth = lineWidthLine;
            $ctx.strokeStyle = colorLine; // Green path
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
        let cursorDownX = $(this).data('cursorDownX')
        let cursorDownY = $(this).data('cursorDownY')
        //console.log('q ', cursorDownY);

        if (isShape && whichBtn == 'shape') {
            let colorFill = $('#colorFill').val()
            let colorStroke = $('#colorStroke').val()
            let strokeWidth = $('#lineWidthShape').val()
            let whichShape = $('[name=shape]:checked').val()
            let isChecked1 = $('#stroke').is(':checked');
            let isChecked2 = $('#fill').is(':checked');
            console.log('grubość', strokeWidth);


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

        }
    })

});