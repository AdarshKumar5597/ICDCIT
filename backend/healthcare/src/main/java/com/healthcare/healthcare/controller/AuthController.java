package com.healthcare.healthcare.controller;

import com.healthcare.healthcare.dto.request.DoctorRegistrationRequestDTO;
import com.healthcare.healthcare.dto.request.LoginRequestDTO;
import com.healthcare.healthcare.dto.request.RegistrationRequestDTO;
import com.healthcare.healthcare.dto.response.LoginResponseDTO;
import com.healthcare.healthcare.dto.response.RegistrationResponseDTO;
import com.healthcare.healthcare.eum.Role;
import com.healthcare.healthcare.service.UserService;
import com.healthcare.healthcare.service.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequestDTO) {
        LoginResponseDTO loginResponseDTO;
        try {
            return authService.getUserAfterLogin(loginRequestDTO);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponseDTO> registerUser(@RequestBody RegistrationRequestDTO request) {
        ResponseEntity<RegistrationResponseDTO> response;
        if (request.getRole() == Role.USER) {
            response = authService.registerNormalUser(request);
        } else if (request.getRole() == Role.DOCTOR) {
            response = authService.startDoctorRegistration(request);
        } else {
            return new ResponseEntity<RegistrationResponseDTO>(RegistrationResponseDTO
                    .builder().message("Invalid Role Selected.").success(false).build(), HttpStatus.OK);
        }
        return response;
    }

    @PostMapping("register/doctor")
    public ResponseEntity<?> completeDoctorRegistration(@RequestBody DoctorRegistrationRequestDTO request) {
        try {
            return authService.completeDoctorRegistration(request);
        } catch (Exception e) {
            return new ResponseEntity<>(RegistrationResponseDTO
                    .builder()
                    .success(false)
                    .message(e.getLocalizedMessage())
                    .build(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/upload-profile-photo/{userId}")
    public ResponseEntity<String> uploadProfilePhoto(
            @PathVariable Long userId,
            @RequestParam("profilePhoto") MultipartFile profilePhoto) {
        try {
            userService.saveProfilePhoto(userId, profilePhoto);
            return ResponseEntity.ok("Profile photo uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload profile photo: " + e.getMessage());
        }
    }

}
