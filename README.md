## 🏨 Calculate Tarifário
Mini aplicação em React que simula o valor total de uma reserva de acomodação com base em regras simples de tarifário.
O objetivo é permitir que o usuário escolha a acomodação, informe o período da estadia e o número de adultos, e veja o total da reserva já considerando regras como taxa de limpeza, extra para fins de semana, desconto para estadias longas e cobrança de hóspedes extras.

## ⚡ Funcionalidades
- Seleção de acomodação (Suíte Jardim ou Chalé Família)
- Escolha de período (check-in e check-out)
- Número de adultos
- Cálculo do valor total da estadia
- Exibição detalhada: diária, taxa de limpeza, hóspedes extras, acréscimos de final de semana e descontos
- Validação de datas e número mínimo de noites

## 📦 Regras implementadas
Suíte Jardim:
- Diária: R$ 300
- Estadia mínima: 2 noites
- Taxa de limpeza: R$ 80
- Capacidade: 2 adultos

Chalé Família:
- Diária: R$ 450
- Estadia mínima: 2 noites
- Taxa de limpeza: R$ 100
- Capacidade: 4 adultos

Regras gerais:
- Fins de semana (sábado e domingo) têm acréscimo de 20% na diária
- Estadia com mais de 7 noites recebe 10% de desconto no total
- Hóspedes acima da capacidade geram um cobrança extra de R$ 50 por adulto por noite

## 🛠️ Tecnologias e decisões técnicas
- React + Vite para rápido setup e build
- Hooks (useState, useEffect) para gerenciar estado e dados da API
- Componentização simples: Header, Form, AccommodationCard, Result, Alert, Skeleton
- Validação separada (validateBooking) para regras de datas e estadia mínima
- Cálculos tarifários separados em funções utilitárias: calculateTarifario, calculateDailyTotal, calculateExtraGuestFee, calculateDiscount
- Estilo: CSS modular por componente (styles.css)
- Internacionalização via react-i18next para textos e mensagens
- Testes: Vitest cobrindo validação, regras e cálculo de tarifário

## 🚀 Como rodar o projeto
Clone o repositório:

```bash
git clone git@github.com:andrevsilva/calculate-tarifario.git
```

Vá ate o diretorio correto:
```bash
cd calculate-tarifario
```

Instale as dependências:
```bash
npm install
```

Inicie o backend fake (json-server) para servir o accommodations.json:
```bash
npx json-server --watch accommodations.json --port 3001
```

Inicie o frontend:
```bash
npm run dev
```

Abra o navegador em: 
```bash
http://localhost:5173
```

## 🌐 Deploy

O projeto está hospedado no Vercel e pode ser acessado online:

[Deploy no Vercel](https://calculate-tarifario.vercel.app/)

Para rodar localmente, siga as instruções da seção **Como rodar o projeto**.

## ✅ Testes

Para rodar os testes unitários:
```bash
npm run test
```

Para rodar testes de lint:
```bash
npm run lint
```

Testes implementados usando Vitest para:
- Função calculateTarifario
- Regras de cálculo (calculateDailyTotal, calculateExtraGuestFee, calculateDiscount)
- Validação de reserva (validateBooking)
- Utilitários de datas (parseDate)

## 📝 Considerações finais
Estrutura simples, focada em componentização e clareza de lógica
Separação clara entre UI, regras de negócio e validação
Preparado para futuras extensões, como novas regras tarifárias ou internacionalização de moedas
