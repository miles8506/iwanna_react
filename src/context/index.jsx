import OrderSearchProvider from "./use-order-search"

export default function ContextProvider({ children }) {
  return (
    <OrderSearchProvider>
      {children}
    </OrderSearchProvider>
  )
}
