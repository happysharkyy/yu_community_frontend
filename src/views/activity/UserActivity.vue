<template>
  <section class="has-text-centered">
    <div class="columns">
      <div class="column is-12">
        <div class="columns is-multiline">
          <div
            v-for="(item, index) in list"
            :key="index"
            class="column is-one-quarter"
          >
            <div class="card rb-card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img :src="url+item.pic">
                </figure>
              </div>
              <div class="card-content">
                <h3
                  class="title is-size-6 ellipsis is-ellipsis-1"
                  :title="item.title"
                >
                  {{ item.title }}
                </h3>
                <h4 class="subtitle is-size-7 ellipsis is-ellipsis-2 mt-3">
                  剩余:{{ item.stock }}
                  <el-divider direction="vertical" />
                  {{ dayjs(item.endTime).format("YYYY/MM/DD HH:mm:ss") }}
                </h4>
  
                <button v-if="item.statusDetail=='已报名'&dayjs(item.endTime).format('YYYY/MM/DD HH:mm:ss')>dayjs(new Date().getTime()).format('YYYY/MM/DD HH:mm:ss')"
                  class="button is-danger is-light mr-1 has-text-weight-bold"
                  @click="unsignD(item.id)"
                >
                  取消报名
                  </button>
                  <button v-else-if="item.stock==0&item.statusDetail=='已报名'&&dayjs(item.endTime).format('YYYY/MM/DD HH:mm:ss')>dayjs(new Date().getTime()).format('YYYY/MM/DD HH:mm:ss')"
                  class="button is-danger is-light mr-1 has-text-weight-bold"
                     @click="unsignD(item.id)"
                >
                  取消报名
                </button>
                  <button v-else-if="dayjs(item.endTime).format('YYYY/MM/DD HH:mm:ss')<dayjs(new Date().getTime()).format('YYYY/MM/DD HH:mm:ss')"
                  class="button is-danger is-light mr-1 has-text-weight-bold"
                >
                  已经结束
                  </button>
                    <button v-else-if="item.stock==0&item.statusDetail=='已报名'"
                  class="button is-danger is-light mr-1 has-text-weight-bold"
                  @click="unsignD(item.id)"
                >
                 取消报名
                </button>
                <button v-else-if="item.stock==0"
                  class="button is-danger is-light mr-1 has-text-weight-bold"
                >
                 名额不足！等待其他用户取消
                </button>
                <button v-else
                  class="button is-info is-light mr-1 has-text-weight-bold"
                  @click="view(item.id)"
                >
                  点击报名
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getListByUser ,unsign} from '@/api/activity'

export default {
  name: 'Activity',
  data() {
    return {
      url:'',
      list: []
    }
  },
  created() {
    this.url = process.env.VUE_APP_SERVER_URL
    this.fetchList()
  },
  methods: {
    unsignD(activityId){
      unsign(activityId).then((value) => {
        this.$notify.success({
            title: 'Info',
            message: '取消报名成功!',
            duration: 3000
        });
        this.fetchList()
      })
    },
    fetchList: function() {
      getListByUser().then((value) => {
        const { data } = value
        this.list = data
      })
    },
    view: function(id) {
      this.$router.push({ name: 'activity-detail', params: { id: id }})
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
