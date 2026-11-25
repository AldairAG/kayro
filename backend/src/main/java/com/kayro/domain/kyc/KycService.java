package com.kayro.domain.kyc;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kayro.domain.kyc.error.KycFileErrors;
import com.kayro.middleware.AppException;

import lombok.AllArgsConstructor;

@Service 
@AllArgsConstructor 
public class KycService {
    
    private final KycFIlesRepository kycFilesRepository;

    public KycFile save(KycFile kycFile) {
        return kycFilesRepository.save(kycFile);
    }

    public KycFile findById(Long id) {
        return kycFilesRepository.findById(id).orElseThrow(()-> new AppException(KycFileErrors.DOCUMENTO_NO_ENCONTRADO));
    }

    public List<KycFile> findAllByUserId(Long userId) {
        return kycFilesRepository.findAllByUserId(userId);
    }


}
