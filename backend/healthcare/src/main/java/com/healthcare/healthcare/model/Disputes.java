package com.healthcare.healthcare.model;

import com.healthcare.healthcare.eum.Resolution;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "Dispute")
public class Disputes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dispute_id", nullable = false, unique = true)
    private Long disputeId;

    @Column(name = "contract_id", nullable = false)
    private Long contractId;

    @Column(name = "filed_by", nullable = false)
    private Long userId;

    @Column(name = "reason", nullable = false)
    private String reason;

    @Column(name = "evidence")
    private String evidence;

    @Column(name = "resolved_by_admin")
    private Byte resolvedByAdmin;

    @Column(name = "resolution")
    @Enumerated(EnumType.STRING)
    private Resolution resolution;

    @Column(name = "resolution_comment")
    private String resolutionComment;

    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    public Long getDisputeId() {
        return disputeId;
    }

    public void setDisputeId(Long disputeId) {
        this.disputeId = disputeId;
    }

    public Long getContractId() {
        return contractId;
    }

    public void setContractId(Long contractId) {
        this.contractId = contractId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getEvidence() {
        return evidence;
    }

    public void setEvidence(String evidence) {
        this.evidence = evidence;
    }

    public Byte getResolvedByAdmin() {
        return resolvedByAdmin;
    }

    public void setResolvedByAdmin(Byte resolvedByAdmin) {
        this.resolvedByAdmin = resolvedByAdmin;
    }

    public Resolution getResolution() {
        return resolution;
    }

    public void setResolution(Resolution resolution) {
        this.resolution = resolution;
    }

    public String getResolutionComment() {
        return resolutionComment;
    }

    public void setResolutionComment(String resolutionComment) {
        this.resolutionComment = resolutionComment;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    @PrePersist
    public void onCreate() {
        createdAt = new Date();
    }
}
