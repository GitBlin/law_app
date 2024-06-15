package com.lbl.demo1.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

@Data
@TableName(value = "applet_user")
public class User {
    @TableId(value = "openid",type = IdType.AUTO)
    private String openid;
    private String nickname;
    private String avatar;
    private int gender;

    private Date createtime;
}
