<template>
  <div class="member">
    <div class="columns">
      <div class="column is-one-quarter">
        <el-card shadow="never">
          <div slot="header" class="has-text-centered">
            <img  :src="url+topicUser.avatar" style="border-radius: 30px;width: 64px; height: 64px">
            <!-- <el-avatar icon="el-icon-user-solid" :size="64" :src="url+topicUser.avatar" /> -->
            <p class="mt-3">{{ topicUser.alias || topicUser.username }}</p>
          </div>
          <div>
            <p class="content">积分：<code>{{ topicUser.score }}</code></p>
            <p class="content">入驻：{{ dayjs(topicUser.createTime).format("YYYY/MM/DD HH:MM:ss") }}</p>
            <p class="content">简介：{{ topicUser.bio }}</p>
          </div>
        </el-card>
      </div>

      <div class="column">
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="我的话题" name="topics">
        <!--用户发布的话题-->
        <el-card class="box-card content" shadow="never">
          <div slot="header" class="has-text-weight-bold">
            <span>话题</span>
          </div>

          <div v-if="topics.length===0">
            暂无话题
          </div>

          <div v-else class="topicUser-info">
            <article v-for="(item, index) in topics" :key="index" class="media">
              <div class="media-content">
                <div class="content ellipsis is-ellipsis-1">
                  <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                    <router-link :to="{ name: 'post-detail', params: { id: item.id } }">
                      {{ item.title }}
                    </router-link>
                  </el-tooltip>
                </div>
                <nav class="level has-text-grey is-size-7">
                  <div class="level-left">
                    <span class="mr-1">
                      发布于:{{ dayjs(item.createTime).format("YYYY/MM/DD HH:mm:ss") }}
                    </span>
                  </div>
                </nav>
              </div>
              <div v-if="token" class="media-right">
                <div v-if="topicUser.username === user.username" class="level">
                  <div class="level-item mr-1">
                    <router-link :to="{name:'topic-edit',params: {id:item.id}}">
                      <span class="tag is-warning">编辑</span>
                    </router-link>
                  </div>
                  <div class="level-item">
                    <a @click="handleDelete(item.id)">
                      <span class="tag is-danger">删除</span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </div>



          <!--分页-->
          <pagination
            class="mt-5"
            :total="page.total"
            :page.sync="page.current"
            :limit.sync="page.size"
            @pagination="fetchUserById"
          />
        </el-card>
    </el-tab-pane>
    <el-tab-pane label="我的合辑" name="series">
              <!--用户发布的话题-->
        <el-card class="box-card content" shadow="never">
          <div slot="header" class="has-text-weight-bold">
            <span>合辑</span>
          </div>

          <div v-if="seriesList.length===0">
            暂无合辑
          </div>

            <div v-else class="topicUser-info">
            <article v-for="(item, index) in seriesList" :key="index" class="media">
              <div class="media-content">
                <div class="content ellipsis is-ellipsis-1">
                  <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                    <router-link :to="{ name: 'series-detail', params: { id: item.id } }">
                      {{ item.title }}
                    </router-link>
                  </el-tooltip>
                </div>
                <nav class="level has-text-grey is-size-7">
                  <div class="level-left">
                    <span class="mr-1">
                      发布于:{{ dayjs(item.createTime).format("YYYY/MM/DD HH:mm:ss") }}
                    </span>
                  </div>
                </nav>
              </div>
              <div v-if="token" class="media-right">
                <div v-if="item.userId === user.id" class="level">
                    <div class="level-item mr-1">
                    <router-link :to="{name:'column-detail',params: {id:item.id}}">
                      <span class="tag is-info">查看</span>
                    </router-link>
                  </div>
                  <div class="level-item mr-1">
                    <router-link :to="{name:'series-edit',params: {id:item.id}}">
                      <span class="tag is-warning">编辑</span>
                    </router-link>
                  </div>
                  <div class="level-item">
                    <a @click="handleDelete(item.id)">
                      <span class="tag is-danger">删除</span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </div>

          
          <!--分页-->
          <pagination
            class="mt-5"
            :total="page.total"
            :page.sync="page.current"
            :limit.sync="page.size"
            @pagination="fetchUserById"
          />
        </el-card>
        
    </el-tab-pane>
    </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfoByName } from '@/api/user'
import pagination from '@/components/Pagination/index'
import { mapGetters } from 'vuex'
import { deleteTopic } from '@/api/post'
import { getListSeries } from '@/api/series'

export default {
  name: 'Profile',
  components: { pagination },
  data() {
    return {
      activeName:'topics',
      topicUser: {},
      topics: {},
      url:'',
      seriesList:[],
      page: {
        current: 1,
        size: 5,
        total: 0
      }
    }
  },
  computed: {
    ...mapGetters(['token', 'user'])
  },
  created() {
    this.url = process.env.VUE_APP_SERVER_URL
    this.fetchUserById()
  },
  methods: {
     handleClick(tab) {
      this.page.current = 1
      if(tab.name == 'series'){
       getListSeries(this.page.current, this.page.size).then((res) => {
          console.log(res.data)
          this.seriesList =res.data.records
          console.log(this.seriesList)
          this.page.current = res.data.current
          this.page.size = res.data.size
          this.page.total = res.data.total
        })
      }else{
        this.fetchUserById()
      }
    },
    fetchUserById() {
      getInfoByName(this.$route.params.username, this.page.current, this.page.size).then((res) => {
        const { data } = res
        this.topicUser = data.user
        console.log(this.topicUser.avatar)
        this.page.current = data.topics.current
        this.page.size = data.topics.size
        this.page.total = data.topics.total
        this.topics = data.topics.records
      })
    },
    handleDelete(id) {
      deleteTopic(id).then(value => {
        const { code, message } = value
        alert(message)

        if (code === 200) {
          setTimeout(() => {
            this.$router.push({ path: '/' })
          }, 500)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
