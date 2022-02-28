import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

export const StyledTable = styled.table`
  // custom css goes here
  border-collapse: collapse;
`;

export const THead = styled.thead`
 // custom css goes here
`;

export const TFoot = styled.tfoot`
  // custom css goes here
`;

export const TBody = styled.tbody`
 // custom css goes here
    max-height: 450px;
    overflow: auto;
`;

export const TR = styled.tr`
  // custom css goes here
`;

export const TH = styled.th`
    // font-family: PingFang HK;
    font-size: 18px;
    line-height: 34px;
    color: #2C0F10;
    font-weight: 400;
`;

export const TBodyTd = styled.td`
  text-align: center;
`;

export const TBodyTr = styled.tr`
  background: #F6F5F8;
  line-height: 50px;
`;
export const Div = styled.div`
    display: flex;
    align-items: center;
`;

const url = "https://avatar-static.segmentfault.com/291/782/2917829671-5e0c9a214becc_big64";


 export function Table(params: any) {
  return (
      <StyledTable>
          <THead>
              <TR>
                  <TH>资金池</TH>
                  <TH>TVL</TH>
                  <TH>奖励</TH>
                  <TH>APR</TH>
              </TR>
          </THead>
          <TBody>
             <TBodyTr>
                    <TBodyTd>
                      <Div>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <img height={'30px'} src={url}  />
                        </Div>
                        <Div>
                            WETH/PSP
                        </Div>
                      </Div>
                    </TBodyTd>
                    <TBodyTd>$2,632,901</TBodyTd>
                    <TBodyTd>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <Div>
                                19.43 SUSHI/DAY
                            </Div>
                        </Div>
                    </TBodyTd>
                    <TBodyTd>4.92%</TBodyTd>
             </TBodyTr>
             <TBodyTr>
                    <TBodyTd>
                      <Div>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <img height={'30px'} src={url}  />
                        </Div>
                        <Div>
                            WETH/PSP
                        </Div>
                      </Div>
                    </TBodyTd>
                    <TBodyTd>$2,632,901</TBodyTd>
                    <TBodyTd>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <Div>
                                19.43 SUSHI/DAY
                            </Div>
                        </Div>
                    </TBodyTd>
                    <TBodyTd>4.92%</TBodyTd>
             </TBodyTr>
             <TBodyTr>
                    <TBodyTd>
                      <Div>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <img height={'30px'} src={url}  />
                        </Div>
                        <Div>
                            WETH/PSP
                        </Div>
                      </Div>
                    </TBodyTd>
                    <TBodyTd>$2,632,901</TBodyTd>
                    <TBodyTd>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <Div>
                                19.43 SUSHI/DAY
                            </Div>
                        </Div>
                    </TBodyTd>
                    <TBodyTd>4.92%</TBodyTd>
             </TBodyTr>
             <TBodyTr>
                    <TBodyTd>
                      <Div>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <img height={'30px'} src={url}  />
                        </Div>
                        <Div>
                            WETH/PSP
                        </Div>
                      </Div>
                    </TBodyTd>
                    <TBodyTd>$2,632,901</TBodyTd>
                    <TBodyTd>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <Div>
                                19.43 SUSHI/DAY
                            </Div>
                        </Div>
                    </TBodyTd>
                    <TBodyTd>4.92%</TBodyTd>
             </TBodyTr>
             <TBodyTr>
                    <TBodyTd>
                      <Div>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <img height={'30px'} src={url}  />
                        </Div>
                        <Div>
                            WETH/PSP
                        </Div>
                      </Div>
                    </TBodyTd>
                    <TBodyTd>$2,632,901</TBodyTd>
                    <TBodyTd>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <Div>
                                19.43 SUSHI/DAY
                            </Div>
                        </Div>
                    </TBodyTd>
                    <TBodyTd>4.92%</TBodyTd>
             </TBodyTr>
             <TBodyTr>
                    <TBodyTd>
                      <Div>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <img height={'30px'} src={url}  />
                        </Div>
                        <Div>
                            WETH/PSP
                        </Div>
                      </Div>
                    </TBodyTd>
                    <TBodyTd>$2,632,901</TBodyTd>
                    <TBodyTd>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <Div>
                                19.43 SUSHI/DAY
                            </Div>
                        </Div>
                    </TBodyTd>
                    <TBodyTd>4.92%</TBodyTd>
             </TBodyTr>
             <TBodyTr>
                    <TBodyTd>
                      <Div>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <img height={'30px'} src={url}  />
                        </Div>
                        <Div>
                            WETH/PSP
                        </Div>
                      </Div>
                    </TBodyTd>
                    <TBodyTd>$2,632,901</TBodyTd>
                    <TBodyTd>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <Div>
                                19.43 SUSHI/DAY
                            </Div>
                        </Div>
                    </TBodyTd>
                    <TBodyTd>4.92%</TBodyTd>
             </TBodyTr>
             <TBodyTr>
                    <TBodyTd>
                      <Div>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <img height={'30px'} src={url}  />
                        </Div>
                        <Div>
                            WETH/PSP
                        </Div>
                      </Div>
                    </TBodyTd>
                    <TBodyTd>$2,632,901</TBodyTd>
                    <TBodyTd>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <Div>
                                19.43 SUSHI/DAY
                            </Div>
                        </Div>
                    </TBodyTd>
                    <TBodyTd>4.92%</TBodyTd>
             </TBodyTr>
             <TBodyTr>
                    <TBodyTd>
                      <Div>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <img height={'30px'} src={url}  />
                        </Div>
                        <Div>
                            WETH/PSP
                        </Div>
                      </Div>
                    </TBodyTd>
                    <TBodyTd>$2,632,901</TBodyTd>
                    <TBodyTd>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <Div>
                                19.43 SUSHI/DAY
                            </Div>
                        </Div>
                    </TBodyTd>
                    <TBodyTd>4.92%</TBodyTd>
             </TBodyTr>
             <TBodyTr>
                    <TBodyTd>
                      <Div>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <img height={'30px'} src={url}  />
                        </Div>
                        <Div>
                            WETH/PSP
                        </Div>
                      </Div>
                    </TBodyTd>
                    <TBodyTd>$2,632,901</TBodyTd>
                    <TBodyTd>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <Div>
                                19.43 SUSHI/DAY
                            </Div>
                        </Div>
                    </TBodyTd>
                    <TBodyTd>4.92%</TBodyTd>
             </TBodyTr>
             <TBodyTr>
                    <TBodyTd>
                      <Div>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <img height={'30px'} src={url}  />
                        </Div>
                        <Div>
                            WETH/PSP
                        </Div>
                      </Div>
                    </TBodyTd>
                    <TBodyTd>$2,632,901</TBodyTd>
                    <TBodyTd>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <Div>
                                19.43 SUSHI/DAY
                            </Div>
                        </Div>
                    </TBodyTd>
                    <TBodyTd>4.92%</TBodyTd>
             </TBodyTr>
             <TBodyTr>
                    <TBodyTd>
                      <Div>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <img height={'30px'} src={url}  />
                        </Div>
                        <Div>
                            WETH/PSP
                        </Div>
                      </Div>
                    </TBodyTd>
                    <TBodyTd>$2,632,901</TBodyTd>
                    <TBodyTd>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <Div>
                                19.43 SUSHI/DAY
                            </Div>
                        </Div>
                    </TBodyTd>
                    <TBodyTd>4.92%</TBodyTd>
             </TBodyTr>
             <TBodyTr>
                    <TBodyTd>
                      <Div>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <img height={'30px'} src={url}  />
                        </Div>
                        <Div>
                            WETH/PSP
                        </Div>
                      </Div>
                    </TBodyTd>
                    <TBodyTd>$2,632,901</TBodyTd>
                    <TBodyTd>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <Div>
                                19.43 SUSHI/DAY
                            </Div>
                        </Div>
                    </TBodyTd>
                    <TBodyTd>4.92%</TBodyTd>
             </TBodyTr>
             <TBodyTr>
                    <TBodyTd>
                      <Div>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <img height={'30px'} src={url}  />
                        </Div>
                        <Div>
                            WETH/PSP
                        </Div>
                      </Div>
                    </TBodyTd>
                    <TBodyTd>$2,632,901</TBodyTd>
                    <TBodyTd>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <Div>
                                19.43 SUSHI/DAY
                            </Div>
                        </Div>
                    </TBodyTd>
                    <TBodyTd>4.92%</TBodyTd>
             </TBodyTr>
             <TBodyTr>
                    <TBodyTd>
                      <Div>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <img height={'30px'} src={url}  />
                        </Div>
                        <Div>
                            WETH/PSP
                        </Div>
                      </Div>
                    </TBodyTd>
                    <TBodyTd>$2,632,901</TBodyTd>
                    <TBodyTd>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <Div>
                                19.43 SUSHI/DAY
                            </Div>
                        </Div>
                    </TBodyTd>
                    <TBodyTd>4.92%</TBodyTd>
             </TBodyTr>
             <TBodyTr>
                    <TBodyTd>
                      <Div>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <img height={'30px'} src={url}  />
                        </Div>
                        <Div>
                            WETH/PSP
                        </Div>
                      </Div>
                    </TBodyTd>
                    <TBodyTd>$2,632,901</TBodyTd>
                    <TBodyTd>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <Div>
                                19.43 SUSHI/DAY
                            </Div>
                        </Div>
                    </TBodyTd>
                    <TBodyTd>4.92%</TBodyTd>
             </TBodyTr>
             <TBodyTr>
                    <TBodyTd>
                      <Div>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <img height={'30px'} src={url}  />
                        </Div>
                        <Div>
                            WETH/PSP
                        </Div>
                      </Div>
                    </TBodyTd>
                    <TBodyTd>$2,632,901</TBodyTd>
                    <TBodyTd>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <Div>
                                19.43 SUSHI/DAY
                            </Div>
                        </Div>
                    </TBodyTd>
                    <TBodyTd>4.92%</TBodyTd>
             </TBodyTr>
             <TBodyTr>
                    <TBodyTd>
                      <Div>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <img height={'30px'} src={url}  />
                        </Div>
                        <Div>
                            WETH/PSP
                        </Div>
                      </Div>
                    </TBodyTd>
                    <TBodyTd>$2,632,901</TBodyTd>
                    <TBodyTd>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <Div>
                                19.43 SUSHI/DAY
                            </Div>
                        </Div>
                    </TBodyTd>
                    <TBodyTd>4.92%</TBodyTd>
             </TBodyTr>
             <TBodyTr>
                    <TBodyTd>
                      <Div>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <img height={'30px'} src={url}  />
                        </Div>
                        <Div>
                            WETH/PSP
                        </Div>
                      </Div>
                    </TBodyTd>
                    <TBodyTd>$2,632,901</TBodyTd>
                    <TBodyTd>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <Div>
                                19.43 SUSHI/DAY
                            </Div>
                        </Div>
                    </TBodyTd>
                    <TBodyTd>4.92%</TBodyTd>
             </TBodyTr>
             <TBodyTr>
                    <TBodyTd>
                      <Div>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <img height={'30px'} src={url}  />
                        </Div>
                        <Div>
                            WETH/PSP
                        </Div>
                      </Div>
                    </TBodyTd>
                    <TBodyTd>$2,632,901</TBodyTd>
                    <TBodyTd>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <Div>
                                19.43 SUSHI/DAY
                            </Div>
                        </Div>
                    </TBodyTd>
                    <TBodyTd>4.92%</TBodyTd>
             </TBodyTr>
             <TBodyTr>
                    <TBodyTd>
                      <Div>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <img height={'30px'} src={url}  />
                        </Div>
                        <Div>
                            WETH/PSP
                        </Div>
                      </Div>
                    </TBodyTd>
                    <TBodyTd>$2,632,901</TBodyTd>
                    <TBodyTd>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <Div>
                                19.43 SUSHI/DAY
                            </Div>
                        </Div>
                    </TBodyTd>
                    <TBodyTd>4.92%</TBodyTd>
             </TBodyTr>
             <TBodyTr>
                    <TBodyTd>
                      <Div>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <img height={'30px'} src={url}  />
                        </Div>
                        <Div>
                            WETH/PSP
                        </Div>
                      </Div>
                    </TBodyTd>
                    <TBodyTd>$2,632,901</TBodyTd>
                    <TBodyTd>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <Div>
                                19.43 SUSHI/DAY
                            </Div>
                        </Div>
                    </TBodyTd>
                    <TBodyTd>4.92%</TBodyTd>
             </TBodyTr>
             <TBodyTr>
                    <TBodyTd>
                      <Div>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <img height={'30px'} src={url}  />
                        </Div>
                        <Div>
                            WETH/PSP
                        </Div>
                      </Div>
                    </TBodyTd>
                    <TBodyTd>$2,632,901</TBodyTd>
                    <TBodyTd>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <Div>
                                19.43 SUSHI/DAY
                            </Div>
                        </Div>
                    </TBodyTd>
                    <TBodyTd>4.92%</TBodyTd>
             </TBodyTr>
             <TBodyTr>
                    <TBodyTd>
                      <Div>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <img height={'30px'} src={url}  />
                        </Div>
                        <Div>
                            WETH/PSP
                        </Div>
                      </Div>
                    </TBodyTd>
                    <TBodyTd>$2,632,901</TBodyTd>
                    <TBodyTd>
                        <Div>
                            <img height={'30px'} src={url}  />
                            <Div>
                                19.43 SUSHI/DAY
                            </Div>
                        </Div>
                    </TBodyTd>
                    <TBodyTd>4.92%</TBodyTd>
             </TBodyTr>
          </TBody>
      </StyledTable>
  )
}


export default Table;