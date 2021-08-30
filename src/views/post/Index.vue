<template>
  <div>
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="最新主题" name="latest">
            <article v-for="(item, index) in articleList" :key="index" class="media">
                <!-- <el-popover
                placement="left-start"
                title="作者信息"
                width="200"
                trigger="hover"> -->
                <!-- <el-card shadow="hover">
                </el-card> -->
                <div  slot="reference" class="left">
                  <figure class="image is-48x48">
                    <img  :src="url+item.avatar" style="border-radius: 5px;width: 46px; height: 46px">
                  </figure>
                </div>
                 <!-- </el-popover> -->
              
              <div class="media-content"  style="margin-left:20px">
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
                  <!--分页-->
              <pagination
                v-show="page.total > 0"
                :total="page.total"
                :page.sync="page.current"
                :limit.sync="page.size"
                @pagination="init"
              />
          </el-tab-pane>
            <el-tab-pane
            name="connect"
            label="我的关注"
          >
                <article v-for="(item, index) in articleList01" :key="index" class="media">
                <el-popover
                placement="left-start"
                title="作者信息"
                width="200"
                trigger="hover">
                <el-card shadow="hover">
                    

                </el-card>
                <div  slot="reference" class="left">
                  <figure class="image is-48x48">
                    <img  :src="url+item.avatar" style="border-radius: 5px;width: 46px; height: 46px">
                  </figure>
                </div>
                 </el-popover>
              
              <div class="media-content"  style="margin-left:20px">
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
              <div class="media-right" />
            </article>
        </el-tab-pane>
         <el-tab-pane
            name="top"
            label="置顶帖子"
          >
                <article v-for="(item, index) in topList" :key="index" class="media">
                <el-popover
                placement="left-start"
                title="作者信息"
                width="200"
                trigger="hover">
                <el-card shadow="hover">
                    

                </el-card>
                <div  slot="reference" class="left">
                  <figure class="image is-48x48">
                    <img  :src="url+item.avatar" style="border-radius: 5px;width: 46px; height: 46px">
                  </figure>
                </div>
                 </el-popover>
              
              <div class="media-content"  style="margin-left:20px">
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
                  <span class="is-hidden-mobile" v-if="item.top==1">置顶</span>
              </div>
            </article>
        </el-tab-pane>
  
        </el-tabs>
      </div>


    </el-card>
  </div>
</template>

<script>
import { getList,getListFollow,getListTop } from '@/api/post'
import Pagination from '@/components/Pagination'

export default {
  name: 'TopicList',
  components: { Pagination },
  data() {
    return {
      activeName: 'latest',
      articleList: [],
      articleList01: [],
      topList:[],
      url:'',
      page: {
        current: 1,
        size: 10,
        total: 0,
        tab: 'latest'
      }
    }
  },
  created() {
    this.url = process.env.VUE_APP_SERVER_URL
    this.init(this.tab)
  },
  methods: {
    init(tab) {
      getList(this.page.current, this.page.size, tab).then((response) => {
        const { data } = response
        console.log(data)
        this.page.current = data.current
        this.page.total = data.total
        this.page.size = data.size
        this.articleList = data.records
      })
    },
    handleClick(tab) {
      this.page.current = 1
      if(tab.name == 'connect'){
       getListFollow().then((res) => {
          this.articleList01 = res.data
          console.log( res.data)
        })
      }else if(tab.name == 'top'){
        getListTop().then((res) => {
          this.topList = res.data
          console.log( res.data)
        })
      }else{
        this.init(tab.name)
      }
     
    }
  }
}
</script>

<style scoped>

</style>
