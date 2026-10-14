import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const stripeNewMerchant = async (email: string) => {
    const merchantAccount = await stripe.v2.core.accounts.create({
        display_name: email,
        contact_email: email,
        dashboard: "express",
        defaults: {
            responsibilities: {
                fees_collector: "application",
                losses_collector: "application",
            },
        },
        identity: {
            country: "BR",
            entity_type: "individual",
        },
        configuration: {
            merchant: {
                capabilities: {
                    card_payments: {
                        requested: true
                    }
                }
            },
        },
    });

    return merchantAccount.id;
}

export const accountOnboarding = async (accountId: string) => {
    const accountLink = await stripe.v2.core.accountLinks.create({
        account: accountId,
        use_case: {
            type: 'account_onboarding',
            account_onboarding: {
                refresh_url: `${process.env.BASE_URL}`,
                return_url: `${process.env.BASE_URL}/sucesso`
            }
        }
    })

    return accountLink.url;
}