package com.lbl.demo1.Controller;
import com.lbl.demo1.Mapper.AdminUserMapper;
import com.lbl.demo1.Service.AdminUserService;
import com.lbl.demo1.entity.AdminUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/admin")
public class AdminUserController {
    @Autowired
    private AdminUserService adminUserService;
    @Autowired
    private AdminUserMapper adminUserMapper;
    @GetMapping("/getall")
    public List<AdminUser> getAll(){
        return adminUserService.list();
    }

    @GetMapping("/login")
    public AdminUser login(@RequestParam String account,@RequestParam String password){
        if(account==null||password==null){
            return null;
        } else {
            if(password.equals(adminUserMapper.findpassword(account))){
                return adminUserMapper.getAdminMsg(account);
            } else {
                return null;
            }
        }
    }


    @GetMapping("/get")
    public AdminUser getMsg(@RequestParam Integer id){
        return adminUserService.getById(id);
    }
   @PostMapping("/update")
    public Boolean updateMsg(@RequestBody AdminUser adminUser){
        return adminUserService.updateById(adminUser);
   }
}
