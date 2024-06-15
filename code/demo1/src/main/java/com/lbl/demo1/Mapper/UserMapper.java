package com.lbl.demo1.Mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.lbl.demo1.entity.User;
import org.apache.ibatis.annotations.Select;

public interface UserMapper extends BaseMapper<User> {
    @Select("select * from applet_user where openid=#{id}")
    User getMsg(String id);

    @Select("select count(*) from applet_user")
    Integer gettotal();

}
