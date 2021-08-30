<template>
<div>
  <div class="columns is-multiline">
    <div v-for="(item,index) in list" :key="index" class="column is-one-quarter">
      <el-card shadow="hover" class="has-text-centered has-text-grey my-3">
        <el-image
          style="height:120px"
          :src="url+item.img"
          fit="fill"
        />
        <div class="my-3">
          <p class="subtitle">{{ item.title }}</p>
          <!--          <small>1080关注，{{item.topics}}文章</small>-->
          <small>{{ dayjs(item.createTime).format("YYYY/MM/DD HH:mm:ss") }}</small>
        </div>
        <p class="my-3">作者：{{item.username}}</p>

        <router-link :to="{name:'column-detail',params:{id:item.id}}">
          <button class="button button-center is-link is-light has-text-weight-bold">
            进入专栏
          </button>
        </router-link>

      </el-card>
    </div>

  </div>
  <div  style="align:center">
           <!--分页-->
          <pagination
            class="mt-5"
            :total="query.total"
            :page.sync="query.current"
            :limit.sync="query.size"
            @pagination="fetchList"
          />
  </div>
         
  </div>
</template>

<script>
import { getListSeriesAll } from '@/api/series'
import pagination from '@/components/Pagination/index'
export default {
  name: 'Index',
  components: { pagination },
  data() {
    return {
      url:'',
      list: [
       
      ],
      query: {
        column: {},
        current: 1,
        size: 10,
        total: 0
      }
    }
  },
  created() {
    this.url = process.env.VUE_APP_SERVER_URL
    this.fetchList()
  },
  methods: {
    fetchList() {
      getListSeriesAll(this.query.current, this.query.size).then(value => {
        console.log(value)
        const { data } = value
        this.list = data.records
        this.query.current = data.current
        this.query.total = data.total
        this.query.size = data.size
      })
    },
    view: function(cid) {
      this.$router.push({ name: 'column-detail', params: { column: cid }})
    }
  }
}
</script>

<style scoped>

</style>
