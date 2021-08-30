<template>
<div>
  <div  v-for="record in  notice" :key="record.id" class="transition-box" style="height:20px;" >

    <div style="padding-left:15px;">
      <div>
        <div style="align:left;float:left;font-size:12px;color:red;">
          {{record.fromUser.alias}}&nbsp;
        </div>
          <div style="align:left;float:left;font-size:12px;color:blue;">
          &nbsp;&nbsp;{{record.operation}}了你&nbsp;
        </div>
        <div v-if="record.content!=null" style="align:left;float:left;font-size:12px;">
          &nbsp;<p style="font-size:12px;color:red;">内容为：{{record.content}}</p>&nbsp;
        </div>
        <div v-if="record.bmsPost!=null" style="align:left;float:left;font-size:12px;">
          &nbsp;<p style="font-size:12px;color:#fb00f7;">{{record.objType}}名为：{{record.bmsPost.title}}</p>
        </div>
        <div  style="text-align:right;font-size:12px;">
            {{dayjs(record.createTime).format("YYYY:MM:DD HH:MM:ss") }}
        </div>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import {findNotice } from '@/api/notice'
export default {
  name: 'YuSysMessage',
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
      findNotice().then(res=>{
        console.log(res)
        this.notice = res.data
      })
    }
  }

}
</script>
<style>
.transition-box {
    margin-bottom: 10px;
    height: 60px;
    border-radius: 4px;
    background-color: #b7d1bb;
    text-align: center;
    color: #fff;
    padding: 3px 1px;
    box-sizing: border-box;
  }
  .item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>

