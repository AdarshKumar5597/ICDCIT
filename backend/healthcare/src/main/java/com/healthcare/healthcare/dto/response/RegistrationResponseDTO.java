package com.healthcare.healthcare.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegistrationResponseDTO {
    private Boolean success;
    private String message;
    private String doctorRegistrationUrl;
    private Long userId;
    private String photoUploadUrl;
}
