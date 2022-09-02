import { createMachine } from 'xstate';

export const shopMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGUAWB7ADgAgLIEMBjVASwDswA6ZACQHkAFBgSQDkBxSgGToEEARNuwD6zACoBRXMgDEyAKoBhRROTJRk6YlCZ0sEgBcS6MtpAAPRACYA7AGZKARgCsANivO7jqwE4XPmwAaEABPRAAORwdXGNc7cKtXHwAWex8AX3TgtCw8IlIKanomIW4+QQ4NKVkAMV5mLgl+Kq0kEF19IxMzSwRbBxd3T28-ZwDgsIQA5MoABnnZ5J955xtw+MzsjBwCYnIqWkYWDkpFXgAlMWFziQEATRkBZrPLlrMOw2NTNt7Xebnkq5wqlfMlwuFXMkJhFnDNnAsrIkIVZHI4MlkQDkdvl9kUjqUXlcJOdznRzjIbmJzncWsh3npPt0fogfFYZst3I5krMPFyIdCEEDXJQfKKUnYbLYlq5Npjtnk9oVDiUTuIpMInkI5EoVGoNfx+PTOl8eohXI5ZpQUeEbC5PDZnB47ALwrNhUtRTZ5qk3TZ0VtcrsCgdisdOGrcPqKuwZHUGk0o0bGd9QL1Wey3Sjubywa4XY5hQWYvFEil7OFZViFcG8SqYwxSSoE4oaBJFABpOjyMRJropiyIbx-SiuNyLZLeVaRPOhCLJZyUdZ2bleaWLf1ywM4wottud7syBt0JvNBi8O64CSsHttD5900IbwC7yV+VB3G7jtdsQyRR0a9sPIEjCMqYa9iazKPoklqjn8yQTh4awFgK9gLrE9hJK6jjhGMr5boqVBnncWpnswhq3gy96QQWC7wgs8w+GMjHJM6s59C4cwLFy8w0R4yR4diBGUERWp-gBrBASBoZCOBTKpoOzi0fRDFMbCrGTHYdg+JxPEQkCNqzI4AnVh+-41Mw5y4LwYjMP+FISGI8jnKwUn4hwsn9r0yRslaPhAgEjF2K4DrhAKKILvR3GGaOfGZBiZDoBAcBmFW75KtJJw8AIQi0h5D42gKSRWFaHrBbay5jFYxlpSGbmcIS1y3Pwdx5ZB8HhE4HiLFYBkJOpESzB1RajqK1o9VVGKpdutV1qcFxEiSZKtfJj6zDYwrWqObheDELj5gMsRMWNCTVdNtZhpQEZRjJFHGnJA4IDYtqUMMbK2M44R+Y4+YwYdo3YeNp1CaBN06JREErXEhVciKYreU9fnDEDNafvuN5g3dnmDksjiLssSyGayhm2ChdjFehIwpIiiTI7iInubdyYPt5AqMVadEon4g3YSdk1vmdYnmZZ1m2awy0PXxTjcu4fyzHYhlPTOkxWLM2l0cT6xgmCLi0xQ4u9AAtE+bEG8Oymq6kwKA3FQA */
  createMachine({
    id: 'Shop Machine',
    initial: 'SHOPPING',
    states: {
      SHOPPING: {
        initial: 'LOADING_ITEMS',
        states: {
          LOADING_ITEMS: {
            on: {
              SUCCESS_ITEMS: {
                target: 'CART_READY'
              },
              FAILED_ITEMS: {
                target: 'CART_ERROR'
              }
            }
          },
          CART_READY: {
            on: {
              ADD_CART_ITEM: {
                target: 'ITEM_ADDING'
              }
            }
          },
          CART_ERROR: {
            on: {
              RETRY_ITEMS: {
                target: 'LOADING_ITEMS'
              }
            }
          },
          ITEM_ADDING: {
            on: {
              SUCCESS_ADD: {
                target: 'CART_READY'
              },
              FAILED_ADD: {
                target: 'CART_ERROR'
              }
            }
          }
        },
        on: {
          PROCEED_CHECKOUT: {
            target: 'CHECKOUT'
          }
        }
      },
      CHECKOUT: {
        on: {
          PROCEED_PAYMENT: {
            target: 'PAYING'
          },
          CONTINUE_SHOPPING: {
            target: 'SHOPPING'
          }
        }
      },
      PAYING: {
        on: {
          PAID: {
            target: 'CONFIRMATION'
          },
          CONTINUE_SHOPPING: {
            target: 'SHOPPING'
          }
        }
      },
      CONFIRMATION: {
        on: {
          RETURN_SHOPPING: {
            target: 'SHOPPING'
          }
        }
      }
    }
  });
