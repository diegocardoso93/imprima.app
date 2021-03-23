<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>imprima.app</title>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap" />
        <link rel="stylesheet" href="/css/banner.css" />
    </head>
    <body>
        <img class="banner" src="{{ $kind->url }}" alt="" />
        <img class="tlogo t-{{ $type }}" src="{{ $logourl }}" alt="" />
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
