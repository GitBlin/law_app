package com.lbl.demo1.Controller;
import com.lbl.demo1.Mapper.CommentMapper;
import com.lbl.demo1.Service.CommentService;
import com.lbl.demo1.entity.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/comment")
public class CommentController {
    @Autowired
    private CommentService commentService;
    @Autowired
    private CommentMapper commentMapper;
    @Autowired
    private ArticleController articleController;

    @Autowired
    private VideoController videoController;

    //获取文章评论
    @GetMapping("/getac")
    public Map<String, Object> getAC(@RequestParam Integer id){
        Integer total = commentMapper.getATotal(id);
        Map<String, Object> res = new HashMap<>();
        res.put("data", commentMapper.getAC(id));
        res.put("total", total);
        return res;
    }
    //获取视频评论
    @GetMapping("/getvc")
    public Map<String, Object> getVC(@RequestParam Integer id){
        Integer total = commentMapper.getVTotal(id);
        Map<String, Object> res = new HashMap<>();
        res.put("data", commentMapper.getVC(id));
        res.put("total", total);
        return res;
    }
    //新增评论
    @PostMapping("/insert")
    public Boolean insert(@RequestBody Comment comment){
        if(comment.getSort()==0){
            if(commentService.save(comment)){
                articleController.addComment(comment.getArticleid());
                return true;
            }
        } else {
            if(commentService.save(comment)) {
                videoController.addComment(comment.getVideoid());
                return true;
            }
        }
        return false;
    }
    //删除评论
    @GetMapping("/delete")
    public Boolean delete(@RequestParam Integer userid,@RequestParam Integer id,@RequestParam Integer sort){
        if(sort==0){

            if(commentMapper.deleteAC(userid,id)){
                articleController.subComment(id);
                return true;
            }
        } else {

            if(commentMapper.deleteVC(userid,id)){
                videoController.subComment(id);
                return true;
            }
        }
        return false;
    }

}
