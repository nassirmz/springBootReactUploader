package com.springboot.server.transformer;

import com.springboot.server.dto.FileUploadMetaDataDTO;
import com.springboot.server.entity.FileUploadMetaData;
import org.springframework.stereotype.Component;

@Component
public class FileUploadTransformer {

    public FileUploadMetaDataDTO transformEntitty(FileUploadMetaData fileUploadMetaData) {
        return new FileUploadMetaDataDTO(fileUploadMetaData.getName(), fileUploadMetaData.getCreatedAt());
    }
}
