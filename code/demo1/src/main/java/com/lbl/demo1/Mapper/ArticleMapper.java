package com.lbl.demo1.Mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.lbl.demo1.entity.Article;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface ArticleMapper extends BaseMapper<Article> {
    @Select("select * from article where category=#{categoryid}")
    List<Article> getAcategory(Integer categoryid);

    @Select("select count(*) from article")
    Integer gettotal();
}
