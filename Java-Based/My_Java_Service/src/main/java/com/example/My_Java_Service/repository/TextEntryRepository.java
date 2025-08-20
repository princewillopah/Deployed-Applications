package com.example.My_Java_Service.repository;

import com.example.My_Java_Service.model.TextEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TextEntryRepository extends JpaRepository<TextEntry, Long> {
}