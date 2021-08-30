<!-- 知识贴 -->
<template>
    <div>
      <el-card shadow="never">
        <div slot="header" class="clearfix">
          <article v-for="(item, index) in articleList" :key="index" class="media">
                <section class="section">
                <h1 class="title is-size-4">
                <div class="">
                  <p class="ellipsis is-ellipsis-1">
                    <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                      <router-link :to="{name:'post-detail',params:{id:item.id}}">
                        <!-- <span class="is-size-5"> -->
                          {{ item.title }}
                          <!-- </span> -->
                      </router-link>
                    </el-tooltip>
                  </p>
                </div>
                </h1>
                <nav v-if="item.status=='1'" class="level has-text-grey is-mobile  is-size-7 mt-2">
                    <div class="level-left">
                      <span class="mr-1"  style="font-size:10px;color:red;">
                        {{ dayjs(item.createTime).format("YYYY/MM/DD") }} | 智能推荐 | 作者{{item.username}}
                      </span>
                    </div>
                </nav>   
                <nav v-else class="level has-text-grey is-mobile  is-size-7 mt-2">
                    <div class="level-left">
                      <span class="mr-1"  style="font-size:10px;color:blue;">
                        {{ dayjs(item.createTime).format("YYYY/MM/DD") }} | 随机推荐 | 作者{{item.username}}
                      </span>
                    </div>
                </nav>   

                  <h2 class="subtitle is-size-6">
                    <p class="ellipsis is-ellipsis-2">
                      {{ item.content }}
                    <p/>
                  </h2>

                  <nav class="level ">
                    <div class="level-right">
                        <router-link :to="{name:'post-detail',params:{id:item.id}}" routerLinkActive="router-link-active" style="color: rgba(136, 136, 136, 0.877)">
                        <span class="is-size-7 ">
                         点击阅读全文>
                        </span>
                        </router-link>
                    </div>
                  </nav>
 
                </section>

            </article>
        </div>

    </el-card>
  </div>
</template>

<script>
import { getList } from '@/api/recommend'
export default {
    name: 'Reco',
    data() {
    return {
      articleList: [],
    }
  },
  created() {
      this.init()
  },
  methods: {
    init(){
          this.$message({
          showClose: true,
          message: '获取推荐数据中...',
          type: 'success'
        });
        getList().then((response) => {
        console.log(response)
        const { data } = response
        this.articleList = data
      })
    }
  }
}

</script>
<style lang='scss' scoped>
</style>