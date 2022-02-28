import { ChainId, TokenAmount } from 'teddyswap-sdk'
import React, { useState, useRef } from 'react'
import { Text } from 'rebass'
import { NavLink } from 'react-router-dom'
// import { useLocation } from 'react-router'
import { darken } from 'polished'
import { useTranslation } from 'react-i18next'
// import { ChevronDown } from 'react-feather'
import styled from 'styled-components'
import Logo from '../../assets/images/logo.png'
import LogoDark from '../../assets/images/logo.png'
import SwapIcon from '../../assets/images/index/swap_icon.png';
import PoolIcon from '../../assets/images/index/pool_icon.png';
import FarmIcon from '../../assets/images/index/farm_icon.png';
import ChartIcon from '../../assets/images/index/chars_icon.png';
import { useActiveWeb3React } from '../../hooks'
import { useDarkModeManager } from '../../state/user/hooks'
import { useETHBalances, useAggregatePngBalance } from '../../state/wallet/hooks'
import { CardNoise } from '../earn/styled'
import { CountUp } from 'use-count-up'
import { TYPE, ExternalLink } from '../../theme'
import { RedCard } from '../Card'
import Settings from '../Settings'
import Menu from '../Menu'
import Row, { RowFixed } from '../Row'
import Web3Status from '../Web3Status'
import Modal from '../Modal'
import PngBalanceContent from './PngBalanceContent'
import usePrevious from '../../hooks/usePrevious'
import { ANALYTICS_PAGE } from '../../constants'
import LanguageSelection from '../LanguageSelection'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useToggleModal } from '../../state/application/hooks'
// import { MenuFlyout } from '../StyledMenu'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'

const HeaderFrame = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  // padding: 1rem;
  padding: 5px 28px;
  z-index: 2;
  background: #FFFFFF;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    padding: 0 1rem;
    width: calc(100%);
    position: relative;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        padding: 0.5rem 1rem;
  `}
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    width: 100%;
    max-width: 960px;
    padding: 1rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 99;
    height: 72px;
    border-radius: 12px 12px 0 0;
    background-color: ${({ theme }) => theme.bg1};
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
   flex-direction: row-reverse;
    align-items: center;
  `};
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
`

const HeaderRow = styled(RowFixed)`
  ${({ theme }) => theme.mediaWidth.upToMedium`
   width: 100%;
  `};
`

const HeaderLinks = styled(Row)`
  justify-content: center;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    // padding: 1rem 0 1rem 1rem;
    // justify-content: flex-end;
    justify-content: space-around;
`};
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;
  :focus {
    border: 1px solid blue;
  }
  /* :hover {
    background-color: ${({ theme, active }) => (!active ? theme.bg2 : theme.bg4)};
  } */
`

const PNGAmount = styled(AccountElement)`
  color: white;
  padding: 4px 8px;
  height: 36px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.bg3};
  background: radial-gradient(174.47% 188.91% at 1.84% 0%, #f97316 0%, #FFC107 100%), #edeef2;
`

const PNGWrapper = styled.span`
  width: fit-content;
  position: relative;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  :active {
    opacity: 0.9;
  }
`

const HideSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

const NetworkCard = styled(RedCard)`
  border-radius: 12px;
  padding: 8px 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0;
    margin-right: 0.5rem;
    width: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 1;
  `};
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 20px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }

`

const PngIcon = styled.div`
  transition: transform 0.3s ease;
  &>img{
    width: 46px;
    height: 46px;
  }
  :hover {
    transform: rotate(-5deg);
  }
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;
  padding: 14px 15px;
  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
    background: #FFEAEC;
    border-radius: 13px;
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    margin: 0 0px;
    padding: 7px 7px;
`};
`


// const StyledLink = styled.div<{ isActive: boolean }>`
//   ${({ theme }) => theme.flexRowNoWrap}
//   align-items: left;
//   border-radius: 3rem;
//   outline: none;
//   cursor: pointer;
//   text-decoration: none;
//   color: ${({ theme, isActive }) => (isActive ? theme.text1 : theme.text2)};
//   font-size: 1rem;
//   width: fit-content;
//   margin: 0 12px;
//   font-weight: ${({ isActive }) => (isActive ? 600 : 500)};
//   font-weight: 500;
//   line-height: 24px;

//   :hover,
//   :focus {
//     color: ${({ theme }) => darken(0.1, theme.text1)};
//   }
// `

const StyledExternalLink = styled(ExternalLink).attrs({
  activeClassName
}) <{ isActive?: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    text-decoration: none;
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      display: none;
`}
`

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
  &>img{
    width: 30px;
    height: 30px;
    margin: 0 0 6px;
  }
`


// const NarrowMenuFlyout = styled(MenuFlyout)`
//   min-width: 8.125rem;
//   left: 15rem;
//   right: auto !important;
// `

const NETWORK_LABELS: { [chainId in ChainId]?: string } = {
  [ChainId.BSCTestnet]: 'Testnet',
  [ChainId.BSC]: 'BSC'
}

export default function Header() {
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()

  // const location: any = useLocation()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const [isDark] = useDarkModeManager()

  const aggregateBalance: TokenAmount | undefined = useAggregatePngBalance()

  const [showPngBalanceModal, setShowPngBalanceModal] = useState(false)

  const countUpValue = aggregateBalance?.toFixed(0) ?? '0'
  const countUpValuePrevious = usePrevious(countUpValue) ?? '0'
  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.FARM)
  const toggle = useToggleModal(ApplicationModal.FARM)
  useOnClickOutside(node, open ? toggle : undefined)

  return (
    <HeaderFrame>
      <Modal isOpen={showPngBalanceModal} onDismiss={() => setShowPngBalanceModal(false)}>
        <PngBalanceContent setShowPngBalanceModal={setShowPngBalanceModal} />
      </Modal>
      <HeaderRow>
        <Title href=".">
          <PngIcon>
            <img src={isDark ? LogoDark : Logo} alt="logo" />
          </PngIcon>
        </Title>
        <HeaderLinks>
          <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
            <NavItem>
              {/* <img src={SwapIcon} alt="logo" /> */}
              {t('header.swap')}
            </NavItem>
          </StyledNavLink>
          {/* <StyledNavLink id={`swap-nav-link`} to={'/buy'}>
            {t('header.buy')}
          </StyledNavLink> */}
          <StyledNavLink
            id={`pool-nav-link`}
            to={'/pool'}
            isActive={(match, { pathname }) =>
              Boolean(match) ||
              pathname.startsWith('/add') ||
              pathname.startsWith('/remove') ||
              pathname.startsWith('/create') ||
              pathname.startsWith('/find')
            }
          >
            <NavItem>
              {/* <img width={'24px'} src={PoolIcon} alt="logo" /> */}
              {t('header.pool')}
            </NavItem>
          </StyledNavLink>

          {/* <StyledLink
            id={`png-nav-link`}
            onClick={toggle}
            isActive={location?.pathname?.startsWith('/png')}
            ref={node as any}
          >
            {t('header.farm')} <ChevronDown size={24} />
            {open && (
              <NarrowMenuFlyout>
                <MenuNavItem id="link" to={'/png/1'}>
                  {t('header.version1')}
                </MenuNavItem>
                <MenuNavItem id="link" to={'/png/2'}>
                  {t('header.version2')}
                </MenuNavItem>
              </NarrowMenuFlyout>
            )}
          </StyledLink> */}

          <StyledNavLink
            id={`png-nav-link`}
            to={'/png/2'}
            isActive={(match, { pathname }) => Boolean(match) || pathname.startsWith('/png')}
          >
            <NavItem>
              {/* <img width={'24px'} src={FarmIcon} alt="logo" /> */}
              {t('header.farm')}
            </NavItem>
          </StyledNavLink>

          {/* <StyledNavLink
            id={`stake-nav-link`}
            to={'/stake/0'}
            isActive={(match, { pathname }) => Boolean(match) || pathname.startsWith('/stake')}
          >
            {t('header.stake')}
          </StyledNavLink>
          <StyledExternalLink id={`vote-nav-link`} href={'https://pro.olympusdao.finance/'}>
            Bond <span style={{ fontSize: '11px' }}>↗</span>
          </StyledExternalLink> */}
          <StyledExternalLink id={`info-nav-link`} href={ANALYTICS_PAGE}>
            <NavItem>
              {/* <img width={'24px'} src={ChartIcon} alt="logo" /> */}
              {t('header.charts')}
              {/* <span style={{ fontSize: '11px' }}>↗</span> */}
            </NavItem>
          </StyledExternalLink>
        </HeaderLinks>
      </HeaderRow>
      <HeaderControls>
        <HeaderElement>
          <HideSmall>
            {chainId && NETWORK_LABELS[chainId] && (
              <NetworkCard title={NETWORK_LABELS[chainId]}>{NETWORK_LABELS[chainId]}</NetworkCard>
            )}
          </HideSmall>
          {/* //TODO:ORANGE */}
          {/* {aggregateBalance && (
            <PNGWrapper onClick={() => setShowPngBalanceModal(true)}>
              <PNGAmount active={!!account} style={{ pointerEvents: 'auto' }}>
                {account && (
                  <HideSmall>
                    <TYPE.white
                      style={{
                        paddingRight: '.4rem'
                      }}
                    >
                      <CountUp
                        key={countUpValue}
                        isCounting
                        start={parseFloat(countUpValuePrevious)}
                        end={parseFloat(countUpValue)}
                        thousandsSeparator={','}
                        duration={1}
                      />
                    </TYPE.white>
                  </HideSmall>
                )}
                PNG
              </PNGAmount>
              <CardNoise />
            </PNGWrapper>
          )} */}
          <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
            {account && userEthBalance ? (
              <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                {userEthBalance?.toSignificant(4)} BNB
              </BalanceText>
            ) : null}
            <Web3Status />
          </AccountElement>
        </HeaderElement>
        <HeaderElementWrap>
          <Settings />
          <LanguageSelection />
          <Menu />
        </HeaderElementWrap>
      </HeaderControls>
    </HeaderFrame>
  )
}
