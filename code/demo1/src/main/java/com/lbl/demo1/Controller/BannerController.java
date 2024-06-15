package com.lbl.demo1.Controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.lbl.demo1.Service.BannerService;
import com.lbl.demo1.entity.Banner;
import com.lbl.demo1.entity.User;
import com.lbl.demo1.entity.Video;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/banner")
public class BannerController {
    @Autowired
    private BannerService bannerService;

    @GetMapping("/getall")
    public List<Banner> getAll(){
        return bannerService.list();
    }
    @PostMapping("/save")
    public Boolean save(@RequestBody Banner banner){

        return bannerService.saveOrUpdate(banner);
    }
    @PostMapping("/delete{id}")
    public Boolean delete(@PathVariable int id){
        return bannerService.removeById(id);
    }
    @GetMapping("/page")
    public IPage<Banner> findPage(@RequestParam Integer pageNum,
                                @RequestParam Integer pageSize){
        IPage<Banner> page=new Page<>(pageNum,pageSize);
        return bannerService.page(page);
    }
    //分页搜索查询
    @GetMapping("/select")
    public IPage<Banner> findUser(@RequestParam Integer pageNum,
                                 @RequestParam Integer pageSize,
                                 @RequestParam(defaultValue = "") String title){
        IPage<Banner> page=new Page<>(pageNum,pageSize);
        QueryWrapper<Banner> queryWrapper=new QueryWrapper<>();
        queryWrapper.like("title",title);
        return bannerService.page(page,queryWrapper);
    }
}
