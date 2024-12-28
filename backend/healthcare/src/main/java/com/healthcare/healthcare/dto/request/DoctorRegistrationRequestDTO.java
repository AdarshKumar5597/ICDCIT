package com.healthcare.healthcare.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorRegistrationRequestDTO {
    private Long userId;
    private byte[] certificate;
    private String bio;
    private List<String> proficiencies;
}

