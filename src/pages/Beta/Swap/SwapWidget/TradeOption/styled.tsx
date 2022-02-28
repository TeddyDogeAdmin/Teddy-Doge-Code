import { Box } from '@pangolindex/components'
import styled from 'styled-components'

export const SwapWrapper = styled(Box)`
  width: 100%;
  min-width: 400px;
  background-color: ${({ theme }) => theme.bg2};
  position: relative;
  overflow: hidden;
`

export const SwapAlertBox = styled(Box)`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: ${({ theme }) => theme.avaxRed};
  padding: 7px;
  font-size: 12px;
  color: ${({ theme }) => theme.white};
`
