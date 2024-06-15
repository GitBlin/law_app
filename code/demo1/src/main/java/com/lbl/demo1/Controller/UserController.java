package com.lbl.demo1.Controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.lbl.demo1.Mapper.UserMapper;
import com.lbl.demo1.Service.UserService;
import com.lbl.demo1.entity.AdminUser;
import com.lbl.demo1.entity.User;
import com.lbl.demo1.entity.Video;
import org.apache.catalina.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import static com.baomidou.mybatisplus.extension.toolkit.Db.getOne;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserMapper userMapper;

    @PostMapping("/insert")
    public Boolean insert(@RequestBody User user){
        return userService.save(user);
    }
    @GetMapping("/total")
    public Integer gettotal(){
        return userMapper.gettotal();
    }
    @GetMapping("/get")
    public User getMsg(@RequestParam String openid){
        return userMapper.getMsg(openid);
    }

    @PostMapping("/update")
    public Boolean updateMsg(@RequestBody User user){
        return userService.updateById(user);
    }

    @GetMapping("/page")
    public IPage<User> findPage(@RequestParam Integer pageNum,
                                 @RequestParam Integer pageSize){
        IPage<User> page=new Page<>(pageNum,pageSize);
        return userService.page(page);
    }
    //分页搜索查询
    @GetMapping("/select")
    public IPage<User> findUser(@RequestParam Integer pageNum,
                                @RequestParam Integer pageSize,
                                @RequestParam(defaultValue = "") String nickname){
        IPage<User> page=new Page<>(pageNum,pageSize);
        QueryWrapper<User> queryWrapper=new QueryWrapper<>();
        queryWrapper.like("nickname",nickname);
        return userService.page(page,queryWrapper);
    }
}
