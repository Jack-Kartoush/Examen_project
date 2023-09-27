<template>

  <div class="container">
    <div class="slider">
      <input type="radio" class="radio" name="images" id="radio-1" checked />
      <input type="radio" class="radio" name="images" id="radio-2" checked />
      <input type="radio" class="radio" name="images" id="radio-3" checked />
      <input type="radio" class="radio" name="images" id="radio-4" checked />
      <input type="radio" class="radio" name="images" id="radio-5" checked />

      <div class="slide" id="slide-1">
        <img src="../assets/img/broodje2.webp" alt="" />
        <div class="caption"><span></span></div>
      </div>
      <div class="slide" id="slide-2">
        <img src="../assets/img/broodje.jpg" alt="" />
        <div class="caption"><span></span></div>
      </div>
      <div class="slide" id="slide-3">
        <img src="../assets/img/kroket.webp" alt="" />
        <div class="caption"><span></span></div>
      </div>
      <div class="slide" id="slide-4">
        <img src="../assets/img/fris.jpg" alt="" />
        <div class="caption"><span></span></div>
      </div>
      <div class="slide" id="slide-5">
        <img src="../assets/img/soep.jpg" alt="" />
        <div class="caption"><span></span></div>
      </div>

      <div class="dots">
        <label for="radio-1" id="label-1"></label>
        <label for="radio-2" id="label-2"></label>
        <label for="radio-3" id="label-3"></label>
        <label for="radio-4" id="label-4"></label>
        <label for="radio-5" id="label-5"></label>
      </div>
    </div>
  </div>
</template>
