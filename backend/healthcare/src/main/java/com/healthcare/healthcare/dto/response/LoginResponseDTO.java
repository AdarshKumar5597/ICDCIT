package com.healthcare.healthcare.dto.response;

import lombok.*;

public class LoginResponseDTO {
    private String token;
    private String message;
    private Long userId;
    private String role;
    private Boolean success;

    // Private constructor to prevent direct instantiation
    private LoginResponseDTO(Builder builder) {
        this.token = builder.token;
        this.message = builder.message;
        this.userId = builder.userId;
        this.role = builder.role;
        this.success = builder.success;
    }

    // Getters and setters (or you can use public final fields if you prefer)
    public String getToken() {
        return token;
    }

    public String getMessage() {
        return message;
    }

    public Long getUserId() {
        return userId;
    }

    public String getRole() {
        return role;
    }

    public Boolean getSuccess() {
        return success;
    }

    // Builder pattern class
    public static class Builder {
        private String token;
        private String message;
        private Long userId;
        private String role;
        private Boolean success;

        public Builder token(String token) {
            this.token = token;
            return this;
        }

        public Builder message(String message) {
            this.message = message;
            return this;
        }

        public Builder userId(Long userId) {
            this.userId = userId;
            return this;
        }

        public Builder role(String role) {
            this.role = role;
            return this;
        }

        public Builder success(Boolean success) {
            this.success = success;
            return this;
        }

        // Method to build the LoginResponseDTO object
        public LoginResponseDTO build() {
            return new LoginResponseDTO(this);
        }
    }
}

