<?php

namespace App\Services;

class BannerService
{
    private $kindService;

    public function __construct(KindService $kindService)
    {
        $this->kindService = $kindService;
    }

    private $validKeywords = [
        'inter', 'gremio', 'gato', 'cachorro'
    ];

    public function get($query, $imprimaId)
    {
        // no primeiro acesso chamar o indexer da url
        // indexer vai chamar url no Lynx, (ou crawer somente texto)
        // strip das tags (ou crawler somente text)
        // passar no gerador do gif / banner com base no assunto
        // -- futuramente analisar automatização unsplash/pixabay + background remover

        // find kind name = $this->getKeyword(base64_decode($query))

        $kind = $this->kindService->getKindByName($this->getKeyword(base64_decode($query)), 2);
//dd($kind);
        return [
            'type' => 2,
            'kind' => $kind,
            'imprimaId' => $imprimaId
        ];

//        return [
//            'type' => 1,
//            'image' => 'https://imprima.app/img/camiseta_banner01.png'
//        ];

        return [
            'type' => 2,
            'image' => 'https://imprima.app/img/caneca_banner01.png'
        ];

//        return [
//            'type' => 3,
//            'image' => 'https://imprima.app/img/quadro_banner01.png'
//        ];

//        return [
//            'type' => 4,
//            'image' => 'https://imprima.app/img/almofada_banner01.png'
//        ];
    }

    public function getKeyword($text)
    {
        $words = explode(' ', $text);

        foreach ($words as $word) {
            $word = strtolower($word);
            if (in_array($word, $this->validKeywords)) {
                return $word;
            }
        }

        return null;
    }
}
