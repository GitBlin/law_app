package com.lbl.demo1.Controller;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.date.Quarter;
import cn.hutool.core.date.Week;
import com.lbl.demo1.Service.*;
import com.lbl.demo1.entity.Article;
import com.lbl.demo1.entity.FeedBack;
import com.lbl.demo1.entity.User;
import com.lbl.demo1.entity.Video;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/echart")
public class EchartController {
    @Autowired
    private UserService userService;

    @Autowired
    private ArticleService articleService;

    @Autowired
    private VideoService videoService;

    @Autowired
    private FeedBackService feedBackService;

    @GetMapping("/data")
    public Map<String,Object> get(){
        Map<String,Object> map=new HashMap<>();
        map.put("x", CollUtil.newArrayList("Mon","Tue","Wes","Thu","Fri","Sat","Sun"));
        map.put("y", CollUtil.newArrayList("Mon","Tue","Wes","Thu","Fri","Sat","Sun"));
        return map;
    }
    //获取各季度用户数量
    @GetMapping("/getuser")
    public ArrayList<Integer>  statisticuser(){
        List<User> list=userService.list();
        int q1=0;
        int q2=0;
        int q3=0;
        int q4=0;
        for(User user:list){
            Date createTime=user.getCreatetime();
            Quarter quarter=DateUtil.quarterEnum(createTime);
            switch (quarter) {
                case Q1:q1 += 1;break;
                case Q2:q2 += 1;break;
                case Q3:q3 += 1;break;
                case Q4:q4 += 1;break;
                default:break;
            }
        }
        return CollUtil.newArrayList(q1,q2,q3,q4);
    }
    //获取各季度文章数量
    @GetMapping("/getarticle")
    public ArrayList<Integer>  statisticarticle(){
        List<Article> list=articleService.list();
        int q1=0;
        int q2=0;
        int q3=0;
        int q4=0;
        for(Article article:list){
            Date createTime=article.getCreatetime();
            Quarter quarter=DateUtil.quarterEnum(createTime);
            switch (quarter) {
                case Q1:q1 += 1;break;
                case Q2:q2 += 1;break;
                case Q3:q3 += 1;break;
                case Q4:q4 += 1;break;
                default:break;
            }
        }
        return CollUtil.newArrayList(q1,q2,q3,q4);
    }
    //获取各季度视频数量
    @GetMapping("/getvideo")
    public ArrayList<Integer>  statisticvideo(){
        List<Video> list=videoService.list();
        int q1=0;
        int q2=0;
        int q3=0;
        int q4=0;
        for(Video video:list){
            Date createTime=video.getCreatetime();
            Quarter quarter=DateUtil.quarterEnum(createTime);
            switch (quarter) {
                case Q1:q1 += 1;break;
                case Q2:q2 += 1;break;
                case Q3:q3 += 1;break;
                case Q4:q4 += 1;break;
                default:break;
            }
        }
        return CollUtil.newArrayList(q1,q2,q3,q4);
    }
    //获取各季度用户反馈数量
    @GetMapping("/getfeedback")
    public ArrayList<Integer>  statisticfeedback(){
        List<FeedBack> list=feedBackService.list();
        int q1=0;
        int q2=0;
        int q3=0;
        int q4=0;
        for(FeedBack feedBack:list){
            Date createTime=feedBack.getCreatetime();
            Quarter quarter=DateUtil.quarterEnum(createTime);
            switch (quarter) {
                case Q1:q1 += 1;break;
                case Q2:q2 += 1;break;
                case Q3:q3 += 1;break;
                case Q4:q4 += 1;break;
                default:break;
            }
        }
        return CollUtil.newArrayList(q1,q2,q3,q4);
    }
}
