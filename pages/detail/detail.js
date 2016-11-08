//index.js
//获取应用实例

import API  from "../../data/api";

Page({
  data: { 
    commentList : {},
    barInfo : {
      comment : {"name" : '最新文章'},
      recommend : {"name" : "推荐阅读"}
    },
    detail : {}
  },
  

  onLoad: function (query) {
    this.query = query;
    this.loadDetail();

  }, 
   
  onReady : function(){

  },
  
  onForwardColumn : function(){
      wx.navigateTo({
        url : "../column/column"
      });
  },

  loadDetail : function(){
    let Config = getApp().Config;
      //获得文章详情  
      API.getPostDetailBySlug(this.query.slug)
        .then((res)=>{
                console.log("res- POST>",res);            
                this.setData({
                  detail : res.data
                });
          });  
    
  },

  loadComment : function(){
    //获得文章评论
      API.getPostCommentsBySlug(this.query.slug,Config.POST_DETAIL.COMMENT.LIMIT)
        .then((res)=>{
                console.log("res- POST>",res);
                this.setData({
                  commentList : res.data
                });
          });  

  }
  
})
