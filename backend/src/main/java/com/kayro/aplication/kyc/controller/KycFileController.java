package com.kayro.aplication.kyc.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;




@RestController 
@RequestMapping ("/api/kyc")
@AllArgsConstructor 
public class KycFileController {

    @PostMapping
    public String UploadFile(@RequestBody String entity) {
        //TODO: process POST request
        
        return entity;
    }

    @PutMapping
    public String ActualizarFile(@PathVariable String id, @RequestBody String entity) {
        //TODO: process PUT request
        
        return entity;
    }

    @GetMapping
    public String findKycFilesByCurrentUser(@RequestParam String param) {
        return new String();
    }
    
    @GetMapping("/findByEstado/{estado}")
    public String findKycFilesByEstado(@PathVariable String estado) {
        return new String();
    }
    
}
