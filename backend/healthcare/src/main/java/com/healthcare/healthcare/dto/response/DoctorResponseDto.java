package com.healthcare.healthcare.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class DoctorResponseDto {
    private Long userId;
    private String firstName;
    private String lastName;
    private String userName;
    private String email;
    private String password;
    private String role;  // Adjust roles based on your actual enum values
    private byte[] profileImage;  // To handle binary data for images
    private String bio;
    private Date createdAt;  // Date as string in ISO format
    private Double rating;
    private Integer reviewCount;
    private Long doctorId;
}
