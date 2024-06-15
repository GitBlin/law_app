package com.lbl.demo1.Controller;

import com.lbl.demo1.Mapper.CollectionMapper;
import com.lbl.demo1.Service.ArticleService;
import com.lbl.demo1.Service.CollectionService;
import com.lbl.demo1.Service.VideoService;
import com.lbl.demo1.entity.Article;
import com.lbl.demo1.entity.Collection;
import com.lbl.demo1.entity.Video;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/collection")
public class CollectionController {
    @Autowired
    private CollectionService collectionService;
    @Autowired
    private CollectionMapper collectionMapper;
    @Autowired
    private ArticleService articleService;
    @Autowired
    private VideoService videoService;


    //判断用户是否收藏该文章或视频
    @GetMapping("/judge")
    public Boolean judge(@RequestParam String userid,@RequestParam Integer id,@RequestParam Integer sort){
        if(sort==0){
            if(collectionMapper.judgeA(userid,id)==null){
                return false;
            }
            return collectionMapper.judgeA(userid,id);
        } else {
            if(collectionMapper.judgeV(userid,id)==null){
                return false;
            }
            return collectionMapper.judgeV(userid,id);
        }
    }

    //获取用户文章收藏列表
    @GetMapping("/getas")
    public Map<String, Object> getArticle(@RequestParam String id) {
        Integer total = collectionMapper.getTotalArticle(id);
        Map<String, Object> res = new HashMap<>();
        res.put("data", collectionMapper.getMsgArticle(id));
        res.put("total", total);
        return res;
    }
    //获取用户视频收藏列表
    @GetMapping("/getvs")
    public Map<String, Object> getVideo(@RequestParam String id){
        Integer total=collectionMapper.getTotalVideo(id);
        Map<String,Object> res=new HashMap<>();
        res.put("data",collectionMapper.getMsgVideo(id));
        res.put("total",total);
        return res;
    }
    //添加收藏
    @PostMapping("/insert")
    public Boolean insert(@RequestBody Collection collection){
        if(collection.getSort()==0){
            Article article=articleService.getById(collection.getArticleid());
            article.addStars();
            if(collectionService.save(collection)){
                articleService.updateById(article);
                return true;
            }
        } else {
                Video video=videoService.getById(collection.getVideoid());
                video.addStars();
            if(collectionService.save(collection)){
                videoService.updateById(video);
                return true;
            }
        }
        return false;
    }
    //取消收藏
    @GetMapping("/delete")
    public Boolean delete(@RequestParam String userid,@RequestParam Integer id,@RequestParam Integer sort){
        if(sort==0){
            Article article=articleService.getById(id);
            article.subStars();
            if(collectionMapper.deleteA(userid,id)){
                articleService.updateById(article);
                return true;
            }
        } else {
            Video video=videoService.getById(id);
            video.subStars();
            if(collectionMapper.deleteV(userid,id)){
                videoService.updateById(video);
                return true;
            }
        }
        return false;
    }
}
