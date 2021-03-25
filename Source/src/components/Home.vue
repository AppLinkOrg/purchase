<template>
  <div style="min-height: 100vh;background-size:100% 100%;"  :style="{'background-image':tongyi == true ? 'url'+'('+uploadpath+'resource/'+Res.bg+')':''}">

<div class="posifix">
    <div class="margin-left-4x margin-right-4x h2 bg-g3 f-g3 h-68 text-center border-34 " @click="routeto('information')">
立即购买
  </div>
</div>

  </div>
</template>
<script>
import Config from "../Config";
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { Utils } from "../Utils";

export default {
  data() {
    return {
      Res: {},
      Inst: {},
      Member: null,
      tongyi:true,
     
    };
  },
  created() {
    PageHelper.Init(this);
   

  },
  methods: {},
};
</script>
<style scoped>
.kx{
    width:750px;
    height:50px;
    background: red;
    
}
.h-68{
  height: 68px;
  line-height: 68px;
}
.posifix{
  position:fixed;
  bottom: 40px;
  left: 0;
  width: 100vw;
}
</style>