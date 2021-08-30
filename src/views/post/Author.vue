<template>
  <section id="author">
    <el-card class="" shadow="never">
      <div slot="header">
        <span class="has-text-weight-bold">👨‍💻 关于作者</span>
      </div>
      <div class="has-text-centered">
        <p class="is-size-5 mb-5">
          <router-link :to="{ path: `/member/${topicUser.username}/home` }">
            {{ topicUser.alias }} <span class="is-size-7 has-text-grey">{{ '@' + topicUser.username }}</span>
          </router-link>
        </p>
        <div class="columns is-mobile">
          <div class="column is-half">
            <code>{{ topicUser.topicCount }}</code>
            <p>文章</p>
          </div>
          <div class="column is-half">
            <code>{{ topicUser.followerCount }}</code>
            <p>粉丝</p>
          </div>
        </div>
        <div class="has-text-centered">
          <b-button type="is-primary" style="width:80px" outlined  @click="MessageList()">私信</b-button>
          <b-button 
            v-if="hasFollow"
            style="width:80px;margin-left:10px"
           type="is-info is-light"
            @click="handleUnFollow(topicUser.id)"
          >
            已关注
          </b-button>

          <b-button  v-else style="width:80px;margin-left:10px"   type="is-info is-light" @click="handleFollow(topicUser.id)"  outlined class="ml-2">
            关注
          </b-button>
        </div>


      </div>
    </el-card>
  <el-dialog title="私信" :visible.sync="dialogFormVisible">
    <ChartAlert 
    :user="user"
    :topicUser="topicUser"></ChartAlert>
  </el-dialog>
  </section>

</template>

<script>
import ChartAlert from '@/components/ChartAlert/index'
import { follow, hasFollow, unFollow } from '@/api/follow'
import { mapGetters } from 'vuex'
export default {
  components: { ChartAlert },
  name: 'Author',
  props: {
    topicUser: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      hasFollow: false
    }
  },
  mounted() {
    this.fetchInfo()
  },
  computed: {
    ...mapGetters([
      'token','user'
    ])
  },
  methods: {
    MessageList(){
       this.dialogFormVisible = true
       console.log(this.user)

    },
    fetchInfo() {
      if(this.token != null && this.token !== '')
      {
        hasFollow(this.topicUser.id).then(value => {
          const { data } = value
          this.hasFollow = data.hasFollow
        })
      }
    },
    handleFollow: function(id) {
      if(this.token != null && this.token !== '')
      {
        follow(id).then(response => {
          const { message } = response
          this.$message.success(message)
          this.hasFollow = !this.hasFollow
          this.topicUser.followerCount = parseInt(this.topicUser.followerCount) + 1
        })
      }
      else{
        this.$message.success('请先登录')
      }
    },
    handleUnFollow: function(id) {
      unFollow(id).then(response => {
        const { message } = response
        this.$message.success(message)
        this.hasFollow = !this.hasFollow
        this.topicUser.followerCount = parseInt(this.topicUser.followerCount) - 1
      })
    }
  }
}
</script>

<style scoped>

</style>
