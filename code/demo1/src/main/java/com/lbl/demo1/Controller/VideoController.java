package com.lbl.demo1.Controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.lbl.demo1.Mapper.VideoMapper;
import com.lbl.demo1.Service.VideoService;
import com.lbl.demo1.entity.Article;
import com.lbl.demo1.entity.Video;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/video")
public class VideoController {

    @Autowired
    private VideoService videoService;
    @Autowired
    private VideoMapper videoMapper;
    //插入数据或更新数据
    @PostMapping("/save")
    public Boolean save(@RequestBody Video video){

        return videoService.saveOrUpdate(video);
    }
    @GetMapping("/total")
    public Integer gettotal(){
        return videoMapper.gettotal();
    }
    //查询所有数据
    @GetMapping("/getall")
    public List<Video> get(){
        return videoService.list();
    }
    //按id查询
    @GetMapping("/getmsg")
    public Video get(@RequestParam int id){
        return videoService.getById(id);
    }
    @GetMapping("/getVcate")
    public List<Video> getVcate(@RequestParam int categoryid){
        return videoMapper.getVcategory(categoryid);
    }
    //删除数据
    @PostMapping("/delete{id}")
    public Boolean delete(@PathVariable int id){
        return videoService.removeById(id);
    }
    //分页查询
    @GetMapping("/page")
    public IPage<Video> findPage(@RequestParam Integer pageNum,
                                   @RequestParam Integer pageSize){
        IPage<Video> page=new Page<>(pageNum,pageSize);
        return videoService.page(page);
    }
    //分页搜索查询
    @GetMapping("/select")
    public IPage<Video> findArticle(@RequestParam Integer pageNum,
                                      @RequestParam Integer pageSize,
                                      @RequestParam(defaultValue = "") String title){
        IPage<Video> page=new Page<>(pageNum,pageSize);
        QueryWrapper<Video> queryWrapper=new QueryWrapper<>();
        queryWrapper.like("title",title);
        return videoService.page(page,queryWrapper);
    }

    //点击事件
    //阅读量+1
    @GetMapping("/view")
    public Boolean view(@RequestParam int id){
        Video video=videoService.getById(id);
        video.addView();
        return videoService.updateById(video);
    }
    //点赞数+1
    @GetMapping("/addlike")
    public Boolean addLike(@RequestParam int id){
        Video video=videoService.getById(id);
        video.addLike();
        return videoService.updateById(video);
    }
    //点赞数-1
    @GetMapping("/sublike")
    public Boolean subLike(@RequestParam int id){
        Video video=videoService.getById(id);
        video.subLike();
        return videoService.updateById(video);
    }
    //评论数+1
    @GetMapping("/addcomment")
    public Boolean addComment(@RequestParam int id){
        Video video=videoService.getById(id);
        video.addComment();
        return videoService.updateById(video);
    }
    //评论数-1
    @GetMapping("/subcomment")
    public Boolean subComment(@RequestParam int id){
        Video video=videoService.getById(id);
        video.subComment();
        return videoService.updateById(video);
    }
    //收藏数+1
    @GetMapping("/addstar")
    public Boolean addStar(@RequestParam int id){
        Video video=videoService.getById(id);
        video.addStars();
        return videoService.updateById(video);
    }
    //收藏数-1
    @GetMapping("/substar")
    public Boolean subStar(@RequestParam int id){
        Video video=videoService.getById(id);
        video.subStars();
        return videoService.updateById(video);
    }
}
