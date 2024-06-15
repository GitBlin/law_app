package com.lbl.demo1.Controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.lbl.demo1.Mapper.ArticleMapper;
import com.lbl.demo1.Service.ArticleService;
import com.lbl.demo1.entity.Article;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/article")
public class ArticleController {

    @Autowired
    private ArticleService articleService;
    @Autowired
    private ArticleMapper articleMapper;
//    @Autowired
//    private ArticleController articleController;

    //插入数据h或更新数据
    @PostMapping("/save")
    public Boolean save(@RequestBody Article article){

        return articleService.saveOrUpdate(article);
    }
    @GetMapping("/total")
    public Integer gettotal(){
        return articleMapper.gettotal();
    }
    //查询所有数据
    @GetMapping("/getall")
    public List<Article> getAll(){
        return articleService.list();
    }
    //按id查询
    @GetMapping("/getmsg")
    public Article getMsg(@RequestParam int id){
//        articleController.view(id);
        return articleService.getById(id);
    }
    //查询不同类别的文章
    @GetMapping("/getAcate")
    public List<Article> getAcate(@RequestParam int categoryid){
        return articleMapper.getAcategory(categoryid);
    }
    //删除数据
    @PostMapping("/delete{id}")
    public Boolean delete(@PathVariable int id){
        return articleService.removeById(id);
    }

    //分页查询
    @GetMapping("/page")
    public IPage<Article> findPage(@RequestParam Integer pageNum,
                                   @RequestParam Integer pageSize){
        IPage<Article> page=new Page<>(pageNum,pageSize);
        return articleService.page(page);
    }
    //按标题分页搜索
    @GetMapping("/select")
    public IPage<Article> findArticle(@RequestParam Integer pageNum,
                                      @RequestParam Integer pageSize,
                                      @RequestParam(defaultValue = "") String title){
        IPage<Article> page=new Page<>(pageNum,pageSize);
        QueryWrapper<Article> queryWrapper=new QueryWrapper<>();
        queryWrapper.like("title",title);
        return articleService.page(page,queryWrapper);
    }
    //点击事件
    //阅读量+1
    @GetMapping("/view")
    public Boolean view(@RequestParam int id){
        Article article=articleService.getById(id);
        article.addView();
        return articleService.updateById(article);
    }
    //点赞数+1
    @GetMapping("/addlike")
    public Boolean addLike(@RequestParam int id){
        Article article=articleService.getById(id);
        article.addLike();
        return articleService.updateById(article);
    }
    //点赞数-1
    @GetMapping("/sublike")
    public Boolean subLike(@RequestParam int id){
        Article article=articleService.getById(id);
        article.subLike();
        return articleService.updateById(article);
    }
    //评论数+1
    @GetMapping("/addcomment")
    public Boolean addComment(@RequestParam int id){
        Article article=articleService.getById(id);
        article.addComment();
        return articleService.updateById(article);
    }
    //评论数-1
    @GetMapping("/subcomment")
    public Boolean subComment(@RequestParam int id){
        Article article=articleService.getById(id);
        article.subComment();
        return articleService.updateById(article);
    }
    //收藏数+1
    @GetMapping("/addstar")
    public Boolean addStar(@RequestParam int id){
        Article article=articleService.getById(id);
        article.addStars();
        return articleService.updateById(article);
    }
    //收藏数-1
    @GetMapping("/substar")
    public Boolean subStar(@RequestParam int id){
        Article article=articleService.getById(id);
        article.subStars();
        return articleService.updateById(article);
    }
}
