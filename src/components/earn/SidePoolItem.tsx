import React from 'react'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import styled from 'styled-components'
import { TYPE, StyledInternalLink } from '../../theme'
import DoubleCurrencyLogo from '../DoubleLogo'
import { CBNB, Token } from 'teddyswap-sdk'
import { ButtonPrimary } from '../Button'
import { DoubleSideStakingInfo, useMinichefPools } from '../../state/stake/hooks'
import { useColor } from '../../hooks/useColor'
import { currencyId } from '../../utils/currencyId'
import { Break, CardNoise, CardBGImage } from './styled'
import { unwrappedToken } from '../../utils/wrappedCurrency'
import { PNG } from '../../constants'
import { useTranslation } from 'react-i18next'

const RowItem = styled.div`
  display: flex;
  width: 100%;
  line-height: 50px;
  background: #F6F5F8;
  border-radius: 10px;
  white-space:nowrap
  margin-top: 18px;
  padding: 0 10px;
  &:first-child{
    margin-top: 0;
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
  padding: 0 5px;
  `};
`
const ContentItem = styled.div`
  align-items: center;
  justify-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
  align-content: center;
}
`

export default function SidePoolItem({
  stakingInfo,
  version,
  swapFeeApr,
  stakingApr
}: {
  stakingInfo: DoubleSideStakingInfo
  version: string
  swapFeeApr: number
  stakingApr: number
}) {
  const token0 = stakingInfo.tokens[0]
  const token1 = stakingInfo.tokens[1]

  const currency0 = unwrappedToken(token0)
  const currency1 = unwrappedToken(token1)

  const poolMap = useMinichefPools()

  const { t } = useTranslation()
  const isStaking = Boolean(stakingInfo.stakedAmount.greaterThan('0'))

  const token: Token =
    currency0 === CBNB || currency1 === CBNB
      ? currency0 === CBNB
        ? token1
        : token0
      : token0.equals(PNG[token0.chainId])
      ? token1
      : token0

  // get the color of the token
  const backgroundColor = useColor(token)
  // TODO: Orange NEED FIX
  // const totalStakedInUsd = stakingInfo.totalStakedInUsd.toSignificant(4, { groupSeparator: ',' })
  const totalStakedInUsd = '-'
  const pairAddress = stakingInfo?.stakedAmount?.token?.address
  return (
    <StyledInternalLink
      to={`/png/${currencyId(currency0)}/${currencyId(currency1)}/${version}`}
      style={{ color: '#111' }}
    >
      <RowItem>
        <ContentItem>
          <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={24} />
          <div style={{ marginLeft: '8px' }}>
            {currency0.symbol}-{currency1.symbol}
          </div>
        </ContentItem>
        <ContentItem>{totalStakedInUsd ? `$${totalStakedInUsd}` : '-'}</ContentItem>
        <ContentItem>
          {/* <img height={'20px'} style={{margin:'0 6px 0 0px'}} src={'./static/media/icon.adcff230.svg'} /> */}
          {stakingApr && !stakingInfo.isPeriodFinished ? `${stakingApr}%` : '18%'}
        </ContentItem>
        <ContentItem>{swapFeeApr && !stakingInfo.isPeriodFinished ? `${swapFeeApr + stakingApr}%` : '21%'}</ContentItem>
      </RowItem>
    </StyledInternalLink>
  )
}

// export default function DoubleSidePoolCard({
//   stakingInfo,
//   version,
//   swapFeeApr,
//   stakingApr
// }: {
//   stakingInfo: DoubleSideStakingInfo
//   version: string
//   swapFeeApr: number
//   stakingApr: number
// }) {
//   const token0 = stakingInfo.tokens[0]
//   const token1 = stakingInfo.tokens[1]

//   const currency0 = unwrappedToken(token0)
//   const currency1 = unwrappedToken(token1)

//   const poolMap = useMinichefPools()

//   const { t } = useTranslation()
//   const isStaking = Boolean(stakingInfo.stakedAmount.greaterThan('0'))

//   const token: Token =
//     currency0 === CBNB || currency1 === CBNB
//       ? currency0 === CBNB
//         ? token1
//         : token0
//       : token0.equals(PNG[token0.chainId])
//       ? token1
//       : token0

//   const backgroundColor = useColor(token)
//   const totalStakedInUsd = '-'
//   const pairAddress = stakingInfo?.stakedAmount?.token?.address

//   return (
//     <Wrapper showBackground={isStaking} bgColor={backgroundColor}>
//       <CardBGImage desaturate />
//       <CardNoise />

//       <TopSection isStaking={isStaking}>
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={24} />
//           <TYPE.white fontWeight={600} fontSize={24} style={{ marginLeft: '8px' }}>
//             {currency0.symbol}-{currency1.symbol}
//           </TYPE.white>
//         </div>
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           {/* Beta Migration */}
//           {isStaking && Number(version) === 1 && poolMap.hasOwnProperty(pairAddress) ? (
//             <StyledInternalLink to={`/beta/migrate/${version}`} style={{ marginRight: '10px' }}>
//               <ButtonPrimary padding="8px" borderRadius="8px">
//                 Migrate
//               </ButtonPrimary>
//             </StyledInternalLink>
//           ) : null}

//           {(isStaking || !stakingInfo.isPeriodFinished) && (
//             <StyledInternalLink
//               to={`/png/${currencyId(currency0)}/${currencyId(currency1)}/${version}`}
//               style={{ width: '100%' }}
//             >
//               <ButtonPrimary padding="8px" borderRadius="8px">
//                 {isStaking ? t('earn.manage') : t('earn.deposit')}
//               </ButtonPrimary>
//             </StyledInternalLink>
//           )}
//         </div>
//       </TopSection>

//       <StatContainer>
//         <RowBetween>
//           <TYPE.white> {t('earn.totalStaked')}</TYPE.white>
//           <TYPE.white>{totalStakedInUsd ? `$${totalStakedInUsd}` : '-'}</TYPE.white>
//         </RowBetween>
//       </StatContainer>
//       <AprContainer>
//         <RowBetween>
//           <TYPE.white>Swap Fee APR</TYPE.white>
//           <TYPE.white>{swapFeeApr && !stakingInfo.isPeriodFinished ? `${swapFeeApr}%` : '-'}</TYPE.white>
//         </RowBetween>
//         <RowBetween>
//           <TYPE.white>Teddy Rewards APR</TYPE.white>
//           <TYPE.white>{stakingApr && !stakingInfo.isPeriodFinished ? `${stakingApr}%` : '-'}</TYPE.white>
//         </RowBetween>
//         <RowBetween>
//           <TYPE.white>Total APR</TYPE.white>
//           <TYPE.white>{swapFeeApr && !stakingInfo.isPeriodFinished ? `${swapFeeApr + stakingApr}%` : '-'}</TYPE.white>
//         </RowBetween>
//       </AprContainer>
//       <StatContainer>
//         <RowBetween>
//           <TYPE.white> {t('earn.poolWeight')} </TYPE.white>
//           <TYPE.white>{`${stakingInfo.multiplier}X`}</TYPE.white>
//         </RowBetween>
//       </StatContainer>

//       {isStaking && (
//         <>
//           <Break />
//           <BottomSection showBackground={true}>
//             <TYPE.black color={'white'} fontWeight={500}>
//               <span>{t('earn.yourRate')}</span>
//             </TYPE.black>

//             <TYPE.black style={{ textAlign: 'right' }} color={'white'} fontWeight={500}>
//               <span role="img" aria-label="wizard-icon" style={{ marginRight: '0.5rem' }}>
//                 ⚡
//               </span>
//               {`${stakingInfo.rewardRate
//                 ?.multiply(`${60 * 60 * 24 * 7}`)
//                 ?.toSignificant(4, { groupSeparator: ',' })} Teddy / week`}
//             </TYPE.black>
//           </BottomSection>
//         </>
//       )}
//     </Wrapper>
//   )
// }
