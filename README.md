# Fullstack E-Commerce Catalog App

A small fullstack application built as part of the **Fullstack Technical Test (4h)**.  
It demonstrates authentication, CRUD operations, cascading rules, indexing, search, sort, filter, and documentation.

---

## 📌 Features

- **Authentication**: JWT-based login (username: `test`, password: `test`)
- **Products management**:
  - Add, edit, delete products
  - Automatic indexing (1..N with no gaps)
- **Variants management**:
  - Add, edit, delete variants per product
  - Indexing (1..M per product with no gaps)
  - Automatic SKU generation (`<ProductIndex>_<VariantIndex>`)
  - Cascading delete when product is removed
- **Data grids** with:
  - Search by name or SKU
  - Sort by index (ASC/DESC)
  - Filter by `createdBy`

---

## 🏗️ Tech Stack

- **Frontend**: React / Next.js
- **Backend**: NestJS (REST API)
- **Database**: PostgreSQL (via TypeORM)
- **Auth**: JWT (HTTP Bearer)
- **Containerization**: Docker + docker-compose

---

## 📂 Project Structure

```
/ (repo root)
├── backend/              # NestJS backend app
├── frontend/             # React/Next frontend app
├── docker-compose.yml    # PostgreSQL + services
├── .env.example          # Required environment variables
├── /docs/UserGuide.pdf   # End-user manual
└── README.md             # Technical documentation
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2. Environment variables

Copy `.env.example` → `.env` and update values if needed.

### 3. Run with Docker (recommended)

```bash
docker-compose up -d
```

This will start:

- PostgreSQL
- Backend (NestJS)
- Frontend (React/Next)

### 4. Backend (manual run)

```bash
cd backend
npm install
npm run start:dev
```

Run database migrations and seed the test user:

```bash
npm run migration:run
npm run seed
```

### 5. Frontend (manual run)

```bash
cd frontend
npm install
npm run dev
```

App will be available at [http://localhost:3000](http://localhost:3000).

---

## 🔑 Authentication

Seeded credentials (for testing):

- **Username**: `test`
- **Password**: `test`

After login, a JWT token will be stored in local storage and used for all subsequent API requests.

---

## 📡 API Endpoints (Backend)

- `POST /auth/login` – login with username/password → returns JWT
- `GET /products` – list products
- `POST /products` – create product
- `PATCH /products/:id` – update product
- `DELETE /products/:id` – delete product (with cascade & reindex)
- `GET /variants` – list variants (with search/sort/filter)
- `POST /variants` – create variant under product
- `PATCH /variants/:id` – update variant
- `DELETE /variants/:id` – delete variant (reindexes indices & SKUs)

---

## 📘 Example Scenarios

1. Add 3 products (Shoes, T-Shirt, Hat) → indices `1, 2, 3`
2. Delete T-Shirt (index 2) → Shoes stays `1`, Hat becomes `2`
3. Add 2 variants to Shoes → SKUs `1_1`, `1_2`
4. Remove variant 1 → remaining variant reindexes to `1_1`
5. Add 3 variants to Hat → SKUs `2_1`, `2_2`, `2_3`
6. Delete Shoes → Hat reindexes to `1`, SKUs recompute to `1_1`, `1_2`, `1_3`
7. Search for SKU `1_2` → should return correct variant after reindexing

---

## 📄 Documentation

- **User Guide**: see `/docs/UserGuide.pdf` (non-technical manual)
- **AI Usage**: see `PROMPTS.md` for prompts, modifications, and reasoning

---

## 📜 License

MIT License – see `LICENSE` for details.
