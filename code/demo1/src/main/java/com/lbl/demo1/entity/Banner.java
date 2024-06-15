package com.lbl.demo1.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("banner")
public class Banner {
    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;
    private String title;
    private String url;
    private String createtime;
}
