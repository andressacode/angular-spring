package com.andressadeveloper.produtosapi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.andressadeveloper.produtosapi.dtorequest.ProductDTO;
import com.andressadeveloper.produtosapi.entities.Product;
import com.andressadeveloper.produtosapi.services.ProductService;

@RestController
@RequestMapping(value = "/products")
public class ProductController {

	@Autowired
	private ProductService productService;

	@GetMapping
	public Page<ProductDTO> findAll(Pageable pageable) {
		return productService.findAll(pageable);
	}

	@GetMapping(value = "/{id}")
	public ProductDTO findById(@PathVariable Long id) {
		return productService.findById(id);
	}

	@PostMapping
	public ResponseEntity<Product> create(@RequestBody Product entity) {
		Product product = productService.create(entity);
		return ResponseEntity.status(HttpStatus.CREATED).body(product);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Product> update(@PathVariable Long id, @RequestBody Product entity) {

		return (ResponseEntity<Product>) productService.update(id, entity)
				.map(record -> ResponseEntity.ok().body((Product) record)).orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping(path = "/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		if (productService.delete(id)) {
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

}
