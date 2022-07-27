// dodawanie zdjeć, color picker i tooltip dla range'y, poprawić colors, wysokość canvasa a wysokoś urządzenia, tablinks, responsywne options poniżej 1100px, może poprawić download, tools width after zooming in refreshing and zooming out, background toolsów na 1100px, wysokość #options i #download na szerszych ekranach, poprawić download na moblinych (jest nierówno), disable landscape mode, plugin loading spinner, tools cień, choose between screen width or window.innerwidth in logic.js,

//=== zamiast ==, usunąć zbędne komentarze
$(window).load(function () {
    // PAGE IS FULLY LOADED  
    // FADE OUT YOUR OVERLAYING DIV

    $('#beforeload').fadeOut();
});

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
    // console.log($(window).width());



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
    let j = 0;
    let savedimg = []
    $('#uploadImage').on('input', (e) => {


        savedimg[j] = $(`<image src="${$('#uploadImage').val()}"  id="imageUploaded${j}" class="img imgUploaded" crossorigin='anonymous' onerror="$('#imageUploaded${j}').remove()" />`)

        $('#middle span').html('If the address is proper, you should see your image in images > gallery > uploaded')
        $('#middle span').css('color', 'white')

        $('#uploadedImagesDiv').prepend(savedimg[j])
        j++

    })





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

        //console.log(index, restore_array)

    })

    $('#clear').on('click', (e) => {

        $ctx.fillStyle = 'white'
        $ctx.fillRect(0, 0, $c.width(), $c.height())
        undofn(e)
        // console.log('czyszczę', $c.width());
        isLine = false
        $('#middle span').html('You cleared the canvas. You can undo it by clicking the undo button.')
        $('#middle span').css('color', 'white')


    })
    //cleaning the span below the canvas
    $c.on('click', () => {
        if (!$('#middle span').text().length == 0 && whichBtn !== 'text' && whichBtn !== 'select') {
            $('#middle span').css('color', 'transparent')
            $('#middle span').html('q')
        }
    })


    let dataURI = []
    let savedimage = []
    let i = 0
    let overlay = []

    $('#save').on('click', () => {
        dataURI[i] = $c[0].toDataURL()
        // dataURI[i].slice(5, 13)
        // console.log('data', dataURI[i].slice(5, 14));

        if (i == 0)
            $('#savedImages').html('')




        savedimage[i] = $(`<image src="${dataURI[i]}" class="savedImage" id="imageConverted${i}" style="border: 1px solid black" 
        />`)

        overlay[i] = $(`<div id='overlay' class='overlays' style="height: 100%; width: 100%; background: black; opacity: 0" ></div>`)
        // console.log(dataURI);
        // console.log('save');
        //const imag = $('<image/>')

        //imag.src=dataURI
        // console.log($('#imageConverted').src);
        savedimage[i].prepend(overlay[i])
        // savedimage[i].attr('src', dataURI[i])
        $('#savedImages').prepend(savedimage[i])
        //  console.log('saveImage', savedimage[0]);



        i++

        $('#middle > span').html("You created a new draft! Click on it any time you want in order to display it again on the canvas.")
    })

    //let elemnt = window.dzieci


    $(document).on('click', (e) => {
        //clear the input
        //alert('edede', e.target.id.slice(0,3))
        $('#uploadImage').val('')

        if ($('input[name=radioCopy]').is(':checked')) {
            console.log('copy');
        }
        if ($('input[name=radioDelete]').is(':checked')) {
            console.log('Delete');
        }
        if ($('input[name=radioCut]').is(':checked')) {
            console.log('Cut');
        }



        console.log('wwwwww', e.target.id);
        //console.log('ss', e.target.id.slice(0, 14));
        if (e.target.id.slice(0, 7) == 'tablink') {
            for (let i = 1; i <= $(".tablink").length; i++) {
                $(`#tabCon${i}`).css('display', 'none')
            }
        }
        $(`#tabCon${e.target.id.slice(7,8)}`).slideDown(200)
        $(`#tabCon${e.target.id.slice(7,8)}`).css('display', 'block')



        if (e.target.id.slice(0, 14) == 'imageConverted') {
            const image = e.target
            //console.log('over', e.target.src);
            $ctx.drawImage(image, 0, 0)
            undofn(e)
        }
        if (e.target.id == 'download' || e.target.id == 'download1' || e.target.id == 'download2' || e.target.id == 'ds' || e.target.id == 'ds1' || e.target.id == 'di2') {
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

            // if ($('.radioColors').eq(i).is(':checked')) {
            //     $('.labelColors').eq(i).css('color', 'white')
            // } else $('.labelColors').eq(i).css('color', 'grey')

        }


        //imagessss
        if (e.target.id.slice(0, 3) == 'img' || e.target.id.slice(0, 13) == 'imageUploaded' || e.target.id.slice(0, 3) == 'obj' || e.target.id.slice(0, 13) == 'imageSelected') {
            window.imagee = e.target
            // console.log('a', e.target.width)


        }
    })

    $('#showImgBtn').on('click', (e) => {
        $('#id01').css('display', 'block');
        $("#tablink1").click();
    })

    const modal = $('#id01')
    const modalC = $('.modal-content')
    const closebtn = $('#close')

    $(window).click((event) => {
        console.log(event.target.id)
        if (event.target.id == 'id01' || event.target.id == 'close' || event.target.id.slice(0, 3) == 'img' || event.target.id.slice(0, 13) == 'imageUploaded' || event.target.id.slice(0, 3) == 'obj' || event.target.id.slice(0, 13) == 'imageSelected') {
            modal.css('background-color', 'rgb(0,0,0,0)');
            closebtn.css('display', 'none');
            modalC.addClass('closeanim')
            setTimeout(() => {
                modal.css('display', 'none');
                modal.css('background-color', 'rgb(0,0,0,0.4)')
                modalC.removeClass('closeanim')
                closebtn.css('display', 'block');

            }, 400)
        }
    })

    // Get the element with id="tablink1" and click on it by default

    // chuj nie działa




    $('#labelInverted').on('mousedown touch', (e) => {
        let a = $ctx.getImageData(0, 0, $c.width(), $c.height())
        const data = a.data;
        for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i]; // red
            data[i + 1] = 255 - data[i + 1]; // green
            data[i + 2] = 255 - data[i + 2]; // blue
        }
        $ctx.putImageData(a, 0, 0)
        undofn(e)
    })

    $('#labelGrayScale').on('mousedown touch', (e) => {
        let a = $ctx.getImageData(0, 0, $c.width(), $c.height())
        const data = a.data;
        for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg; // red
            data[i + 1] = avg; // green
            data[i + 2] = avg; // blue
        }
        $ctx.putImageData(a, 0, 0)
        undofn(e)
    })

    $('#labelSepia').on('mousedown touch', (e) => {
        let a = $ctx.getImageData(0, 0, $c.width(), $c.height())
        const dataArray = a.data;
        for (var i = 0; i < dataArray.length; i += 4) {
            var red = dataArray[i];
            var green = dataArray[i + 1];
            var blue = dataArray[i + 2];
            var alpha = dataArray[i + 3];

            var outRed = (red * .393) + (green * .769) + (blue * .189); // calculate value for red channel in pixel
            var outGreen = (red * .349) + (green * .686) + (blue * .168);
            var outBlue = (red * .272) + (green * .534) + (blue * .131);

            dataArray[i] = outRed < 255 ? outRed : 255; // check if the value is less than 255, if more set it to 255
            dataArray[i + 1] = outGreen < 255 ? outGreen : 255;
            dataArray[i + 2] = outBlue < 255 ? outBlue : 255
            dataArray[i + 3] = alpha;
        }

        $ctx.putImageData(a, 0, 0)
        undofn(e)
    })


    $('#red').on('mousedown', (e) => {
        $(this).data('prevValue', $('#red').val())

    }).on('mouseup', (e) => {
        let prevValue = $(this).data('prevValue')
        let difference = $('#red').val() - prevValue
        let a = $ctx.getImageData(0, 0, $c.width(), $c.height())
        const data = a.data;
        //let val = $('#red').val()
        for (let i = 0; i < data.length; i += 4) {
            data[i] = data[i] + difference; // red
            data[i + 1] = data[i + 1]; // green
            data[i + 2] = data[i + 2]; // blue
        }
        $ctx.putImageData(a, 0, 0)
        undofn(e)
    })

    $('#green').on('mousedown', (e) => {
        $(this).data('prevValue', $('#green').val())

    }).on('mouseup', (e) => {
        let prevValue = $(this).data('prevValue')
        let difference = $('#green').val() - prevValue

        let a = $ctx.getImageData(0, 0, $c.width(), $c.height())
        const data = a.data;
        // let val = $('#green').val()
        for (let i = 0; i < data.length; i += 4) {
            data[i] = data[i]; // red
            data[i + 1] = data[i + 1] + difference; // green
            data[i + 2] = data[i + 2]; // blue
        }
        $ctx.putImageData(a, 0, 0)
        undofn(e)
    })

    $('#blue').on('mousedown', (e) => {
        $(this).data('prevValue', $('#blue').val())

    }).on('mouseup', (e) => {
        let prevValue = $(this).data('prevValue')
        let difference = $('#blue').val() - prevValue

        let a = $ctx.getImageData(0, 0, $c.width(), $c.height())
        const data = a.data;
        //let val = $('#blue').val()
        for (let i = 0; i < data.length; i += 4) {
            data[i] = data[i]; // red
            data[i + 1] = data[i + 1]; // green
            data[i + 2] = data[i + 2] + difference; // blue
        }
        $ctx.putImageData(a, 0, 0)
        undofn(e)
    })







    $('#lightness').on('mousedown', (e) => {
        $(this).data('prevValue', $('#lightness').val())
    }).on('mouseup', (e) => {
        let prevValue = $(this).data('prevValue')
        let difference = $('#lightness').val() - prevValue
        let a = $ctx.getImageData(0, 0, $c.width(), $c.height())
        const data = a.data;
        for (let i = 0; i < data.length; i += 4) {
            data[i] = data[i] + difference; // red
            data[i + 1] = data[i + 1] + difference; // green
            data[i + 2] = data[i + 2] + difference; // blue
        }
        $ctx.putImageData(a, 0, 0)
        undofn(e)
    })


    $('#contrast').on('mousedown', (e) => {
        $(this).data('prevValue', $('#contrast').val())
    }).on('mouseup', (e) => {
        let prevValue = $(this).data('prevValue')
        let difference = $('#contrast').val() - prevValue
        let a = $ctx.getImageData(0, 0, $c.width(), $c.height())
        const data = a.data;
        for (let i = 0; i < data.length; i += 4) {
            if (data[i] + data[i + 1] + data[i + 2] > 383) {
                data[i] = data[i] - difference
                data[i + 1 + 2] = data[i + 1 + 2] - difference
                data[i + 2] = data[i + 2] - difference
            } else {
                data[i] = data[i] + difference
                data[i + 1 + 2] = data[i + 1 + 2] + difference
                data[i + 2] = data[i + 2] + difference
            }
        }
        $ctx.putImageData(a, 0, 0)
        undofn(e)
    })
    // $('#sat').on('mousedown', (e)=>{
    //     console.log('setttttt');
    //     src = $c[0].toDataURL()

    //     $ctx.globalCompositeOperation='source-atop';
    //     const image = new Image($c.width(), $c.height())
    //     image.src= `"${src}"`
    // $ctx.drawImage(image, 0, 0);

    // // set the composite operation
    // $ctx.globalCompositeOperation ='saturation';
    // $ctx.fillStyle = "red";
    // $ctx.globalAlpha = .5;  // alpha 0 = no effect 1 = full effect
    // $ctx.fillRect(0, 0, image.width, image.height);
    // })

    // $c.on('mouseup', (e)=>{
    // $ctx.globalCompositeOperation ='destination-over';

    // })


    function imageFn(e) {
        e.preventDefault()

        let ratio = $('#imageSize').val()
        let size = (1 / ratio)
        $ctx.save();
        // $ctx.translate(e.clientX - $c.offset().left, e.clientY - $c.offset().top)

        // $ctx.rotate(45 * Math.PI / 180);
        //$ctx.translate(-(e.clientX - $c.offset().left) - window.imagee.width / 2, -(e.clientY - $c.offset().to) - window.imagee.height / 2);

        //$ctx.transform(1, -0.01, 0, 1, 0, 0);
        // 


        let x = e.clientX - $c.offset().left
        let y = e.clientY - $c.offset().top
        let width = window.imagee.width
        let height = window.imagee.height



        if (ratio > 0 && window.imagee !== undefined) {
            $ctx.drawImage(window.imagee, x - width * ratio / 2, y - height * ratio / 2, width * ratio, height * ratio)
        } else if (ratio < 0 && window.imagee !== undefined) {

            $ctx.drawImage(window.imagee, x - width * size / 2, y - height * size / 2, width * size, height * size)


        } else if (ratio == 0 && window.imagee !== undefined) $ctx.drawImage(window.imagee, x - width / 2, y - height / 2, width, height)




        //console.log($('#imageSize').val(), "aa", ratio)

        //console.log($ctx.getImageData(0, 0, $c.width(), $c.height()));
        $ctx.restore()

    }

    $c.on('mousemove', (e) => {
        // let before = $ctx.getImageData(0, 0, $c.width(), $c.height())


        if (whichBtn == 'images' && document.body.scrollTop == 0 && document.documentElement.scrollTop == 0) {




            isImage = true
            $ctx.putImageData(restore_array[index], 0, 0);

            if (window.imagee !== undefined)
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

let box, x;
    $('#pencil').on('click', () => {

        for (let i = 0; i < $('.Options').length; i++) {
            $('.Options').css('display', 'none')
        }
        if (whichBtn !== 'pencil')
            $('#pencilOptions').slideDown(200)
        $('#pencilOptions').css('display', 'flex')
        whichBtn = 'pencil'
       
        
        box=$('#pencilOptions')
    })
    $('#line').on('click', () => {

        for (let i = 0; i < $('.Options').length; i++) {
            $('.Options').css('display', 'none')
        }
        if (whichBtn !== 'line')
            $('#lineOptions').slideDown(200)

        $('#lineOptions').css('display', 'flex')
        whichBtn = 'line'
        box=$('#lineOptions')


    })
    $('#shape').on('click', () => {

        for (let i = 0; i < $('.Options').length; i++) {
            $('.Options').css('display', 'none')
        }
        if (whichBtn !== 'shape')
            $('#shapeOptions').slideDown(200)

        $('#shapeOptions').css('display', 'flex')
        whichBtn = 'shape'
        box=$('#shapeOptions')

    })
    $('#text').on('click', () => {

        for (let i = 0; i < $('.Options').length; i++) {
            $('.Options').css('display', 'none')
        }
        if (whichBtn !== 'text')
            $('#textOptions').slideDown(300)

        $('#textOptions').css('display', 'flex')
        //e.preventDefault()
        $('#text').get(0).blur()
        $('#textContent').get(0).focus()

        $('#textOptions').get(0).scrollTop = 0
        whichBtn = 'text'
        box=$('#textOptions')

    })


    $('#colors').on('click', () => {

        for (let i = 0; i < $('.Options').length; i++) {
            $('.Options').css('display', 'none')
        }
        if (whichBtn !== 'colors')
            $('#colorsOptions').slideDown(200)
        $('#colorsOptions').css('display', 'flex')
        whichBtn = 'colors'
        box=$('#colorsOptions')

    })
    $('#select').on('click', () => {

        for (let i = 0; i < $('.Options').length; i++) {
            $('.Options').css('display', 'none')
        }
        if (whichBtn !== 'select')
            $('#selectOptions').slideDown(200)
        $('#selectOptions').css('display', 'flex')
        whichBtn = 'select'
    })
    $('#backColor').on('change', (e) => {
        $ctx.fillStyle = $('#backColor').val()
        $ctx.fillRect(0, 0, $c.width(), $c.height())
        undofn(e)
    })

    $('#images').on('click', () => {

        for (let i = 0; i < $('.Options').length; i++) {
            $('.Options').css('display', 'none')
        }
        if (whichBtn !== 'images')
            $('#imagesOptions').slideDown(200)
        $('#imagesOptions').css('display', 'flex')
        whichBtn = 'images'
        box=$('#imagesOptions')
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
    //true if on mobile
    window.mobile = false
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) ||
        /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        document.querySelector('#joinDiv').style.display = "none"
        document.querySelector('#hr').style.display = "none"
        // document.querySelectorAll('.btn').style.color='rgba(255, 0, 0, 1)'
        window.mobile = true
        
    } //nowe

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
    // $('#join').on('click', () => {
    //     console.log('JOIN', $('#join').is(':checked'));
    // })


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
        if (whichBtn == 'line' && line.start.x - line.end.x !== 0 || line.start.y - line.end.y !== 0) {

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
    })
    $c.on('mousemove touchmove', (e) => {

        //console.log('MOVE');

        if (isLine && whichBtn == 'line') {
            let imgData = $(this).data('imgData')
            //console.log('imgdata', imgData);

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


            drawLine($ctx, line)

        }
        e.preventDefault()
    })
    $c.on('mouseup touchend', (e) => {

        if (whichBtn == 'line')
            undofn(e)
        isLine = false
        if (!$('#join').is(':checked'))
            mouseDownPos = null


    })





    $(document).on('mouseup', (e) => {
        if (whichBtn == 'line' && e.target.id !== 'canvas') {
            //undofn(e)
            $ctx.putImageData(restore_array[index], 0, 0)
            mouseDownPos = null
        }

        if (whichBtn == 'shape' && e.target.id !== 'canvas') {
            //undofn(e)
            $ctx.putImageData(restore_array[index], 0, 0)
            mouseDownPosS = null
        }

        if (whichBtn == 'select' && e.target.id !== 'canvas') {
            //undofn(e)
            $ctx.putImageData(restore_array[index], 0, 0)
            mouseDownPosSel = null
        }

    })

    $c.on('mousemove', (e) => {
        if (whichBtn == 'line' && $('#join').is(':checked')) {
            //let imgData = $(this).data('imgData')
            $ctx.putImageData(restore_array[index], 0, 0)


            let currentPos = {
                x: e.clientX - $c.offset().left,
                y: e.clientY - $c.offset().top
            }

            // let mouseDownPos = {
            //     x: e.clientX - $c.offset().left+1,
            //     y: e.clientY - $c.offset().top+1
            // }

            let line = {
                start: mouseDownPos,
                end: currentPos
            }
            //$ctx.clearRect(0, 0, $c.width(), $c.height())
            // $ctx.putImageData(imgData, 0, 0);

            drawLine($ctx, line)

        }
    })










    function drawShapeS($ctx, shapeS) {
        const {
            start,
            end,
            // fillStyle = $('#colorFill').val(),
            //colorStroke = "blue",
            strokeWidth = '1',
            whichShape = 'squareS'
            // isChecked1 = $('#stroke').is(':checked'),
            // isChecked2 = $('#fill').is(':checked'),
        } = shapeS


        // if (!start || !end) {
        //     throw new Error('Start or end of line not defined.')
        // }


        //the condition below is to not to draw a dot in the middle while stroking a circle
        if (start.x - start.y !== 0 || end.x && end.y !== 0) {
            $ctx.beginPath()
            $ctx.setLineDash([10, 15]);
            var gradient = $ctx.createLinearGradient(0, 0, $c.width(), $c.height());

            for (let i = 0; i < 100; i += 4) {
                gradient.addColorStop(`0.${i}`, "blue");
                gradient.addColorStop(`0.${i+1}`, "silver");
                gradient.addColorStop(`0.${i+2}`, "red");
            }


            // if (isChecked1) {
            $ctx.lineWidth = strokeWidth;
            $ctx.strokeStyle = gradient;
            // }
            // if (isChecked2) {
            //     $ctx.fillStyle = fillStyle;
            // }

            // $ctx.globalCompositeOperation = "darker";
            //tutaj poprawić parametry, jakoś oblczyć długość i wysokoś 
            if (whichShape == 'squareS') {
                $ctx.rect(start.x, start.y, end.x - start.x, end.y - start.y);
            } else
                $ctx.arc(start.x, start.y, Math.sqrt((start.x - end.x) * (start.x - end.x) + (start.y - end.y) * (start.y - end.y)), 0, 2 * Math.PI);

            // if (isChecked1) {

            $ctx.stroke()
            // }
            // if (isChecked2) {
            //     $ctx.fill()
            // }
            $ctx.closePath()




        }
        $ctx.setLineDash([0, 0]);
        window.start = shapeS.start
        window.end = shapeS.end

    }



    let isSelect
    let mouseDownPosSel = null
    $c.on('mousedown touchstart', (e) => {
        // console.log('down');


        if (whichBtn == 'select' && document.body.scrollTop == 0 && document.documentElement.scrollTop == 0) {
            isSelect = true



            if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) ||
                /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
                let touch = e.originalEvent.touches[0]
                var x = touch.pageX;
                var y = touch.pageY;
                mouseDownPosSel = {
                    x: x - $c.offset().left,
                    y: y - $c.offset().top
                }


            } else {
                mouseDownPosSel = {
                    x: e.clientX - $c.offset().left,
                    y: e.clientY - $c.offset().top
                }
            }
            //console.log('mousedownpos', mouseDownPos);

            const shapeS = {
                start: mouseDownPosSel,
                end: mouseDownPosSel,
            }

            drawShapeS($ctx, shapeS)
            // console.log('qw', $ctx, shape);

            // let imgData = $ctx.getImageData(0, 0, $c.width(), $c.height());
            $(this).data('imgData', $ctx.getImageData(0, 0, $c.width(), $c.height()))
        }
    }).on('mousemove touchmove', (e) => {

        //console.log('MOVE');

        if (isSelect && whichBtn == 'select') {
            let imgData = $(this).data('imgData')

            if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) ||
                /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
                let touch = e.originalEvent.touches[0]
                var x = touch.pageX;
                var y = touch.pageY;
                currentPosSel = {
                    x: x - $c.offset().left,
                    y: y - $c.offset().top
                }

            } else {
                currentPosSel = {
                    x: e.clientX - $c.offset().left,
                    y: e.clientY - $c.offset().top
                }
            }

            let shapeS = {
                start: mouseDownPosSel,
                end: currentPosSel
            }
            $ctx.clearRect(0, 0, $c.width(), $c.height())
            $ctx.putImageData(imgData, 0, 0);
            //console.log(imgData);

            drawShapeS($ctx, shapeS)

        }

    })


    $('.labelSelect').on('click', (e) => {
        let id = e.target.id

        if (id == 'labelCopy') {
            $("#radioCopy").prop("checked", true);
            $("#labelCopy").css('color', 'white')

            $("#radioCut").prop("checked", false);
            $("#labelCut").css('color', 'grey')

            $("#radioDelete").prop("checked", false);
            $("#labelDelete").css('color', 'grey')

            //alert('copy')
        }
        if (id == 'labelCut') {
            $("#radioCopy").prop("checked", false);
            $("#labelCopy").css('color', 'grey')

            $("#radioCut").prop("checked", true);
            $("#labelCut").css('color', 'white')

            $("#radioDelete").prop("checked", false);
            $("#labelDelete").css('color', 'grey')

            //alert('cut')

        }
        if (id == 'labelDelete') {
            $("#radioDelete").prop("checked", true);
            $("#labelCopy").css('color', 'grey')

            $("#radioCut").prop("checked", false);
            $("#labelCut").css('color', 'grey')

            $("#radioCopy").prop("checked", false);
            $("#labelDelete").css('color', 'white')

            // alert('delete')

        }
    })
    $("#labelCut").css('color', 'white')
    let k = 0;
    let clippedimg = []
    $c.on('mouseup touchend', (e) => {
        //console.log('UP');
        if (whichBtn == 'select') {
            $ctx.putImageData(restore_array[index], 0, 0)
            // if (whichBtn == 'select')
            //     undofn(e)
            $('#imageSize').val('0')

            let x = Math.min(window.start.x, window.end.x)
            let y = Math.min(window.start.y, window.end.y)
            let width = Math.abs(window.end.x - window.start.x)
            let height = Math.abs(window.end.y - window.start.y)

            if ($('input[name=whole]').is(':checked')) {
                var clippedArea = $ctx.getImageData(0, 0, $c.width(), $c.height())
            } else {
                var clippedArea = $ctx.getImageData(x, y, width, height)
            }

            //$ctx.putImageData(clippedArea, 0, 0)

            //creating reserve canvas
            // const canvas2 = $(`<canvas style='width: ${Math.abs(window.end.x - window.start.x)}px; height: ${Math.abs(window.end.y - window.start.y)}px'></canvas>`)
            if ($('#radioDelete').is(':checked')) {
                $ctx.beginPath()
                $ctx.fillStyle = 'white'
                $ctx.fillRect(x, y, width, height)
                $ctx.closePath()
                //console.log('delete');

            } else if ($('#radioCut').is(':checked') || $('#radioCopy').is(':checked')) {
                if ($('#radioCut').is(':checked')) {
                    $ctx.beginPath()
                    $ctx.fillStyle = 'white'
                    $ctx.fillRect(x, y, width, height)
                    $ctx.closePath()
                    //console.log('cut');
                    //alert('cut')
                }

                const canvas2 = $(`<canvas width="${$c.width()}" height="${$c.height()}"></canvas>`)


                const ctx2 = canvas2[0].getContext('2d');
                ctx2.translate($c.width() / 2, 0)
                ctx2.putImageData(clippedArea, $c.width() / 2 - width / 2, $c.height() / 2 - height / 2)
                let src = canvas2[0].toDataURL()

                // alert(window.imagee.width)
                // console.log('width', Math.min(window.start.x, window.end.x), Math.min(window.start.y, window.end.y), Math.abs(window.end.x - window.start.x), Math.abs(window.end.y - window.start.y));
                // console.log(src);

                clippedimg[k] = $(`<image src="${src}"  id="imageSelected${k}" class="img imgSelected" crossorigin='anonymous' onerror="$('#imageUploaded${k}').remove()" />`)

                if (k == 0) {
                    $('#selspan').css('display', 'none')
                    // $('#selected').css('display', 'grid')
                }
                // $('body').append(canvas2)
                $('#selected').prepend(clippedimg[k])
                // window.imagee=clippedimg[k]
                $('#middle span').html('Visit images > gallery > selected to use the selected area')
                $('#middle span').css('color', 'white')

                k++
                // $('#images').click()
            }


            undofn(e)
        }

        isSelect = false
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

        //the condition below is to not to draw a dot in the middle while stroking a circle
        if (start.x - end.x !== 0 || start.y - end.y !== 0) {
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
                $('#middle span').css('color', 'white')

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








    // When the user clicks anywhere outside of the modal, close it
    // $(window).click(function(e) {
    //     alert(e.target.id); // gives the element's ID 
    //     alert(e.target.className); // gives the elements class(es)



    // });


    let isPencil
    $c.on('mousedown touchstart', (e) => {
        //tyuf
        // console.log(e.type)


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
            // console.log(e.type)



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


        if (whichBtn == 'pencil') {
            undofn(e)
            isPencil = false
            $ctx.closePath()
        }
        // $ctx.save()

    })

    // const H = window.innerHeight
    // console.log('H', H);


    // $('#handle').on('click', (e) => {


    //     if ($("#options").hasClass("show")) {
    //         console.log('raz');
    //         $('#options').toggleClass('show')
    //         $('#options').animate({
    //             top: `${H-109}`
    //         }, 200) //closing
    //     } else if (!$("#options").hasClass("show")) {
    //         $('#options').animate({
    //             top: `${H*.4}`
    //         }, 200) //opening
    //         console.log('dwa');
    //         $('#options').toggleClass('show')
    //     }

    //     console.log('sprawdzam');

    // })

    // $('.btn').on('click', (e) => {
    //     if (!$("#options").hasClass("show")) {
    //         if (window.mobile)
    //             $('#options').animate({
    //                 top: `${H*.4}`
    //             }, 200)
    //         $('#options').addClass('show')
    //     }


    // })
    
    // $('#leftar').on('click', e=>{
    //     $('#textOptions').animate({
    //         scrollLeft: 70
    //     })
    // })





    $(".arrow").click(function() {
      if ($(this).hasClass("arrow-right")) {
        x = ((box.width() / 2)) + box.scrollLeft();
        box.animate({
          scrollLeft: x,
        })
      } else {
        x = ((box.width() / 2)) - box.scrollLeft();
        box.animate({
          scrollLeft: -x,
        })
      }
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