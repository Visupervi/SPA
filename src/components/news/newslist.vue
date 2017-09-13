<template>
  <div>
   <ul class="mui-table-view">
    <li class="mui-table-view-cell mui-media" v-for="(item,index) in list">
        <router-link :to="'/home/newsInfo/' + item.id">
            <img class="mui-media-object mui-pull-left" :src="item.img_url" height="119" width="120">
            <div class="mui-media-body">
                {{item.title}}
                <p class='mui-ellipsis'>{{item.zhaiyao}}</p>
            </div>
            <div class="timer">
              <span>{{item.add_time | dataFormat}}</span>
              <span>{{item.click}}</span>
            </div>
        </router-link>
    </li>
</ul>

  </div>
</template>

<script type="text/javascript">
  export default {
    data(){
      return {
        list:[]
      };
    },
    created(){
       this.getMenu();
    },
    methods:{
       getMenu(){
        this.$http.get("api/getnewslist").then(res=>{
          if(res.body.status === 0){
            // console.log(res.body);
            this.list = res.body.message;
          }else{
            console.log(res.err);
          }
        })
      }
    }

  }
</script>
<style type="text/less">
  .mui-table-view img{
    vertical-align: center;
  }
  .mui-media-body{
    font-size: 14px;

  }
   .mui-ellipsis{
      font-size: 12px;
    }
    .timer{
      display: flex;
      justify-content: space-between;
      color: blue;
      font-size: 12px;
    }
</style>