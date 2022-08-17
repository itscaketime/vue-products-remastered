<template>
  <form method="POST" id="product-form" @submit.prevent="onFormSubmit">
    <div class="form-field">
      <label for="input-text"
        ><span class="required">Наименование товара</span></label
      >
      <input
        :class="{ 'is-error': nameErr }"
        type="text"
        id="input-text"
        name="text"
        placeholder="Введите наименование товара"
        v-model="productName"
      />
      <p class="err" v-if="nameErr">Поле не должно быть пустым</p>
    </div>
    <div class="form-field">
      <label for="input-desc">Описание товара</label>
      <textarea
        maxlength="100"
        type="desc"
        id="input-desc"
        name="desc"
        placeholder="Введите описание товара"
        v-model="productDesc"
      >
      </textarea>
    </div>
    <div class="form-field">
      <label for="input-value"
        ><span class="required"
          >Введите ссылку на изображение товара</span
        ></label
      >
      <input
        :class="{ 'is-error': imageErr }"
        type="text"
        id="input-image"
        name="image"
        placeholder="Введите ссылку"
        v-model="productImage"
      />
      <p class="err" v-if="imageErr">Поле не должно быть пустым</p>
    </div>
    <div class="form-field">
      <label for="input-value"><span class="required">Цена товара</span></label>
      <input
        :class="{ 'is-error': priceErr }"
        type="text"
        id="input-value"
        name="value"
        placeholder="Введите цену"
        v-model="productPrice"
      />
      <p class="err" v-if="priceErr">Поле не должно быть пустым</p>
    </div>
    <button :disabled="!canSubmitForm" class="add-btn" type="submit">
      Добавить товар
    </button>
  </form>
</template>

<script>
import useValidation from '../use/useValidation';
import { ref, computed, watch } from 'vue';
export default {
  name: 'ProductForm',
  components: {},
  emits: ['submit'],
  setup(props, ctx) {
    const productName = ref('');
    const productDesc = ref('');
    const productImage = ref('');
    const productPrice = ref('');

    const nameErr = ref(false);
    const priceErr = ref(false);
    const imageErr = ref(false);

    const productNameValidated = useValidation(
      /^[\sA-Za-zЁёА-я0-9]+$/imu,
      productName
    );
    const productPriceValidated = useValidation(/^[0-9]+$/m, productPrice);

    const canSubmitForm = computed(() => {
      return productName.value && productImage.value && productPrice.value;
    });

    const formSubmittable = () => {
      return (
        productNameValidated.value &&
        !nameErr.value &&
        !imageErr.value &&
        productPriceValidated.value &&
        !priceErr.value
      );
    };

    //make watcher hook
    watch(productName, () => {
      if (!productName.value) {
        nameErr.value = true;
      } else {
        nameErr.value = false;
      }
    });
    watch(productImage, () => {
      if (!productImage.value) {
        imageErr.value = true;
      } else {
        imageErr.value = false;
      }
    });
    watch(productPrice, () => {
      if (!productPrice.value) {
        priceErr.value = true;
      } else {
        priceErr.value = false;
      }
    });
    const onFormSubmit = () => {
      if (!formSubmittable()) {
        console.log('Form cannot be submited');
        //show some validation errs
        return;
      }

      ctx.emit('submit', {
        name: productName.value,
        desc: productDesc.value,
        image: productImage.value,
        price: Number(productPrice.value),
      });
    };

    return {
      productName,
      productDesc,
      productImage,
      productPrice,
      onFormSubmit,
      productNameValidated,
      nameErr,
      priceErr,
      imageErr,
      canSubmitForm,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_vars';
//?
@import '../assets/_base';
#product-form {
  background-color: white;
  z-index: 1000;
  width: 20rem;
  // width: 20.75rem;
  display: block;
  padding: 1.5rem;
  border-radius: 0.5rem;
  position: fixed;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04),
    0px 6px 10px rgba(0, 0, 0, 0.02);
  @media screen and (max-width: 736px) {
    & {
      width: 100%;
      position: relative;
      margin-bottom: 2rem;
    }
  }
  .form-field {
    margin-bottom: 1rem;
    position: relative;
    &:nth-child(4) {
      margin-bottom: 1.5rem;
    }
  }
  .required {
    position: relative;
    &::after {
      content: '';
      width: 4px;
      height: 4px;
      display: block;
      border-radius: 100%;
      background-color: #ff8484;
      position: absolute;
      right: -4px;
      top: -2px;
    }
  }
  .add-btn {
    width: 100%;
    font-weight: bold;
    border-radius: 10px;
    height: 2.25rem;
    line-height: 2.25rem;
    background-color: #7bae73;
    color: white;
  }
  .add-btn:disabled {
    background-color: #eeeeee;
    color: $text-color-light;
  }
  input.is-error {
    border: 1px solid $text-color-error;
  }

  .err {
    color: $text-color-error;
    font-weight: bold;
    font-size: 0.5rem;
    line-height: 1rem;
    margin-bottom: 0;
    position: absolute;
    bottom: -1.15rem;
    z-index: 2;
    left: 0;
  }
}
</style>
