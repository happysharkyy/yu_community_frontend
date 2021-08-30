<template>
  <section>
    <el-card shadow="never">
      <div slot="header">
        个人设置
      </div>
      <div class="columns">
        <div class="column is-full">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基础信息" name="first">
              <el-form :label-position="labelPosition" label-width="100px" :model="user">
                <el-form-item label="账号">
                  <el-input v-model="user.username" disabled />
                </el-form-item>
                <el-form-item label="昵称">
                  <el-input v-model="user.alias" />
                </el-form-item>
                <el-form-item label="简介">
                  <el-input v-model="user.bio" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="头像" name="second">
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                accept="image/png,image/gif,image/jpg,image/jpeg"
                :before-upload="handleBeforeUpload">
                <img v-if="this.user.avatar" :src="url+this.user.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

            </el-tab-pane>
            <el-tab-pane label="电子邮箱" name="third">
              <el-form ref="dynamicValidateForm" :model="user" label-width="100px" class="demo-dynamic">
                <el-form-item
                  prop="email"
                  label="邮箱"
                  :rules="[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                  ]"
                >
                  <el-input v-model="user.email" />
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
                  <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="手机号" name="fourth">
              <el-form ref="dynamicValidateForm" :model="user" label-width="100px" class="demo-dynamic">
                <el-form-item>
                  <el-input v-model="user.mobile" />
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
                  <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-card>
  </section>
</template>

<script>
import {getInfo, update,avatarUpdate} from '@/api/user'

export default {
  name: 'Setting',
  data() {
    return {
      activeName: 'first',
      labelPosition: 'right',
      url:'',

      user: {
        id: '',
        username: '',
        alias: '',
        bio: '',
        email: '',
        mobile: '',
        avatar: ''
      }
    }
  },
  created() {
    this.url = process.env.VUE_APP_SERVER_URL
    this.fetchInfo()
  },
  methods: {
      handleBeforeUpload (file) {
      if (!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
        this.$notify.warning({
          title: '警告',
          message: '请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片'
        })
      }
      let size = file.size / 1024 / 1024 / 2
      if (size > 2) {
        this.$notify.warning({
          title: '警告',
          message: '图片大小必须小于2M'
        })
      }
      let fd = new FormData();//通过form数据格式来传
      fd.append("picFile", file); //传文件
      avatarUpdate(this.user.username,fd).then(res => {
          console.log(res)
          this.user.avatar = res.data
              this.$notify.success({
              title: 'Info',
              message: '头像修改成功!',
              duration: 3000
          });
      })
    },
    fetchInfo() {
      getInfo(this.$route.params.username).then(res => {
        console.log(res)
        const { data } = res
        this.user = data
      })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    submitForm(formName) {
      console.log(this.user)
      update(this.user).then(res => {
        this.$message.success('信息修改成功')
        this.fetchInfo()
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
