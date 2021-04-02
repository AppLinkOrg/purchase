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
      <div class="flex-row">
        <div class="h2 margin-top-05">{{ index + 1 }}.</div>
        <div class="padding-left flex-1">
          <div class="h2">{{ item.name }}</div>
          <div
            class="f-g4 padding-bottom padding-top"
            v-if="item.buchong != ''"
          >
            {{ item.buchong }}
          </div>
          <div class="f-g4 padding-bottom" v-if="item.style == 'B'">
            {{ item.tips }}
          </div>
          <input
            type="text"
            class="bd-bottom h2 margin-top"
            :placeholder="item.tips"
            @click="chuan(item, index)"
            v-model="item.answer"
            v-if="item.style == 'A'"
          />
          <input
            type="text"
            class="bd-bottom h2 margin-top h-46"
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

          <div v-if="item.style == 'B'" class="margin-top margin-left-4x" @click="dianji(index)">
            <van-uploader :after-read="afterRead2" >
              <img
                class="add"
                alt=""
                :src="uploadpath + 'resource/' + Res.add"
                v-if="item.img == ''"
              />
              <img
                class="add"
                alt=""
                :src="uploadpath + 'tianxie/' + item.img"
                v-else
              />
            </van-uploader>
          </div>
        </div>
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
    <div
      class="margin-left-10x margin-right-10x h2 bg-g3 f-g3 h-68 text-center border-34"
      @click="zhifu"
      v-if="neironglist.length != 0"
    >
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
      imgindex:null,
      daanindex: null,
      neironglist: [],
    };
  },

  created() {
    PageHelper.Init(this);
    // PageHelper.loadwechat(this);
    HttpHelper.Post("neirong/neironglist", {
      xianmu_id: this.$route.query.id,
    }).then((neironglist) => {
      for (let item of neironglist) {
        item.answer = "";
        item.img = "";
      }
      this.neironglist = neironglist;
      console.log(neironglist,'neironglist')
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
    dianji(e){
      this.imgindex=e
 console.log(e,'neirongliswwwt')
    },
    afterRead2(file) {
      var that = this;

      HttpHelper.UploadBase64("tianxie", file.content).then((ret) => {
        // this.frontPic = ret.result;
        var imgindex = that.imgindex;
        var neironglist = this.neironglist;
        neironglist[imgindex].img = ret.result;
        this.neironglist = neironglist;
        console.log(ret.result, "result", neironglist,imgindex);
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

     
 var xjiage = 0;
      for (let item of neironglist) {
        if (item.answer == "" && item.style != "B" && item.isbitian_value == "Y") {
          Toast.fail(item.tips);
          return;
        }
        if (item.style == "B" && item.img =='' && item.isbitian_value == "Y") {
          Toast.fail('请上传照片');
           return;
        }

        if (item.style == "C") {
           for (let xitems of item.stylist) {
            if ( item.answer==xitems.name) {
               xjiage = xjiage*1+xitems.price*1;
            }

           }
         
        }

        var json = {
          neironid: item.id,
          neirondaan: item.answer,
          img: item.img,
        };
        jieguo.push(json);
      }
//               console.log(xjiage,'xjiage')
// return
      var str = JSON.stringify(jieguo);
      console.log(str, "jieguo");

      var xmid = this.$route.query.id;
      HttpHelper.Post("neirong/daan", {
        str,
        xianmu_id: this.$route.query.id,
        xjiage,
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
                  this.routeto("/purchasesucess?id=id");
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
.posifix {
  position: fixed;
  bottom: 0px;
  left: 0;
  width: 100vw;
  background: #fff;
}
.h-140 {
  height: 140px;
}
.line-50 {
  line-height: 50rpx;
}
</style>