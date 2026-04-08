📄 Documentação do Projeto
QCCheck – Inspeção de Qualidade Digital
1. Introdução

O QCCheck é um aplicativo mobile desenvolvido para digitalizar o processo de inspeção de qualidade em ambientes industriais.

Atualmente, muitas empresas ainda utilizam fichas de inspeção em papel, o que gera problemas como perda de documentos, dificuldade de rastreabilidade e retrabalho no processo de arquivamento.

O aplicativo permite que inspetores registrem digitalmente informações de lotes, realizem inspeções e definam o status de aprovação ou reprovação diretamente na linha de montagem.

O sistema foi desenvolvido utilizando React Native com suporte da plataforma Expo, garantindo uma experiência mobile eficiente e responsiva.

2. Problema

No ambiente industrial, o processo tradicional de inspeção apresenta diversas limitações:

📄 Dependência de papel

As fichas físicas podem se perder, rasgar ou ficar ilegíveis devido ao ambiente de produção.

🔍 Falta de rastreabilidade

Sem registro digital, torna-se difícil identificar:

quem realizou a inspeção

quando ela foi feita

qual foi o resultado do lote.

⏱ Processo lento

O preenchimento manual seguido de digitalização e arquivamento gera retrabalho e perda de tempo operacional.

3. Objetivo do Projeto

O objetivo do QCCheck é digitalizar o processo de inspeção de qualidade, permitindo que os inspetores:

registrem informações de lotes digitalmente

realizem inspeções diretamente no aplicativo

definam o status de aprovação ou reprovação

mantenham um histórico rastreável das inspeções realizadas.

Dessa forma, o sistema reduz erros, melhora a organização das informações e aumenta a eficiência do processo.

4. Funcionalidades do Sistema
4.1 Lista de Lotes

A tela inicial do aplicativo apresenta uma lista com todos os lotes cadastrados.

Cada lote possui:

Nome do lote

Status atual (Pendente, Aprovado ou Reprovado)

Botões de ação rápida

Também há um botão fixo "Adicionar Lote" que permite cadastrar novos registros.

4.2 Cadastro de Lote

O sistema permite cadastrar novos lotes de inspeção por meio de um formulário contendo os seguintes campos:

Nome do lote

Número do lote

Responsável

Área

Itinerário

Observações

Após o preenchimento, o usuário pode salvar ou cancelar o cadastro.

4.3 Edição de Lotes

Lotes já cadastrados podem ser editados.

O sistema permite:

alterar informações

salvar alterações

cancelar mudanças

excluir um lote.

Antes da exclusão, o sistema exibe um alerta de confirmação para evitar exclusões acidentais.

4.4 Definição de Status

O status do lote pode ser definido diretamente na tela de listagem por meio de um modal nativo.

As opções disponíveis são:

🟢 Aprovado

🟡 Pendente

🔴 Reprovado

Essa interação permite que o inspetor tome decisões rapidamente sem navegar para outra tela.

5. Fluxo de Uso do Sistema

O fluxo principal de uso do aplicativo segue as etapas abaixo:

1️⃣ O inspetor realiza login no sistema.

2️⃣ O usuário cadastra um novo lote de inspeção.

3️⃣ O inspetor realiza a inspeção física do lote na linha de montagem.

4️⃣ O status do lote é definido através de um modal no aplicativo.

5️⃣ O resultado da inspeção é registrado digitalmente e fica disponível para consulta.

6. Tecnologias Utilizadas

O desenvolvimento do QCCheck utilizou as seguintes tecnologias:

📱 Framework

React Native

Permite o desenvolvimento de aplicativos móveis multiplataforma utilizando JavaScript.

⚙ Plataforma de Desenvolvimento

Expo

Facilita a criação e execução de aplicativos React Native, oferecendo recursos como hot reload e acesso simplificado a APIs nativas.

📐 Sistema de Layout

Flexbox

Utilizado para organizar componentes de forma responsiva em diferentes tamanhos de tela.

🔔 APIs Nativas

Modal API – para seleção de status do lote

Alert API – para confirmação de ações críticas como exclusão de registros.

🧠 Gerenciamento de Estado

useState

Utilizado para controlar os dados dos formulários e o estado dos lotes dentro do aplicativo.

7. Requisitos Técnicos
Flexbox Master

O layout do aplicativo foi desenvolvido utilizando Flexbox para garantir:

organização vertical dos formulários

alinhamento consistente entre elementos

botões com largura total

adaptação a diferentes tamanhos de tela.

Modal e Alertas

O sistema utiliza componentes nativos para melhorar a experiência do usuário.

O modal permite definir rapidamente o status de um lote.

Os alertas são utilizados para confirmar ações críticas como:

reprovar um lote

excluir um registro.

8. Resultados Esperados

Com a implementação do QCCheck, espera-se:

eliminar o uso de fichas em papel

melhorar a rastreabilidade das inspeções

reduzir erros humanos

agilizar o processo de controle de qualidade.

9. Conclusão

O QCCheck demonstra como a digitalização de processos industriais pode melhorar significativamente a eficiência operacional.

Ao substituir formulários em papel por um aplicativo mobile, o sistema proporciona maior controle, organização e confiabilidade no registro de inspeções de qualidade.
