package com.lbl.demo1.Mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.lbl.demo1.entity.Test;
import org.apache.ibatis.annotations.Select;

public interface TestMapper extends BaseMapper<Test> {
    @Select("select * from test where id=#{id}")
    Test selectbyid(int id);
}
