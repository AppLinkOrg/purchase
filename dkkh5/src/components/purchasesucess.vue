<template>
  <div :style="{'background-image':'url'+'('+uploadpath+'resource/'+Res.bg+')'}" style="background-size:100% 100%;min-height:100vh ">
  <div class="flex-row flex-center " style="min-height:100vh">

      <div class="" style="width:100vw">
      <!-- <div class="padding-top-100"></div> -->
    <img class="sucess" alt="" :src="uploadpath + 'resource/' + Res.ti1" />
    <div class="f-56 text-center  bold margin-top-4x margin-bottom-4x">购买成功</div>
    <div class="margin-top"></div>
    <div  class="f-38 text-center  f-g2  " v-html="Inst.chenggong"></div>
     <div class="padding-top-100"></div>
      <div class="padding-top-100"></div>
    </div>
  </div>
  </div>
</template>
<script>
import Config from "../Config";
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { Utils } from "../Utils";
import wx from "weixin-jsapi";

export default {
  data() {
    return {
      Res: {},
      Inst: {},
      Member: null,
    };
  },
 mounted() {
     wx.hideOptionMenu();
  },
  created() {
    PageHelper.Init(this);
     document.title= localStorage.getItem('title')
  },
  methods: {},
};
</script>
<style scoped>
.sucess {
  display: block;
  width: 200px;
  /* height: 160px; */
  margin: auto;
}
.w-360{
    width: 360px;
    margin:auto
}
</style>