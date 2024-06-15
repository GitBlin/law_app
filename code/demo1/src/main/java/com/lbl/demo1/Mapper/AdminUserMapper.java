package com.lbl.demo1.Mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.lbl.demo1.entity.AdminUser;
import org.apache.ibatis.annotations.Select;

public interface AdminUserMapper extends BaseMapper<AdminUser> {
    @Select("select password from admin_user where account=#{account}")
    String findpassword(String account);

    @Select("select * from admin_user where account=#{account}")
    AdminUser getAdminMsg(String account);
}
