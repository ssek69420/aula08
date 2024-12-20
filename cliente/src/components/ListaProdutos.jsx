

export default function ListaProdutos({ produtos }) {
  if (!produtos || produtos.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <>
      <ul className={styles.bloco}>
        {produtos.map(produto => (
          <li key={produto.id} className={styles.produtoItem}>
            <h2 className={styles.produtoTitle}>{produto.title}</h2>
            <p className={styles.produtoDescription}>{produto.description}</p>
            <p className={styles.produtoPrice}>Preço: R$ {produto.price.toFixed(2)}</p>
            <img
              src={produto.image}
              alt={`Imagem do produto ${produto.title}`}
              className={styles.produtoImage}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
