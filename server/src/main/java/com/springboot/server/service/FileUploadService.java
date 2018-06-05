package com.springboot.server.service;

import com.springboot.server.configuration.FileUploadConfiguration;
import com.springboot.server.entity.FileUploadMetaData;
import com.springboot.server.exception.FileUploadException;
import com.springboot.server.repository.FileUploadRepository;
import com.springboot.server.utils.SizeConverter;
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
import java.nio.file.attribute.BasicFileAttributes;

@Service
public class FileUploadService {
    private final Logger LOGGER = LoggerFactory.getLogger(FileUploadService.class);
    private final Path fileDirectory;
    private final FileUploadRepository fileUploadRepository;

    @Autowired
    public FileUploadService(FileUploadConfiguration fileUploadConfiguration, FileUploadRepository fileUploadRepository) {
        this.fileDirectory = Paths.get(fileUploadConfiguration.getFileDir()).toAbsolutePath().normalize();
        this.fileUploadRepository = fileUploadRepository;

        try {
            Files.createDirectories(this.fileDirectory);
        } catch (Exception e) {
            throw new FileUploadException("Could not create the directory where the uploaded files will be stored.", e);
        }
    }

    public FileUploadMetaData storeFile(MultipartFile file) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Path filePath = this.fileDirectory.resolve(fileName);
        try {
            if (file.isEmpty()) {
                throw new FileUploadException("Empty file");
            }
            if (fileName.contains("..")) {
                throw new FileUploadException("Invalid file path");
            }
            LOGGER.info("Correct file path, begin file upload");
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return storeMetaData(fileName, filePath);
        } catch (IOException e) {
            e.printStackTrace();
            throw new FileUploadException("Failed to upload file " + fileName);
        }
    }

    private FileUploadMetaData storeMetaData(String fileName, Path filePath) {
        try {
            BasicFileAttributes attr = Files.readAttributes(filePath, BasicFileAttributes.class);
            String size = SizeConverter.convertByteToHumanReadable(attr.size());
            String createdAt = attr.creationTime().toString();

            FileUploadMetaData fileUploadMetaData = new FileUploadMetaData(fileName, size, createdAt);

            return fileUploadRepository.save(fileUploadMetaData);
        } catch (IOException e) {
            throw new FileUploadException("Failed to save file metadata", e);
        }
    }
}
