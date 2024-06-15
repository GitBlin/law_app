package com.lbl.demo1.Controller;

import com.lbl.demo1.Mapper.FavoriteMapper;
import com.lbl.demo1.Service.ArticleService;
import com.lbl.demo1.Service.FavoriteService;
import com.lbl.demo1.Service.VideoService;
import com.lbl.demo1.entity.Article;
import com.lbl.demo1.entity.Favorite;
import com.lbl.demo1.entity.Video;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/favorite")
public class FavoriteController {
    @Autowired
    private FavoriteService favoriteService;

    @Autowired
    private FavoriteMapper favoriteMapper;
    @Autowired
    private ArticleService articleService;
    @Autowired
    private VideoService videoService;

    //判断用户是否点赞该文章或视频
    @GetMapping("/judge")
    public Boolean judge(@RequestParam String userid, @RequestParam Integer id, @RequestParam Integer sort){
        if(sort==0){
            if(favoriteMapper.judgeA(userid,id)==null){
                return false;
            }
            return true;
        } else {
            if(favoriteMapper.judgeV(userid,id)==null){
                return false;
            }
            return true;
        }
    }


    //获取用户文章点赞列表
    @GetMapping("/getas")
    public Map<String, Object> getArticle(@RequestParam String id) {
        Integer total = favoriteMapper.getTotalArticle(id);
        Map<String, Object> res = new HashMap<>();
        res.put("data", favoriteMapper.getMsgArticle(id));
        res.put("total", total);
        return res;
    }
    //获取用户视频点赞列表
    @GetMapping("/getvs")
    public Map<String, Object> getVideo(@RequestParam String id){
        Integer total=favoriteMapper.getTotalVideo(id);
        Map<String,Object> res=new HashMap<>();
        res.put("data",favoriteMapper.getMsgVideo(id));
        res.put("total",total);
        return res;
    }

    @PostMapping("/insert")
    public Boolean insert(@RequestBody Favorite favorite){
        if(favorite.getSort()==0){
            Article article=articleService.getById(favorite.getArticleid());
            article.addLike();
            if(favoriteService.save(favorite)){
                articleService.updateById(article);
                return true;
            }
        } else {
            Video video=videoService.getById(favorite.getVideoid());
            video.addLike();
            if(favoriteService.save(favorite)){
                videoService.updateById(video);
                return true;
            }
        }
        return false;
    }
    @GetMapping("/delete")
    public Boolean delete(@RequestParam String userid,@RequestParam Integer id,@RequestParam Integer sort){
        if(sort==0){
            Article article=articleService.getById(id);
            article.subLike();
            if(favoriteMapper.deleteA(userid,id)){
                articleService.updateById(article);
                return true;
            }
        } else {
            Video video=videoService.getById(id);
            video.subLike();
            if(favoriteMapper.deleteV(userid,id)){
                videoService.updateById(video);
                return true;
            }
        }
        return false;
    }
}
