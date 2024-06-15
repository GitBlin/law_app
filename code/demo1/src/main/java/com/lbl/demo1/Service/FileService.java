package com.lbl.demo1.Service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lbl.demo1.Mapper.FileMapper;
import com.lbl.demo1.entity.Files;
import org.springframework.stereotype.Service;

@Service
public class FileService extends ServiceImpl<FileMapper, Files> {
}
