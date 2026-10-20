CREATE TABLE IF NOT EXISTS users (
  id         TEXT PRIMARY KEY,
  phone      TEXT UNIQUE NOT NULL,
  name       TEXT,
  email      TEXT,
  gender     TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS otp_codes (
  phone     TEXT PRIMARY KEY,
  code_hash TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  attempts  INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS sessions (
  token      TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS salons (
  id   INT PRIMARY KEY,
  data JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS favorites (
  user_id  TEXT NOT NULL,
  salon_id INT NOT NULL,
  PRIMARY KEY (user_id, salon_id)
);

CREATE TABLE IF NOT EXISTS bookings (
  id         TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL,
  salon_id   INT NOT NULL,
  svc_ids    JSONB NOT NULL DEFAULT '[]',
  pkg_ids    JSONB NOT NULL DEFAULT '[]',
  date       TEXT NOT NULL,
  time       TEXT NOT NULL,
  status     TEXT NOT NULL DEFAULT 'upcoming',
  total      INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS bookings_user_idx ON bookings (user_id, created_at);

CREATE TABLE IF NOT EXISTS addresses (
  id         TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL,
  label      TEXT NOT NULL,
  address    TEXT NOT NULL,
  is_default BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS notifications (
  id         TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL,
  icon       TEXT NOT NULL,
  bg         TEXT NOT NULL,
  title      TEXT NOT NULL,
  body       TEXT NOT NULL,
  time       TEXT NOT NULL,
  category   TEXT NOT NULL,
  action     TEXT,
  goto_salon INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS notifications_user_idx ON notifications (user_id, created_at);
