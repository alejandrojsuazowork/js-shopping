package com.fake.real.server.ShoppingCartBackend.controller;

import com.fake.real.server.ShoppingCartBackend.entity.Item;
import com.fake.real.server.ShoppingCartBackend.repository.CartRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertThat;
import static org.mockito.ArgumentMatchers.contains;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(ShoppingCartController.class)
public class ShoppingCartControllerTests {

    @MockBean
    CartRepository repo;

    @Autowired
    private MockMvc mvc;

    @Test
    public void shouldGet200OK_putItemIntoRepo() throws Exception {
        Item item = new Item();

        mvc.perform( MockMvcRequestBuilders
                .put("/putItem")
                .content(asJsonString(item))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.ALL_VALUE))
                .andExpect(status().isOk());
    }

    @Test
    public void shouldGet200OK_deleteItemIntoRepo() throws Exception {
        mvc.perform( MockMvcRequestBuilders
                .delete("/deleteItem/TestID")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.ALL_VALUE))
                .andExpect(status().isOk());
    }

    @Test
    public void shouldGetItems_getItemsIntoRepo() throws Exception {
        List<Item> items = new ArrayList<>();

        Item item = new Item();
        item.setId("1");
        item.setName("test");
        item.setOnSale(false);
        item.setPrice(1.00);
        items.add(item);

        when(repo.findAll()).thenReturn(items);

        mvc.perform( MockMvcRequestBuilders
                .get("/getItems")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value("1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("test"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].onSale").value("false"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].price").value("1.0"));
    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
