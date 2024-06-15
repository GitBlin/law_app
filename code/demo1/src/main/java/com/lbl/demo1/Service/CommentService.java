package com.lbl.demo1.Service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lbl.demo1.Mapper.CommentMapper;
import com.lbl.demo1.entity.Comment;
import org.springframework.stereotype.Service;

@Service
public class CommentService extends ServiceImpl<CommentMapper, Comment> {
}
