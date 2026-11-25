package com.kayro.domain.kyc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface KycFIlesRepository extends JpaRepository<KycFile, Long> {
    
    List<KycFile> findAllByUserId(Long userId);

}
