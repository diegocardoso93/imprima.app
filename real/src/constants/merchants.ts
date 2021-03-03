
export interface Merchant {
  nome: string,
  cidade: string,
  preco: number,
  frete: number
}

export const merchants: Merchant[] = [
  {
    nome: 'Personalizados',
    cidade: 'Tubarão SC',
    preco: 72.00,
    frete: 18.00
  },
  {
    nome: 'Artisticos',
    cidade: 'Tubarão SC',
    preco: 69.00,
    frete: 19.00
  }
];
