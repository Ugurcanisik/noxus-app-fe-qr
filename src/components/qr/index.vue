<template>
  <div>

    <div class="loading" :style="isLoading">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>

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

      <center v-if="!isLoad">
        <a class="nav-link mb-sm-3 mb-md-0 kategori"
           style="position:absolute; background-color: black ; color: white; width:10%; right:0px; top:8px; height:46px; padding:7px; margin-right: 5px;"
           id="allcategory"
           @click="$bvModal.show('categoryList')"
        >ᐁ
        </a>
      </center>

    </nav>


    <div style="margin-top: -20px;"></div>

    <div class="wrapper">
      <section class="section pt-lg-0" id="restaurant-content" style="padding-top: 0px">


        <div class="container container-restorant">

          <transition-group name="fade">

            <div
              v-for="products in allProducts"
              class="menu-restaurant"
              v-if="disp(products.categorySeoUrl)"
              :key="products.categorySeoUrl"
              :style="setWidth(products.categorySeoUrl)"
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

    <b-modal id="categoryList" ref="categoryList" hide-footer hide-header>
      <div class="modal-header">
        <h5 class="modal-title ktbaslik" style="margin-left: 35%;" id="ktb">Kategoriler</h5>
        <button class="close" @click="$bvModal.hide('categoryList')">
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
      isLoad: false
    }
  },

  methods: {
    tiklandi(url) {
      this.selectedCategory = url
      this.$refs['categoryList'].hide()
    },
    disp(val) {
      if (val == this.selectedCategory) {
        const scroll = setInterval(() => {
          if (window.pageYOffset === 0) {
            clearInterval(scroll)
          } else {
            window.scroll(0, window.pageYOffset - 50)
          }
        }, 20)
        return true
      } else {
        return false
      }
    },
    setWidth(category) {
      if (category === 'filtre-kahveler' || category === 'salep' || category === 'soguk-icecekler') {
        return {
          height: '900px'
        }
      }
    }
  },
  computed: {
    ...mapGetters(["allProducts"]),
    ...mapGetters(["allCategory"]),
    isLoading() {
      if (this.isLoad) {
        return {
          display: "block"
        }
      } else {
        return {
          display: "none"
        }
      }
    },
  },
  created() {
    this.isLoad = true
    this.$store.dispatch('initQr')
      .then(response => {
        this.isLoad = false
      })
  },
}
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}
</style>
