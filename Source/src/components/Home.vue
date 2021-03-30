<template>
<!-- :style="{'background-image':tongyi == true ? 'url'+'('+uploadpath+'xianmu/'+xianmulist.img+')':''}" -->
  <div style="min-height: 100vh;"  >
<img class="sucess" alt="" :src="uploadpath + 'xianmu/' + xianmulist.img" style="width:100%" />
<div class="h-140"></div>
<div class="posifix" v-if="xianmulist.length != 0">
  <div class="padding-bottom-3x"></div>
    <div class="margin-left-10x margin-right-10x h2 bg-g3 f-g3 h-68 text-center border-34 " @click="tiaozhuan">
立即购买
  </div>
  <div class="padding-bottom-3x"></div>
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
      xianmulist:[],
     Pid:null
    };
  },
  created() {
    PageHelper.Init(this);
     var str = location.href
    str = str.substring(str.indexOf("id=")+3,str.indexOf("&"));
     console.log(str,'location2')
    this.Pid = str;

    // this.Pid = this.$route.query.id;
    console.log(location.href,'location')
    
    // console.log(this.$route.query.id,'location')
   
    HttpHelper.Post("xianmu/xianmulist",{
      id:this.Pid
    }).then((xianmulist)=>{
      this.xianmulist=xianmulist
    })
   

  },
  methods: {
     tiaozhuan(){
       this.routeto("/information?id="+this.Pid);
    }
  },
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
  bottom: 0px;
  left: 0;
  width: 100vw;
  background:#fff
}
.h-140{
  height: 140px;
}
</style>