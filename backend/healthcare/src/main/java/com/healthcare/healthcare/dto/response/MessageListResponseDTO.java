package com.healthcare.healthcare.dto.response;

import com.healthcare.healthcare.model.Message;

import java.util.List;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessageListResponseDTO {
    private List<Message> messageList;
    private Boolean success;
    private String message;
}
