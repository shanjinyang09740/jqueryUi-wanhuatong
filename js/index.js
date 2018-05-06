$(function(){
    //通过默认选项进行初始化
    $("#my-widget1").colorize();

    //通过两个自定义的选项进行初始化
   $("#my-widget2").colorize({
        red: 60,
        blue: 60
   }); 

   //通过自定义的green值和一个只允许颜色足够绿的随机的回调进行初始化
   $("#my-widget3").colorize({
    green: 128,
    random: function(event, ui){
      return  ui.green > 128
    }
   });

   //点击切换enabled和disabled
   $("#disable").click(function(){
    //为每个小部件使用自定义的选择器来找到所有的实例
    //所有的实例一起切换，所以我们可以从第一个开始检查状态
     if($(":custom-colorize").colorize("option", "disabled")){
        $(":custom-colorize").colorize("enable");
     }else{
        $(":custom-colorize").colorize("disable");
     }   
   });

   //点击black按钮，颜色进行初始化
   $("#black").click(function(){
    $(":custom-colorize").colorize("option", {
        red: 0,
        green: 0,
        blue: 0
    });
   });



});