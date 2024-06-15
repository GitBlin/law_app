package com.lbl.demo1.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

@Data
@TableName(value = "feedback")
public class FeedBack {
    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;
    private String userid;
    private String content;
    private String image;
    private int response;
    private String rescontent;
    private Date createtime;
}
