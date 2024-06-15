package com.lbl.demo1.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

@Data
@TableName(value = "video")
public class Video {
    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;
    private String title;
    private String description;
    private String url;
    private String image;
    private int category;
    private int status;
    private int views;
    private int likes;
    private int comments;
    private int stars;
    private Date createtime;
    private String updatetime;
    public void addView(){
        this.views++;
    }
    public void addLike(){
        this.likes++;
    }
    public void subLike(){
        if(this.likes>0){
            this.likes--;
        }
    }
    public void addComment(){
        this.comments++;
    }
    public void subComment(){
        if(this.comments>0){
            this.comments--;
        }
    }
    public void addStars(){
        this.stars++;
    }
    public void subStars(){
        if(this.stars>0){
            this.stars--;
        }
    }
}
