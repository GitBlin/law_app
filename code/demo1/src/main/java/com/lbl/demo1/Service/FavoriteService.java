package com.lbl.demo1.Service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lbl.demo1.Mapper.FavoriteMapper;
import com.lbl.demo1.entity.Favorite;
import org.springframework.stereotype.Service;

@Service
public class FavoriteService extends ServiceImpl<FavoriteMapper, Favorite> {
}
