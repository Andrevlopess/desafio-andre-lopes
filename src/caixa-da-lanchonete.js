const cardapio = [
  {
    codigo: "cafe",
    preco: 3.0,
    descrição: "Café",
  },
  {
    codigo: "chantily",
    preco: 1.5,
    descrição: "Chantily",
  },
  {
    codigo: "suco",
    preco: 6.2,
    descrição: "Suco Natural",
  },
  {
    codigo: "sanduiche",
    preco: 6.5,
    descrição: "Sanduíche",
  },
  {
    codigo: "queijo",
    preco: 2.0,
    descrição: "Queijo",
  },
  {
    codigo: "salgado",
    preco: 7.25,
    descrição: "Salgado",
  },
  {
    codigo: "combo1",
    preco: 9.5,
    descrição: "1 Suco e 1 Sanduíche",
  },
  {
    codigo: "combo2",
    preco: 7.5,
    descrição: "1 Café e 1 Sanduíche",
  },
];

class CaixaDaLanchonete {

  calcularValorDaCompra(metodoDePagamento, itens) {
    let valorTotal = 0;
    let principalItems = [];

    if (!itens) {
      return console.log("Não há itens no carrinho de compra!");
    }

    itens.forEach((item) => {
      const [code, quantity] = item.split(",");

      const itemCode = cardapio.filter((CItem) => CItem.codigo === code);

      if (Number(quantity) === 0) return console.log("Quantidade invalida!");
      if (!itemCode.length) return console.log("Item inválido!");

      if (!["chantily", "queijo"].includes(code)) {
        principalItems.push(code);
      }

      if (!principalItems.length) {
        return console.log("Item extra não pode ser pedido sem o principal");
      }

      itemCode.forEach((CItem) => {
        valorTotal += CItem.preco * quantity;
      });

      switch (metodoDePagamento) {
        case "debito":
          break;
        case "credito":
          valorTotal += valorTotal * 0.03;
          break;
        case "dinheiro":
          valorTotal -= valorTotal * 0.05;
          break;
        default:
          console.log("Forma de pagamento inválida!");
          break;
      }
    });

    return console.log(`R$ ${valorTotal.toFixed(2).replace(".", ",")}`);
  }
}

export { CaixaDaLanchonete };
