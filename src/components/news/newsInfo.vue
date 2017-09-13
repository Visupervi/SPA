<template>
  <div>
    <h4>{{info.title}}</h4>
    <div class="timer">
      <span>{{info.add_time | dataFormat}}</span>
      <span>{{info.click}}</span>
    </div>
    <div class="info-content" v-html="info.content">{{info.content}}</div>
    <mysub :artId="$route.params.id"></mysub>
  </div>
</template>
<script type="text/javascript">
import comment from "../subcom/comment.vue"
  export default{
    data(){
      return {
        info:{}
      }
    },
    created(){
      this.getInfo()
    },
    methods:{
      getInfo(){
        this.$http.get("api/getnew/" + this.$route.params.id).then(res=>{
          if(res.body.status === 0){
            this.info = res.body.message[0];
          }
        })
      },
      // addData(){
      //   this.$http.post("api/postcomment/")
      // }
    },
    components:{mysub:comment}
  }
</script>
<style type="text/less">
  .timer{
    display: flex;
    justify-content: space-between;
    color: blue;
  }
  .info-content img{
    width: 100%;
  }
</style>