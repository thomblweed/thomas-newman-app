import { createMachine } from 'xstate';

export const shopMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGUAWB7ADgAgLIEMBjVASwDswA6WDTTcqSgG3XwgYFpD8AnAFwDEyAKoBhUQFFkyAPoAZAPIBBACIzRSgEoAVRKEzpYJPiXRk9IAB6IATAFYblAMwBGey7seAnF4DsTp18AGhAAT0QXF18vSh8fF1cXAAYAFmiUgF8MkLQsPCJSCmpaejJGFjZObn4BADElAEk5CTVFVXUtXSQQAyMTMwtrBHtHV3dPOx9-QJDwhC8ANgAOSmmbJzslmyXfFx8snNp84nIqGixSxmq+Dh4wNlCBAAVNBUkW9QAJCVEAaQVhF19IZjKZzN0hgkUnZnNsbB5fAskutfHZZhEkgtHHEvDYkqklksknsDiBcjgCCciuc6AxKNdbvcII9VGoNDoZA1tBJcBZeqCBhDEH4YTtPKlkUknDZceiEMk3JQUnEAri7CkUgs7KTycdCmcSnSGWAeDx0DwBJoJNpNABNGSsvkg-rg0BDTYrGULLx2Za+FLIuxosLCpxJZw+Ql4ryuRY2HVHSn64oXI28G4ms0Wq02+1tNmdJ19MGDWyo2JLFJORYpPYBZVy3HhtbK3xJOxOBbKhN5JOnFO0sqUNjsMpcdMcYxgAC2QjEkmkRYFrqswpsKSVHY8QaR-kRcuSSKVcTxBKJLgWPYpBX7NMuw4go6g4-4k74M7qjWaKiXLtL83XTdXCDX0kj3BZGy7Y8fHsdJoiWFwrz1W9DSHEc3xnDgADN8BIJhIEta07QdFQCw5LkeV-EshQAjdoWAncwMCCCQ3mC9oK8KIFi7FxlUvbIyUTG8imIMBCAAa3QABXQQXjeCQPieJRbVwCQADkgR6Z1qLdCIbAPeMBN1PsRNQMTJJkgRRAUDSGjU4QJBkZBPgUJ4njsgBxKjBV0hAsTlXYYhxLtcUCaFfCQkyqEwfBQgYZ5Gh-bp+T-GjeN8Csq2iBZogcBI5XrDiEMiVwuyDSLhOi2L4us2z7Mc5zXPctSvOS7SfNXeU7AyrxK0CRZcvhJw5WjDivClLsbAWSJtSMoSqSoQgzCwkgeGnfAXUI7RhE0NSnJctzPO8lchkCFZeo1Vx2w7ZVhtYwrlUjSIEgvaFZoEsh0AgOALGMyqB3vConxfPhjv-PxG3sCtpTSat7HGiK5t7f67zTV87geMG0u3ShkhAjsu2mJYD3bDLHtxdZpu6-jDmRhaAbRjNTXNLHfM1BZKDFVJNTsTE8WCVjcQ3JZIx9Lwq2VdUKvp1G0MfKoJynadWc63woZjVEq02aU-BSSHhZPdUZU4+xpeTWXGHQpXsNw-CIBVyF0ucSZoUrBxMRYuYm0objuOJJZO19TwzZQ1MygdxB-DlSs6LibreqN6UQ9M8zpNBtriw6yFQMoX0po2QIPTAgL2OCtXA72JZk6quLw4z5d-xSfTBZhdc4mVEWiXFwzaevemlrIFa1o2nStMzk7bE7H37GRBYwylcavAK7ZYjiAOm8mJwdmriOEA4Nw5Q4SZV7ifxAwD31+KyIA */
  createMachine({
    id: 'Shop Machine',
    initial: 'shopping',
    states: {
      shopping: {
        initial: 'loading-cart',
        states: {
          'loading-cart': {
            on: {
              SUCCESS_LOAD_CART: {
                target: 'cart-ready'
              },
              FAILED_LOAD_CART: {
                target: 'cart-error'
              }
            }
          },
          'cart-ready': {
            on: {
              PROCEED_CHECKOUT: {
                target: '#Shop Machine.checkout'
              },
              ADD_CART_ITEM: {
                target: 'adding-cart-item'
              }
            }
          },
          'cart-error': {
            on: {
              RETRY_ADD: {
                target: 'adding-cart-item'
              },
              RETRY_LOAD_CART: {
                target: 'loading-cart'
              }
            }
          },
          'adding-cart-item': {
            on: {
              SUCCESS: {
                target: 'cart-ready'
              },
              FAILED: {
                target: 'add-item-failed'
              }
            }
          },
          'add-item-failed': {
            on: {
              RETRY_ADD_CART_ITEM: {
                target: 'adding-cart-item'
              }
            }
          }
        }
      },
      checkout: {
        on: {
          PROCEED_PAYMENT: {
            target: 'paying'
          },
          CONTINUE_SHOPPING: {
            target: 'shopping'
          }
        }
      },
      paying: {
        on: {
          PAID: {
            target: 'confirmation'
          },
          CONTINUE_SHOPPING: {
            target: 'shopping'
          }
        }
      },
      confirmation: {
        on: {
          RETURN_SHOPPING: {
            target: 'shopping'
          }
        }
      }
    }
  });
