package com.SistemaEstoque.estoque.repository;

import com.SistemaEstoque.estoque.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}