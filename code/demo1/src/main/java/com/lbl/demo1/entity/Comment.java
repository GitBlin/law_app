package com.lbl.demo1.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName(value = "comment")
public class Comment {
    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;
    private String userid;
    private String content;
    private int articleid;
    private int videoid;
    private int sort;
}
