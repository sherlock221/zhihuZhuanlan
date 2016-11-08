//index.js
//获取应用实例

import API  from "../../data/api";

Page({
  data: { 
    columnInfo : {},
    barInfo : {
      newPost : {"name" : '最新文章'}
    },
    postList : []
  },
  

  onLoad: function (query) {
    this.query = query;
    this.loadColumn();
    this.loadPosts();
    
  }, 
   
  onReady : function(){
    console.log("ready.. column");

  },
  
  onForwardPostDetail : function(e){
      wx.navigateTo({
        url : "../detail/detail?slug="+e.currentTarget.dataset.slug
      });
  },

  loadColumn : function(){
      //获得栏目信息
      API.getColumnsBySlug(this.query.slug)
        .then((res)=>{
            let data = res.data;
            if(data.avatar){
              data.avatar.src = data.avatar.template.replace("{id}_{size}",data.avatar.id+"_xl");
            }     
            this.setData({
              columnInfo : data
            });
        });

  },

  loadPosts : function(){
    let Config = getApp().Config;
      //获得专栏文章内容  
      API.getPostsBySlug(this.query.slug,Config.COLUMN.POST.LIMIT,Config.COLUMN.POST.OFFSET)
        .then((res)=>{
                console.log("res- POST>",res);
                let result  = res.data.map((obj)=>{
                    let date = new Date(obj.publishedTime);
                    obj.publishedTime = `${date.getMonth()+1}月${date.getDate()}日`;
                    if(obj.content.length > 100) obj.content = obj.content.substring(0,100);
                    return obj;
                });
                this.setData({
                  postList : result
                });
          });  
    
  }
})
