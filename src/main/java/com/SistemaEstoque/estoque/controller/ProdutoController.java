package com.SistemaEstoque.estoque.controller;

import com.SistemaEstoque.estoque.model.Produto;
import com.SistemaEstoque.estoque.service.ProdutoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
@CrossOrigin(origins = "*")
public class ProdutoController {

    private final ProdutoService service;

    public ProdutoController(ProdutoService service) {
        this.service = service;
    }

    @PostMapping
    public Produto salvar(@RequestBody Produto produto) {
        return service.salvar(produto);
    }

    @GetMapping
    public List<Produto> listar() {
        return service.listar();
    }

    @PutMapping("/{id}/aumentar")
    public Produto aumentarEstoque(
            @PathVariable Long id,
            @RequestParam int quantidade) {

        return service.aumentarEstoque(id, quantidade);
    }

    @PutMapping("/{id}/diminuir")
    public Produto diminuirEstoque(
            @PathVariable Long id,
            @RequestParam int quantidade) {

        return service.diminuirEstoque(id, quantidade);
    }
    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id){
        service.excluir(id);
    }
}
