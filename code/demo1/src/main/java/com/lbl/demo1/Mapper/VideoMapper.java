package com.lbl.demo1.Mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.lbl.demo1.entity.Article;
import com.lbl.demo1.entity.Video;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface VideoMapper extends BaseMapper<Video> {

    @Select("select * from video where category=#{categoryid}")
    List<Video> getVcategory(Integer categoryid);
    @Select("select count(*) from video")
    Integer gettotal();
}
