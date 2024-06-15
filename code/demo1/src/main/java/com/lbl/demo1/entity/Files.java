package com.lbl.demo1.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("file")
public class Files {
    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;
    private String name;
    private String type;
    private long size;
    private String url;
}
