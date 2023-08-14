const cardapio = [
  {
    codigo: "cafe",
    preco: 3.0,
  },
  {
    codigo: "chantily",
    preco: 1.5,
    extraItemCode: "cafe",
  },
  {
    codigo: "suco",
    preco: 6.2,
  },
  {
    codigo: "sanduiche",
    preco: 6.5,
  },
  {
    codigo: "queijo",
    preco: 2.0,
    extraItemCode: "sanduiche",
  },
  {
    codigo: "salgado",
    preco: 7.25,
  },
  {
    codigo: "combo1",
    preco: 9.5,
  },
  {
    codigo: "combo2",
    preco: 7.5,
  },
];

class CaixaDaLanchonete {

  calcularValorDaCompra(metodoDePagamento, itens) {
    let valorTotal = 0;
    let mainItens = [];
    let error = "";

    if (!itens.length) {
      error = "Não há itens no carrinho de compra!";
    }

    // Para cada item calcular o valor e fazer as validações => 

    itens.forEach((item) => {

      // Separando o código e a quantidade de cada item do carrinho =>
      const [code, quantity] = item.split(",");

      // Procurar o item no cardápido através do código =>
      const CItem = cardapio.filter((item) => item.codigo === code);

      // Validações de quantidade e código =>
      if (Number(quantity) === 0) error = "Quantidade inválida!";
      if (!CItem.length) error = "Item inválido!";

      //Verificar se há item principal e somar os preços com a quantidade de cada item =>
      CItem.forEach((CItem) => {
        if (!CItem.extraItemCode) {
          mainItens.push(code);
        }

        if (CItem.extraItemCode && !mainItens.includes(CItem.extraItemCode)) {
          error = "Item extra não pode ser pedido sem o principal";
        }

        valorTotal += CItem.preco * quantity;
      });
    });

    // Verificar e aplicar o desconto ou acréscimo de acordo com o método de pagamento =>
    switch (metodoDePagamento) {
      case "dinheiro":
        valorTotal -= valorTotal * 0.05;
        break;
      case "credito":
        valorTotal += valorTotal * 0.03;
        break;
      case "debito":
        break;
      default:
        error = "Forma de pagamento inválida!";
    }

    // Se houver algum erro, encerrar a função e retornar o erro =>
    if (error) return error;

    // Se estiver tudo certo, retornar o valor fomatado com R$ 00,00 =>
    return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
  }
}

export { CaixaDaLanchonete };
