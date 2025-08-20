package com.example.javatextservice.web;

import com.example.javatextservice.model.TextEntry;
import com.example.javatextservice.repository.TextEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TextController {

    @Autowired
    private TextEntryRepository textEntryRepository;

    @GetMapping("/text")
    public List<TextEntry> getText() {
        return textEntryRepository.findAll();
    }
}