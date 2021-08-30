<template>
  <div>
    <el-card v-if="list.length>0" shadow="never">
      <div slot="header">
        <span class="has-text-weight-bold"> 📚 {{ this.name }}</span>
      </div>
      <div>
        <article v-for="(item, index) in list" :key="index" class="media">
          <div class="media-left">
            <img :src="url+item.series.img" style="border-radius: 5px;width:140px;height:110px" alt="作者">
          </div>
          <div class="media-content">
            <div class="">
              <p class="ellipsis is-ellipsis-1">
                <el-tooltip class="item" effect="dark" :content="item.post.title" placement="top">
                  <router-link :to="{name:'post-detail',params:{id:item.post.id}}">
                    <span class="is-size-10">{{ item.post.title }}</span>
                    <el-badge
                      v-if="item.post.essence"
                      value="精华"
                    />
                  </router-link>
                </el-tooltip>
              </p>
            <br>
              <p class="ellipsis is-ellipsis-1">
                主要内容：{{item.post.content}}
              </p>
            <br>
            
            </div>
            <nav class="level has-text-grey is-mobile  is-size-7 mt-2">
              <div class="level-left">
                <div class="level-left">
                  <span v-if="item.post.top" class="tag has-text-link mr-2">置顶</span>

                  <router-link class="level-item" :to="{ path: `/member/${item.user.username}/home` }">
                    {{ item.user.alias }}
                  </router-link>

                  <span class="mr-2">
                    发布于:{{ dayjs(item.post.createTime).format("YYYY/MM/DD") }}
                  </span>

                  <span
                    v-for="(tag, index) in item.list"
                    :key="index"
                    class="tag is-hidden-mobile is-success is-light mr-2"
                  >
                    <router-link :to="{ name: 'tag', params: { name: tag.name } }">
                      {{ "#" + tag.name }}
                    </router-link>
                  </span>

                  <span class="is-hidden-mobile">浏览:{{ item.post.view }}</span>
                </div>
              </div>
            </nav>
          </div>
          <div class="media-right" />
        </article>
      </div>

      <hr class="divider">
      <!--分页-->
      <pagination
        v-show="query.total > 0"
        :total="query.total"
        :page.sync="query.current"
        :limit.sync="query.size"
        @pagination="fetchList"
      />
    </el-card>

    <el-card v-else shadow="never" class="has-text-centered py-6">
      <p class="my-3">当前专栏暂未发布任何内容，联系作者催更！</p>
      <el-button size="mini" round type="success" @click="cuigeng()">催一下</el-button>
    </el-card>
  </div>
</template>

<script>
import { getPostsBySeries } from '@/api/series'
import Pagination from '@/components/Pagination/index'

export default {
  name: 'Column',
  components: { Pagination },
  data() {
    return {
      list: [],
      url:'',
      name:'',
      query: {
        id: this.$route.params.id,
        current: 1,
        size: 10,
        total: 0
      }
    }
  },
  mounted() {
    document.title = '专栏' + this.$route.params.id
  },
  created() {
    this.url = process.env.VUE_APP_SERVER_URL
    this.fetchList()
  },
  methods: {
    fetchList() {
      getPostsBySeries(this.query.current, this.query.size,this.$route.params.id).then(value => {
        const { data } = value
        console.log(value)
        this.list = data.records
        this.name = this.list[0].series.title
        this.query.current = data.current
        this.query.size = data.size
        this.query.total = data.total
      })
    },
    cuigeng() {
      setTimeout(() => {
        this.$message.info('📩 作者已收到您的催更')
      }, 0.3 * 1000)
    }
  }
}
</script>

<style scoped>

</style>
