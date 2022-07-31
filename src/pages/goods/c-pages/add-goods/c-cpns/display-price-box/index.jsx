import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { computedBasePrice, computedOfficialPrice, computedSuggestPrice } from '@/utils/price'

import { DisplayPriceBoxWrapper } from './style'

const DisplayPriceBox = memo((props) => {
  const { price } = props
  return (
    <DisplayPriceBoxWrapper>
      <div className="base-price">
        <span className="base-price-label">成本價(台幣)</span>：
        <div className="base-price-value">{computedBasePrice(price)}</div>
      </div>
      <div className="lowest-price">
        <span className="lowest-price-label">最低售價</span>：
        <div className="lowest-price-value">{computedOfficialPrice(price)}</div>
      </div>
      <div className="suggest-price">
        <span className="suggest-price-label">建議售價</span>：
        <div className="suggest-price-value">{computedSuggestPrice(price)}</div>
      </div>
    </DisplayPriceBoxWrapper>
  )
})

DisplayPriceBox.propTypes = {
  price: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired
}

export default DisplayPriceBox
