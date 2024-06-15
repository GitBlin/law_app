package com.lbl.demo1.Service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lbl.demo1.Mapper.BannerMapper;
import com.lbl.demo1.entity.Banner;
import org.springframework.stereotype.Service;

@Service
public class BannerService extends ServiceImpl<BannerMapper, Banner> {
}
