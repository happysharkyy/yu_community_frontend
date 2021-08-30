<template>
  <div>
    <el-card v-for="record in  notice" :key="record.id" shadow="never">
         <div style="padding-left:15px;">
      <div>
        <div style="align:left;float:left;font-size:15px;color:red;">
         我
        </div>
          <div style="align:left;float:left;font-size:15px;color:blue;">
         {{record.operation}}了
        </div>
        <div style="align:left;float:left;font-size:15px;color:red;">
            <router-link style="align:left;float:left;font-size:15px;color:red;" class="level-item" :to="{ path: `/member/${record.toUser.username}/home` }"> {{record.toUser.alias}}</router-link>
        </div>
        <div style="align:left;float:left;font-size:15px;color:green;">
          {{record.objType}}
        </div>
        <div v-if="record.content!=null" style="align:left;float:left;font-size:15px;">
          <p style="font-size:15px;color:red;">内容为：{{record.content}}</p>
        </div>
        <div v-if="record.bmsPost!=null" style="align:left;float:left;font-size:15px;">
         <router-link :to="{name:'post-detail',params:{id:record.bmsPost.id}}"><p style="font-size:15px;color:#fb00f7;">{{record.objType}}名为：{{record.bmsPost.title}}</p></router-link>
        </div>
        <div  style="text-align:right;font-size:15px;">
            {{dayjs(record.createTime).format("YYYY:MM:DD HH:MM:ss") }}
        </div>
      </div>
    </div>

    </el-card>
  </div>
</template>

<script>
import {findDomain } from '@/api/notice'
export default {
  name: 'domain',
    data(){
    return{
      notice:[],
    }
  },
  created() {
    this.init()
  },
  methods:{
    init(){
      findDomain().then(res=>{
        console.log(res)
        this.notice = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
