//index.js
//获取应用实例

import API  from "../../data/api";

Page({
  data: { 
    barInfo : {
      newPost : {"name" : '最新文章'}
    },
    postList : []
  },
  

  onLoad: function () {
    var that = this; 
    this.loadPost();
  }, 
   
  onReady : function(){
    console.log("ready.. column");

  },
  
  onForwardColumn : function(){
      wx.navigateTo({
        url : "../column/column"
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
