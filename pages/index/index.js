//index.js
//获取应用实例

import trendingUtil from "../../utils/trending/trendingRepoModel";
import API  from "../../data/api";

Page({
  data: {
    columnList : [],
    postList : [],
    barInfo : {
      column : {"name" : '专栏·发现'},
      post   : {"name" : "文章·发现"}
    }
  },
  

  onLoad: function () {
    var that = this; 

    this.loadPost();
    this.loadColumn();

  }, 
   
  onReady : function(){
    console.log("ready..");
  
  },

  //下拉刷新
  onPullDownRefresh : function(){
      setTimeout(()=>{
         wx.stopPullDownRefresh();
      },2000);
  },
  
   //事件处理函数
  onChangeData: function(event) {
   let type = event.target.dataset.btnType;
   switch(type){
     case "column":
        this.loadColumn();
        break;
      case "post":
        this.loadPost();
        break;
        default:
      break;
   }
  },
 
  onForwardColumn : function(event){ 
      wx.navigateTo({
        url : "../column/column?slug="+ event.currentTarget.dataset.slug
      });
  },


  loadColumn : function(){
     let Config = getApp().Config;
//获得推荐栏目列表
    API.getRecommendColumns(Config.HOME.COLUMN.LIMIT,Config.HOME.COLUMN.OFFSET)
      .then((res)=>{
               console.log("res->",res);
               let data = res.data.map((d)=>{
                  d.avatar.src = d.avatar.template.replace("{id}_{size}",d.avatar.id+"_xl");
                  return d;
              });
              

              console.log("渲染数据..",data);
              this.setData({
                "columnList": data
              });
                
        });  

  },

  loadPost : function(){
  let Config = getApp().Config;
    //获得推荐文章列表    
    API.getRecommendPosts(Config.HOME.POST.LIMIT,Config.HOME.POST.OFFSET)
      .then((res)=>{
              console.log("res- POST>",res);
              this.setData({
                postList : res.data
              });
        });  
    
  }
})
