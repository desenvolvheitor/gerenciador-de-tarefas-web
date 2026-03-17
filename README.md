# 📝 To-Do List Web

Uma aplicação de gerenciamento de tarefas moderna, intuitiva e totalmente responsiva, construída com tecnologias web nativas. O foco do projeto é proporcionar uma experiência de usuário (UX) fluida, com filtros inteligentes e alta acessibilidade.

## ✨ Funcionalidades Principais

  * **Gestão Completa de Tarefas (CRUD):** Criação, leitura, atualização e exclusão de tarefas de forma dinâmica.
  * **Filtros Inteligentes com Contadores:** Sistema de filtragem por status (A fazer, Fazendo, Feita) com atualização em tempo real da quantidade de itens em cada categoria.
  * **Exclusão em Lote Contextual:** Botão "Excluir Todas" que remove apenas as tarefas visíveis no filtro selecionado no momento.
  * **Validação de Dados:** Proteção contra datas retroativas na estimativa de conclusão e campos obrigatórios.
  * **Interface Adaptável:** Layout construído com funções modernas de CSS como `color-mix` para variações de cores e `clamp` para responsividade.
  * **Acessibilidade Integrada:** Inclui suporte nativo a VLibras e ferramentas de acessibilidade Sienna.

## 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido sem dependências externas pesadas, priorizando a performance:

  * **HTML5:** Estrutura semântica e uso de componentes nativos como `<dialog>` para modais.
  * **CSS3 (Moderno):** \* Variáveis CSS para consistência visual.
      * `color-mix()` para manipulação dinâmica de tons.
      * `backdrop-filter` para efeitos de desfoque no fundo do modal.
  * **JavaScript (ES6+):** \* Programação Orientada a Objetos (Classes).
      * Manipulação avançada de Arrays (`filter`, `forEach`, `includes`, `splice`).

## 📂 Estrutura do Projeto

```text
├── images/           # Ícones e ilustrações da interface
├── index.html        # Estrutura principal e modais
├── style.css         # Estilização, variáveis e animações
└── script.js         # Lógica de negócio e manipulação do DOM
```

## 🚀 Como Executar o Projeto

1.  Clone este repositório ou baixe os arquivos.
2.  Certifique-se de manter a estrutura de pastas, especialmente a pasta `images/`.
3.  Abra o arquivo `index.html` em qualquer navegador moderno.
4.  *(Opcional)* Utilize a extensão "Live Server" no VS Code para uma melhor experiência de desenvolvimento.

## 🎨 Identificação Visual

O sistema utiliza uma paleta de cores sóbria com toques de cor para indicar estados:

  * **Principal:** `#F9F8F5` (Fundo claro e confortável).
  * **Ação:** `#D06C47` (Tons de terracota para destaque).
  * **Status:** Amarelo, Azul e Verde para indicar o progresso das tarefas.

## ♿ Acessibilidade

Este projeto leva a inclusão a sério:

  * **VLibras:** Plugin integrado para tradução automática em Libras.
  * **Sienna:** Suporte a ferramentas auxiliares de navegação.
  * **Semântica:** Uso correto de labels e botões para leitores de tela.

-----

### 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](https://www.google.com/search?q=LICENSE) para mais detalhes.

**Desenvolvido com ❤️ por [Heitor Sales](https://www.google.com/search?q=https://github.com/desenvolvheitor).**