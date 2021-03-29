<template>
  <div style="min-height: 100vh;background-size:100% 100%;"  :style="{'background-image':tongyi == true ? 'url'+'('+uploadpath+'xianmu/'+xianmulist.img+')':''}">

<div class="posifix" v-if="xianmulist.length != 0">
    <div class="margin-left-4x margin-right-4x h2 bg-g3 f-g3 h-68 text-center border-34 " @click="tiaozhuan">
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
  bottom: 40px;
  left: 0;
  width: 100vw;
}
</style>