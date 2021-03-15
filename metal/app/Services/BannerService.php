<?php

namespace App\Services;

class BannerService
{
    public function get($origin)
    {
        // no primeiro acesso chamar o indexer da url
        // indexer vai chamar url no Lynx, (ou crawer somente texto)
        // strip das tags (ou crawler somente text)
        // passar no gerador do gif / banner com base no assunto

        // -- futuramente analisar automatização unsplash/pixabay + background remover

        return ['image' => 'https://imprima.app/img/camiseta_banner01.png'];
    }
}
