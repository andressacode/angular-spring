package com.andressadeveloper.produtosapi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.andressadeveloper.produtosapi.dtorequest.ProductDTO;
import com.andressadeveloper.produtosapi.entities.Product;
import com.andressadeveloper.produtosapi.repositories.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;

	@Transactional(readOnly = true)
	public Page<ProductDTO> findAll(Pageable pageable) {
		Page<Product> result = productRepository.findAll(pageable);
		Page<ProductDTO> page = result.map(x -> new ProductDTO(x));
		return page;
	}

	@Transactional(readOnly = true)
	public ProductDTO findById(Long id) {
		Product result = productRepository.findById(id).get();
		ProductDTO productDto = new ProductDTO(result); 
		return productDto;
	}
}
