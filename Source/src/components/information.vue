<template>
  <div>
    <div class="margin-top h1 bold text-center">填写信息</div>

    <div class="margin-top-4x"></div>
    <div
      class="margin-left-3x margin-right-3x margin-top margin-bottom-4x flex-row"
      v-for="(item, index) in neironglist"
      :key="index"
    >
      <div class="h2">{{ index + 1 }}.</div>
      <div class="h2 padding-left" style="flex: none">{{ item.name }}</div>
      <input
        type="text"
        class="bd-bottom margin-left"
        :placeholder="item.tips"
        @click="chuan(item.id)"
        v-model="item.answer"
      />
    </div>

    <div class="posifix" v-if="neironglist.length !=0">
      <div
        class="margin-left-4x margin-right-4x h2 bg-g3 f-g3 h-68 text-center border-34"
        @click="zhifu"
      >
        立即支付
      </div>
    </div>
  </div>
</template>
<script>
import Config from "../Config";
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { Utils } from "../Utils";
import { Toast } from "vant";
import wx from "weixin-jsapi";

export default {
  data() {
    return {
      Res: {},
      Inst: {},
      Member: null,
      daan: [],
      daanid: null,

      neironglist: [],
    };
  },
  created() {
    PageHelper.Init(this);
    HttpHelper.Post("neirong/neironglist", {xianmu_id:this.$route.query.id}).then((neironglist) => {
      for (let item of neironglist) {
        item.answer = "";
      }
      this.neironglist = neironglist;
    });
  },
  methods: {
    getList(e) {},
    chuan(e) {
      this.daanid = e;
      console.log(e, "daanid");
    },
    zhifu() {
      console.log("loadwechat");
      PageHelper.loadwechat(this);


  
         let viewer = window.navigator.userAgent.toLowerCase();
              

      var jieguo = [];
      var neironglist = this.neironglist;

      for (let item of neironglist) {
        if (item.answer == '') {
           Toast.fail(item.tips);
           return;
        }
        var json = {
          neironid: item.id,
          neirondaan: item.answer,
        };
        jieguo.push(json);
      }
      var str = JSON.stringify(jieguo);
      console.log(str, "jieguo");

      var xmid=this.$route.query.id 
      HttpHelper.Post("neirong/daan", { str,xianmu_id:this.$route.query.id }).then((res) => {
        if (res.code == 0) {
          //  PageHelper.loadwechat(this);
          let viewer = window.navigator.userAgent.toLowerCase();
               if (viewer.match(/MicroMessenger/i) == "micromessenger") {
              console.log("micromessenger");
              var openid = window.localStorage.getItem("openid");
              HttpHelper.Post("wechat/prepay", {
                order_id: res.result,
                openid: openid,
              }).then((payret) => {
                //alert(JSON.stringify(payret));
                WeixinJSBridge.invoke("getBrandWCPayRequest", payret, (res) => {
                  if (res.err_msg == "get_brand_wcpay_request:ok") {
                    this.routeto("/success?order_id=" + order_id);
                  }
                });
              });
              return;
            }
      
        }
      });
    },
  },
};
</script>
<style scoped>
.h-68 {
  height: 68px;
  line-height: 68px;
}
.posifix {
  position: fixed;
  bottom: 40px;
  left: 0;
  width: 100vw;
}

</style>