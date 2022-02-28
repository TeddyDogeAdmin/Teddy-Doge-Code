// TODO: Actually calculate price

import { ChainId, Currency, currencyEquals, JSBI, Price, WBNB } from 'teddyswap-sdk'
import { useMemo } from 'react'
import { USDCe } from '../constants'
import { PairState, usePairs } from '../data/Reserves'
import { useActiveWeb3React } from '../hooks'
import { wrappedCurrency } from './wrappedCurrency'

/**
 * Returns the price in USDC of the input currency
 * @param currency currency to compute the USDC price of
 */
export default function useUSDCPrice(currency?: Currency): Price | undefined {
	const { chainId } = useActiveWeb3React()
	const wrapped = wrappedCurrency(currency, chainId)
	const USDC = chainId ? USDCe[chainId] : USDCe[ChainId.BSC]
	const tokenPairs: [Currency | undefined, Currency | undefined][] = useMemo(
		() => [
			[
				chainId && wrapped && currencyEquals(WBNB[chainId], wrapped) ? undefined : currency,
				chainId ? WBNB[chainId] : undefined
			],
			[wrapped?.equals(USDC) ? undefined : wrapped, chainId === ChainId.BSC ? USDC : undefined],
			[chainId ? WBNB[chainId] : undefined, chainId === ChainId.BSC ? USDC : undefined]
		],
		[chainId, currency, wrapped, USDC]
	)
	const [[avaxPairState, avaxPair], [usdcPairState, usdcPair], [usdcAvaxPairState, usdcAvaxPair]] = usePairs(tokenPairs)

	return useMemo(() => {
		if (!currency || !wrapped || !chainId) {
			return undefined
		}
		// handle wavax/avax
		if (wrapped.equals(WBNB[chainId])) {
			if (usdcPair) {
				const price = usdcPair.priceOf(WBNB[chainId])
				return new Price(currency, USDC, price.denominator, price.numerator)
			} else {
				return undefined
			}
		}
		// handle usdc
		if (wrapped.equals(USDC)) {
			return new Price(USDC, USDC, '1', '1')
		}

		const avaxPairBNBAmount = avaxPair?.reserveOf(WBNB[chainId])
		const avaxPairBNBUSDCValue: JSBI =
			avaxPairBNBAmount && usdcAvaxPair ? usdcAvaxPair.priceOf(WBNB[chainId]).quote(avaxPairBNBAmount).raw : JSBI.BigInt(0)

		// all other tokens
		// first try the usdc pair
		if (usdcPairState === PairState.EXISTS && usdcPair && usdcPair.reserveOf(USDC).greaterThan(avaxPairBNBUSDCValue)) {
			const price = usdcPair.priceOf(wrapped)
			return new Price(currency, USDC, price.denominator, price.numerator)
		}
		if (avaxPairState === PairState.EXISTS && avaxPair && usdcAvaxPairState === PairState.EXISTS && usdcAvaxPair) {
			if (usdcAvaxPair.reserveOf(USDC).greaterThan('0') && avaxPair.reserveOf(WBNB[chainId]).greaterThan('0')) {
				const avaxUsdcPrice = usdcAvaxPair.priceOf(USDC)
				const currencyAvaxPrice = avaxPair.priceOf(WBNB[chainId])
				const usdcPrice = avaxUsdcPrice.multiply(currencyAvaxPrice).invert()
				return new Price(currency, USDC, usdcPrice.denominator, usdcPrice.numerator)
			}
		}
		return undefined
	}, [chainId, currency, avaxPair, avaxPairState, usdcAvaxPair, usdcAvaxPairState, usdcPair, usdcPairState, wrapped, USDC])
}