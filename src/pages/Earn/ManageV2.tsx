import React from 'react'
import { useMinichefStakingInfos } from '../../state/stake/hooks'
import { RouteComponentProps } from 'react-router-dom'
import Manage from './Manage'
import { usePair } from '../../data/Reserves'
import { wrappedCurrency } from '../../utils/wrappedCurrency'
import { useCurrency } from '../../hooks/Tokens'
import { useActiveWeb3React } from '../../hooks'

const ManageV2: React.FC<RouteComponentProps<{ currencyIdA: string; currencyIdB: string; }>> = ({
  match: {
    params: { currencyIdA, currencyIdB  }
  }
}) => {
  const { chainId } = useActiveWeb3React()

  // get currencies and pair
  const [currencyA, currencyB] = [useCurrency(currencyIdA), useCurrency(currencyIdB)]
  const tokenA = wrappedCurrency(currencyA ?? undefined, chainId)
  const tokenB = wrappedCurrency(currencyB ?? undefined, chainId)

  const [, stakingTokenPair] = usePair(tokenA, tokenB)
  const miniChefStaking = useMinichefStakingInfos(2, stakingTokenPair)?.[0]

  return <Manage version="2" stakingInfo={miniChefStaking} currencyA={currencyA} currencyB={currencyB} />
}

export default ManageV2
