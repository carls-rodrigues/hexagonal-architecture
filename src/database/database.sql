CREATE TABLE public.products (
  id varchar NOT NULL,
  "name" varchar NOT NULL,
  price numeric NOT NULL,
  status varchar NOT NULL,
  CONSTRAINT products_pkey PRIMARY KEY (id)
);