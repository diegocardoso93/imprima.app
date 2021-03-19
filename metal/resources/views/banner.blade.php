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
            .tleft.t-2 {
                color: black;
                top: 108px;
                width: 65px;
            }
            .tright.t-2 {
                color: black;
                top: 114px;
                right: 5px;
                width: 50px;
            }
            .tcenter.t-2 {
                color: black;
                bottom: 16px;
            }
            .tleft.t-3 {
                color: black;
                top: 108px;
                width: 65px;
                left: -2px;
            }
            .tright.t-3 {
                color: black;
                top: 114px;
                right: 4px;
                width: 50px;
            }
            .tcenter.t-3 {
                color: black;
                bottom: 10px;
            }
            .tleft.t-4 {
                color: black;
                top: 108px;
                width: 65px;
            }
            .tright.t-4 {
                color: black;
                top: 114px;
                right: 10px;
                width: 50px;
            }
            .tcenter.t-4 {
                color: black;
                bottom: 8px;
            }
        </style>
    </head>
    <body>
        <img class="banner" src="{{ $kind->url }}" alt="" />
        <div class="tleft t-{{ $type }}">entrega até no mesmo dia*</div>
        <div class="tright t-{{ $type }}">frete até grátis*</div>
        <div class="tcenter t-{{ $type }}">conheça já!</div>

        <script>
            document.querySelector('body').onclick = function() {
                parent.postMessage({
                    active: true,
                    kindId: "{{ $kind->id }}",
                    imprimaId: "{{ $imprimaId }}"
                }, '*');
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
