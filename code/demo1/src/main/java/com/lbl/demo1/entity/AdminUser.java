package com.lbl.demo1.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

@Data
@TableName(value = "admin_user")
public class AdminUser {
    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;
    private String username;
    private String account;
    private String password;
    private String avatar;
    private Date createtime;
}
