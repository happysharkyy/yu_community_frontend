<template>
  <header class="header has-background-white has-text-black">
    <b-navbar
      class="container is-white"
      :fixed-top="true"
    >
      <template slot="brand">
        <b-navbar-item tag="div">
          <img :src="doubaoImg" alt="logo">
        </b-navbar-item>

        <b-navbar-item
          class="is-hidden-desktop"
          tag="router-link"
          :to="{ path: '/' }"
        >
          主页
        </b-navbar-item>
      </template>


      <template slot="start">
        <b-navbar-item
          tag="router-link"
          :to="{ path: '/' }"
        >
          🌐 主页
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ path: '/activity' }"
        >
           🎉活动
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ path: '/domain' }"
        >
           🎶我的动态
        </b-navbar-item>


          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              🔰更多
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item" @click="info()">
                💖关于
              </a>
              <hr class="dropdown-divider">
              <a class="navbar-item" href="tencent://message/?Menu=yes&uin=1517762555">
                🕗联系
              </a>
            </div>
          </div>
      


      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <b-field position="is-centered">
            <b-input
              v-model="searchKey"
              class="s_input"
              width="80%"
              placeholder="搜索帖子、标签和用户"
              rounded
              clearable
              @keyup.enter.native="search()"
            />

            <p class="control">
              <b-button
                class="is-info"
                @click="search()"
              >检索
              </b-button>
            </p>
          </b-field>
        </b-navbar-item>

        <b-navbar-item tag="div">
          <b-switch
            v-model="darkMode"
            passive-type="is-warning"
            type="is-dark"
          >
            {{ darkMode ? "夜" : "日" }}
          </b-switch>
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ path: '/' }"
          @click.native="getListInfo"
        >

        <el-popover
          placement="bottom"
          title="通知"
          width="600"
          height="400"
          trigger="click">

             <el-card shadow="never">
              <div
                slot="header"
                class="title"
              >
                <el-radio-group
                  v-model="isCollapse"
                  size="small"
                >
                  <el-radio-button :label="true">私信通知</el-radio-button>
                  <el-radio-button :label="false">系统消息</el-radio-button>
                </el-radio-group>
              </div>
              <YuUserMessage
                v-if="isCollapse"
                :records = this.records
                :user = this.user
                :page = this.page>
              </YuUserMessage>
              
              <YuSysMessage
                v-if="!isCollapse"
              ></YuSysMessage>
            </el-card>
            <a   slot="reference"><el-badge :value="messageNum" :max="99" class="item"><span>我的消息🔔 </span></el-badge></a>     
        </el-popover>

        </b-navbar-item>
        <b-navbar-item
          v-if="token == null || token === ''"
          tag="div"
        >
          <div class="buttons">
            <b-button
              class="is-light"
              tag="router-link"
              :to="{ path: '/register' }"
            >
              注册
            </b-button>
            <b-button
              class="is-light"
              tag="router-link"
              :to="{ path: '/login' }"
            >
              登录
            </b-button>
          </div>
        </b-navbar-item>

        <b-navbar-dropdown
          v-else
          :label="user.alias"
        >
          <b-navbar-item
            tag="router-link"
            :to="{ path: `/member/${user.username}/home` }"
          >
            🧘 个人中心
          </b-navbar-item>
          <hr class="dropdown-divider">
          <b-navbar-item
            tag="router-link"
            :to="{ path: `/member/${user.username}/setting` }"
          >
            ⚙ 设置中心
          </b-navbar-item>
          <hr class="dropdown-divider">
          <b-navbar-item
            tag="router-link"
            :to="{ path: `/member/follow` }"
          >
            📢 我的关注
          </b-navbar-item>
          <hr class="dropdown-divider">
          <b-navbar-item
          tag="router-link"
          :to="{ path: '/activity/user' }"
          >
             🎇 我的报名
          </b-navbar-item>
          <hr class="dropdown-divider">
          <b-navbar-item
            tag="a"
            @click="logout"
          > 👋 退出登录
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>
    </b-navbar>
  </header>
</template>

<script>

import { getList,getHistory,getCount} from '@/api/message'
import { disable as disableDarkMode, enable as enableDarkMode } from 'darkreader'
import { getDarkMode, setDarkMode } from '@/utils/auth'
import { mapGetters } from 'vuex'
import YuUserMessage from './UserMessage'
import YuSysMessage from './SysMessage'
import {Count } from '@/api/notice'

export default {
  name: 'Header',
  components: {YuUserMessage,YuSysMessage},
  data() {
    return {
      page:{
        size:0,
        total:0,
        current:0,
      },
      messageNum:0,
      visible: false,
      isCollapse:true,
      logoUrl: require('@/assets/logo.png'),
      doubaoImg: require('@/assets/logo.png'),
      searchKey: '',
      records:[],
      darkMode: false
    }
  },
  watch: {
    // 监听Theme模式
    darkMode(val) {
      if (val) {
        enableDarkMode({})
      } else {
        disableDarkMode()
      }
      setDarkMode(this.darkMode)
    }
  },
  mounted(){

  },
  computed: {
    ...mapGetters(['token', 'user'])
  },
  created() {
    getCount().then(res => {
      console.log( res.data)
      this.messageNum += res.data
    })
    Count().then(res => {
          console.log( res.data)
          this.messageNum+= res.data
    })
    // 获取cookie中的夜间还是白天模式
    this.darkMode = getDarkMode()
    if (this.darkMode) {
      enableDarkMode({})
    } else {
      disableDarkMode()
    }
  },
  methods: {
    info(){
      alert('本系统采用技术栈 SpringCloud Mysql Redis Elasticsearch RabbitMq Vue Element Buefy ')
    },
     getListInfo(){
      console.log(this.user)
      getList(1,10,this.user.username).then(res => {
          this.records= res.data.records
          this.page.size = res.data.size;
          this.page.total = res.data.total;
          this.page.current = res.data.current
          console.log(this.records)
      })
  },
    async logout() {
      this.$store.dispatch('user/logout').then(() => {
        this.$message.info('退出登录成功')
        setTimeout(() => {
          this.$router.push({ path: this.redirect || '/' })
        }, 500)
      })
    },
    search() {
      console.log(this.token)
      if (this.searchKey.trim() === null || this.searchKey.trim() === '') {
        this.$message.info({
          showClose: true,
          message: '请输入关键字搜索！',
          type: 'warning'
        })
        return false
      }
      this.$router.push({ path: '/search?key=' + this.searchKey })
    }
  }
}
</script>

<style scoped>
.item {
  margin-right: 10px;
  margin-top: 0px;
}
input {
  width: 80%;
  height: 86%;
}

</style>
