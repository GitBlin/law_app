package com.lbl.demo1.Service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lbl.demo1.Mapper.CollectionMapper;
import com.lbl.demo1.entity.Collection;
import org.springframework.stereotype.Service;

@Service
public class CollectionService extends ServiceImpl<CollectionMapper, Collection> {
}
