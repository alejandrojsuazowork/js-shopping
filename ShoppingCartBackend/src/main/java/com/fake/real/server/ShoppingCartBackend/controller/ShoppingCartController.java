package com.fake.real.server.ShoppingCartBackend.controller;

import com.fake.real.server.ShoppingCartBackend.entity.Item;
import com.fake.real.server.ShoppingCartBackend.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class ShoppingCartController {
    @Autowired
    CartRepository cartRepository;

    @GetMapping(value = "/getItems", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Item> getItems() {
        return cartRepository.findAll();
    }

    @PutMapping(value = "/putItem", consumes = MediaType.APPLICATION_JSON_VALUE)
    public String putItem(@RequestBody Item item) {
        cartRepository.save(item);
        return "200 OK";
    }

    @DeleteMapping(value = "/deleteItem", consumes = MediaType.APPLICATION_JSON_VALUE)
    public String deleteItem(@RequestBody Item item) {
        cartRepository.delete(item);
        return "200 OK";
    }
}
