<template>
  <div>
  <transition name="el-zoom-in-center">
<div v-if="records.length==0" class="demo-basic--circle">
          暂无数据
</div>
<div  v-else>
  <div  v-for="record in  records" :key="record.id" v-show="show" class="transition-box" >

    <div class="demo-basic--circle" style="float:left">
        <div class="block"><el-avatar :size="50" :src="url+record.fromUser.avatar"  style="border-radius: 5px;width: 46px; height: 46px"></el-avatar></div>
    </div>

    <div style="padding-left:60px">
      <div>
        <div style="align:left;float:left;font-size:10px;color:red;">
          {{record.fromUser.alias}}
        </div>
        <div style="text-align:right;font-size:10px;">
            {{dayjs(record.createTime).format("YYYY:MM:DD HH:MM:ss") }}
        </div>
      </div>

        <div style="margin-top:10px">
       <div style="align:left;float:left;font-size:10px;">
          <p style="font-size:10px;color:blue;"></p>{{record.content}}
        </div>
        <div style="text-align:right;font-size:10px;">
          <a @click="test(record)" class="text-primary" style="font-size:10px;color:blue">  共{{record.cal}}多少条未读</a>
        </div>
      </div>

    </div>
    

  </div>

 <div  v-show="show">
     <el-pagination
       background
      style="margin-top:50px;margin-bottom:20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.current"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>
  </div>
</div>

      </transition>
        <transition name="el-zoom-in-center">
        <div v-show="!show" >
            <el-container>
            <el-aside style="width:120px;align:left">
                
            <el-tabs  trigger="click" @tab-click="onchange" style="width:120px;margin-left:-20px" tab-position="left" lazy v-model="editableTabsValue" :closable="true"  @tab-remove="removeTab">
                    <el-tab-pane
                        v-for="item in editableTabs"
                        :key="item.toId"
                        :label="item.toUser.username"
                        :name="item.conversationId"
                    >
                    </el-tab-pane>
            </el-tabs>
            </el-aside>
        <el-container>
            <el-header style="height:30px;width:100%;">{{aisle}}</el-header>
            <el-main id="scrolldIV" style="width:100%;height:200px">
                <div   v-for="(value,key,index) in messageList" :key="index" style="height:40px">
                    <div v-if="value.fromUserDetail.username==name" style="text-align:left">
                        <el-avatar :size="20" :src="url+value.fromUserDetail.avatar"></el-avatar>
                        <el-tag  type="success" >我：{{value.msg}}</el-tag>
                    </div>
                    <div v-if="value.fromUserDetail.username!=name"  style="text-align:right">
                        <el-tag >{{value.fromUserDetail.username}}：{{value.msg}}</el-tag>
                        <el-avatar :size="20" :src="url+value.fromUserDetail.avatar"></el-avatar>
                    </div>
                    
                </div>
            </el-main>
                <el-footer style="height:40px;">
                    <div class="chatIcon" style="margin-top:10px;text-align:left;margin-left:-30px">
                        <el-popover placement="top-start" width="500" trigger="hover" class="emoBox">
                            <div class="emotionList">
                                <a href="javascript:void(0);" @click="getEmo(index)" v-for="(item,index) in faceList" :key="index" class="emotionItem">{{item}}</a>
                            </div>
                            <el-button
                            class="emotionSelect"
                            icon="el-icon-eleme"
                            slot="reference"
                            ></el-button>
                        </el-popover>
                    </div>
                </el-footer>
                
                <el-footer style="text-align:left;height:80px;margin-top:20px;margin-left:-20px" >
                    <el-input type="textarea"  v-model="textarea" id='textarea' resize="none"></el-input>
                    <el-button type="primary" style="margin-top:10px;" @click="sendMessage()">发送</el-button>
                    <el-button style="margin-top:10px;" @click="setShow()">取消</el-button>
                </el-footer>
            </el-container>
        </el-container>

        </div>
      </transition>

  </div>

 
</template>

<script>
const appData = require('@/assets/emoji.json')
import { getList,getHistory} from '@/api/message'
import { chatList,remove} from '@/api/chatList'


export default {
  name: 'YuUserMessage',
    props: {
    records: {
      type: Array,
      required: true
    },
    user: {
      type: '',
      defalut:{},
      required: true
    },
    page: {
      type: '',
      defalut:{},
      required: true
    }

  },
  data(){
    return{
      url:'',
      total:0,
      pageSize:10,
      pageNum:1,
      all: require('@/assets/image/all.png'),
      robot: require('@/assets/image/robot.png'),
      show:true,
      message: [],
      name: "", // 昵称
      websocket: null, // WebSocket对象
      aisle: "", // 对方频道号
      messageList: [], // 消息列表
      textarea: "",
      conversationId:'',
      count:1,
      userId:'',
      faceList: [],
      messagefirst:{},
      editableTabsValue: '',
      editableTabs: [],
      tabIndex: 2
    }
  },
 mounted() {

    for(let i in appData){
      this.faceList.push(appData[i].char);
    }
 },
  
  created() {
    this.url = process.env.VUE_APP_SERVER_URL
  },
  methods:{

       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    removeTab(val) {
        
        console.log(val)
        console.log(this.editableTabs)
        let activeName = this.editableTabsValue;//conversationId
        console.log(activeName)
        if (activeName === val) {
          this.editableTabs.forEach((tab, index) => {
             
            if (tab.conversationId === val) {
              
              remove(tab.id).then(res=>{    
                  alert('移除会话成功')
              })
              let nextTab = this.editableTabs[index + 1] || this.editableTabs[index - 1];
              if (nextTab) {
                activeName = nextTab.conversationId;
              }
            }
          });
          //this.editableTabsValue = activeName;
        this.editableTabs = this.editableTabs.filter(tab => tab.conversationId !== val);
        }else{
            this.editableTabs.forEach((tab, index) => {
             
                if (tab.conversationId === val) {
                    remove(tab.id).then(res=>{    
                        alert('移除会话成功')
                    })
                }
                //this.editableTabsValue = activeName;
                this.editableTabs = this.editableTabs.filter(tab => tab.conversationId !== val);
            });
        }
        
        
    },
    async onchange(){
        console.log(this.editableTabsValue)
        await getHistory(this.editableTabsValue,this.userId).then(res => {
            if(res.code!=200){
                alert('获取聊天记录失败')
            }else{
                console.log(res.data)
                this.messageList= res.data
                this.editableTabs.forEach((tab, index) => {
                    if(tab.conversationId == this.editableTabsValue){
                         this.aisle =tab.toUser.alias
                    }
                })
               
                console.log(res.data)
            }
         
      })
        var div = document.getElementById('scrolldIV');
        div.scrollTop = div.scrollHeight;
    },
    test(record){
      this.show = false
      this.conversationId = record.conversationId
      this.aisle = record.fromUser.alias
      this.userId = record.toUser.id
      if(this.count==1){
        this.conectWebSocket();
      }
      this.count++
      
      this.getChatList();
      this.getHistoryMessage(); 
    },
    getChatList(){
        chatList(this.userId).then(res=>{
            if(res.code!=200){
                alert('获取会话列表失败')
            }else{
                console.log(res)
                this.editableTabs = res.data
                this.editableTabsValue =  this.editableTabs[0].conversationId
            }
            
        })
    },
    getHistoryMessage(){
        getHistory(this.conversationId,this.userId).then(res => {
            if(res.code!=200){
                alert('获取聊天记录失败')
            }else{
                this.messageList= res.data
                console.log(res.data)
                var div = document.getElementById('scrolldIV');
                div.scrollTop = div.scrollHeight;
            }
         
      })
    },
    conectWebSocket: function() {
        this.name = this.user.alias
        //判断当前浏览器是否支持WebSocket
        if ("WebSocket" in window) {
          this.websocket = new WebSocket(
            "ws://localhost:8088/websocket/"+this.name
          );
        } else {
          alert("不支持建立socket连接");
        }
        //连接发生错误的回调方法
        this.websocket.onerror = function() {
          
        };
        //连接成功建立的回调方法
        this.websocket.onopen = function(event) {
          
        };
        //接收到消息的回调方法
        var that = this;
        this.websocket.onmessage = function(event) {
          console.log(event); 
          var object = eval("(" + event.data + ")");
          console.log(object);
          if (object.type == 0) {
            // 提示连接成功
             console.log("连接成功");
            that.showInfo(object.people, object.aisle);
          }
          if (object.type == 1) {
            //显示消息
            console.log("接受消息");
            that.messageList.push(object);

          }
        };
        //连接关闭的回调方法
        this.websocket.onclose = function() {};
        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function() {
          this.websocket.close();
        };
    },
    
    // 发送消息
    sendMessage: function() {
      var socketMsg = { msg: this.textarea, toUser: this.aisle,fromUser:this.name};
      if (this.aisle == "") {
        //群聊.
        socketMsg.type = 0;
      } else {
        //单聊.
        socketMsg.type = 1;
      }
      this.websocket.send(JSON.stringify(socketMsg));
    },
    showInfo: function(people, aisle) {
    const h = this.$createElement;
      this.$notify({
        title: "当前在线人数：" + people,
        message: h('i', { style: 'color: teal'},"您的频道号：" + aisle),
        duration: 3000
      });
    },
      getEmo(index){
          
        var textArea=document.getElementById('textarea');
        function changeSelectedText(obj, str) {
          if (window.getSelection) {
            // 非IE浏览器
            textArea.setRangeText(str);
            // 在未选中文本的情况下，重新设置光标位置
            textArea.selectionStart += str.length;
            textArea.focus()
          } else if (document.selection) {
            // IE浏览器
            obj.focus();
            var sel = document.selection.createRange();
            sel.text = str;
          }
        }
        changeSelectedText(textArea,this.faceList[index]);
        this.textarea=textArea.value;// 要同步data中的数据
        // console.log(this.faceList[index]);
        return;
      },


    setShow(){
       this.show = true
    },


       
    },
  computed: {
         
      }
    
    
}
</script>

<style lang="scss" scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.transition-box {
    margin-bottom: 10px;
    width: 500px;
    height: 100px;
    border-radius: 4px;
    background-color: #d1b7bd;
    text-align: center;
    color: #fff;
    padding: 25px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
 .el-popover{
    height:200px;
    width:400px;
    overflow: scroll;
    overflow-x:auto;
  }
.chatIcon {
  padding: 0 10px;
  font-size: 25px;
}
.emotionList{
  display: flex;
  flex-wrap: wrap;
  padding:5px;
}
.emotionItem{
  width:10%;
  font-size:20px;
  text-align:center;
}
/*包含以下四种的链接*/
.emotionItem {
    text-decoration: none;
}
/*正常的未被访问过的链接*/
.emotionItem:link {
    text-decoration: none;
}
/*已经访问过的链接*/
.emotionItem:visited {
    text-decoration: none;
}
/*鼠标划过(停留)的链接*/
.emotionItem:hover {
    text-decoration: none;
}
/* 正在点击的链接*/
.emotionItem:active {
    text-decoration: none;
}
 .el-header{
    background-color: #278dc1;
    color: #333;
    text-align: center;
    line-height: 30px;
 }
 .el-footer {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 30px;
  }
  
  .el-aside {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
