package com.taskagile.app.web.pages;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class MainController {

  @GetMapping(value = {"/", "/login"}, produces = MediaType.TEXT_PLAIN_VALUE)
  public String login() {
    System.out.println("In Entry");
    return "login";
  }

  @GetMapping(value = "/registration", produces = MediaType.TEXT_PLAIN_VALUE)
  public String registration() {
    return "registration";
  }

}
