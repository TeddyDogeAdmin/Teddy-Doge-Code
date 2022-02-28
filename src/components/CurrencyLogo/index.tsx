import { Currency, CBNB, Token } from 'teddyswap-sdk'
import React, { useMemo } from 'react'
import styled from 'styled-components'

import AvaxLogo from '../../assets/images/binance-coin-bnb-logo.png'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import Logo from '../Logo'

const getTokenLogoURL = (address: string) => {
  if (address.toLowerCase() == '0x10f6f2b97f3ab29583d9d38babf2994df7220c21'.toLowerCase()) {
    return `/logo.png`
  }
  return `https://tokens.pancakeswap.finance/images/${address}.png`
}

export const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
  ${({ theme, size }) => theme.mediaWidth.upToMedium`
    width: ${parseInt(size) / 2 + "px"};
    height: ${parseInt(size) / 2 + "px"};
`};
`

const StyledLogo = styled(Logo) <{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  ${({ theme, size }) => theme.mediaWidth.upToMedium`
    width: ${parseInt(size) / 2 + "px"};
    height: ${parseInt(size) / 2 + "px"};
  `};
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency === CBNB) return []
    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, getTokenLogoURL(currency.address)]
      }

      return [...uriLocations, getTokenLogoURL(currency.address)]
    }
    return []
  }, [currency, uriLocations])

  if (currency === CBNB) {
    return <StyledEthereumLogo src={AvaxLogo} size={size} style={style} />
  }
  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}
