<template>
  <!-- <h4>这是图片组件啊</h4> -->
  <div>
   <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
      <div class="mui-scroll">
          <a :class="['mui-control-item', item.id==0?'mui-active':'']" v-for="(item,index) in imgList" :key="item.id" @click="reloadImgList(item.id)">
            {{item.title}}
          </a>
      </div>
    </div>

     <ul>
      <li v-for="item in photoList" :key="item.id" @click="goImgInfo(item.id)" >
        <img v-lazy="baseUrl + item.img_url">
        <div class="info">
          <h4>{{item.title}}</h4>
          {{item.zhaiyao}}
        </div>
      </li>
    </ul>

  </div>
</template>
<script type="text/javascript">
// import mui from "../../lib/mui/js/mui.min.js";
import mui from "../../lib/mui/js/mui.js";
import config from "../../js/Webconfig.js";
  export default{
    data(){
      return {
        categoryId:0,
        photoList:[],
        imgList:[],
        baseUrl:config.imgBaseURL
      }
    },
    created(){
      this.getImg();
      this.getImgList();
    },
    mounted(){
      mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    })
    },
    methods:{
      getImg(){
      this.$http.get("api/getimgcategory").then(res=>{
        // console.log(res.body);
        if(res.body.status === 0){
          this.imgList = res.body.message;
          this.imgList.unshift({title: "全部", id: 0})
        }
      })
      },
      getImgList(){
        this.$http.get("api/getimages/"+this.categoryId).then(res=>{
          if(res.body.status === 0){
            // console.log(res.body.message);
            this.photoList = res.body.message;
            console.log(this.photoList);
          }
          
        })
      },
      reloadImgList(Id){
        this.categoryId = Id;
        this.getImgList();
      },
      goImgInfo(id){
        this.$router.push("/home/imginfo/" + id);

      }
    }
  }
</script>
<style type="text/css" scope>
* {
  touch-action: none;
}

// 这是懒加载的样式
img[lazy=loading] {
  width: 40px;
  height: 300px;
  display: block;
  margin: 0 auto;
}

ul {
  list-style: none;
  margin: 0;
  padding: 10px;
  li {
    margin: 10px 0;
    box-shadow: 0 0 15px #999;
    position: relative;
    img {
      width: 100%;
      display: block;
    }
    .info {
      position: absolute;
      bottom: 0;
      color: #fff;
      font-size: 12px;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      h4 {
        font-size: 13px;
      }
    }
  }
}

</style>