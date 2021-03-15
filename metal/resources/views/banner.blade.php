<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>imprima.app</title>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap" />
        <style>
            body {
                font-family: 'Montserrat', serif;
                margin: 0;
                height: 250px;
                width: 300px;
                user-select: none;
                cursor: pointer;
            }
            .tleft {
                font-size: 13px;
                color: white;
                position: absolute;
                top: 143px;
                width: 88px;
                text-align: center;
            }
            .tright {
                font-size: 13px;
                color: white;
                position: absolute;
                top: 146px;
                right: 5px;
                width: 74px;
                text-align: center;
            }
            .tcenter {
                font-size: 15px;
                color: white;
                text-decoration: underline;
                position: absolute;
                bottom: 7px;
                width: 100%;
                text-align: center;
                font-weight: bold;
            }
            .banner {
                user-drag: none;
            }
        </style>
    </head>
    <body>
        <img class="banner" src="{{ $image }}" alt="" />
        <div class="tleft">entrega até no mesmo dia*</div>
        <div class="tright">frete até grátis*</div>
        <div class="tcenter">conheça já!</div>

        <script>
            document.querySelector('body').onclick = function() {
                parent.postMessage({active: true}, '*');
            }
            function animate() {
                document.querySelector('.tleft').style.display = 'none';
                document.querySelector('.tright').style.display = 'none';
                document.querySelector('.tcenter').style.display = 'none';
                setTimeout(function () { document.querySelector('.tleft').style.display = 'block';}, 1000);
                setTimeout(function () { document.querySelector('.tright').style.display = 'block';}, 2000);
                setTimeout(function () { document.querySelector('.tcenter').style.display = 'block';}, 3000);
            }
            setInterval(function () {
                animate();
            }, 5000);
            animate();
        </script>
    </body>
</html>
