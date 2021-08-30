<template>
  <div>
    <el-card shadow="never">
      <div slot="header" class="clearfix">
            <article v-for="(item, index) in articleList" :key="index" class="media">
              <div class="media-left" >
                <figure class="image ">
                    <img  slot="reference"  fit="fill" :src="url+item.avatar" style="border-radius: 5px;width: 46px; height: 46px">
                </figure>   
              </div>

              <div class="media-content">
                <div class="">
                  <p class="ellipsis is-ellipsis-1">
                    <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                      <router-link :to="{name:'post-detail',params:{id:item.id}}">
                        <span class="is-size-6">{{ item.title }}</span>
                      </router-link>
                    </el-tooltip>
                  </p>
                </div>
                <nav class="level has-text-grey is-mobile  is-size-7 mt-2">
                  <div class="level-left">
                    <div class="level-left">

                      <router-link class="level-item" :to="{ path: `/member/${item.username}/home` }">
                        {{ item.alias }}
                      </router-link>

                      <span class="mr-1">
                        发布于:{{ dayjs(item.createTime).format("YYYY/MM/DD") }}
                      </span>

                      <span
                        v-for="(tag, index) in item.tags"
                        :key="index"
                        class="tag is-hidden-mobile is-success is-light mr-1"
                      >
                        <router-link :to="{ name: 'tag', params: { name: tag.name } }">
                          {{ "#" + tag.name }}
                        </router-link>
                      </span>

                      <span class="is-hidden-mobile">浏览:{{ item.view }}</span>
                    </div>
                  </div>
                </nav>
              </div>
              <div class="media-right" >
                  
                </div>
            </article>
      </div>

      <!--分页-->
      <pagination
        v-show="page.total > 0"
        :total="page.total"
        :page.sync="page.current"
        :limit.sync="page.size"
        @pagination="init"
      />
    </el-card>
  </div>
</template>

<script>
import { getList } from '@/api/post'
import Pagination from '@/components/Pagination'

export default {
  name: 'TopicList',
  components: { Pagination },
  data() {
    return {
      activeName: 'hot',
      articleList: [],
      url:'',
      page: {
        current: 1,
        size: 10,
        total: 0,
        tab: 'hot'
      }
    }
  },
  created() {
    this.url = process.env.VUE_APP_SERVER_URL
    this.init(this.tab)
  },
  methods: {
    init(tab) {
      getList(this.page.current, this.page.size, 'hot').then((response) => {
        const { data } = response
        this.page.current = data.current
        this.page.total = data.total
        this.page.size = data.size
        this.articleList = data.records
      })
    },
    handleClick(tab) {
      this.page.current = 1
      this.init(tab.name)
    }
  }
}
</script>

<style scoped>

</style>
