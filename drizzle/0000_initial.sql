CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'pharmacist',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS medicines (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category_id INTEGER NOT NULL,
  form TEXT NOT NULL,
  batch_number TEXT NOT NULL,
  expiry_date TIMESTAMP NOT NULL,
  mrp NUMERIC NOT NULL,
  stock INTEGER NOT NULL,
  low_stock_threshold INTEGER NOT NULL DEFAULT 10,
  gst_rate NUMERIC NOT NULL DEFAULT 18,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  email TEXT,
  address TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS doctors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  specialization TEXT,
  phone TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS invoices (
  id SERIAL PRIMARY KEY,
  invoice_number TEXT NOT NULL UNIQUE,
  customer_id INTEGER REFERENCES customers(id),
  doctor_id INTEGER REFERENCES doctors(id),
  subtotal NUMERIC NOT NULL,
  gst_amount NUMERIC NOT NULL,
  total NUMERIC NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS invoice_items (
  id SERIAL PRIMARY KEY,
  invoice_id INTEGER NOT NULL REFERENCES invoices(id),
  medicine_id INTEGER NOT NULL REFERENCES medicines(id),
  quantity INTEGER NOT NULL,
  unit_price NUMERIC NOT NULL,
  gst_rate NUMERIC NOT NULL,
  gst_amount NUMERIC NOT NULL,
  total_price NUMERIC NOT NULL
);

CREATE TABLE IF NOT EXISTS prescriptions (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  doctor_id INTEGER REFERENCES doctors(id),
  prescription_image_path TEXT,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
); 