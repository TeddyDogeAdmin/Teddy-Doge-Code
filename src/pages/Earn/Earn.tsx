import React, { useCallback, useEffect, useState } from 'react'
import { AutoColumn } from '../../components/Column'
import { ChevronDown, ChevronUp } from 'react-feather'
import styled from 'styled-components'
import { DoubleSideStakingInfo } from '../../state/stake/hooks'
import { DOUBLE_SIDE_STAKING_REWARDS_INFO } from '../../state/stake/doubleSideConfig'
import { TYPE, ExternalLink } from '../../theme'
import DoubleSidePoolCard from '../../components/earn/DoubleSidePoolCard'
import SidePoolItem from '../../components/earn/SidePoolItem'
import { NavLink } from 'react-router-dom'
import { AutoRow, RowBetween } from '../../components/Row'
import { CardSection, DataCard, CardNoise, CardBGImage } from '../../components/earn/styled'
import Loader from '../../components/Loader'
import { Table } from '../../components/Table'
import { useActiveWeb3React } from '../../hooks'
import { JSBI } from 'teddyswap-sdk'
import { useTranslation } from 'react-i18next'
import { SearchInput } from '../../components/SearchModal/styleds'
import useDebounce from '../../hooks/useDebounce'
import { BIG_INT_ZERO } from '../../constants'

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
  background: #fff;
  border-radius: 26px;
  padding: 34px 36px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 34px 9px;
`};
`

const TopSection = styled(AutoColumn)`
  max-width: 720px;
  width: 100%;
`

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

const PoolSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 10px;
  // row-gap: 15px;
  width: 100%;
  justify-self: center;
`

const DataRow = styled(RowBetween)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
   flex-direction: column;
 `};
`

const SortSection = styled.div`
  display: flex;
`
const SortField = styled.div`
  margin: 0px 5px 0px 5px;
  font-weight: 400;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  line-height: 20px;
`

const SortFieldContainer = styled.div`
  display: flex;
  max-width: 640px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
   display: none;
 `};
`

enum SortingType {
  totalStakedInUsd = 'totalStakedInUsd',
  multiplier = 'multiplier',
  totalApr = 'totalApr'
}

const SearchBox = styled.div`
  border-bottom: 1px solid #f6f5f8;
  padding-bottom: 15px;
`

const ListContainer = styled.div``
const ContainerHeader = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
`
const HeaderTitle = styled.div`
  // font-family: PingFang HK;
  font-size: 18px;
  line-height: 34px;
  color: #2c0f10;
  flex: 1;
  line-height: 54px;
  white-space: nowrap;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 14px;
`};
`
const ContainerContent = styled.div`
  max-height: 450px;
  overflow: auto;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 12px;
  `};
  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #86909c;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
`

export interface EarnProps {
  version: string
  stakingInfos: DoubleSideStakingInfo[]
  poolMap?: { [key: string]: number }
}

const Earn: React.FC<EarnProps> = ({ version, stakingInfos, poolMap }) => {
  const { chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const [poolCardsLoading, setPoolCardsLoading] = useState(false)
  const [poolCards, setPoolCards] = useState<any[]>()
  const [filteredPoolCards, setFilteredPoolCards] = useState<any[]>()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<any>({ field: '', desc: true })
  const debouncedSearchQuery = useDebounce(searchQuery, 250)
  const [stakingInfoData, setStakingInfoData] = useState<any[]>(stakingInfos)
  const handleSearch = useCallback(event => {
    setSearchQuery(event.target.value.trim().toUpperCase())
  }, [])
  useEffect(() => {
    const filtered = poolCards?.filter(
      card =>
        card.props.stakingInfo.tokens[0].symbol.toUpperCase().includes(debouncedSearchQuery) ||
        card.props.stakingInfo.tokens[1].symbol.toUpperCase().includes(debouncedSearchQuery)
    )
    setFilteredPoolCards(filtered)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolCards, debouncedSearchQuery])

  useEffect(() => {
    Promise.all(
      stakingInfoData.sort(function(info_a, info_b) {
        if (sortBy.field === SortingType.totalStakedInUsd) {
          if (sortBy.desc) {
            return info_a.totalStakedInUsd?.greaterThan(info_b.totalStakedInUsd ?? BIG_INT_ZERO) ? -1 : 1
          } else {
            return info_a.totalStakedInUsd?.lessThan(info_b.totalStakedInUsd ?? BIG_INT_ZERO) ? -1 : 1
          }
        }
        if (sortBy.field === SortingType.multiplier) {
          if (sortBy.desc) {
            return JSBI.greaterThan(info_a.multiplier, info_b.multiplier) ? -1 : 1
          } else {
            return JSBI.lessThan(info_a.multiplier, info_b.multiplier) ? -1 : 1
          }
        }
        if (sortBy.field === SortingType.totalApr) {
          if (sortBy.desc) {
            return info_a.stakingApr + info_a.swapFeeApr > info_b.stakingApr + info_b.swapFeeApr ? -1 : 1
          } else {
            return info_a.stakingApr + info_a.swapFeeApr < info_b.stakingApr + info_b.swapFeeApr ? -1 : 1
          }
        }
        return 0
      })
    ).then(stakingInfoData => {
      const poolCards = stakingInfoData.map((stakingInfo, index) => {
        return (
          <SidePoolItem
            swapFeeApr={stakingInfo.swapFeeApr}
            stakingApr={stakingInfo.stakingApr}
            key={index}
            stakingInfo={stakingInfo}
            version={version}
          />
        )
        // return (
        //   <DoubleSidePoolCard
        //     swapFeeApr={stakingInfo.swapFeeApr}
        //     stakingApr={stakingInfo.stakingApr}
        //     key={index}
        //     stakingInfo={stakingInfo}
        //     version={version}
        //   />
        // )
      })
      setPoolCards(poolCards)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy?.field, sortBy?.desc])

  useEffect(() => {
    setPoolCardsLoading(true)
    console.log(stakingInfos, 'stakingInfos')
    if (stakingInfos?.length > 0) {
      Promise.all(
        stakingInfos
          .filter(function(info) {
            // Only include pools that are live or require a migration
            return !info.isPeriodFinished || info.stakedAmount.greaterThan(BIG_INT_ZERO)
          })
          .sort(function(info_a, info_b) {
            // only first has ended
            if (info_a.isPeriodFinished && !info_b.isPeriodFinished) return 1
            // only second has ended
            if (!info_a.isPeriodFinished && info_b.isPeriodFinished) return -1
            // greater stake in avax comes first
            return info_a.totalStakedInUsd?.greaterThan(info_b.totalStakedInUsd ?? BIG_INT_ZERO) ? -1 : 1
          })
          .sort(function(info_a, info_b) {
            // only the first is being staked, so we should bring the first up
            if (info_a.stakedAmount.greaterThan(BIG_INT_ZERO) && !info_b.stakedAmount.greaterThan(BIG_INT_ZERO))
              return -1
            // only the second is being staked, so we should bring the first down
            if (!info_a.stakedAmount.greaterThan(BIG_INT_ZERO) && info_b.stakedAmount.greaterThan(BIG_INT_ZERO))
              return 1
            return 0
          })
          // TODO: update here api call without staking reward address
          .map(stakingInfo => {
            if (poolMap) {
              return fetch(`https://api.pangolin.exchange/pangolin/apr2/0`)
                .then(res => res.json())
                .then(res => ({
                  swapFeeApr: Number(res.swapFeeApr),
                  stakingApr: Number(res.stakingApr),
                  combinedApr: Number(res.combinedApr),
                  ...stakingInfo
                }))
            } else {
              return fetch(`https://api.pangolin.exchange/pangolin/apr2/0`)
                .then(res => res.json())
                .then(res => ({
                  swapFeeApr: Number(res.swapFeeApr),
                  stakingApr: Number(res.stakingApr),
                  combinedApr: Number(res.combinedApr),
                  ...stakingInfo
                }))
            }
          })
      ).then(updatedStakingInfos => {
        const poolCards = updatedStakingInfos.map((stakingInfo, index) => {
          // return (
          //   <DoubleSidePoolCard
          //     // @ts-ignore
          //     swapFeeApr={stakingInfo.swapFeeApr}
          //     // @ts-ignore
          //     stakingApr={stakingInfo.stakingApr}
          //     key={index}
          //     stakingInfo={stakingInfo}
          //     version={version}
          //   />
          // )
          return (
            <SidePoolItem
              swapFeeApr={stakingInfo.swapFeeApr}
              stakingApr={stakingInfo.stakingApr}
              key={index}
              stakingInfo={stakingInfo}
              version={version}
            />
          )
          // return (
          //   <DoubleSidePoolCard
          //     // @ts-ignore
          //     swapFeeApr={stakingInfo.swapFeeApr}
          //     // @ts-ignore
          //     stakingApr={stakingInfo.stakingApr}
          //     key={index}
          //     stakingInfo={stakingInfo}
          //     version={version}
          //   />
          // )
        })
        setStakingInfoData(updatedStakingInfos)
        setPoolCards(poolCards)
        setPoolCardsLoading(false)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stakingInfos?.length, version])

  const stakingRewardsExist = Boolean(
    typeof chainId === 'number' && (DOUBLE_SIDE_STAKING_REWARDS_INFO[chainId]?.length ?? 0) > 0
  )
  const getSortField = (label: string, field: string, sortBy: any, setSortBy: Function) => {
    return (
      <SortField
        onClick={() => {
          const desc = sortBy?.field === field ? !sortBy?.desc : true
          setSortBy({ field, desc })
        }}
      >
        {label}
        {sortBy?.field === field && (sortBy?.desc ? <ChevronDown size="16" /> : <ChevronUp size="16" />)}
      </SortField>
    )
  }

  return (
    <PageWrapper gap="lg" justify="center">
      {/* <TopSection gap="md">
        <DataCard>
          <CardBGImage />
          <CardNoise />
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.white fontWeight={600}>{t('earnPage.pangolinLiquidityMining')}</TYPE.white>
              </RowBetween>
              <RowBetween>
                <TYPE.white fontSize={14}>{t('earnPage.depositPangolinLiquidity')}</TYPE.white>
              </RowBetween>
            </AutoColumn>
          </CardSection>
          <CardBGImage />
          <CardNoise />
        </DataCard>
      </TopSection> */}
      <AutoColumn gap="lg" style={{ width: '100%', maxWidth: '720px' }}>
        <DataRow style={{ alignItems: 'baseline' }}>
          <TYPE.mediumHeader style={{ marginTop: '0.5rem' }}>{t('earnPage.participatingPools')}</TYPE.mediumHeader>
        </DataRow>
        <PoolSection>
          <SearchBox>
            <SearchInput
              type="text"
              id="token-search-input"
              placeholder={t('searchModal.tokenName')}
              value={searchQuery}
              onChange={handleSearch}
            />
          </SearchBox>
          <ListContainer>
            <ContainerHeader>
              <HeaderTitle> Cash Pooling</HeaderTitle>
              <HeaderTitle>TVL</HeaderTitle>
              <HeaderTitle>Rewards APR</HeaderTitle>
              <HeaderTitle>Total APR</HeaderTitle>
            </ContainerHeader>
            <ContainerContent>
              {filteredPoolCards}
              {/* <RowItem>
                <ContentItem>
                  <img height={'20px'} src={'./static/media/icon.adcff230.svg'} />
                  <img height={'20px'} style={{margin:'0 5px 0 3px'}} src={'./static/media/icon.adcff230.svg'} />
                  WETH/PSP
                </ContentItem>
                <ContentItem>
                $2,632,901
                </ContentItem>
                <ContentItem>
                  <img height={'20px'} style={{margin:'0 6px 0 0px'}} src={'./static/media/icon.adcff230.svg'} />
                  19.43 SUSHI/DAY
                </ContentItem>
                <ContentItem>
                4.92%
                </ContentItem>
              </RowItem> */}
            </ContainerContent>
          </ListContainer>
          {/* {(stakingRewardsExist && stakingInfos?.length === 0) || poolCardsLoading ? (
            t('earnPage.noActiveRewards')
          ) : (!stakingRewardsExist || poolCards?.length === 0) && !poolCardsLoading ? (
            t('earnPage.noActiveRewards')
          ) : (
            <>
              <SearchInput
                type="text"
                id="token-search-input"
                placeholder={t('searchModal.tokenName')}
                value={searchQuery}
                onChange={handleSearch}
              />
              <SortSection>
                Sort by :{' '}
                <SortFieldContainer>
                  {getSortField('Liquidity', SortingType.totalStakedInUsd, sortBy, setSortBy)} |{' '}
                  {getSortField('Pool Weight', SortingType.multiplier, sortBy, setSortBy)} |{' '}
                </SortFieldContainer>
                {getSortField('APR', SortingType.totalApr, sortBy, setSortBy)}
              </SortSection>
              {filteredPoolCards}
            </>
          )} */}
        </PoolSection>
      </AutoColumn>
    </PageWrapper>
  )
}

export default Earn
