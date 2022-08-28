import { createContext, useContext, useState } from 'react'

const OrderSearchContext = createContext()

export const useOrderSearchContext = () => useContext(OrderSearchContext)

export default function OrderSearchProvider({ children }) {
  const [shipOrderStatus, setShipOrderStatus] = useState(-1)
  const [callGoodsStatus, setCallGoodsStatus] = useState(-1)
  const [lastShipOrderDateStatus, setLastShipOrderDateStatus] = useState(-1)
  const [filterType, setFilterType] = useState(null)
  const [factoryNumber, setFactoryNumber] = useState('')
  const [goodsNumber, setGoodsNumber] = useState('')
  const [orderNumber, setOrderNumber] = useState('')
  const [buyerAccount, setBuyerAccount] = useState('')

  const handleShipOrderStatus = status => setShipOrderStatus(status)
  const handleCallGoodsStatus = status => setCallGoodsStatus(status)
  const handleLastShipOrderDateStatus = status => setLastShipOrderDateStatus(status)
  const handleFilterType = type => setFilterType(type)
  const handleFactoryNumber = value => setFactoryNumber(value)
  const handleGoodsNumber = value => setGoodsNumber(value)
  const handleOrderNumber = value => setOrderNumber(value)
  const handleBuyerAccount = value => setBuyerAccount(value)

  const init = () => {
    handleShipOrderStatus(-1)
    handleCallGoodsStatus(-1)
    handleLastShipOrderDateStatus(-1)
    handleFilterType(null)
    handleFactoryNumber('')
    handleGoodsNumber('')
    handleOrderNumber('')
    handleBuyerAccount('')
  }

  return (
    <>
      <OrderSearchContext.Provider value={{
        shipOrderStatus,
        callGoodsStatus,
        lastShipOrderDateStatus,
        filterType,
        factoryNumber,
        goodsNumber,
        orderNumber,
        buyerAccount,
        handleShipOrderStatus,
        handleCallGoodsStatus,
        handleLastShipOrderDateStatus,
        handleFilterType,
        handleFactoryNumber,
        handleGoodsNumber,
        handleOrderNumber,
        handleBuyerAccount,
        init
      }}>
        {children}
      </OrderSearchContext.Provider>
    </>
  )
}
