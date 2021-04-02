<template>
  <div>
    <div class="margin-top-100"></div>
    <img class="sucess" alt="" :src="uploadpath + 'resource/' + Res.sucess" />
    <div class="h1 text-center  bold margin-top">购买成功</div>
    <div class="margin-top"></div>
    <div  class="h1 text-center   w-360">{{Inst.chenggong}}</div>
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
  width: 160px;
  height: 160px;
  margin: auto;
}
.w-360{
    width: 360px;
    margin:auto
}
</style>