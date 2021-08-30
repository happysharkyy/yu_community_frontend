<template>
  <section class="has-text-centered">
    <div class="columns">
      <div class="column is-12">
        <div class="columns is-multiline">
              <div class="media-left" style="margin-top:50px">
                 <el-image style="width: 135px; height: 135px"  :src="url+activity.pic"></el-image>
              </div>

              <div class="media-content" style="margin-top:45px;margin-left:30px">
                <p class="level-left">
                        <span style="font-size:20px;">活动名称：&nbsp;</span><span style="font-size:20px;">{{ activity.title }}</span>
                </p>
                <nav class="level has-text-grey is-mobile  is-size-15 mt-2" > 
                  <div class="level-left">
                    <div class="level-left">
                      <span class="mr-5">
                        创建时间:&nbsp;&nbsp;{{ dayjs(activity.createTime).format("YYYY:MM:DD HH:MM:ss") }}
                      </span>
                    </div>
                    </div>
                </nav>
                <nav class="level has-text-grey is-mobile  is-size-15 mt-2" > 
                  <div class="level-left">
                    <div class="level-left">
                      <span class="is-hidden-mobile">剩余:&nbsp;&nbsp;&nbsp;{{ activity.stock }}</span>
                    </div>
                    </div>
                </nav>
                <nav class="level has-text-grey is-mobile  is-size-15 mt-2">
                  <div class="level-left">
                    <div class="level-left">
                        {{ activity.alias }}
                      <span class="mr-5" style="font-size:15px;color:red">
                        截止时间:&nbsp;&nbsp;{{ dayjs(activity.endTime).format("YYYY:MM:DD HH:MM:ss") }}
                      </span>
                    </div>
                    </div>
                </nav>
              </div>
            <el-divider  />
        </div>
        <el-container>
            <el-container>
                <el-header>
                    <div>
                          <el-row class="demo-avatar demo-basic">
                            <el-col :span="24">
                            <div class="demo-basic--circle" style="float:left">
                                <div class="block"><span style="font-size:20px;">已报名用户：</span>
                                <el-tooltip style="align:left" v-for="item in userList" :key="item.id"  class="item" effect="dark" :content="item.sysUser.alias" placement="top">
                                <el-avatar fit="fill"  :size="50" :src="url+item.sysUser.avatar" style="margin-left:10px">
                                </el-avatar>
                                 </el-tooltip>
                                </div>
                            </div>
                            </el-col> 
                          </el-row>
                    </div>
                </el-header>
            </el-container>
              <el-aside width="200px">
                  <el-button type="primary" style="width:100px" @click="register()">点击报名</el-button>
              </el-aside>
            </el-container>
      </div>
    </div>
  </section>
</template>

<script>
import { getActivityById,doMiaoSha } from '@/api/activity'

export default {
  name: 'Detail',
  data() {
    return {
      url:'',
      circleUrl: "http://5b0988e595225.cdn.sohucs.com/images/20170904/71684e481cee4012b4d6024ddda2aff6.jpeg",
      activityId:0,
      userList:[],
      activity:{}
    }
  },
  created() {
    this.url = process.env.VUE_APP_SERVER_URL
    this.activityId = this.$route.params.id
    this.fetchActivity()
  },
  methods: {
    register(){
        this.$notify.success({
          title: 'warning',
          message: '排队中',
          duration: 3000
        });
        doMiaoSha(this.activityId).then(res=>{
            if(res.code==200){
                this.fetchActivity()
                this.$notify.success({
                    title: 'Info',
                    message: '报名成功!',
                    duration: 3000
                });
              this.fetchActivity()
              setTimeout(() => {
                      this.$router.push({
                        name: 'activity'
                      })
                    }, 800)
            }
        })
    },
    fetchActivity: function() {
      getActivityById(this.activityId).then((value) => {
        console.log(value)
        this.activity =value.data
        console.log(this.url)
        console.log(this.activity.pic)
        this.userList = this.activity.list;
      })
    },
  }
}
</script>

<style scoped>
.rb-card {
    border: none;
    border-radius: 3px;
    /*box-shadow: 5px 5px 16px 0 rgba(0, 0, 0, 0.13);*/
    box-shadow: 0 -0.5em 0em -1.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    position: relative;
    overflow: hidden;
}

.rb-card:hover {
    transform: scale(1.03);
}


</style>
