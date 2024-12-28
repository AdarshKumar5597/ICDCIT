package com.healthcare.healthcare.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginRequestDTO {
    public String email;
    public String password;
    public String token;
}
