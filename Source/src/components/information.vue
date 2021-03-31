<template>
  <div>
    <div class="margin-top h1 bold text-center f-warn">填写信息</div>

    <div class="margin-top-4x"></div>
    <div
      class="margin-left-3x margin-right-3x margin-top margin-bottom-4x"
      v-for="(item, index) in neironglist"
      :key="index"
    >
    <!-- style="word-wrap:break-all;word-break:break-all" -->
      <div class="flex-row " >
        <div class="h2 margin-top-05">{{ index + 1 }}.</div>
        <div class="h2 padding-left" >{{ item.name }}</div>
      </div>
 <div class="f-g4 padding-bottom margin-left padding-top" v-if="item.buchong != '' ">{{item.buchong}}</div>
      

      <input
        type="text"
        class="bd-bottom margin-left h2 padding-left margin-top"
        :placeholder="item.tips"
        @click="chuan(item, index)"
        v-model="item.answer"
        v-if="item.style == 'A'"
      />
      <input
        type="text"
        class="bd-bottom margin-left h2 padding-left margin-top h-46"
        :placeholder="item.tips"
        @click="chuan(item, index)"
        v-model="item.answer"
        readonly="readonly"
        v-if="item.style == 'C'"
      />
      

      <div
        class="xz flex-row flex-column"
        v-show="placexs"
        v-if="item.style == 'C'"
      >
        <div class="flex-1 zz"></div>
         <!-- :title="item.tips" -->
        <van-picker
          show-toolbar
         
          :columns="namelist"
          @cancel="onCancel"
          @confirm="onConfirm"
        />
      </div>
      <div v-if="item.style == 'B'" class="margin-top margin-left-4x">
        <div class="f-g4 padding-bottom" >{{item.tips}}</div>
        <van-uploader :after-read="afterRead2">
          <img
            class="add"
            alt=""
            :src="uploadpath + 'resource/' + Res.add"
            v-if="frontPic == ''"
          />
          <img
            class="add"
            alt=""
            :src="uploadpath + 'tianxie/' + frontPic"
            v-else
          />
        </van-uploader>
      </div>
      <div class="" v-if="item.style == 'B'"></div>
    </div>

    <!-- <div class="posifix" v-if="neironglist.length != 0">
      <div
        class="margin-left-10x margin-right-10x h2 bg-g3 f-g3 h-68 text-center border-34"
        @click="zhifu"
      >
        立即支付
      </div>
    </div> -->

    <!-- <div class="h-140"></div> -->
    <div class="padding-top"></div>
    <div class="margin-left-10x margin-right-10x h2 bg-g3 f-g3 h-68 text-center border-34 " @click="zhifu"  v-if="neironglist.length != 0">
立即支付
  </div>
  <div class="padding-top"></div>
<!-- <div class="posifix" v-if="neironglist.length != 0">
  <div class="padding-bottom-3x"></div>
    <div class="margin-left-10x margin-right-10x h2 bg-g3 f-g3 h-68 text-center border-34 " @click="zhifu">
立即支付
  </div>
  <div class="padding-bottom-3x"></div>
</div> -->

  </div>
</template>
<script>
import Config from "../Config";
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { Utils } from "../Utils";
import { Toast } from "vant";
import Vue from "vue";
import wx from "weixin-jsapi";

export default {
  data() {
    return {
      Res: {},
      Inst: {},
      Member: null,
      daan: [],
      daanid: null,
      yijiname: [],
      placexs: false,
      disabled: null,
      namelist: [],
      frontPic: "",
      daanindex: null,
      neironglist: [],
    };
  },
  created() {
    PageHelper.Init(this);
    HttpHelper.Post("neirong/neironglist", {
      xianmu_id: this.$route.query.id,
    }).then((neironglist) => {
      for (let item of neironglist) {
        item.answer = "";
        item.img = "";
      }
      this.neironglist = neironglist;
    });
  },
  methods: {
    onCancel() {
      this.placexs = false;
    },
    onConfirm(picker, value, index) {
      var neironglist = this.neironglist;
      var daanindex = this.daanindex;
      // console.log( neironglist[daanid],'index',daanid)
      neironglist[daanindex].answer = picker;
      this.neironglist = neironglist;
      this.placexs = false;
    },
    afterRead2(file) {
      var that = this;
      HttpHelper.UploadBase64("tianxie", file.content).then((ret) => {
        this.frontPic = ret.result;
        var daanindex = that.daanindex;
        var neironglist = this.neironglist;
        neironglist[daanindex].img = ret.result;
        this.neironglist = neironglist;
        console.log(ret.result, "result", neironglist);
      });
    },
    getList(e) {},
    chuan(item, index) {
      this.daanid = item.id;
      var daanindex = index;
      this.daanindex = daanindex;
      var arr = [];
      for (let items of item.stylist) {
        var name = items.name;
        arr.push(name);
      }
      this.namelist = arr;
      if (item.style == "C") {
        this.placexs = true;
      }

      console.log(item, "daanid");
    },
    zhifu() {
      console.log("loadwechat");
      PageHelper.loadwechat(this);

      let viewer = window.navigator.userAgent.toLowerCase();

      var jieguo = [];
      var neironglist = this.neironglist;

      for (let item of neironglist) {
        if (item.answer == "" && item.style != "B") {
          Toast.fail(item.tips);
          return;
        }
        var json = {
          neironid: item.id,
          neirondaan: item.answer,
          img: item.img,
        };
        jieguo.push(json);
      }
      var str = JSON.stringify(jieguo);
      console.log(str, "jieguo");

      var xmid = this.$route.query.id;
      HttpHelper.Post("neirong/daan", {
        str,
        xianmu_id: this.$route.query.id,
      }).then((res) => {
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
                  this.routeto("/purchasesucess");
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
/* .posifix {
  position: fixed;
  bottom: 40px;
  left: 0;
  width: 100vw;
} */
.xz {
  /* position: absolute; */
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: 99;
}
.van-picker__title {
  line-height: none;
}
.zz {
  width: 100vw;
  background: rgba(0, 0, 0, 0.3);
}
.van-picker {
  width: 100vw;
}
.add {
  width: 300px;
  height: 300px;
}
.h-46 {
  /* height: 46px; */
  background: #fff;
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
.line-50{
  line-height: 50rpx;
}
</style>