const store = require('../store')

module.exports = (domInterface) => {
  return {
    setSellPrice,
    placeSellOrder,
    marketSell,
    hitTheBid,
    offerBetter,
    offerWithBest,
    offerAboveBest,
    offerDoubleAboveBest
  }

  /** **************************************
   *        INTERFACE CALLS
   ***************************************/
  function setSellPrice (p) {
    // make sure the bid is in a string format
    if (typeof p !== 'string') {
      p = '' + p
    }
    domInterface.setSellPrice(p)
  }

  function placeSellOrder () {
    domInterface.placeSellOrder()
  }

  function marketSell () {
    domInterface.marketSell()
  }

  /** ************************************
   *          ACTIONS
   ***************************************/

  /* HIT THE BID  */
  function hitTheBid () {
    // get bid price
    // place limit sell order at bid
    domInterface.getBestBid()
      .then((price) => {
        domInterface.placeSellOrder(price)
      })
  }

  /* Offer just below best offer */
  function offerBetter () {
    domInterface.getBestOffer()
      .then((bestOffer) => {
        var newOffer = +bestOffer - 0.01
        domInterface.placeSellOrder(newOffer.toFixed(2))
      })
  }

  /* Offer with the best current offer */
  function offerWithBest () {
    domInterface.getBestOffer()
      .then((bestOffer) => {
        domInterface.placeSellOrder(bestOffer)
      })
  }

  /* Offer 1 offset level above the best offer */
  function offerAboveBest () {
    store.get((settings) => {
      domInterface.getBestOffer()
        .then((bestOffer) => {
          var newOffer = +bestOffer + settings.offset
          domInterface.placeSellOrder(newOffer.toFixed(2))
        })
    })
  }

  /* Offer 2 offset levels above the best offer */
  function offerDoubleAboveBest () {
    store.get((settings) => {
      domInterface.getBestOffer()
        .then((bestOffer) => {
          var newOffer = +bestOffer + (settings.offset * 2)
          domInterface.placeSellOrder(newOffer.toFixed(2))
        })
    })
  }
}
