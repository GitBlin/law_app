package com.lbl.demo1.Service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lbl.demo1.Mapper.FeedBackMapper;
import com.lbl.demo1.entity.FeedBack;
import org.springframework.stereotype.Service;

@Service
public class FeedBackService extends ServiceImpl<FeedBackMapper, FeedBack> {
}
