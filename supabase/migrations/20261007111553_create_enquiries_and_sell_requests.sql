/*
# Create enquiries and sell_requests tables (single-tenant, no auth)

1. New Tables
- `enquiries`
  - `id` (uuid, primary key)
  - `name` (text, not null) — customer name
  - `phone` (text, not null) — customer phone number
  - `email` (text, nullable) — optional customer email
  - `type` (text, not null) — enquiry type: Part, Vehicle, General, Sell Request
  - `product` (text, nullable) — related product/vehicle name
  - `message` (text, not null) — enquiry message
  - `status` (text, default 'New') — processing status
  - `created_at` (timestamptz, default now())

- `sell_requests`
  - `id` (uuid, primary key)
  - `name` (text, not null) — seller name
  - `phone` (text, not null) — seller phone number
  - `vehicle_type` (text, not null) — Tractor, Agricultural Vehicle, Commercial Vehicle, Other
  - `brand` (text, not null) — vehicle brand
  - `model` (text, not null) — vehicle model
  - `year` (text, nullable) — manufacturing year
  - `hours` (text, nullable) — running hours
  - `expected_price` (text, nullable) — seller's expected price
  - `location` (text, nullable) — vehicle location
  - `condition` (text, nullable) — vehicle condition description
  - `message` (text, nullable) — additional details
  - `status` (text, default 'New') — processing status
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on both tables.
- Allow anon + authenticated to INSERT (customers submit forms without login).
- Allow anon + authenticated to SELECT (for potential admin display).
- No UPDATE or DELETE from the frontend (admin operations only, done server-side).

3. Notes
- This is a no-auth enquiry-driven business website.
- All form submissions come from anonymous visitors.
- Tables are intentionally public for write (insert) to accept enquiries.
*/

CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  type text NOT NULL DEFAULT 'General',
  product text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'New',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_enquiries" ON enquiries;
CREATE POLICY "anon_select_enquiries" ON enquiries FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_enquiries" ON enquiries;
CREATE POLICY "anon_insert_enquiries" ON enquiries FOR INSERT
TO anon, authenticated WITH CHECK (true);

CREATE TABLE IF NOT EXISTS sell_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  vehicle_type text NOT NULL,
  brand text NOT NULL,
  model text NOT NULL,
  year text,
  hours text,
  expected_price text,
  location text,
  condition text,
  message text,
  status text NOT NULL DEFAULT 'New',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sell_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_sell_requests" ON sell_requests;
CREATE POLICY "anon_select_sell_requests" ON sell_requests FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_sell_requests" ON sell_requests;
CREATE POLICY "anon_insert_sell_requests" ON sell_requests FOR INSERT
TO anon, authenticated WITH CHECK (true);
