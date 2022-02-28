import { Currency, CBNB, Token } from 'teddyswap-sdk'

export function currencyId(currency: Currency): string {
  if (currency === CBNB) return 'BNB'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}
