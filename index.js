const chalk    = require('chalk');
const figlet   = require('figlet');
const program  = require('commander');
const fs       = require('fs');
const pg       = require('pg');

const stripe_secret = process.env.STRIPE_SECRET
const stripe = require('stripe')(stripe_secret);

const pgClient = new pg.Client({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST_URI,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

console.log(
    chalk.green(
        figlet.textSync('Stripe Helper', { horizontalLayout: 'full' })
    )
);

const payload = {
    type: 'card',
    card: {
        number: '4242424242424242',
        exp_month: 7,
        exp_year: 2023,
        cvc: 314
    }
}

////////////////////
// Payment method //
////////////////////
program
    .description('Create Payment Method on Stripe')
    .command('createPaymentMethod')
    .action( async () => {
        console.log('-> Creating payment method');
        stripe.paymentMethods.create(payload)
            .then( paymentMethod => {
                console.log('--> Payment method created');
                console.log(paymentMethod)
                console.log('-> Everything ran smooth. Bye!');
                process.exit(0);
            }).catch( err => {
                console.log(`Error creating payment method: ${err}`)
                process.exit(1);
            });
            
    });

program
    .description('Get Payment Method on Stripe')
    .usage('getPaymentMethod')
    .command('getPaymentMethod [id]')
    .action( async (id) => {
        console.log(id)
        console.log(`-> Getting payment method ${id}`);
        stripe.paymentMethods.retrieve(id)
            .then( paymentMethod => {
                console.log(`--> Payment method ${id}`);
                console.log(paymentMethod)
                console.log('-> Everything ran smooth. Bye!');
                process.exit(0);
            }).catch( err => {
                console.log(`Error getting payment method: ${err}`)
                process.exit(1);
            });
            
    });

program
    .description('Detach Payment Method on Stripe')
    .usage('detachPaymentMethod')
    .command('detachPaymentMethod [id]')
    .action( async (id) => {
        console.log(id)
        console.log(`-> Detaching payment method ${id}`);
        stripe.paymentMethods.detach(id)
            .then( paymentMethod => {
                console.log(`--> Payment method detached`);
                console.log(paymentMethod)
                console.log('-> Everything ran smooth. Bye!');
                process.exit(0);
            }).catch( err => {
                console.log(`Error detaching payment method: ${err}`)
                process.exit(1);
            });
            
    });

program
    .description('Attach Payment Method on Stripe')
    .usage('attachPaymentMethod')
    .command('attachPaymentMethod [id] [customer]')
    .action( async (id, customer) => {
        console.log(`-> Attaching payment method ${id} to ${customer}`);
        stripe.paymentMethods.detach(id, {customer})
            .then( paymentMethod => {
                console.log(`--> Processed Payment method ${id}`);
                console.log(paymentMethod)
                console.log('-> Everything ran smooth. Bye!');
                process.exit(0);
            }).catch( err => {
                console.log(`Error attaching payment method: ${err}`)
                process.exit(1);
            });
            
    });

//////////////////
// Subscription //
//////////////////
program
    .description('Cancel subscription on Stripe')
    .usage('cancelSubscription')
    .command('cancelSubscription [id]')
    .action( async (id) => {
        console.log(`-> Cancel subscription ${id}`);
        stripe.subscriptions.del(id)
            .then( paymentMethod => {
                console.log(`--> Subscription canceled`);
                console.log(paymentMethod)
                console.log('-> Everything ran smooth. Bye!');
                process.exit(0);
            }).catch( err => {
                console.log(`Error canceling subscription: ${err}`)
                process.exit(1);
            });
    });

program
    .description('Get subscription on Stripe')
    .usage('getSubscription')
    .command('getSubscription [id]')
    .action( async (id) => {
        console.log(`-> Get subscription ${id}`);
        stripe.subscriptions.retrieve(id)
            .then( sub => {
                console.log(`--> Subscription`);
                console.log(sub)
                console.log('-> Everything ran smooth. Bye!');
                process.exit(0);
            }).catch( err => {
                console.log(`Error getting subscription: ${err}`)
                process.exit(1);
            });
            
    });

program
    .description('One time payment on Stripe')
    .usage('oneTimePayment')
    .command('oneTimePayment [planId] [customer]')
    .action( async (planId, customer) => {
        console.log(`-> Pay plan ${planId} one time`);
        stripe.invoiceItems.create({
            customer,
            price: planId,
        }).then( sub => {
            console.log(`--> Invoice`);
            console.log(sub)
            console.log('-> Everything ran smooth. Bye!');
            process.exit(0);
        }).catch( err => {
            console.log(`Error canceling one time payment: ${err}`)
            process.exit(1);
        });
            
    });

//////////////
// Customer //
//////////////
program
    .description('Create customer on Stripe')
    .usage('createCustomer')
    .command('createCustomer [email]')
    .action( async (email) => {
        console.log(`-> Create customer ${email}`);
        stripe.customers.create({ email })
            .then( customer => {
                console.log(`--> Customer`);
                console.log(customer)
                console.log('-> Everything ran smooth. Bye!');
                process.exit(0);
            }).catch( err => {
                console.log(`Error creating customer: ${err}`)
                process.exit(1);
            });
            
    });

program
    .description('Delete customer on Stripe')
    .usage('delCustomer')
    .command('delCustomer [id]')
    .action( async (id) => {
        console.log(`-> Delete customer ${id}`);
        stripe.customers.del(id)
            .then( customer => {
                console.log(`--> Customer`);
                console.log(customer)
                console.log('-> Everything ran smooth. Bye!');
                process.exit(0);
            }).catch( err => {
                console.log(`Error deleting customer: ${err}`)
                process.exit(1);
            });
            
    });

program
    .description('Get customer on Stripe')
    .usage('getCustomer')
    .command('getCustomer [id]')
    .action( async (id) => {
        console.log(`-> Get customer ${id}`);
        stripe.customers.retrieve(id)
            .then( customer => {
                console.log(`--> Customer`);
                console.log(customer)
                console.log('-> Everything ran smooth. Bye!');
                process.exit(0);
            }).catch( err => {
                console.log(`Error getting customer: ${err}`)
                process.exit(1);
            });
            
    });

/////////////
// Balance //
/////////////
program
    .description('Get Stripe account balance')
    .command('getBalance')
    .action( async () => {
        console.log('-> Getting account balance');
        stripe.balance.retrieve()
            .then( balance => {
                console.log('--> Account balance');
                console.log(balance)
                console.log('-> Everything ran smooth. Bye!');
                process.exit(0); 
            }).catch( err => {
                console.log(`Error getting balance: ${err}`)
                process.exit(1);
            });            
    });

/////////////////////////////
// Get users by price name //
////////////////////////////
function mergeDataFromDB(subs, cb){
    pgClient.connect();
    const script = `select ss.stripe_subscription_id as "id", s2.original_start as "orderDate", u2.id as "userId", u2.parse_id as "parseId" from stripe_subscription ss inner join "subscription" s2 on ss.subscription_id = s2.id inner join "user" u2 on s2.user_id = u2.id where ss.stripe_subscription_id  in ('${subs.map( (s) => s.id).join("','")}')`;

    return pgClient.query(script)
        .then( res => {
            const rows = res.rows.reduce( (acc, curr) => {
                const {id, ...info} = curr;
                acc[id] = info;
                return acc;
            }, {});

            const data = subs.map( (sub) => {
                const homerData = rows[sub.id];
                return homerData ? {...sub, ...homerData} : {...sub};
            });
            return cb(data);
        })
        .catch(err => {
            console.log('<<<< BD error >>>'. err);
            process.exit(1);
          });
}

function saveToCsv(planName, data, cb){
    const headers =  [
        'planName',
        'orderDate', 'userId', 'parseId', 'email',
        'stripeSubscriptionId', 'invoiceId', 'product', 'quantity', 'customerName',
        'country', 'shippingAddress', 'city', 'state', 'zipcode'];
    let csv = data.map( (row) => {
        const shippingData = row.customer.shipping;
        const address = shippingData.address;
        const orderDate = row.orderDate ? row.orderDate.toISOString() : undefined;
        return [
            planName,
            orderDate,
            row.userId,
            row.parseId,
            row.customer.email,
            row.id,
            row.latest_invoice,
            'v10 blue',
            1,
            shippingData.name,
            address.country,
            `${address.line1} ${address.line2 ?? ''}`.trim(),
            address.city,
            address.state,
            address.postal_code
        ]
    });

    csv.unshift(headers.join(','));
    csv = csv.join('\r\n');
    return cb(csv);
}

function get10Digits(date){
    return Math.floor(date.getTime()/1000);
}
program
    .description('Get users by plan price')
    .command('getSubscriptionsByPlanName [planName] [gte] [lte] [outputfile]')
    .action( async (planName, gte, lte, outputfile) => {
        console.log(`-> Getting subscriptions by plan name ${planName}`);
        const limit = 10000;
        stripe.subscriptions.list({
            price: planName, expand: ['data.customer'],
            created: {
                gte: get10Digits(new Date(gte)),
                lte: get10Digits(new Date(lte)),
            }
        }).autoPagingToArray({limit})
            .then( subs => {
                console.log('--> Subscription list');
                if(!outputfile){
                    console.log(`--> Found ${subs.length} subs`)
                    console.log(subs);
                    console.log('-> Everything ran smooth. Bye!');
                    process.exit(0);
                }else{
                    console.log('--> In CSV formant', outputfile)
                    mergeDataFromDB(subs, (data) => {
                        saveToCsv(planName, data, (csv) => {
                            console.log(csv)
                            fs.writeFile(`./${outputfile}`, csv, (err) => {
                                if (err) return console.error('<<<<< Error saving file>>>>>', err);                  
                                console.log(`--> File ${outputfile} saved. Bye!`)
                                process.exit(0);
                            });
                        });
                    });
                };
            }).catch( err => {
                console.log(`Error getting subscriptions by plan name: ${err}`)
                process.exit(1);
            });
    });

program.parse(process.argv);
