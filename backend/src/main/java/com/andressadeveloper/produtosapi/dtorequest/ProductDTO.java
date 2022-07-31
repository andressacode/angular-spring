package com.andressadeveloper.produtosapi.dtorequest;

import com.andressadeveloper.produtosapi.entities.Product;

public class ProductDTO {

	private Long id;
	private String name;
	private Integer quantity;
	private Double price;

	public ProductDTO() {

	}

	public ProductDTO(Product product) {
		id = product.getId();
		name = product.getName();
		quantity = product.getQuantity();
		price = product.getPrice();
	}

	public ProductDTO(Long id, String name, Integer quantity, Double price) {
		this.id = id;
		this.name = name;
		this.quantity = quantity;
		this.price = price;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

}
