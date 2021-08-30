<template>
  <div class="columns">
    <div class="column is-full">
      <el-card
        class="box-card"
        shadow="never"
      >
        <div
          slot="header"
          class="clearfix"
        >
          <span><i class="fa fa fa-book"> 合辑 / 创建合辑</i></span>
        </div>
        <div>
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            class="demo-ruleForm"
          >
            <el-form-item prop="title">
              <el-input
                v-model="ruleForm.title"
                placeholder="输入合辑名称"
              />
            </el-form-item>

            <!--Markdown-->
            <div id="vditor" />

            <b-taginput
              v-model="ruleForm.tags"
              class="my-3"
              maxlength="15"
              maxtags="3"
              ellipsis
              placeholder="请输入合辑标签，限制为 15 个字符和 3 个标签"
            />
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                accept="image/png,image/gif,image/jpg,image/jpeg"
                :before-upload="handleBeforeUpload">
                <img v-if="ruleForm.img" :src="url+ruleForm.img" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('ruleForm')"
              >立即创建
              </el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>

            
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { series } from '@/api/series'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import {upload} from '@/api/upload'
export default {
  name: 'TopicPost',

  data() {
    return {
      contentEditor: {},
      img:'',
      url:'',
      ruleForm: {
        title: '', // 标题
        img:'',
        tags: [], // 标签
        content: '' // 内容
      },
      rules: {
        title: [
          { required: true, message: '请输入话题名称', trigger: 'blur' },
          {
            min: 1,
            max: 25,
            message: '长度在 1 到 25 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created(){
    this.url = process.env.VUE_APP_SERVER_URL
  },
  mounted() {
    let _this = this
    _this.contentEditor = new Vditor('vditor', {
      height: 500,
      placeholder: '此处为话题内容……',
      theme: 'classic',
      counter: {
        enable: true,
        type: 'markdown'
      },
      preview: {
        delay: 0,
        hljs: {
          style: 'monokai',
          lineNumber: true
        }
      },
      tab: '\t',
      editorName:'contentEditor',
      typewriterMode: true,
      toolbarConfig: {
        pin: true
      },
      cache: {
        enable: false
      },
      upload:{
          accept:'image/*',
          url:'http://127.0.0.1:8000/upload/fileupload',
          filename(name) {
            return name.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g)
          },
          linkToImgCallback() {
            console.log("api处理")
          },
          success(editor, msg) {
            console.log(msg);
            _this.contentEditor.insertValue('[![]('+process.env.VUE_APP_SERVER_URL+msg+')]('+process.env.VUE_APP_SERVER_URL+msg+')');
            return true
          },
          error(msg) {
            console.log(msg+"上传失败了")
          }
       },
      mode: 'wysiwyg'
    })
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
      upload(fd).then(res => {
          console.log(res)
          this.ruleForm.img = res.data
              this.$notify.success({
              title: 'Info',
              message: '封面上传成功!',
              duration: 3000
          });
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (
            this.contentEditor.getValue().length === 1 ||
            this.contentEditor.getValue() == null ||
            this.contentEditor.getValue() === ''
          ) {
            alert('合辑内容不可为空')
            return false
          }
          if (this.ruleForm.tags == null || this.ruleForm.tags.length === 0) {
            alert('标签不可以为空')
            return false
          }
          this.ruleForm.content = this.contentEditor.getValue()
          series(this.ruleForm).then((response) => {
            const { data } = response
            setTimeout(() => {
              this.$router.push({
                name: 'series-detail',
                params: { id: data.id }
              })
            }, 800)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.contentEditor.setValue('')
      this.ruleForm.tags = ''
    }
  }
}
</script>

<style>
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
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
