# Stripe helper 

Simple NodeJS helper tool to perform some actions on Stripe Accounts, for testing purposes.

## Dependencies 

- [express](https://www.npmjs.com/package/express)
- [commander](https://www.npmjs.com/package/commander)
- [stripe](https://stripe.com/docs/api)

# Before you start 

## How it works

First clone and install dependencies:

```sh
$ git clone git@github.com:orlando-homer/stripe-helper.git
$ cd stripe-helper
$ npm install
$ export STRIPE_SECRET=stripe_account_seccret
```

To use it:

```sh
$ npm start [command][..opts]
```

The avaible commands are:

- `getSubscriptionsByPlanName [planName] [outputfile]` => Requires Postgres variables
- `createPaymentMethod`
- `getPaymentMethod [id]`
- `detachPaymentMethod [id]`
- `attachPaymentMethod [id] [customer]`
- `cancelSubscription [id]`
- `getSubscription [id]`
- `oneTimePayment [planId] [customer]`
- `createCustomer [email]`
- `delCustomer [id]`
- `getCustomer [id]`
- `getBalance`
- `help [command]`
