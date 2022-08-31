import { createMachine } from 'xstate';

export const orderMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QHsBOEyoLIEMDGAFgJYB2YAdAMoAqAggErUCi9lAxAAr0DyA4vU0qUA+lloBJAHKVEoAA7JYRAC5FkJWSAAeiAIwA2AJzkALAGYA7AFZdVgExWAHBceGADPoA0IAJ6JDVuRWbiG6Jo52bnZ2hnYWAL7x3mgY2PjEZORiUuxcfAJCwpQA6kxM1DJIIApKquqaOggmVsYWhvrOds0dHSYW3n4IAaaGo7FmUW66ZlYJSSApmLiEpBQlZRVslACqAEJY4tTC3PQAIiyaNSpqGlWNFhZ2po4mzea2+pYD-oHBoeGRaKxKyJeYkZAYeBVRZpFaZGgMZisS6Ka71O6IEx2b5DNzkEIhMz6cy9Cy6RLJdBLdKrLISaQo2o3BqIGYWcjufQOCxcwxmQzNMw49z4gluEzEh5uMzRCkLKmwjJrUrlSryVF1W6gRr6FqmOy6WKfEy6Q3S4V4sXiyUWaVdOUw5ZK8gnc70Ip7A7UZinRlorXafwmPH8txS8y2qyfC2ikKRKxYuI2OaU1JO1Z+zUshC6Rw43Og+JAA */
  createMachine({
    initial: 'STARTERS',
    states: {
      STARTERS: {
        on: {
          PROGRESS_MAINS: {
            target: 'MAINS'
          }
        }
      },
      MAINS: {
        on: {
          PROGRESS_SWEETS: {
            target: 'SWEETS'
          }
        }
      },
      SWEETS: {
        on: {
          SUBMIT_ORDER: {
            target: 'ORDER_SUBMITTED'
          }
        }
      },
      ORDER_SUBMITTED: {}
    },
    id: 'orderMachine'
  });
