package com.lbl.demo1.Controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.lbl.demo1.Mapper.FeedBackMapper;
import com.lbl.demo1.Service.FavoriteService;
import com.lbl.demo1.Service.FeedBackService;
import com.lbl.demo1.entity.FeedBack;
import com.lbl.demo1.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedback")
public class FeedBackController {
    @Autowired
    private FeedBackService feedBackService;

    @Autowired
    private FeedBackMapper feedBackMapper;
    //用户添加反馈   //管理员回应用户反馈
    @PostMapping("/insert")
    public Boolean insert(@RequestBody FeedBack feedBack)
    {
        return feedBackService.saveOrUpdate(feedBack);
    }
    @PostMapping("/delete{id}")
    public Boolean delete(@PathVariable Integer id){
        return feedBackService.removeById(id);
    }
    @GetMapping("/total")
    public Integer gettotal(){
        return feedBackMapper.gettotal();
    }
    //获取用户反馈
    @GetMapping("/get")
    public List<FeedBack> get(){
        return feedBackMapper.getF();
    }

//    @PostMapping("/update")
//    public Boolean update(@RequestBody FeedBack feedBack){
//        System.out.println(feedBack);
//        return feedBackService.saveOrUpdate(feedBack);
//    }
    //用户获取
    @GetMapping("/page")
    public IPage<FeedBack> findPage(@RequestParam Integer pageNum,
                                @RequestParam Integer pageSize){
        IPage<FeedBack> page=new Page<>(pageNum,pageSize);
        return feedBackService.page(page);
    }
    //分页搜索查询
    @GetMapping("/select")
    public IPage<FeedBack> findUser(@RequestParam Integer pageNum,
                                @RequestParam Integer pageSize,
                                @RequestParam(defaultValue = "") String content){
        IPage<FeedBack> page=new Page<>(pageNum,pageSize);
        QueryWrapper<FeedBack> queryWrapper=new QueryWrapper<>();
        queryWrapper.like("content",content);
        return feedBackService.page(page,queryWrapper);
    }

}
