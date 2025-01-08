package com.healthcare.healthcare.dto.response;

import com.healthcare.healthcare.model.Request;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RequestResponseDto {
    private boolean success;
    private String message;
    private Request request;
}
