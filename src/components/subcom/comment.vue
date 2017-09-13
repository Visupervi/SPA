<template>
  <div class="comm">
    <textarea v-model="comm"></textarea>
    <button type="button" data-loading-icon-position="left" class="mui-btn mui-btn-success mui-btn-outlined" @click="addData">发表评论</button>
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <!-- {{index}} -->
          <span>第{{index+1}}层</span>
          <p class="uname">用户：{{item.user_name}}</p>
          <p>{{item.content}}</p>
          <span class="time">评论时间：{{item.add_time | dataFormat}}</span>
        </li>
      </ul>
       <button @click="getMore" type="button" data-loading-icon-position="left" class="mui-btn mui-btn-success mui-btn-outlined ">加载更多</button>
  </div>
</template>
<script type="text/javascript">
  export default
  {
    data(){
      return {
        pageindex:1,
        list:[],
        comm:""
      }
    },
    created(){
      this.getComment();
    },
    methods:{
      getComment(){
         this.$http.get("api/getcomments/"+ this.artId+ "?pageindex="+this.pageindex).then(res=>{
          if(res.body.status === 0){
            console.log(res.body);
            this.list = this.list.concat(res.body.message);
            console.log(this.list);
          }
      })
      },
      getMore(){
        this.pageindex++;
        this.getComment();
      },
      addData(){
        this.$http.post("api/postcomment/"+this.artId, { content: this.comm }, { emulateJSON: true }).then(res=>{
          if(res.body.status === 0){
            console.log("添加成功");
            this.list.unshift({ user_name: '匿名用户', add_time: new Date(), content: this.comm });
            
          }else{
            console.log("添加失败");
          }
          this.comm = "";
        })
      }
    },
    props:["artId"]
  }
</script>
<style>
  .comm{
    padding-bottom: 50px;
  }
  textarea{
    border:1px solid #ccc;
    width: 90%;
    margin-left: 5%;
    margin-bottom: 0;
  }
  button{
    margin-left: 5%;
  }
  li{
    list-style: none;
  }
</style>