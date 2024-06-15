package com.lbl.demo1.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName(value = "test")
public class Test {
    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;
    private String art_name;
    private String contents;
    private int love;
    private int comments;
    private int collect;
}
