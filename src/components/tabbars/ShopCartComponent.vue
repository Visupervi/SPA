<template>
  <div>
    <h4>这是shop组件</h4>
  </div>
</template>


<script>
</script>

<style lang="scss" scoped>
  .shopcar {
    background-color: #eee;
    overflow: hidden;

    .goods-list {
      .mui-card-content-inner {
        display: flex;
        .thumb_img {
          width: 60px;
          height: 60px;
        }
        .info {
          flex: 1;
          h4 {
            font-size: 14px;
          }
          .box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .price {
              font-size: 16px;
              color: red;
            }
          }
        }
      }
    }
    .mui-card-content-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .amount {
        flex: 1;
      }
      .red {
        color: red;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
</style>