package com.lbl.demo1.Service;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lbl.demo1.Mapper.VideoMapper;
import com.lbl.demo1.entity.Video;
import org.springframework.stereotype.Service;

@Service
public class VideoService extends ServiceImpl<VideoMapper, Video> {
}
