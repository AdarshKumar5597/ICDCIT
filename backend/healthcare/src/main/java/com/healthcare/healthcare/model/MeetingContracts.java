package com.healthcare.healthcare.model;

import com.healthcare.healthcare.eum.Status;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "MeetingContract")
public class MeetingContracts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contract_id")
    private Long contractId;

    @JoinColumn(name = "request_id", referencedColumnName = "requestId", nullable = false)
    private Long requestId;

    @Column(name = "payment_amount", nullable = false)
    private BigDecimal paymentAmount;

    @Column(name = "meeting_details", nullable = false)
    private String meetingDetails;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status = Status.PENDING;

    @Column(name = "completed_by_patient", nullable = false)
    private Boolean completedByPatient = false;

    @Column(name = "completed_by_doctor", nullable = false)
    private Byte completedByDoctor;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Date createdAt;

    public Long getContractId() {
        return contractId;
    }

    public void setContractId(Long contractId) {
        this.contractId = contractId;
    }

    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public BigDecimal getPaymentAmount() {
        return paymentAmount;
    }

    public void setPaymentAmount(BigDecimal paymentAmount) {
        this.paymentAmount = paymentAmount;
    }

    public String getMeetingDetails() {
        return meetingDetails;
    }

    public void setMeetingDetails(String meetingDetails) {
        this.meetingDetails = meetingDetails;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Boolean getCompletedByPatient() {
        return completedByPatient;
    }

    public void setCompletedByPatient(Boolean completedByPatient) {
        this.completedByPatient = completedByPatient;
    }

    public Byte getCompletedByDoctor() {
        return completedByDoctor;
    }

    public void setCompletedByDoctor(Byte completedByDoctor) {
        this.completedByDoctor = completedByDoctor;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }
}
