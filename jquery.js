$(window).load(function () {
    $('#beforeload').fadeOut();
    $('#beforeload').LoadingOverlay("hide", true)
});

$(document).ready(function () {

    $('#zoomable').on('mousedown', e => {

        if (e.button == 2) {
            $('#hiddenMenu').css('display', 'block')
            $('#hiddenMenu').css('left', `${e.pageX+10}px`)
            $('#hiddenMenu').css('top', `${e.pageY+10}px`)
        }
    })

    $('BODY').on('click', e => {
        if ($('#hiddenMenu').css('display') === 'block')
            setTimeout(() => {
                $('#hiddenMenu').css('display', 'none')
            }, 10)
    })
 
    const $c = $('canvas')
    const $ctx = $($c)[0].getContext('2d')

    $ctx.fillStyle = 'white'
    $ctx.fillRect(0, 0, $c.width(), $c.height())
    let whichBtn = 'pencil'
 
    let restore_array = []
    let ranges_array = []
    let index = -1
    restore_array.push($ctx.getImageData(0, 0, $c.width(), $c.height()))
    ranges_array.push({
        red: $('#red').val(),
        green: $('#green').val(),
        blue: $('#blue').val(),
        light: $('#lightness').val()
    })
    index++

    $('#undo').on('click', () => {
        if (index <= 0) {

            $ctx.fillStyle = 'white'
            $ctx.fillRect(0, 0, $c.width(), $c.height())
            $('#red').val(127)
            $('#green').attr('value', `127`)
            $('#blue').attr('value', `127`)
            $('#lightness').attr('value', `127`)

            $('#redNr').val(127)
            $('#greenNr').attr('value', `127`)
            $('#blueNr').attr('value', `127`)
            $('#lightnessNr').attr('value', `127`)
        } 
        else {
            index -= 1
            restore_array.pop()
            ranges_array.pop()

            $ctx.putImageData(restore_array[index], 0, 0)
  
            $('#red').val(ranges_array[index].red)
            $('#green').val(ranges_array[index].green)
            $('#blue').val(ranges_array[index].blue)
            $('#lightness').val(ranges_array[index].light)
            $('#redNr').val(ranges_array[index].red)
            $('#greenNr').val(ranges_array[index].green)
            $('#blueNr').val(ranges_array[index].blue)
            $('#lightnessNr').val(ranges_array[index].light)
        }
    })

    function undofn(e, t) {
        if (e.type != 'mouseout') {
            restore_array.push($ctx.getImageData(0, 0, $c.width(), $c.height()))

            if (t === undefined)
                t = {
                    red: $('#red').val(),
                    green: $('#green').val(),
                    blue: $('#blue').val(),
                    light: $('#lightness').val()
                }
            ranges_array.push(t)
            index += 1
        }
    }

    let j = 0;
    let savedimg = []
    $('#uploadImage').on('input', (e) => {
        // $('#uploadspan').css('display', 'none')
        savedimg[j] = $(`<image src="${$('#uploadImage').val()}"  id="imageUploaded${j}" class="img imgUploaded" crossorigin='anonymous' onerror="$('#imageUploaded${j}').remove();  " />`)

        $('#middle span').html('If the address is proper, you should see your image in images > gallery > uploaded.')
        $('#middle span').css('color', 'white')

        $('#swiper').html('If the address is proper, you should see your image in images > gallery > uploaded.')
        $('#swiper').css('color', 'white')

        $('#uploadedImagesDiv').prepend(savedimg[j])

        setTimeout(() => {
            // console.log('Dzieci', $("#uploadedImagesDiv").children().length);
            if ($("#uploadedImagesDiv").children().length > 0) {
                $('#uploadspan').css('display', 'none')
            }

        }, 10)

        j++
    })

    $('#clear').on('click', (e) => {

        $ctx.fillStyle = 'white'
        $ctx.fillRect(0, 0, $c.width(), $c.height())
        undofn(e)

        isLine = false
        $('#middle span').html('You cleared the canvas. You can undo it by pressing ctrl + Z.')
        $('#middle span').css('color', 'white')

        $('#swiper').html('You cleared the canvas. You can undo it by clicking the undo button.')
        $('#swiper').css('color', 'white')


    })
    //cleaning the span below the canvas
    $c.on('click touchstart', () => {
        if (!$('#middle span').text().length == 0 && whichBtn !== 'text' && whichBtn !== 'select') {

            if ($("#middle > span").text().indexOf('Right') < 0)
                $('#middle span').html('')

            $('#swiper').css('color', 'silver')
            $('#swiper').html('<div><i class="fa-solid fa-arrow-left-long"></i> swipe here <i class="fa-solid fa-arrow-right-long"></i></div>')
        }
    })

    let dataURI = []
    let savedimage = []
    let i = 0
    let overlay = []

    $('#save').on('click', () => {
        dataURI[i] = $c[0].toDataURL()

        if (i == 0)
            $('#savedImages').html('')

        savedimage[i] = $(`<image src="${dataURI[i]}" class="savedImage" id="imageConverted${i}" style="border: 1px solid black" 
        />`)

        overlay[i] = $(`<div id='overlay' class='overlays' style="height: 100%; width: 100%; background: black; opacity: 0" ></div>`)

        savedimage[i].prepend(overlay[i])
        $('#savedImages').prepend(savedimage[i])
      
        i++
        $('#middle span').css('color', 'white')
        $('#middle > span').html("You created a new draft! Click on it any time you want in order to display it again on the canvas.")

        $('#swiper').html('You created a new draft! Click on it any time you want in order to display it again on the canvas.')
        $('#swiper').css('color', 'white')
    })

    $(document).on('click', (e) => {
  
        $('#uploadImage').val('')

        if ($('input[name=radioCopy]').is(':checked')) {
        }
        if ($('input[name=radioDelete]').is(':checked')) {
        }
        if ($('input[name=radioCut]').is(':checked')) {
        }
        if (e.target.id.slice(0, 7) === 'tablink') {
            for (let i = 1; i <= $(".tablink").length; i++) {
                $(`#tabCon${i}`).css('display', 'none')
                $('.modal-content > div > div').css('display', 'none')
            }
        }
        $(`#tabCon${e.target.id.slice(7,8)}`).css('display', 'block')
        $('.modal-content > div > div').slideDown(200)
        $('.modal-content > div > div').css('display', 'grid')


        if (e.target.id.slice(0, 14) == 'imageConverted') {
            const image = e.target
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
            } else {$('.labelPencil').eq(i).css('color', 'grey')
            $('.labelPencil').eq(i).css('textShadow', 'none')}

            if ($('.radioLine').eq(i).is(':checked')) {
                $('.labelLine').eq(i).css('color', 'white')
            }else {$('.labelLine').eq(i).css('color', 'grey')
            $('.labelLine').eq(i).css('textShadow', 'none')}

            if ($('.radioShape').eq(i).is(':checked')) {
                $('.labelShape').eq(i).css('color', 'white')
            } else{ $('.labelShape').eq(i).css('color', 'grey')
            $('.labelShape').eq(i).css('textShadow', 'none')}

            if ($('.radioText').eq(i).is(':checked')) {
                $('.labelText').eq(i).css('color', 'white')
            } else {$('.labelText').eq(i).css('color', 'grey')
            $('.labelText').eq(i).css('textShadow', 'none')
            }
        }

        if (e.target.id.slice(0, 3) == 'img' || e.target.id.slice(0, 13) == 'imageUploaded' || e.target.id.slice(0, 3) == 'obj' || e.target.id.slice(0, 13) == 'imageSelected') {
            window.imagee = e.target
        }
    })

    let isFirst = true
    $('#showImgBtn').on('click', (e) => {
        $('#id01').css('display', 'block');

        if (isFirst)
            setTimeout(() => {
                $("#tablink1").click();
            }, 100)
        else
            $("#tablink1").click();
        isFirst = false
    })

    const modal = $('#id01')
    const modalC = $('.modal-content')
    const closebtn = $('#close')

    $(window).click((event) => {
        // console.log(event.target.id)
        if (event.target.id == 'id01' || event.target.id == 'close' || event.target.id.slice(0, 3) == 'img' || event.target.id.slice(0, 13) == 'imageUploaded' || event.target.id.slice(0, 3) == 'obj' || event.target.id.slice(0, 13) == 'imageSelected') {
            modal.css('background-color', 'rgb(0,0,0,0)');
            closebtn.css('display', 'none');
            modalC.addClass('closeanim')
            setTimeout(() => {
                modal.css('display', 'none');
                modal.css('background-color', 'rgb(0,0,0,0.4)')
                modalC.removeClass('closeanim')
                closebtn.css('display', 'block');
            }, 200)
        }
    })

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

    $('#red').on('mousedown touchstart', (e) => {
        $(this).data('prevValue', $('#red').val())
        // console.log('redddd', $('#red').val())
    }).on('input change', (e) => {
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

    }).on('mouseup touchend', e => {
        undofn(e, {
            red: $('#red').val(),
            green: $('#green').val(),
            blue: $('#blue').val(),
            light: $('#lightness').val()
        })
    })

    $('#green').on('mousedown touchstart', (e) => {
        $(this).data('prevValue', $('#green').val())
        // console.log('redddd', $('#red').val())
    }).on('input change', (e) => {
        let prevValue = $(this).data('prevValue')
        let difference = $('#green').val() - prevValue

        let a = $ctx.getImageData(0, 0, $c.width(), $c.height())
        const data = a.data;
        //let val = $('#red').val()
        for (let i = 0; i < data.length; i += 4) {
            data[i] = data[i]; // red
            data[i + 1] = data[i + 1] + difference; // green
            data[i + 2] = data[i + 2]; // blue
        }
        $ctx.putImageData(a, 0, 0)

    }).on('mouseup touchend', e => {
        undofn(e, {
            red: $('#red').val(),
            green: $('#green').val(),
            blue: $('#blue').val(),
            light: $('#lightness').val()
        })
    })

    $('#blue').on('mousedown touchstart', (e) => {
        $(this).data('prevValue', $('#blue').val())
        // console.log('redddd', $('#red').val())
    }).on('input change', (e) => {
        let prevValue = $(this).data('prevValue')
        let difference = $('#blue').val() - prevValue

        let a = $ctx.getImageData(0, 0, $c.width(), $c.height())
        const data = a.data;

        for (let i = 0; i < data.length; i += 4) {
            data[i] = data[i]; // red
            data[i + 1] = data[i + 1]; // green
            data[i + 2] = data[i + 2] + difference; // blue
        }
        $ctx.putImageData(a, 0, 0)

    }).on('mouseup touchend', e => {
        undofn(e, {
            red: $('#red').val(),
            green: $('#green').val(),
            blue: $('#blue').val(),
            light: $('#lightness').val()
        })
    })

    $('#lightness').on('mousedown touchstart', (e) => {
        $(this).data('prevValue', $('#lightness').val())
        $(this).data('a', $ctx.getImageData(0, 0, $c.width(), $c.height()))

    }).on('input change', (e) => {
        let prevValue = $(this).data('prevValue')
        let difference = $('#lightness').val() - prevValue
        let a = $(this).data('a')

        const data = a.data;
        for (let i = 0; i < data.length; i += 4) {
            data[i] = data[i] + difference; // red
            data[i + 1] = data[i + 1] + difference; // green
            data[i + 2] = data[i + 2] + difference; // blue
        }
        $ctx.putImageData(a, 0, 0)

    }).on('mouseup touchend', e => {
        undofn(e, {
            red: $('#red').val(),
            green: $('#green').val(),
            blue: $('#blue').val(),
            light: $('#lightness').val()
        })
    })

    $('#contrast').on('mousedown touchend', (e) => {
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

    function imageFn(e) {
        e.preventDefault()

        let ratio = $('#imageSize').val()
        let size = (1 / ratio)
        $ctx.save();

        let x = e.offsetX
        let y = e.offsetY
        let width = window.imagee.width
        let height = window.imagee.height

        if (ratio > 0 && window.imagee !== undefined) {
            $ctx.drawImage(window.imagee, x - width * ratio / 2, y - height * ratio / 2, width * ratio, height * ratio)
        } else if (ratio < 0 && window.imagee !== undefined) {

            $ctx.drawImage(window.imagee, x - width * size / 2, y - height * size / 2, width * size, height * size)

        } else if (ratio == 0 && window.imagee !== undefined) $ctx.drawImage(window.imagee, x - width / 2, y - height / 2, width, height)



        // if (ratio >= 0 && window.imagee !== undefined) {
        //     $ctx.drawImage(window.imagee, x - width + (width * ratio) / 2, y - height + (height * ratio) / 2, width + width * ratio, height + height * ratio)
        // }
        //  else if (ratio < 0 && window.imagee !== undefined) {

        //     $ctx.drawImage(window.imagee, x - width * size / 2, y - height * size / 2, width + width * ratio/10, height + height * ratio/10)

        // }
        //  else if (ratio == 0 && window.imagee !== undefined) $ctx.drawImage(window.imagee, x - width / 2, y - height / 2, width, height)


        $ctx.restore()
    }

    $c.on('mousemove', (e) => {
        if (whichBtn == 'images') {

            isImage = true
            $ctx.putImageData(restore_array[index], 0, 0);

            if (window.imagee !== undefined)
                imageFn(e)
            e.preventDefault()
        }
    })

    $c.on('mouseout', (e) => {
        if (whichBtn == 'images')
            $ctx.putImageData(restore_array[index], 0, 0);
    })

    let isImage
    $c.on('mousedown', (e) => {

        if (whichBtn == 'images' && e.button !== 1 && e.button !== 2) {
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


    $('#pencil').on('click', () => {

        for (let i = 0; i < $('.Options').length; i++) {
            $('.Options').css('display', 'none')
        }
        if (whichBtn !== 'pencil')
            $('#pencilOptions').slideDown(200)
        $('#pencilOptions').css('display', 'flex')
        whichBtn = 'pencil'
    })

    let isLineClicked = false
    $('#line').on('click', () => {

        for (let i = 0; i < $('.Options').length; i++) {
            $('.Options').css('display', 'none')
        }
        if (whichBtn !== 'line')
            $('#lineOptions').slideDown(200)
        $('#lineOptions').css('display', 'flex')
        whichBtn = 'line'

        if(!isLineClicked){

            
    function showLoader(){
        $('#options').LoadingOverlay("show", {
            background: "rgba(0, 0, 0, 0)",
            imageColor: 'white',
            textClass: 'test',
            textResizeFactor: '.25',
            fade: [0, 100]
        });                                        
    }
        showLoader()

        const xhr = new XMLHttpRequest();
        const container = document.querySelector('#lineOptions')

        xhr.onload=function(){
            if(this.status===200){
                $('#options').LoadingOverlay("hide", 0)
                container.innerHTML=xhr.responseText
                window.numbers  = document.querySelectorAll('input[type=number]')
                window.fn()
            }
        }

        xhr.open('get', './html/lineopt.html')
        xhr.send()
        }

        isLineClicked = true
    })

    isShapeClicked = false
    $('#shape').on('click', () => {

        for (let i = 0; i < $('.Options').length; i++) {
            $('.Options').css('display', 'none')
        }
        if (whichBtn !== 'shape')
            $('#shapeOptions').slideDown(200)
        $('#shapeOptions').css('display', 'flex')
        whichBtn = 'shape'

        if(!isShapeClicked){

            
            function showLoader(){
                $('#options').LoadingOverlay("show", {
                    background: "rgba(0, 0, 0, 0)",
                    imageColor: 'white',
                    textClass: 'test',
                    textResizeFactor: '.25',
                    fade: [0, 100]
                });                                        
            }
                showLoader()
        
                const xhr = new XMLHttpRequest();
                const container = document.querySelector('#shapeOptions')
                xhr.onload=function(){
                    if(this.status===200){
                        $('#options').LoadingOverlay("hide", 0)
                        container.innerHTML=xhr.responseText
                        window.numbers  = document.querySelectorAll('input[type=number]')
                        window.fn()
                    }
                }
        
                xhr.open('get', './html/shapeopt.html')
                xhr.send()
                }
        
                isShapeClicked = true
    })

    let isTextClicked=false
    $('#text').on('click', () => {

        for (let i = 0; i < $('.Options').length; i++) {
            $('.Options').css('display', 'none')
        }
        if (whichBtn !== 'text')
            $('#textOptions').slideDown(300)

        $('#textOptions').css('display', 'flex')
        //e.preventDefault()
        $('#text').get(0).blur()

        if($('#textContent').get(0))
        $('#textContent').get(0).focus()

        $('#textOptions').get(0).scrollTop = 0
        whichBtn = 'text'

        if(!isTextClicked){

            
            function showLoader(){
                $('#options').LoadingOverlay("show", {
                    background: "rgba(0, 0, 0, 0)",
                    imageColor: 'white',
                    textClass: 'test',
                    textResizeFactor: '.25',
                    fade: [0, 100]
                });                                        
            }
                showLoader()
        
                const xhr = new XMLHttpRequest();
                const container = document.querySelector('#textOptions')
                xhr.onload=function(){
                    if(this.status===200){
                        $('#options').LoadingOverlay("hide", 0)
                        container.innerHTML=xhr.responseText
                        window.numbers  = document.querySelectorAll('input[type=number]')
                        window.fn()
                    }
                }
        
                xhr.open('get', './html/textopt.html')
                xhr.send()
                }
        
                isTextClicked = true
    })


    let isColorsClicked = false
    $('#colors').on('click', () => {

        for (let i = 0; i < $('.Options').length; i++) {
            $('.Options').css('display', 'none')
        }
        if (whichBtn !== 'colors')
            $('#colorsOptions').slideDown(200)
        $('#colorsOptions').css('display', 'flex')
        whichBtn = 'colors'

        if(!isColorsClicked){

            
            function showLoader(){
                $('#options').LoadingOverlay("show", {
                    background: "rgba(0, 0, 0, 0)",
                    imageColor: 'white',
                    textClass: 'test',
                    textResizeFactor: '.25',
                    fade: [0, 100]
                });                                        
            }
                showLoader()
        
                const xhr = new XMLHttpRequest();
                const container = document.querySelector('#colorsOptions')
                xhr.onload=function(){
                    if(this.status===200){
                        $('#options').LoadingOverlay("hide", 0)
                        container.innerHTML=xhr.responseText
                        window.numbers  = document.querySelectorAll('input[type=number]')
                        window.fn()
                    }
                }
        
                xhr.open('get', './html/colorsopt.html')
                xhr.send()
                }
        
                isColorsClicked = true
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


    $('#images').on('click', () => {

        for (let i = 0; i < $('.Options').length; i++) {
            $('.Options').css('display', 'none')
        }
        if (whichBtn !== 'images')
            $('#imagesOptions').slideDown(200)
        $('#imagesOptions').css('display', 'flex')
        whichBtn = 'images'

    })

    $('#backColor').on('input change', (e) => {
        $ctx.fillStyle = $('#backColor').val()
        $ctx.fillRect(0, 0, $c.width(), $c.height())
    })
    $('#backColor').on('change', (e) => {
        undofn(e)
    })

    const ua = navigator.userAgent;

    //true if on mobile
    window.mobile = false
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) ||
        /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            if(document.querySelector('#joinDiv'))
        document.querySelector('#joinDiv').style.display = "none"
        if(document.querySelector('#hr'))
        document.querySelector('#hr').style.display = "none"
        window.mobile = true

        $('#middle span').html('')
        $('#middle span').css('color', 'white')

        let nrofchange = 0
     
        screen.orientation.addEventListener("change", e => {
            e.returnValue = 'You have unsaved changes.';

            nrofchange++
         
            if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(navigator.userAgent) ||
        /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(navigator.userAgent))
            {
            if (nrofchange % 2 == 1) {
                document.querySelector('#orientation').style.display = 'block'
                document.querySelector('#wholecontainer').style.display = 'none'
            }
            else{
                document.querySelector('#orientation').style.display = 'none'
                document.querySelector('#wholecontainer').style.display = 'block'
            }}else{
                document.querySelector('#orientation').style.display = 'none'
                document.querySelector('#wholecontainer').style.display = 'block'
            }
        });
    } 

    //LINE TOOL
    function drawLine($ctx, line) {
        const {
            start,
            end,
            lineWidth = $('#lineWidthLine').val(),
            lineCap = $('[name=lineCap]:checked').val(),
            strokeStyle = $('#colorLine').val(),
        } = line

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

    let isLine
    let mouseDownPos = null
    $c.on('mousedown touchstart', (e) => {

        if (whichBtn == 'line' && e.button !== 1 && e.button !== 2) {
            isLine = true

            if (window.mobile) {
                let touch = e.originalEvent.touches[0]
                var x = touch.pageX;
                var y = touch.pageY;
                mouseDownPos = {
                    x: x - $c.offset().left,
                    y: y - $c.offset().top
                }

            } else {
                mouseDownPos = {
                    x: e.offsetX,
                    y: e.offsetY
                }
            }

            const line = {
                start: mouseDownPos,
                end: mouseDownPos,
            }
            drawLine($ctx, line)
            $(this).data('imgData', $ctx.getImageData(0, 0, $c.width(), $c.height()))
        }
    })
    $c.on('mousemove touchmove', (e) => {

        if (isLine && whichBtn == 'line') {
            let imgData = $(this).data('imgData')

            if (window.mobile) {

                let touch = e.originalEvent.touches[0]
                var x = touch.pageX;
                var y = touch.pageY;
                currentPos = {
                    x: x - $c.offset().left,
                    y: y - $c.offset().top
                }

            } else {
                currentPos = {
                    x: e.offsetX,
                    y: e.offsetY
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
            $ctx.putImageData(restore_array[index], 0, 0)
            mouseDownPos = null
        }

        if (whichBtn == 'shape' && e.target.id !== 'canvas') {
            $ctx.putImageData(restore_array[index], 0, 0)
            mouseDownPosS = null
        }

        if (whichBtn == 'select' && e.target.id !== 'canvas') {
            $ctx.putImageData(restore_array[index], 0, 0)
            mouseDownPosSel = null
        }
    })

    $c.on('mousemove', (e) => {
        if (whichBtn == 'line' && $('#join').is(':checked')) {
            //let imgData = $(this).data('imgData')
            $ctx.putImageData(restore_array[index], 0, 0)

            let currentPos = {
                x: e.offsetX,
                y: e.offsetY
            }

            let line = {
                start: mouseDownPos,
                end: currentPos
            }
            drawLine($ctx, line)
        }
    })

//SELECT TOOL
    function drawShapeS($ctx, shapeS) {
        const {
            start,
            end,
            strokeWidth = '1',
            whichShape = 'squareS'
        } = shapeS

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

            $ctx.lineWidth = strokeWidth;
            $ctx.strokeStyle = gradient;
  
            if (whichShape == 'squareS') {
                $ctx.rect(start.x, start.y, end.x - start.x, end.y - start.y);
            } else
                $ctx.arc(start.x, start.y, Math.sqrt((start.x - end.x) * (start.x - end.x) + (start.y - end.y) * (start.y - end.y)), 0, 2 * Math.PI);

            $ctx.stroke()
            $ctx.closePath()
        }
        $ctx.setLineDash([0, 0]);
        window.start = shapeS.start
        window.end = shapeS.end
    }

    let isSelect
    let mouseDownPosSel = null
    $c.on('mousedown touchstart', (e) => {

        if (whichBtn == 'select' && e.button !== 1 && e.button !== 2) {
            isSelect = true

            if (window.mobile) {
                let touch = e.originalEvent.touches[0]
                var x = touch.pageX;
                var y = touch.pageY;
                mouseDownPosSel = {
                    x: x - $c.offset().left,
                    y: y - $c.offset().top
                }

            } else {
                mouseDownPosSel = {
                    x: e.offsetX,
                    y: e.offsetY
                }
            }

            const shapeS = {
                start: mouseDownPosSel,
                end: mouseDownPosSel,
            }
            drawShapeS($ctx, shapeS)
            $(this).data('imgData', $ctx.getImageData(0, 0, $c.width(), $c.height()))
        }
    }).on('mousemove touchmove', (e) => {

        if (isSelect && whichBtn == 'select') {
            let imgData = $(this).data('imgData')

            if (window.mobile) {
                let touch = e.originalEvent.touches[0]
                var x = touch.pageX;
                var y = touch.pageY;
                currentPosSel = {
                    x: x - $c.offset().left,
                    y: y - $c.offset().top
                }

            } else {
                currentPosSel = {
                    x: e.offsetX,
                    y: e.offsetY
                }
            }

            let shapeS = {
                start: mouseDownPosSel,
                end: currentPosSel
            }
            $ctx.clearRect(0, 0, $c.width(), $c.height())
            $ctx.putImageData(imgData, 0, 0);

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
            $("#labelCut").css('textShadow', 'none')

            $("#radioDelete").prop("checked", false);
            $("#labelDelete").css('color', 'grey')
            $("#labelDelete").css('textShadow', 'none')

        }
        if (id == 'labelCut') {
            $("#radioCopy").prop("checked", false);
            $("#labelCopy").css('color', 'grey')
            $("#labelCopy").css('textShadow', 'none')

            $("#radioCut").prop("checked", true);
            $("#labelCut").css('color', 'white')

            $("#radioDelete").prop("checked", false);
            $("#labelDelete").css('color', 'grey')
            $("#labelDelete").css('textShadow', 'none')

        }
        if (id == 'labelDelete') {
            $("#radioDelete").prop("checked", true);
            $("#labelCopy").css('color', 'grey')

            $("#radioCut").prop("checked", false);
            $("#labelCut").css('color', 'grey')
            $("#labelCut").css('textShadow', 'none')

            $("#radioCopy").prop("checked", false);
            $("#labelDelete").css('color', 'white')
            $("#labelDelete").css('textShadow', 'none')
        }
    })

    $("#labelCut").css('color', 'white')
    let k = 0;
    let clippedimg = []
    $c.on('mouseup touchend', (e) => {
        //console.log('UP');
        if (whichBtn == 'select') {
            $ctx.putImageData(restore_array[index], 0, 0)

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

            if ($('#radioDelete').is(':checked')) {
                $ctx.beginPath()
                $ctx.fillStyle = 'white'
                $ctx.fillRect(x, y, width, height)
                $ctx.closePath()
                $('#middle span').html('You deleted part of your canvas. You can undo it by pressing ctrl + Z.')
                $('#middle span').css('color', 'white')

                $('#swiper').html('You deleted part of your canvas. You can undo it by clicking the undo button.')
                $('#swiper').css('color', 'white')

            } else if ($('#radioCut').is(':checked') || $('#radioCopy').is(':checked')) {
                if ($('#radioCut').is(':checked')) {
                    $ctx.beginPath()
                    $ctx.fillStyle = 'white'
                    $ctx.fillRect(x, y, width, height)
                    $ctx.closePath()
                }

                const canvas2 = $(`<canvas width="${$c.width()}" height="${$c.height()}"></canvas>`)

                const ctx2 = canvas2[0].getContext('2d');
                ctx2.translate($c.width() / 2, 0)
                ctx2.putImageData(clippedArea, $c.width() / 2 - width / 2, $c.height() / 2 - height / 2)
                let src = canvas2[0].toDataURL()

                clippedimg[k] = $(`<image src="${src}"  id="imageSelected${k}" class="img imgSelected" crossorigin='anonymous' onerror="$('#imageUploaded${k}').remove()" />`)

                if (k == 0) {
                    $('#selspan').css('display', 'none')
                }

                $('#selected').prepend(clippedimg[k])
                $('#middle span').html('Visit images > gallery > selected to use the selected area.')
                $('#middle span').css('color', 'white')

                $('#swiper').html('Visit images > gallery > selected to use the selected area.')
                $('#swiper').css('color', 'white')
                k++
            }
            undofn(e)
        }
        isSelect = false
    })

    //SHAPE TOOL
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

        if (whichBtn == 'shape' && e.button !== 1 && e.button !== 2) {
            isShape = true

            if (window.mobile) {
                let touch = e.originalEvent.touches[0]
                var x = touch.pageX;
                var y = touch.pageY;
                mouseDownPosS = {
                    x: x - $c.offset().left,
                    y: y - $c.offset().top
                }

            } else {
                mouseDownPosS = {
                    x: e.offsetX,
                    y: e.offsetY
                }
            }

            const shape = {
                start: mouseDownPosS,
                end: mouseDownPosS,
            }

            drawShape($ctx, shape)
            $(this).data('imgData', $ctx.getImageData(0, 0, $c.width(), $c.height()))
        }
    }).on('mousemove touchmove', (e) => {

        if (isShape && whichBtn == 'shape') {
            let imgData = $(this).data('imgData')

            if (window.mobile) {
                let touch = e.originalEvent.touches[0]
                var x = touch.pageX;
                var y = touch.pageY;
                currentPosS = {
                    x: x - $c.offset().left,
                    y: y - $c.offset().top
                }

            } else {
                currentPosS = {
                    x: e.offsetX,
                    y: e.offsetY
                }
            }

            let shape = {
                start: mouseDownPosS,
                end: currentPosS
            }

            $ctx.clearRect(0, 0, $c.width(), $c.height())
            $ctx.putImageData(imgData, 0, 0);
            drawShape($ctx, shape)
        }
    })
    $c.on('mouseup touchend', (e) => {
        if (whichBtn == 'shape')
            undofn(e)
        isShape = false
    })

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
                $('#swiper').html('You have to type some text firstly.')
                $('#swiper').css('color', 'white')
            }
        } else $('#middle > span').html('&nbsp;')

        let isChecked1 = $('#strokeText').is(':checked');
        let isChecked2 = $('#fillText').is(':checked');

        $ctx.font = ` ${$('[name=radiosText]:checked').val()}   ${$('#textSize').val()}px 
    ${$('#fontSelect').val()}
    `;

        if (isChecked1) {
            $ctx.lineWidth = $('#textStrokeWidth').val()
            $ctx.strokeStyle = $('#colorStrokeText').val()
            $ctx.strokeText(`${$('#textContent').val()}`, e.offsetX, e.offsetY);
        }
        if (isChecked2) {
            $ctx.fillStyle = $('#colorFillText').val()
            // console.log($('#colorFillText').val());
            $ctx.fillText(`${$('#textContent').val()}`, e.offsetX, e.offsetY);
        }
    }

    $c.on('mousemove', (e) => {
        // let before = $ctx.getImageData(0, 0, $c.width(), $c.height())
        if (whichBtn == 'text') {
            isText = true
            $ctx.putImageData(restore_array[index], 0, 0);
            textFn(e)
            // undofn(e)
            e.preventDefault()
        }
    })

    $c.on('mouseout', (e) => {
        if (whichBtn == 'text')
            $ctx.putImageData(restore_array[index], 0, 0);
    })

    let isText
    $c.on('mousedown', (e) => {
        if (whichBtn == 'text' && e.button !== 1 && e.button !== 2) {
            isText = true

            textFn(e)
            if ($('#textContent').val() !== '')
                undofn(e)
            e.preventDefault()
        }
    })

    //this is to prevent scrolling whole div while changing the range value on mobile devices
    $('input[type=range]').on('touchstart', (e) => {
        $("body").css("overflow", "hidden")
    })

    //PENCIL TOOL
    let isPencil
    $c.on('mousedown touchstart', (e) => {

        if (whichBtn == 'pencil' && e.button !== 1 && e.button !== 2) {
            isPencil = true


            $ctx.beginPath();

            if (window.mobile) {
                let touch = e.originalEvent.touches[0]

                var x = touch.pageX;
                var y = touch.pageY;

                $ctx.moveTo(x - $c.offset().left, y - $c.offset().top);

            } else {
                $ctx.moveTo(e.offsetX, e.offsetY);
            }

            e.preventDefault()
        }
    })

    $c.on('mousemove touchmove', (e) => {

        if (isPencil && whichBtn == 'pencil') {

            if (window.mobile) {
                let touch = e.originalEvent.touches[0]
                var x = touch.pageX;
                var y = touch.pageY;
                $ctx.lineTo(x - $c.offset().left, y - $c.offset().top);

            } else {
                $ctx.lineTo(e.offsetX, e.offsetY);
            }
            $ctx.lineJoin = 'round'
            $ctx.lineCap = $('[name=lineCapPencil]:checked').val()
            $ctx.lineWidth = $('#lineWidthPencil').val()
            $ctx.strokeStyle = $('#colorPencil').val()
            $ctx.stroke()
        }
    }).on('mouseleave touchcancel', (e) => {
        isPencil = false
    })

    $c.on('mouseup touchend', (e) => {

        if (whichBtn == 'pencil' && e.button !== 1 && e.button !== 2) {
            undofn(e)
            isPencil = false
            $ctx.closePath()
        }
    })

    $(document).on('keyup', e => {
        if (!e.ctrlKey && $('input[name=join]').is(':checked')) {
            $('#ljoin').click()
        }
    })

    $(document).on('keydown', e => {

        if (e.target.id !== 'textContent' && e.target.id !== 'uploadImage') {
            if ((e.key === 'g' || e.key === 'G') && !e.ctrlKey) {
                if ($('.modal').css('display') === 'none') {
                    $('#images').click()
                    $('#showImgBtn').click()
                } else {
                    $('#close').click()
                }
                g++
            }

            if ((e.key === 's' || e.key === 'S') && e.shiftKey)
                $('#save').click()

            if ((e.key === 'z' || e.key === 'Z') && e.ctrlKey)
                $('#undo').click()

            if ((e.key === 'p' || e.key === 'P') && !e.shiftKey)
                $('#pencil').click()

            if ((e.key === 'l' || e.key === 'L') && !e.shiftKey)
                $('#line').click()

            if ((e.key === 'l' || e.key === 'L') && !e.shiftKey)
                $('#line').click()

            if (e.ctrlKey && !$('input[name=join]').is(':checked'))
                $('#ljoin').click()

            // else $('#ljoin').click()
            if ((e.key === 'h' || e.key === 'H') && !e.shiftKey)
                $('#shape').click()

            if ((e.key === 't' || e.key === 'T') && !e.shiftKey)
                $('#text').click()

            if ((e.key === 'i' || e.key === 'I') && !e.shiftKey)
                $('#images').click()

            if ((e.key === 's' || e.key === 'S') && !e.shiftKey)
                $('#select').click()
            // alert(ctrl)

            if ((e.key === 'c' || e.key === 'C') && !e.shiftKey)
                $('#colors').click()

            if ((e.key === 'Delete') && !e.shiftKey && !e.ctrlKey)
                $('#clear').click()

            if ((e.key === 'Escape') && !e.ctrlKey)
                $('#close').click()

            if ((e.key === 'r' || e.key === 'R') && !e.ctrlKey) {
                $('#shape').click()
                $('#labelShapeSquare').click()
                //don't know why but thid needs to be doubled, otherwise it won't work
                $('#labelShapeSquare').click()
            }
            if ((e.key === 'e' || e.key === 'E') && !e.ctrlKey) {
                $('#shape').click()
                $('#labelShapeCircle').click()
                //don't know why but thid needs to be doubled, otherwise it won't work
                $('#labelShapeCircle').click()
            }
            if ((e.key === 'c' || e.key === 'C') && e.ctrlKey && !e.shiftKey) {
                $('#select').click()
                //dont'know why but the select Option jumps every time 
                $('#labelCopy').click()
            }
            if ((e.key === 'x' || e.key === 'X') && e.ctrlKey) {
                $('#select').click()
                $('#labelCut').click()
            }
            if ((e.key === 'f' || e.key === 'F') && e.ctrlKey) {
                $('#colors').click()
                $('#backColor').click()
                e.preventDefault()
            }
            if ((e.key === 'Delete') && e.ctrlKey) {
                $('#select').click()
                $('#labelDelete').click()
            }
        }
    })

    $("#img1").load(function () {
        $('#imagesDiv').LoadingOverlay("hide", true)
    });

    $("#obj1").load(function () {
        $('#objectsDiv').LoadingOverlay("hide", true)
    });
});