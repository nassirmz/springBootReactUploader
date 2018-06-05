package com.springboot.server.controller;

import com.springboot.server.dto.FileUploadMetaDataDTO;
import com.springboot.server.entity.FileUploadMetaData;
import com.springboot.server.service.FileUploadService;
import com.springboot.server.transformer.FileUploadTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FileUploadController {
    private FileUploadService fileUploadService;
    private FileUploadTransformer fileUploadTransformer;

    @Autowired
    public FileUploadController(FileUploadService fileUploadService, FileUploadTransformer fileUploadTransformer) {
        this.fileUploadService = fileUploadService;
        this.fileUploadTransformer = fileUploadTransformer;
    }

    @PostMapping("/files")
    public ResponseEntity uploadFile(@RequestParam("file") MultipartFile file) {
        FileUploadMetaData fileUploadMetaData = fileUploadService.storeFile(file);
        FileUploadMetaDataDTO fileUploadMetaDataDTO = fileUploadTransformer.transformEntitty(fileUploadMetaData);
        return ResponseEntity.ok(fileUploadMetaDataDTO);
    }
}
