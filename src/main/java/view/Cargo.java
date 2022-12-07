package view;

public class Cargo {
    private String nome;
    private int quantidadeNumeros;

    public Cargo(String nome, int quantidadeNumeros) {
        this.nome = nome;
        this.quantidadeNumeros = quantidadeNumeros;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setQuantidadeNumeros(int quantidadeNumeros) {
        this.quantidadeNumeros = quantidadeNumeros;
    }

    public String getNome() {
        return nome;
    }

    public int getQuantidadeNumeros() {
        return quantidadeNumeros;
    }
}
