import { DatabaseSync } from "node:sqlite"
export const db = new DatabaseSync('file:./SQLite.db')
db.exec(`
CREATE TABLE IF NOT EXISTS users (
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    balance TEXT NOT NULL DEFAULT '$0.00',
    role TEXT DEFAULT member,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    id INTEGER PRIMARY KEY AUTOINCREMENT
);

CREATE TABLE IF NOT EXISTS products (
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    price TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    id INTEGER PRIMARY KEY AUTOINCREMENT
);

CREATE TABLE IF NOT EXISTS cart (
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    marked INTEGER NOT NULL DEFAULT 0,
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orders (
    user_id INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    total TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS order_items (
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price TEXT NOT NULL,
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );   
`)
// ============ USERS ============

export const createUser = db.prepare(`
    INSERT INTO users (name, email, password)
    VALUES (?, ?, ?)
`);

export const getUserByEmail = db.prepare(`
    SELECT * FROM users WHERE email = ?
`);

export const getUserById = db.prepare(`
    SELECT name,email,balance,role,created_at,id FROM users WHERE id = ?
`);

export const getBalanceById = db.prepare(`
    SELECT balance FROM users WHERE id = ?
    `)

export const updateUserBalance = db.prepare(`
    UPDATE users SET balance = ? WHERE id = ?
`);

export const updateUserRole = db.prepare(`
    UPDATE users SET role = ? WHERE id = ?
`);

export const updateUserName = db.prepare(`
    UPDATE users SET name = ? WHERE id = ?
`);

export const updateUserEmail = db.prepare(`
    UPDATE users SET email = ? WHERE id = ?
`);

export const updateUserPassword = db.prepare(`
    UPDATE users SET password = ? WHERE id = ?
`);


export const deleteUser = db.prepare(`
    DELETE FROM users WHERE id = ?
`);
// ============ PRODUCTS ============

export const createProduct = db.prepare(`
    INSERT INTO products (name, description, price)
    VALUES (?, ?, ?)`
);

export const updateProductName = db.prepare(`UPDATE products SET name = ? WHERE id = ?`);

export const updateProductDescription = db.prepare(`UPDATE products SET description = ? WHERE id = ?`);

export const updateProductPrice = db.prepare(`UPDATE products SET price = ? WHERE id = ?`);

export const getAllProducts = db.prepare(` SELECT * FROM products `);

export const deleteProductById = db.prepare(`DELETE FROM products WHERE id = ?`);

export const getProductById = db.prepare(` SELECT * FROM products WHERE id = ? `);

// ============ CART ============

export const addToCart = db.prepare(`
    INSERT INTO cart (user_id, product_id, quantity, marked)
    VALUES (?, ?, ?, 0)
`);

export const getUserCart = db.prepare(`
    SELECT c.*, p.name as product_name, p.price as product_price
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
`);

export const markCartItem = db.prepare(`
    UPDATE cart SET marked = ? WHERE id = ? AND user_id = ?
`);

export const removeFromCart = db.prepare(`
    DELETE FROM cart WHERE id = ? AND user_id = ?
`);

export const getMarkedCartItems = db.prepare(`
    SELECT c.*, p.name as product_name, p.price as product_price
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ? AND c.marked = 1
`);

// ============ ORDERS ============

export const getOrdersByUser = db.prepare(`
    SELECT o.*, 
        (SELECT GROUP_CONCAT(p.name, ', ') 
         FROM order_items oi 
         JOIN products p ON oi.product_id = p.id 
         WHERE oi.order_id = o.id) as items
    FROM orders o
    WHERE o.user_id = ?
    ORDER BY o.created_at DESC
`);

export const getOrderById = db.prepare(`
    SELECT * FROM orders WHERE id = ? AND user_id = ?
`);

export const updateOrderStatus = db.prepare(`
    UPDATE orders SET status = ? WHERE id = ? AND user_id = ?
`);

// ============ CHECKOUT (transação) ============

const insertOrder = db.prepare(`
    INSERT INTO orders (user_id, status, total)
    VALUES (?, 'pending', ?)
`);

const insertOrderItem = db.prepare(`
    INSERT INTO order_items (order_id, product_id, quantity, price)
    VALUES (?, ?, ?, ?)
`);

const deleteMarkedFromCart = db.prepare(`
    DELETE FROM cart WHERE user_id = ? AND marked = 1
`);