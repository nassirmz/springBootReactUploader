package com.springboot.server.service;

import com.springboot.server.configuration.FileUploadConfiguration;
import com.springboot.server.exception.FileUploadException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileUploadService {
    private final Logger LOGGER = LoggerFactory.getLogger(FileUploadService.class);
    private final Path fileDirectory;

    @Autowired
    public FileUploadService(FileUploadConfiguration fileUploadConfiguration) {
        this.fileDirectory = Paths.get(fileUploadConfiguration.getFileDir()).toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileDirectory);
        } catch (Exception e) {
            throw new FileUploadException("Could not create the directory where the uploaded files will be stored.", e);
        }
    }

    public String storeFile(MultipartFile file) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            if (file.isEmpty()) {
                throw new FileUploadException("Empty file");
            }
            if (fileName.contains("..")) {
                throw new FileUploadException("Invalid file path");
            }
            LOGGER.info("Correct file path, begin file upload");
            Files.copy(file.getInputStream(), this.fileDirectory.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException e) {
            e.printStackTrace();
            throw new FileUploadException("Failed to upload file " + fileName, e);
        }
    }
}
