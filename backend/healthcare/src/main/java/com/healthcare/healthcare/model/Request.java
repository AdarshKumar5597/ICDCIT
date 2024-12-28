package com.healthcare.healthcare.model;

import com.healthcare.healthcare.eum.RequestStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "Request")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Long requestId;

    @Column(nullable = false, name = "patient_id")
    private Long patientID;

    @Column(nullable = false, name = "doctor_id")
    private Long doctorID;

    @Column(nullable = false, name = "proficiency_id")
    private Long proficiencyID;

    @Column(nullable = false, name = "requirements")
    private String requirements;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "request_status")
    private RequestStatus status = RequestStatus.PENDING;

    @Column(nullable = false, updatable = false, name = "created_at")
    private Date createdAt;

    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public Long getPatientID() {
        return patientID;
    }

    public void setPatientID(Long patientID) {
        this.patientID = patientID;
    }

    public Long getDoctorID() {
        return doctorID;
    }

    public void setDoctorID(Long doctorID) {
        this.doctorID = doctorID;
    }

    public Long getProficiencyID() {
        return proficiencyID;
    }

    public void setProficiencyID(Long proficiencyID) {
        this.proficiencyID = proficiencyID;
    }

    public String getRequirements() {
        return requirements;
    }

    public void setRequirements(String requirements) {
        this.requirements = requirements;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
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

