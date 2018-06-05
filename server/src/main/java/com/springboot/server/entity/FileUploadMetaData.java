package com.springboot.server.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="files")
public class FileUploadMetaData {
    @Id
    @GeneratedValue
    private int Id;

    private String name;

    private String size;

    private String createdAt;


    public FileUploadMetaData(String name, String size, String createdAt) {
        this.name = name;
        this.size = size;
        this.createdAt = createdAt;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}
