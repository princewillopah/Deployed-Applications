package com.example.My_Java_Service.model;

import jakarta.persistence.*;

@Entity
@Table(name = "text_entries")
public class TextEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content", length = 500)
    private String content;

    // Default constructor (required by JPA)
    public TextEntry() {}

    // Constructor with content
    public TextEntry(String content) {
        this.content = content;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}