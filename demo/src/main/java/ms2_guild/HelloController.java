package ms2_guild;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController{
    @RequestMapping("/")
    @ResponseBody
    public String index(){
        return "Hello, Spring";
    }
    @RequestMapping("/test")
    public String hello(){
        return "Hello?";
    }
    @RequestMapping("/index.jsp")
    public String index_homepage(){
        return "Index Page";
    }
}