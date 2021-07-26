app.component('product-display', {
    /*html*/
    template:
        `<div class="product-display">
<div class="product-container">
  <div class="product-image">
    <img v-bind:src="selectedImage">
  </div>
  <div class="product-info">
    <h1>{{product}}</h1>
   <p>{{stockControl}}</p>

   <review-list v-bind:reviews="reviews"></review-list> 
    <ul>
      <li v-for="detail in details">
        {{detail}}
      </li>
    </ul>
    <br>
  
  </ul>
  <br>
    <div class="color-circle" :class="{active: selectedVariantId==variant.id}" :style="{ backgroundColor:variant.color}" v-for="variant in variants"
      :key="variant.id" @mouseover="selectVariant(variant)"> </div>
    <button class="button" :class="{disabledButton : !inStock}" :disabled='!inStock'
      v-on:click="addToCart">Add</button>
    <button class="button" v-on:click="removeToCart">Remove </button>
  </div>
</div>
<review-form @review-submitted="reviewAdded"></review-form>
</div>`,
    data() {
        return {
            reviews:[],
            inStock: true,
            selectedVariantId: 111,
            product: 'Pratis Çorap',
            image: './assets/images/socks_green.jpg',
            stock: 5,
            details: ['50% cotton', '30% wool', '20% polyster'],
            variants: [{ id: 111, color: 'green', image: './assets/images/socks_green.jpg', activeClass: true }, { id: 222, color: 'blue', image: './assets/images/socks_blue.jpg', activeClass: false }]
        }
    },
    computed: {
        selectedImage() {
            return this.variants.find(s => s.id == this.selectedVariantId).image;
        },
        stockControl() {
            var stockMessage = "";
            if (this.stock > 2) {
                stockMessage = "In Stock";
            }
            else if (this.stock > 0 && this.stock <= 2) {
                stockMessage = "Almost Done";
            }
            else {
                stockMessage = "Out of Stock";
            }
            return stockMessage;
        }
    },
    methods: {
        buttonControl() {
            if (this.stock == 0) {
                this.inStock = false;
            }
            else {
                this.inStock = true;
            }
        },
        addToCart() {
            this.$emit('add-to-cart');
            this.stock -= 1;
            this.buttonControl();
        },
        removeToCart() {
            this.$emit('remove-to-cart');
            this.stock += 1;
            this.buttonControl();
        },
        selectVariant(variant) {
            this.image = variant.image;
            this.selectedVariantId = variant.id;
        },
        reviewAdded(review){
            this.reviews.push(review);
        }
    }
})