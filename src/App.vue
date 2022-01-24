<template>
  <div>

    <nav class="tabbable sticky" style="padding: 0px 10px; top: 0px;">
      <ul class="nav nav-pills  mb-2" style="width: 90%;" id="qrmenu">

        <li v-for="category in allCategory"
            class="nav-item-category"
            style="margin-right: 10px; "
        >
          <a
            @click="tiklandi(category.seoUrl)"
            class="nav-link mb-sm-3 mb-md-0 kategori"
            style="background-color: black ; color: white;"
          >
            {{ category.name }}
          </a>
        </li>


      </ul>

      <center>
        <a class="nav-link mb-sm-3 mb-md-0 kategori"
           style="position:absolute; background-color: black ; color: white; width:10%; right:0px; top:8px; height:46px; padding:7px; margin-right: 5px;"
           id="allcategory"
           @click="showModal"
        >ᐁ
        </a>
      </center>

    </nav>


    <div style="margin-top: -20px;"></div>
    <div class="wrapper">
      <section class="section pt-lg-0" id="restaurant-content" style="padding-top: 0px">


        <div class="container container-restorant">

          <transition-group name="slide-fade">
            <div
              v-for="products in allProducts"
              class="menu-restaurant"
              v-if="disp(products.categorySeoUrl)"
              :key="products.categorySeoUrl"
            >

              <!-- category head start -->
              <div style="text-align: center;" class="ktbaslik">
                <h1 style="color: black;">{{ products.categoryName }}</h1><br/>
              </div>
              <!-- category head end -->

              <!-- procd list start -->
              <div class="row">


                <div v-for="productsDetails in products.products" class="col-xl-3 col-lg-6 col-md-6 col-sm-6 ">
                  <div class="strip">

                    <img :src="'https://storage.googleapis.com/noxus-up-file/'+productsDetails.picture" width="400"
                         height="400" v-if="productsDetails.picture">

                    <div style="margin-top: 10px;"></div>

                    <span
                      style="display: block; float:right"
                      class="res_mimimum urunfiyat"
                      v-html="$options.filters.priceLoad(productsDetails.price)"
                    >
                    </span>

                    <span class="res_title" style="display: block;">
                      <b
                        class="urunad"
                        style="display:block; width: 85%;"
                        v-html="$options.filters.nameLoad(productsDetails.name)"
                      >
                      </b>
                    </span>

                    <span
                      class="res_description urundetay"
                      style="display: block; margin-top: 10px;"
                    >{{ productsDetails.description }}
                    </span>

                  </div>
                </div>

              </div>
              <!-- procd list end -->
            </div>

          </transition-group>


        </div>

      </section>
    </div>

    <b-modal ref="categoryList" hide-footer hide-header>
      <div class="modal-header">
        <h5 class="modal-title ktbaslik" style="margin-left: 35%;" id="ktb">Kategoriler</h5>
        <button class="close" @click="closeModal">
          <span style="color:black" aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body">

        <ul class="nav nav-pills">

          <li v-for="category in allCategory" class="nav-item-category"
              style="margin:0px auto; width:100%; text-align: center;">
            <a class="nav-link mb-sm-3 mb-md-0 kategori"
               style="background-color: black ; color: white;"
               @click="tiklandi(category.seoUrl)">{{ category.name }}</a>
          </li>

        </ul>

      </div>
    </b-modal>


  </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      selectedCategory: 'tatlilar',
    }
  },

  methods: {
    tiklandi(url) {
      this.selectedCategory = url
      this.closeModal()
    },
    showModal() {
      this.$refs['categoryList'].show()
    },
    closeModal() {
      this.$refs['categoryList'].hide()
    },
    disp(val) {
      if (val == this.selectedCategory) {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
        return true
      } else {
        return false
      }
    },
  },
  computed: {
    ...mapGetters(["allProducts"]),
    ...mapGetters(["allCategory"]),
  },
  created() {
    this.$store.dispatch('initQr')
  },
}
</script>
<style scoped>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */
{
  transform: translateX(10px);
  opacity: 0;
}
</style>
