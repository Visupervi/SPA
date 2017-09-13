<template>
  <div class="tmpl">
    <h4>{{info.title}}</h4>
    <p class="info">
      <span>发表时间：{{info.add_time | dataFormat}}</span>
      <span>浏览次数：{{info.click}}</span>
    </p>
    <div class="thumbs">
      <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="index">
    </div>
    <!-- 图片的详细介绍 -->
    <div class="content" v-html="info.content"></div>

    <!-- 评论框组件 -->
    <comment :artId="id"></comment>
  </div>
</template>
<script type="text/javascript">
  import comment from "../subcom/comment.vue"
  import config from "../../js/Webconfig.js"
  export default {
    data() {
      return {
        id: this.$route.params.id,
        info:{},
        list:[]
      }
    },
    created(){
      this.getImgInfo();
      this.getThumbsList();
    },
    methods:{
      getImgInfo(){
        this.$http.get("api/getimageInfo/" + this.id).then(res => {
          if(res.body.status === 0){
            this.info = res.body.message[0];
          }else{
            console.log("获取失败");
          }
        })
      },
      getThumbsList(){
        this.$http.get('api/getthumimages/' + this.id).then(res =>{
          var result = res.body;
          if(result.status === 0){
            var imgList = result.message.map(item =>{
              item.w = 600;
              item.h = 400;
              item.src = config.imgBaseURL + item.src;
              return item;
            });
            this.list = imgList;
          }else{
            console.log("获取失败");
          }
        });
      }
    },
    components:{comment}
  }
</script>
<style type="text/less" scoped>
  .tmpl {
    padding: 3px;
  }

  h4 {
    color: #26A2FF;
    text-align: center;
    font-size: 17px;
    margin: 15px 0;
  }

  .info {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }

  .content {
    font-size: 14px;
    line-height: 30px;
    text-indent: 2em;
  }

  .thumbs{
    img{
      margin: 10px;
      box-shadow: 0 0 15px #999;
    }
  }
</style>