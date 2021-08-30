<template>
  <div class="columns">
    <!--文章详情-->
    <div class="column is-three-quarters">
      <!--主题-->
      <el-card
        class="box-card"
        shadow="never"
      >
        <div
          slot="header"
          class="has-text-centered"
        >
          <p class="is-size-5 has-text-weight-bold">{{ topic.title }}</p>
          <div class="has-text-grey is-size-7 mt-3">
            <span>{{ dayjs(topic.createTime).format('YYYY/MM/DD HH:mm:ss') }}</span>
            <el-divider direction="vertical" />
            <span>发布者：{{ topicUser.alias }}</span>
          </div>
        </div>

        <!--Markdown-->
        <div id="preview" />

        <!--标签-->
        <nav class="level has-text-grey is-size-7 mt-6">
          <div class="level-left">
            <p class="level-item">
              <b-taglist>
                <router-link
                  v-for="(tag, index) in tags"
                  :key="index"
                  :to="{ name: 'tag', params: { name: tag.name } }"
                >
                  <b-tag type="is-info is-light mr-1">
                    {{ "#" + tag.name }}
                  </b-tag>
                </router-link>
              </b-taglist>
            </p>
          </div>
          
     
        </nav>
         <el-divider></el-divider>
         <b-button type="is-danger"  style="width:100px" tag="router-link" :to="{path:'/post/create'}" outlined>✍ 发表想法</b-button>
          <el-divider></el-divider>
          <span
              class="tag"
              style="margin-top: 6px;"
          >封面图</span>
            <p class="level-item">
              <img v-if="topic.img" :src="url+topic.img" class="avatar" style="height:160px">
            </p>
        <nav class="level has-text-grey is-size-7 mt-6">
         <div class="level-left">

          </div>
          
          <div
            v-if="token && user.id === topicUser.id"
            class="level-right"
          >
            <router-link
              class="level-item"
              :to="{name:'series-edit',params: {id:topic.id}}"
            >
              <span class="tag">编辑</span>
            </router-link>
            <a class="level-item">
              <span
                class="tag"
                @click="handleDelete(topic.id)"
              >删除</span>
            </a>
          </div>

        
        </nav>
      </el-card>

    </div>

    <div class="column">
      <!--作者-->
      <Author
        v-if="flag"
        :topicUser="topicUser"
   
      />
      <!--推荐-->
      <recommend
        v-if="flag"
        :topic-id="topic.id"
      />
    </div>
  </div>
</template>

<script>
import { deleteSeries, getSeries } from '@/api/series'
import { mapGetters } from 'vuex'
import Author from '@/views/post/Author'
import Recommend from '@/views/post/Recommend'
import Vditor from 'vditor'
import 'vditor/dist/index.css'

export default {
  name: 'TopicDetail',
  components: { Author, Recommend },
  computed: {
    ...mapGetters([
      'token','user'
    ])
  },
  data() {
    return {
      flag: false,
      url:'',
      topic: {
        content: '',
        id: this.$route.params.id
      },
      tags: [],
      topicUser: {}
    }
  },
  created(){
      this.url = process.env.VUE_APP_SERVER_URL
  },
  mounted() {
    this.fetchTopic()
  },
  methods: {
    renderMarkdown(md) {
      Vditor.preview(document.getElementById('preview'), md, {
        hljs: { style: 'github' }
      })
    },
    // 初始化
    async fetchTopic() {
      getSeries(this.$route.params.id).then(response => {
        const { data } = response
        document.title = data.topic.title
        this.topic = data.topic
        this.tags = data.tags
        this.topicUser = data.user
        this.renderMarkdown(this.topic.content)
        this.flag = true
      })
    },
    handleDelete(id) {
      deleteSeries(id).then(value => {
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

<style>
#preview {
  min-height: 300px;
}
</style>
