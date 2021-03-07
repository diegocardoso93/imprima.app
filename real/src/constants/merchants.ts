
export interface Merchant {
  nome: string,
  cidade: string,
  preco: number,
  frete: string
}

export const merchants: Merchant[] = [
  {
    nome: 'Personalizados',
    cidade: 'Tubarão SC',
    preco: 72.00,
    frete: 'grátis'
  },
  {
    nome: 'Artisticos',
    cidade: 'Tubarão SC',
    preco: 69.00,
    frete: 'retirar'
  }
];
