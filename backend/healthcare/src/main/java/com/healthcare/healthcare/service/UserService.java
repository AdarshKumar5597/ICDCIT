package com.healthcare.healthcare.service;

import com.healthcare.healthcare.model.Users;
import com.healthcare.healthcare.repo.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private Users getUserUsingUserId(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public void saveProfilePhoto(Long userId, MultipartFile profilePhoto) throws IOException {
        Optional<Users> user = userRepository.findById(userId);

        if (user.isPresent()) {
            byte[] photoBytes = profilePhoto.getBytes();
            Users updatedUser = user.get();
            updatedUser.setProfileImage(photoBytes);
            userRepository.save(updatedUser);
        }
    }

    public ResponseEntity<Users> getUserById(Long userId) {
        try {
            Optional<Users> user = userRepository.findById(userId);
            if (user.isPresent()) {
                return new ResponseEntity<>(user.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
