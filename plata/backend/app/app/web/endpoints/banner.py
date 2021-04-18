from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from app.templates import templates

router = APIRouter()


@router.get("/banner")
async def banner(request: Request, response_class=HTMLResponse):
    return templates.TemplateResponse('banner.html', {
        'request': request,
        'logourl': '/img/_logobanner/2.png',
        'kind': {'id': 6, 'url': '/img/produto/animais_doceis/00Gatinho.png', 'category_id': 2},
        'type': 2,
        'imprimaId': 123
    })


# private $validKeywords = [
#     // animais_doceis
#     'Gatinho' => ['gato', 'gatinho'],

#     // times
#     'Grêmio' => ['gremio'],
#     'Inter' => ['inter', 'internacional'],
#     'Santa Cruz' => ['santa cruz', 'galo'],
#     'Sport Recife' => ['sport recife', 'recife'],
#     'São Paulo' => ['sao paulo'],
#     'Santos' => ['santos'],
#     'Red Bull Bragantino' => ['red bull bragantino', 'red bull'],
#     'Palmeiras' => ['palmeiras'],
#     'Goiás' => ['goias'],
#     'Fortaleza' => ['fortaleza'],
#     'Fluminense' => ['fluminense'],
#     'Flamengo' => ['flamengo'],
#     'Corinthians' => ['corinthians'],
#     'Coritiba' => ['coritiba'],
#     'Ceará' => ['ceara'],
#     'Botafogo' => ['botafogo'],
#     'Bahia' => ['bahia'],
#     'Atlético Paranaense' => ['atletico paranaense', 'paranaense'],
#     'Atlético Mineiro' => ['atletico mineiro', 'mineiro'],
#     'Atlético Goianiense' => ['atletico goianiense', 'goianiense'],
#     'Vasco da Gama' => ['vasco da gama', 'vasco'],

#     // bandeiras
#     'Brasil' => ['brasil'],
#     'EUA' => ['eua', 'estados unidos'],
#     'Alemanha' => ['alemanha', 'alema', 'germanica'],
#     'Reino Unido' => ['reino unido', 'gra bretanha', 'europa'],
# ];

# public function get($query, $imprimaId)
# {
#     // no primeiro acesso chamar o indexer da url
#     // indexer vai chamar url no Lynx, (ou crawer somente texto)
#     // strip das tags (ou crawler somente text)
#     // passar no gerador do gif / banner com base no assunto
#     // -- futuramente analisar automatização unsplash/pixabay + background remover

#     // find kind name = $this->getKeyword(base64_decode($query))
#     $title = base64_decode($query);
#     $kind = $this->kindService->getKindByName($this->getKeyword($title), 2);

#     return [
#         'type' => 2,
#         'kind' => $kind,
#         'imprimaId' => $imprimaId,
#         'logourl' => 'https://imprima.app/img/_logobanner/2.png'
#     ];
# }

# public function getKeyword($text)
# {
#     $lowerText = strtolower($text);
#     foreach ($this->validKeywords as $found => $variations) {
#         foreach ($variations as $variation) {
#             if (strpos($lowerText, $variation) > -1) {
#                 return $found;
#             }
#         }
#     }

#     return null;
# }
