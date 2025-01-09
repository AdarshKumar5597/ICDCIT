package com.healthcare.healthcare.controller;

import com.healthcare.healthcare.model.Users;
import com.healthcare.healthcare.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/user-detail/{userId}")
    public ResponseEntity<Users> getUserById(@PathVariable Long userId) {
        try {
            return userService.getUserById(userId);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
