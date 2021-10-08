<template>
  <div>
       
     <van-uploader v-model="fileList" multiple :after-read="afters" @delete="shanchu" />
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
      fileList: [],
    };
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);
  },
  methods: {
      afters(file) {
      console.log("file", file);
      var name = file.file.name;
      HttpHelper.UploadBase64("baoming", file.content).then(ret => {
        this.frontPic.push({ img: ret.result, name: name });
        console.log(frontPic);
      });
    },
     shanchu(file) {
      console.log("file", file);
      var name = file.file.name;
      for (var i = 0; i < this.frontPic.length; i++) {
        if (name == this.frontPic[i].name) {
          this.frontPic.splice(i, 1);
        }
      }
      console.log(this.frontPic);
    },
  },
};
</script>
<style scoped>
</style>