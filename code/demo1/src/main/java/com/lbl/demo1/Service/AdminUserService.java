package com.lbl.demo1.Service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lbl.demo1.Mapper.AdminUserMapper;
import com.lbl.demo1.entity.AdminUser;
import org.springframework.stereotype.Service;

@Service
public class AdminUserService extends ServiceImpl<AdminUserMapper,AdminUser> {
}
