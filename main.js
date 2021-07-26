const app = Vue.createApp({
    data() {
        return {
            cartCount: 0,
            errorMessage: ""
        }
    },
    methods: {
        increaseCart() {
            this.errorMessage = '';
            this.cartCount += 1;
        },
        dropCart() {
            if (this.cartCount <= 0) {
                this.errorMessage = this.cartCount + ' not valid value';
                this.cartCount = 0;
            }
            else {
                this.cartCount -= 1;
            }
        }
    }
})
