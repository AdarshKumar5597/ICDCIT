package com.healthcare.healthcare.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class GeminiApiService {
    public boolean verifyCertificate(MultipartFile certificate) {
        return true;
    }
}
