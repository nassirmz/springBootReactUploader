package com.springboot.server.repository;

import com.springboot.server.entity.FileUploadMetaData;
import org.springframework.data.repository.CrudRepository;

public interface FileUploadRepository extends CrudRepository<FileUploadMetaData, Integer> {

    FileUploadMetaData save(FileUploadMetaData fileUploadMetaData);
}
