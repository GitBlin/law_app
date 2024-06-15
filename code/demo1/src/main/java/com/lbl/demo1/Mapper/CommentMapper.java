package com.lbl.demo1.Mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.lbl.demo1.Mapper.Uto.GetCom;
import com.lbl.demo1.entity.Comment;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface CommentMapper extends BaseMapper<Comment> {
    @Select("select applet_user.openid,nickname,avatar,content,comment.updatetime\n" +
            "from applet_user join comment\n" +
            "where articleid=#{id} and applet_user.openid = comment.userid;")
    List<GetCom> getAC(Integer id);


    @Select("select applet_user.openid,nickname,avatar,content,comment.updatetime\n" +
            "from applet_user join comment\n" +
            "where videoid=#{id} and applet_user.openid=comment.userid;")
    List<GetCom> getVC(Integer id);

    @Select("select count(*) from comment where articleid=#{id}")
    Integer getATotal(Integer id);
    @Select("select count(*) from comment where videoid=#{id}")
    Integer getVTotal(Integer id);

    @Delete("delete from comment where userid=#{userid} and articleid=#{id}")
    Boolean deleteAC(Integer userid,Integer id);
    @Delete("delete from comment where userid=#{userid} and videoid=#{id}")
    Boolean deleteVC(Integer userid,Integer id);
}
