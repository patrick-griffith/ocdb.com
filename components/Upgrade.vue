<template>
    <span>
        <template v-if="$auth.user.pro">
            <span class="text-blue-600 font-bold">THANK YOU</span>    
        </template>
        <template v-else>
            <stripe-checkout
                ref="checkoutRef"
                mode="payment"
                :pk="pk"
                :line-items="items"
                :success-url="successUrl"
                :cancel-url="cancelUrl"
                @loading="v => loading = v"
            />
            <span class="text-blue-600 font-bold button"  @click="checkout">UPGRADE</span>    
        </template>
    
    </span>
    
</template>

<script>
export default {
  data () {
    this.pk = process.env.STRIPE_PK;
    return {
        loading: false,
      items: [
        {
          price: 'price_1IWzBpJAaIu6PRwyd6zPl4QC',
          quantity: 1,
        },
      ],
      successUrl: process.env.FRONTEND_URL + '/home?upgrade=booyah',
      cancelUrl: process.env.FRONTEND_URL + '/home?upgrade=cancel',
    };
  },
  methods: {
    checkout () {
      this.$refs.checkoutRef.redirectToCheckout();
    },
  },
};
</script>