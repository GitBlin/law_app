package com.lbl.demo1.Mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.lbl.demo1.entity.FeedBack;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface FeedBackMapper extends BaseMapper<FeedBack> {

    @Select("select * from feedback where response=0")
    List<FeedBack> getF();
    @Select("select count(*) from feedback")
    Integer gettotal();
}
