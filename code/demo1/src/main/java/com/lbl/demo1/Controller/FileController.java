package com.lbl.demo1.Controller;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.IdUtil;
import com.lbl.demo1.Service.FileService;
import com.lbl.demo1.entity.Files;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;


@RestController
@RequestMapping("/file")
public class FileController {


    @Autowired
    private FileService fileService;
    @Value("${files.upload.path}")
    private String fileUploadPath;
    @PostMapping("/upload")
    public String upload(@RequestParam MultipartFile file) throws IOException {
       String originalFilename=file.getOriginalFilename();
       String type= FileUtil.extName(originalFilename);
       long size=file.getSize();

       //存储到磁盘
       File uploadParentFile=new File(fileUploadPath);
       //判断文件存储目录是否存在，不存在则新建一个
       if(!uploadParentFile.exists()){
           uploadParentFile.mkdirs();
       }
       //定义文件的标识码
        String uuid= IdUtil.fastSimpleUUID();

       String fileUUID=uuid+"."+type;
        File uploadFile=new File(fileUploadPath+fileUUID);

        //存储到磁盘
        file.transferTo(uploadFile);
        String Url="http://localhost:9090/file/"+fileUUID;
        //存储到数据库
        Files saveFile=new Files();
        saveFile.setName(originalFilename);
        saveFile.setSize(size/1024);
        saveFile.setType(type);
        saveFile.setUrl(Url);
        fileService.save(saveFile);
        return Url;
    }

    @GetMapping("{fileUUID}")
    public void download(@PathVariable String fileUUID, HttpServletResponse response) throws  IOException{
        //根据标识码获取文件
        File uploadFile=new File(fileUploadPath+fileUUID);
        //设置输出流格式
        ServletOutputStream os=response.getOutputStream();
        response.addHeader("Content-Disposition","attachment;filename="+ URLEncoder.encode(fileUUID,"UTF-8"));
        response.setContentType("application/octet-stream");
        //读取文件字节流
        os.write(FileUtil.readBytes(uploadFile));
        os.flush();
        os.close();
    }
}
