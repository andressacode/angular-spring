package com.andressadeveloper.produtosapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.andressadeveloper.produtosapi.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

}
