package com.springboot.server.dto;

public class FileUploadMetaDataDTO {
    private String name;

    private String createdAt;

    public FileUploadMetaDataDTO(String name, String createdAt) {
        this.name = name;
        this.createdAt = createdAt;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}
