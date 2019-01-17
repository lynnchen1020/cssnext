<template>
  <div>
    <!-- <Waterfall :minCol="1" :maxCol="5" ref="waterfall">
      <WaterfallItem v-for="(img, key) in imgsArr" :key="key">
        <img :src="img">
      </WaterfallItem>
    </Waterfall> -->
    <div id="box">
      <div class="item" v-for="(img, key) in imgsArr" :key="key">
        <img :src="img">
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import { Waterfall, WaterfallItem } from "vue2-waterfall"

export default {
  data() {
    return {
      imgsArr: [
        "https://images.unsplash.com/photo-1542841366-9a30e19bb19a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        "https://images.unsplash.com/photo-1547586696-31bfb413bdf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1547549951-e9085ccae47d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1542841366-9a30e19bb19a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        "https://images.unsplash.com/photo-1542841366-9a30e19bb19a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        "https://images.unsplash.com/photo-1542841366-9a30e19bb19a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        "https://images.unsplash.com/photo-1547586696-31bfb413bdf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1547549951-e9085ccae47d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      ],
      percent: []
    }
  },
  components: {
    // Waterfall,
    // WaterfallItem
  },
  mounted() {
    let box = document.getElementById('box');
    let items = box.children;
    let gap = 0;

    window.onload = function() {
      waterFall();

      function waterFall() {
        // 1) 確認一列要放幾個
        let pageWidth = getClient().width; //取得目前裝置寬度

        let itemWidth = items[0].offsetWidth; //取得一張圖片寬度
        let columns = parseInt(pageWidth / (itemWidth + gap)); //頁面寬度 / 圖片寬度加上 gap = 得到有幾欄
        console.log('columns', columns)
        let arr = [];

        for (let i = 0; i < items.length; i++) {
          if (i < columns) {
            // 2) 確定第一欄的排版
            items[i].style.top = 0;
            items[i].style.left = (itemWidth + gap) * i + 'px';

            arr.push(items[i].offsetHeight); // 把第一列所有圖片高度存到 arr
          } else {
            // 3) 找到 arr 最小的高度 & 索引
            let minHeight = arr[0];
            let index = 0;
            for (let j = 0; j < arr.length; j++) {
              if (minHeight > arr[j]) {
                minHeight = arr[j];
                index = j;
              }
            }
            // 4) 設置第二列第一個圖片 top 值
            items[i].style.top = arr[index] + gap + 'px';
            // left值就是最小列距离左边的距离
            items[i].style.left = items[index].offsetLeft + 'px';

            // 5- 修改最小列的高度
            // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
            arr[index] = arr[index] + items[i].offsetHeight + gap;
          }
        }
      }
      window.onresize = function() {
        waterFall();
      };
    }

    function getClient() {
      return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      }
    }
  }
}
</script>

<style>
#box {
  font-size: 0;
}
.item {
  /* width: calc(100% / 5); */
  width: 400px;
  max-width: 100%;
  position: absolute;
  display: block;
}
img {
  max-width: 100%;
  width: 100%;
  height: auto;
}

</style>
