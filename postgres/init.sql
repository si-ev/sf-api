--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Debian 15.1-1.pgdg110+1)
-- Dumped by pg_dump version 15.1 (Debian 15.1-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Dish; Type: TABLE; Schema: public; Owner: simeon
--

CREATE TABLE public."Dish" (
    id integer NOT NULL,
    name text NOT NULL,
    weight integer,
    price integer NOT NULL,
    ingredients text,
    description text,
    image text,
    "categoryId" integer
);


ALTER TABLE public."Dish" OWNER TO simeon;

--
-- Name: DishCategory; Type: TABLE; Schema: public; Owner: simeon
--

CREATE TABLE public."DishCategory" (
    id integer NOT NULL,
    name text NOT NULL,
    description text
);


ALTER TABLE public."DishCategory" OWNER TO simeon;

--
-- Name: DishCategory_id_seq; Type: SEQUENCE; Schema: public; Owner: simeon
--

CREATE SEQUENCE public."DishCategory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."DishCategory_id_seq" OWNER TO simeon;

--
-- Name: DishCategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: simeon
--

ALTER SEQUENCE public."DishCategory_id_seq" OWNED BY public."DishCategory".id;


--
-- Name: Dish_id_seq; Type: SEQUENCE; Schema: public; Owner: simeon
--

CREATE SEQUENCE public."Dish_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Dish_id_seq" OWNER TO simeon;

--
-- Name: Dish_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: simeon
--

ALTER SEQUENCE public."Dish_id_seq" OWNED BY public."Dish".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: simeon
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO simeon;

--
-- Name: Dish id; Type: DEFAULT; Schema: public; Owner: simeon
--

ALTER TABLE ONLY public."Dish" ALTER COLUMN id SET DEFAULT nextval('public."Dish_id_seq"'::regclass);


--
-- Name: DishCategory id; Type: DEFAULT; Schema: public; Owner: simeon
--

ALTER TABLE ONLY public."DishCategory" ALTER COLUMN id SET DEFAULT nextval('public."DishCategory_id_seq"'::regclass);


--
-- Data for Name: Dish; Type: TABLE DATA; Schema: public; Owner: simeon
--

COPY public."Dish" (id, name, weight, price, ingredients, description, image, "categoryId") FROM stdin;
1	Брускетты с помидорами и беконом	95	145	\N	\N	\N	1
2	Брускетты с креветками и пюре из авокадо	95	190	\N	\N	\N	1
3	Брускетты с кабачками и сыром каймак	95	145	\N	\N	\N	1
4	Паштет с пьяным виноградом на хлебе-гриль	150	247	\N	\N	\N	1
5	Жареный сыр с брусничным соусом	180	259	\N	\N	\N	1
6	Ассорти жареных сыров	280	480	\N	\N	\N	1
7	Гренки чесночные	130	115	\N	\N	\N	1
8	Лангустины с соусом песто	180	590	\N	\N	\N	1
9	Жареные тигровые креветки с перечным соусом	180	590	\N	\N	\N	1
10	Жареные креветки с перечным соусом	180	399	\N	\N	\N	1
11	Мидии с томатами и чоризо	350	480	\N	\N	\N	1
12	Вкусняшки к пиву	460	499	\N	\N	\N	1
13	Куриные крылья BBQ в соусе терияки с картофлем фри	320	289	\N	\N	\N	1
14	Перец "лучаный"	100	139	\N	\N	\N	2
15	Сырная тарелка	260	395	\N	\N	\N	2
16	Черногорская тарелка	250	349	\N	\N	\N	2
17	Тар-тар из сёмги с авокадо	260	286	\N	\N	\N	2
18	Сербский погребок	360	269	\N	\N	\N	2
19	Карпаччо из сёмги	150	390	\N	\N	\N	2
20	Сельдь с картофелем луком и лимоном	250	199	\N	\N	\N	2
\.


--
-- Data for Name: DishCategory; Type: TABLE DATA; Schema: public; Owner: simeon
--

COPY public."DishCategory" (id, name, description) FROM stdin;
1	Горячие закуски	\N
2	Холодные закуски	\N
3	Балканские бургеры	\N
4	Салаты	\N
5	Супы	\N
6	Выпечка из теста "Фило" собственного производства	\N
7	Горячие блюда	\N
8	Мясные блюда	\N
9	Праймбиф стейки	\N
10	Фермерские стейки	\N
11	Рыба - Морепродукты	\N
12	Блюда из дровяной печи "Вкус истории"	\N
13	Гарниры	\N
14	Десерты	\N
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: simeon
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
7d55ca3c-597f-4df4-bdea-378bd09bdf7b	cb9e129ac2e5dd757361da1ddefe90783f4dd05c1749a8d3109ab0276e8364db	2023-01-05 06:56:57.32122+00	20230102184231_init	\N	\N	2023-01-05 06:56:56.889175+00	1
\.


--
-- Name: DishCategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: simeon
--

SELECT pg_catalog.setval('public."DishCategory_id_seq"', 14, true);


--
-- Name: Dish_id_seq; Type: SEQUENCE SET; Schema: public; Owner: simeon
--

SELECT pg_catalog.setval('public."Dish_id_seq"', 20, true);


--
-- Name: DishCategory DishCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: simeon
--

ALTER TABLE ONLY public."DishCategory"
    ADD CONSTRAINT "DishCategory_pkey" PRIMARY KEY (id);


--
-- Name: Dish Dish_pkey; Type: CONSTRAINT; Schema: public; Owner: simeon
--

ALTER TABLE ONLY public."Dish"
    ADD CONSTRAINT "Dish_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: simeon
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: DishCategory_name_key; Type: INDEX; Schema: public; Owner: simeon
--

CREATE UNIQUE INDEX "DishCategory_name_key" ON public."DishCategory" USING btree (name);


--
-- Name: Dish Dish_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: simeon
--

ALTER TABLE ONLY public."Dish"
    ADD CONSTRAINT "Dish_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."DishCategory"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

