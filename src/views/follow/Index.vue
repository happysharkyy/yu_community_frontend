<template>
  <section>
    <el-card shadow="never">
      <div slot="header">
        个人关注
      </div>
      <div class="columns" style="align:center">
        
         <el-table
            :data="tableData.filter(data => !search || data.toUser.username.toLowerCase().includes(search.toLowerCase()))"
            border
            :default-sort = "{prop: 'id', order: 'descending'}"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            style="width: 100%">
            <el-table-column
            center
            prop="fromUser.id"
            label="ID"
            sortable
            width="200">
            </el-table-column>
            <el-table-column
            prop="fromUser.username"
            label="姓名"
            width="120">
            </el-table-column>
            <el-table-column
            prop="fromUser.mobile"
            label="手机号"
            width="120">
            </el-table-column>
            <el-table-column
            prop="fromUser.email"
            label="邮箱"
            width="200">
            </el-table-column>
            <el-table-column
            prop="fromUser.avatar"
            label="头像"
            width="200">
            <template slot-scope="scope">
                <el-avatar size="large" fit="fill" :src="url+scope.row.fromUser.avatar"></el-avatar>
            </template>
            </el-table-column>
            <el-table-column
            label="操作"
            width="200">

                <template slot="header">
                    <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入名字搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row.fromUser.id)"  type="text" plain size="small">取消关注</el-button>
                </template>
            </el-table-column>
        </el-table>
        </div>
      
    </el-card>
  </section>
</template>

<script>
import {unFollow,findPageOwn} from '@/api/follow'

export default {
  data() {
    return {
      url:'',
      tableData:[],
      pageSize:10,
      pageNum:1,
      search:''
    }
  },
  created() {
    this.url = process.env.VUE_APP_SERVER_URL
    this.fetchInfo()
  },
  methods: {
     
    fetchInfo() {
      let obj={
          pageNum:this.pageNum,
          pageSize:this.pageSize
      }
      findPageOwn(obj).then(res => {
        console.log(res)
        const { data } = res
        this.tableData = data.content
      })
    },
    handleClick(id){
        unFollow(id).then(res=>{
            this.fetchInfo()
        });
    }
    
  }
}
</script>

<style scoped>

  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
