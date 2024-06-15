package com.lbl.demo1.Mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.lbl.demo1.entity.Article;
import com.lbl.demo1.entity.Collection;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface CollectionMapper extends BaseMapper<Collection> {
    @Select("with aid(value) as\n" +
            "    (select articleid\n" +
            "\t\t from collection\n" +
            "\t\t where userid=#{id})\n" +
            "select id,title,description,image,category,views,likes,stars,createtime\n" +
            "from article,aid\n" +
            "where article.id=aid.value")
    List<Article> getMsgArticle(String id);
    @Select("select count(*) from collection where userid=#{id} and articleid>0")
    Integer getTotalArticle(String id);

    @Select("with vid(value) as\n" +
            "    (select videoid\n" +
            "\t\t from collection\n" +
            "\t\t where userid=#{id})\n" +
            "select id,title,description,image,category,views,likes,stars,createtime\n" +
            "from video,vid\n" +
            "where video.id=vid.value")
    List<Article> getMsgVideo(String id);
    @Select("select count(*) from collection where userid=#{id} and videoid>0")
    Integer getTotalVideo(String id);

    @Delete("delete from collection where userid=#{userid} and articleid=#{id}")
    Boolean deleteA(String userid,Integer id);
    @Delete("delete from collection where userid=#{userid} and videoid=#{id}")
    Boolean deleteV(String userid,Integer id);

    @Select("select * from collection where userid=#{userid} and articleid=#{id}")
    Boolean judgeA(String userid,Integer id);
    @Select("select * from collection where userid=#{userid} and videoid=#{id}")
    Boolean judgeV(String userid,Integer id);

}
