-- ph... SQLINES DEMO ***
-- ve... SQLINES DEMO ***
-- SQLINES DEMO *** admin.net/
--
-- Ho... SQLINES DEMO ***
-- SQLINES DEMO *** Jun 23, 2025 at 07:33 AM
-- SQLINES DEMO *** 0.4.32-MariaDB
-- PH... SQLINES DEMO ***

/* SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO"; */
START TRANSACTION;
time_zone := "+00:00";


/* SQLINES DEMO *** CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/* SQLINES DEMO *** CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/* SQLINES DEMO *** COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/* SQLINES DEMO ***  utf8mb4 */;

--
-- SQLINES DEMO *** nager`
--

-- SQLINES DEMO *** ---------------------------------------

--
-- SQLINES DEMO *** or table `cache`
--

-- SQLINES FOR EVALUATION USE ONLY (14 DAYS)
CREATE TABLE cache (
  key varchar(255) NOT NULL,
  value mediumtext NOT NULL,
  expiration int NOT NULL
) ;

-- SQLINES DEMO *** ---------------------------------------

--
-- SQLINES DEMO *** or table `cache_locks`
--

CREATE TABLE cache_locks (
  key varchar(255) NOT NULL,
  owner varchar(255) NOT NULL,
  expiration int NOT NULL
) ;

-- SQLINES DEMO *** ---------------------------------------

--
-- SQLINES DEMO *** or table `failed_jobs`
--

CREATE TABLE failed_jobs (
  id bigint CHECK (id > 0) NOT NULL,
  uuid varchar(255) NOT NULL,
  connection text NOT NULL,
  queue text NOT NULL,
  payload text NOT NULL,
  exception text NOT NULL,
  failed_at timestamp(0) NOT NULL DEFAULT current_timestamp()
) ;

-- SQLINES DEMO *** ---------------------------------------

--
-- SQLINES DEMO *** or table `jobs`
--

CREATE TABLE jobs (
  id bigint CHECK (id > 0) NOT NULL,
  queue varchar(255) NOT NULL,
  payload text NOT NULL,
  attempts smallint CHECK (attempts > 0) NOT NULL,
  reserved_at int CHECK (reserved_at > 0) DEFAULT NULL,
  available_at int CHECK (available_at > 0) NOT NULL,
  created_at int CHECK (created_at > 0) NOT NULL
) ;

-- SQLINES DEMO *** ---------------------------------------

--
-- SQLINES DEMO *** or table `job_batches`
--

CREATE TABLE job_batches (
  id varchar(255) NOT NULL,
  name varchar(255) NOT NULL,
  total_jobs int NOT NULL,
  pending_jobs int NOT NULL,
  failed_jobs int NOT NULL,
  failed_job_ids text NOT NULL,
  options mediumtext DEFAULT NULL,
  cancelled_at int DEFAULT NULL,
  created_at int NOT NULL,
  finished_at int DEFAULT NULL
) ;

-- SQLINES DEMO *** ---------------------------------------

--
-- SQLINES DEMO *** or table `migrations`
--

CREATE TABLE migrations (
  id int CHECK (id > 0) NOT NULL,
  migration varchar(255) NOT NULL,
  batch int NOT NULL
) ;

--
-- SQLINES DEMO *** table `migrations`
--

INSERT INTO migrations (id, migration, batch) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_05_27_090607_create_personal_access_tokens_table', 1),
(5, '2025_06_01_132517_create_tasks_table', 1),
(6, '2025_06_08_121926_add_softdeletes_to_tasks_table', 2),
(7, '2025_06_16_043412_create_task_user_pivot_table', 3),
(8, '2025_06_16_052444_create_task_user_table', 4),
(9, '2025_06_16_053153_create_task_user_pivot_table', 5);

-- SQLINES DEMO *** ---------------------------------------

--
-- SQLINES DEMO *** or table `password_reset_tokens`
--

CREATE TABLE password_reset_tokens (
  email varchar(255) NOT NULL,
  token varchar(255) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL
) ;

-- SQLINES DEMO *** ---------------------------------------

--
-- SQLINES DEMO *** or table `personal_access_tokens`
--

CREATE TABLE personal_access_tokens (
  id bigint CHECK (id > 0) NOT NULL,
  tokenable_type varchar(255) NOT NULL,
  tokenable_id bigint CHECK (tokenable_id > 0) NOT NULL,
  name varchar(255) NOT NULL,
  token varchar(64) NOT NULL,
  abilities text DEFAULT NULL,
  last_used_at timestamp(0) NULL DEFAULT NULL,
  expires_at timestamp(0) NULL DEFAULT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
) ;

--
-- SQLINES DEMO *** table `personal_access_tokens`
--

INSERT INTO personal_access_tokens (id, tokenable_type, tokenable_id, name, token, abilities, last_used_at, expires_at, created_at, updated_at) VALUES
(10, 'AppModelsUser', 3, 'mobile', 'e36f95bed420ea9458fe577c8949941500580c8f67e21712abe793fa8c1610dc', '["*"]', NULL, NULL, '2025-06-05 08:30:05', '2025-06-05 08:30:05'),
(11, 'AppModelsUser', 2, 'auth_token', '1f4631b9ea36963289422efd4a0b7b799fb8429bc358da9b823268f6c99d4421', '["*"]', NULL, NULL, '2025-06-05 23:21:42', '2025-06-05 23:21:42'),
(12, 'AppModelsUser', 2, 'auth_token', '1e02036a4e1b0387a6441e1e0fa9875a234271cf8b8e85cf9a1e7ab8cdc7f42a', '["*"]', '2025-06-09 22:19:56', NULL, '2025-06-05 23:50:17', '2025-06-09 22:19:56'),
(13, 'AppModelsUser', 2, 'auth_token', '25e1a84c96dc64122e0214ecd68085254839b7af90fadbf6367e69850323a257', '["*"]', '2025-06-09 22:21:40', NULL, '2025-06-09 22:21:12', '2025-06-09 22:21:40'),
(14, 'AppModelsUser', 2, 'auth_token', '30b8d6507ff1786e2092cf5270c27960ee7b0a6bb223a455e4f514a95dcd3f2e', '["*"]', '2025-06-09 23:38:46', NULL, '2025-06-09 22:23:04', '2025-06-09 23:38:46'),
(15, 'AppModelsUser', 2, 'auth_token', '0e313820444daf9daa61e082084ace94da1d7b4e18f5ad3d42a2238b615cc5b4', '["*"]', '2025-06-09 23:45:34', NULL, '2025-06-09 23:41:48', '2025-06-09 23:45:34'),
(16, 'AppModelsUser', 2, 'auth_token', '7e8c3edda2618d74e33e20370731459d0a4b7555ece1d5f0493cf614dc149785', '["*"]', '2025-06-10 00:27:06', NULL, '2025-06-09 23:46:10', '2025-06-10 00:27:06'),
(17, 'AppModelsUser', 2, 'auth_token', 'c7dc08f6d4ada373fbf9ffc80154b244679e14d0edbb8b712e57af2f253356fc', '["*"]', '2025-06-10 08:35:47', NULL, '2025-06-10 00:27:32', '2025-06-10 08:35:47'),
(18, 'AppModelsUser', 3, 'auth_token', 'b9ec6b201af7940000bb941e149d0b244a204f2109b765dce88ffa5558ba158a', '["*"]', '2025-06-10 08:59:06', NULL, '2025-06-10 08:41:20', '2025-06-10 08:59:06'),
(19, 'AppModelsUser', 2, 'auth_token', '383c04b6c50e4680a754115cad1e70763dba9bda42144bf85ddb766a35888670', '["*"]', '2025-06-12 08:18:49', NULL, '2025-06-10 08:59:54', '2025-06-12 08:18:49'),
(20, 'AppModelsUser', 2, 'auth_token', 'a4802513e24b9d34dfc582baa86d84133c0a5819f0ff1627cef1e68edc22fb26', '["*"]', '2025-06-14 07:24:25', NULL, '2025-06-13 04:09:07', '2025-06-14 07:24:25'),
(21, 'AppModelsUser', 3, 'auth_token', '3eeed683f6b54a376a654b8b948a7e6ca32c78ce3daa29489167f668e2b82e2f', '["*"]', '2025-06-15 08:08:01', NULL, '2025-06-14 07:25:14', '2025-06-15 08:08:01'),
(22, 'AppModelsUser', 3, 'auth_token', '56d1a3dea3c9815cdf25b09418f89c4d9b2b5e533b49c14c3b7d584805116cfb', '["*"]', '2025-06-15 08:21:44', NULL, '2025-06-15 08:11:18', '2025-06-15 08:21:44'),
(23, 'AppModelsUser', 3, 'auth_token', '887ae855437b73ca5757abef87f3f1b87a124b089dff710cc01c0a269324021d', '["*"]', '2025-06-15 08:28:28', NULL, '2025-06-15 08:28:27', '2025-06-15 08:28:28'),
(24, 'AppModelsUser', 2, 'auth_token', '9a5bd183f0255409c1f173d9674cc59409464bdf1daf260ffb13cec1b7d283e5', '["*"]', '2025-06-17 03:45:48', NULL, '2025-06-15 08:49:21', '2025-06-17 03:45:48'),
(25, 'AppModelsUser', 3, 'auth_token', '90bdeb4b78588c75382e8fb23c793a916217902ec529ac16aee91682f464d1ce', '["*"]', '2025-06-18 06:45:30', NULL, '2025-06-18 06:45:24', '2025-06-18 06:45:30'),
(26, 'AppModelsUser', 3, 'auth_token', '3f40226306b1b5c22b092d1850e3881a06c8eecb25ebfe4cccd21e3a94a9c89d', '["*"]', '2025-06-18 07:05:04', NULL, '2025-06-18 07:05:02', '2025-06-18 07:05:04'),
(27, 'AppModelsUser', 2, 'auth_token', '18a94d3cec3e7397f190afd5f6d72f73d9b17944e26e80fdbf2deed2a25f6304', '["*"]', '2025-06-19 06:12:51', NULL, '2025-06-18 07:11:52', '2025-06-19 06:12:51'),
(28, 'AppModelsUser', 2, 'auth_token', '336563a6ca5f71b3dfdd167c153a1d7fc6d6d0bfc30987a56ad1909f5fb773f8', '["*"]', '2025-06-19 06:14:14', NULL, '2025-06-19 06:14:12', '2025-06-19 06:14:14'),
(29, 'AppModelsUser', 2, 'auth_token', 'ff23b7e53cc98bc8f8f79d1e4839314b0c3aa63453e780610cf3b7942cd44ddf', '["*"]', '2025-06-19 23:37:30', NULL, '2025-06-19 06:15:58', '2025-06-19 23:37:30');

-- SQLINES DEMO *** ---------------------------------------

--
-- SQLINES DEMO *** or table `sessions`
--

CREATE TABLE sessions (
  id varchar(255) NOT NULL,
  user_id bigint CHECK (user_id > 0) DEFAULT NULL,
  ip_address varchar(45) DEFAULT NULL,
  user_agent text DEFAULT NULL,
  payload text NOT NULL,
  last_activity int NOT NULL
) ;

--
-- SQLINES DEMO *** table `sessions`
--

INSERT INTO sessions (id, user_id, ip_address, user_agent, payload, last_activity) VALUES
('58PRMW7DCBzjieriDeg2auI1RUEFkUBwc3DnWaJR', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN3Z3ckpBeTNmZjM2bGdGMHpTaHJhdTlmbVRmSTFWa2w2RlZjWGRqbSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750052289),
('9ZgTqV9rLL54PMzs2vrPwtsuiQXkH3gGK9QZzNVM', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOVU1azRvMk9vT3pmQ0JMeGZkdk94d3U4THRuT0JxeWhXRDd6S3hBVSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1749534938),
('enwBurCJzQoheOokWfGX5mE7w1YkgRGXYJGBVwjS', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSDVUS2Y1WXVhQ3JNVXFpc0FRRXlWVm9PYW1tbk1Qb05lM09LbEhUNyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fX0=', 1749905702),
('FrAhC68xh3VXQk2nSTDpykAOstrvhw0mJwXM8PNs', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoickRmcVZFYnBoUUlsM3ZVd21lc0tVUm9aTE1XdndBN2Vva1NveDc1ciI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1749187203),
('jv2nzZtqTdXlkvQBcUqaHS9jSGVOtlj9iufvZboY', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicWVVSUtXMFczM1gyMFdTc1YyUnNSanVoVnZQQ25PSTh4dWo0RVNXWSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1749736120),
('S9clkFepjvwLbidB1OMnAjtj9QzhrqQJnzDgydod', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibnlXQXNrUGZyZW5yeHp1TGFzUmMxOGFnRUZXN3ZPcG5tb3N3Tk01NyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1748928063),
('sAOvTItyGzEjq2IG40j1KxvTzthyw37azAJPGJnq', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiQXg5Ym5OaHFIVEJObnpabEhWYXd6VzY1RGpyb0N3WmRxajdoTnBJMCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1749273768),
('XMTCGtBfhRd9wAYGA92WbvQt0gowRjiiCJ3Ru4ms', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYkJmMUZiY0FwQ0o4VW04T2FUbEtMQ251ZGJpaDZoTE1FZUNoRm5zSiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1749131900),
('xyG30P7EwVPUrMJ1PnxD9E3AeUPJVqnoas4nKDoy', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTFU2UEdvSVloQWdjdG5tTHNhaWpOejlCSXBzYTE3Ykp0bnlaNFQwYyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750250146),
('zTr3htlxErpzsrcGc6rScnB8zhQfRgi3awfrpWsx', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiN2R3SVkxQ0lmTjY1VXI5ajA0Tm12WFRub0JrbERQeTFDMlFLSWFaZiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1749131899);

-- SQLINES DEMO *** ---------------------------------------

--
-- SQLINES DEMO *** or table `tasks`
--

CREATE TABLE tasks (
  id bigint CHECK (id > 0) NOT NULL,
  user_id int NOT NULL,
  name varchar(255) NOT NULL,
  date date NOT NULL,
  start_time time(0) DEFAULT NULL,
  end_time time(0) DEFAULT NULL,
  status varchar(20) NOT NULL DEFAULT 'pending',
  description varchar(255) NOT NULL,
  category varchar(255) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  deleted_at timestamp(0) NULL DEFAULT NULL
) ;

--
-- SQLINES DEMO *** table `tasks`
--

INSERT INTO tasks (id, user_id, name, date, start_time, end_time, status, description, category, created_at, updated_at, deleted_at) VALUES
(1, 0, 'hello', '2025-06-19', '04:10:00', NULL, 'canceled', 'hel', 'UI/UX', '2025-06-01 23:08:45', '2025-06-08 07:08:25', '2025-06-08 07:08:25'),
(2, 2, 'Book Reading', '2025-06-17', '18:25:00', NULL, 'pending', 'take elon's book for read', 'Meeting', '2025-06-03 03:40:23', '2025-06-19 23:37:30', NULL),
(3, 1, 'Metting at office', '2025-06-17', '20:25:00', '21:25:00', 'completed', 'let's meet', 'All', '2025-06-06 07:30:04', '2025-06-08 07:16:07', NULL),
(4, 3, 'Production of app', '2025-06-15', '19:11:00', '21:11:00', 'pending', 'Hello guys. i just started', 'Web Development', '2025-06-15 08:15:29', '2025-06-15 08:15:29', NULL),
(5, 3, 'Reading books', '2025-06-18', '21:11:00', '13:11:00', 'pending', 'start reading and growing', 'UI/UX', '2025-06-15 08:16:09', '2025-06-15 08:16:09', NULL),
(6, 2, 'Marketing with vCard', '2025-06-19', '00:40:00', '02:41:00', 'pending', 'Be disciplined with your business', 'All', '2025-06-15 23:42:00', '2025-06-15 23:42:00', NULL);

-- SQLINES DEMO *** ---------------------------------------

--
-- SQLINES DEMO *** or table `task_user`
--

CREATE TABLE task_user (
  task_id bigint CHECK (task_id > 0) NOT NULL,
  user_id bigint CHECK (user_id > 0) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
) ;

--
-- SQLINES DEMO *** table `task_user`
--

INSERT INTO task_user (task_id, user_id, created_at, updated_at) VALUES
(6, 1, '2025-06-16 00:08:14', '2025-06-16 00:08:14'),
(6, 3, '2025-06-16 00:08:14', '2025-06-16 00:08:14');

-- SQLINES DEMO *** ---------------------------------------

--
-- SQLINES DEMO *** or table `users`
--

CREATE TABLE users (
  id bigint CHECK (id > 0) NOT NULL,
  name varchar(255) NOT NULL,
  image text NOT NULL,
  email varchar(255) NOT NULL,
  expo_token text DEFAULT NULL,
  notification_enabled smallint NOT NULL DEFAULT 0,
  email_verified_at timestamp(0) NULL DEFAULT NULL,
  password varchar(255) NOT NULL,
  remember_token varchar(100) DEFAULT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
) ;

--
-- SQLINES DEMO *** table `users`
--

INSERT INTO users (id, name, image, email, expo_token, notification_enabled, email_verified_at, password, remember_token, created_at, updated_at) VALUES
(1, 'Test User', '', 'test@example.com', NULL, 0, '2025-06-01 22:15:53', '$2y$12$MoBhZFVKowNAVQPUW9MdtOQlhBv68wMOFryvWK5btHxapU2oFbn.a', 'iSKWbdsvea', '2025-06-01 22:15:54', '2025-06-01 22:15:54'),
(2, 'Lalit', 'profiles/pCVeRy91cCbBDUT5e5xH4bNdPwlGjTPkJVcNHdv6.png', 'lalit@gmail.com', NULL, 0, NULL, '$2y$12$2TxYKXnVYKV4Chana2cU8.BJlHmKta4yZrisP68O2imjvhcIt/fES', NULL, '2025-06-01 22:44:54', '2025-06-16 07:45:14'),
(3, 'tester', 'profiles/IhmqfrGFPbg0d28IRC92bT7yvnchIH42otrdpKfV.jpg', 'tester@gmail.com', NULL, 0, NULL, '$2y$12$X4w1xvhRzeOhs16YFtV/EeD9xDJNUVkVAQlgp6h2xTgLSTFHeLSnC', NULL, '2025-06-05 08:30:04', '2025-06-10 08:47:42');

--
-- SQLINES DEMO *** d tables
--

--
-- SQLINES DEMO ***  `cache`
--
ALTER TABLE cache
  ADD PRIMARY KEY (key);

--
-- SQLINES DEMO ***  `cache_locks`
--
ALTER TABLE cache_locks
  ADD PRIMARY KEY (key);

--
-- SQLINES DEMO ***  `failed_jobs`
--
ALTER TABLE failed_jobs
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY failed_jobs_uuid_unique (uuid);

--
-- SQLINES DEMO ***  `jobs`
--
ALTER TABLE jobs
  ADD PRIMARY KEY (id),
  ADD KEY jobs_queue_index (queue);

--
-- SQLINES DEMO ***  `job_batches`
--
ALTER TABLE job_batches
  ADD PRIMARY KEY (id);

--
-- SQLINES DEMO ***  `migrations`
--
ALTER TABLE migrations
  ADD PRIMARY KEY (id);

--
-- SQLINES DEMO ***  `password_reset_tokens`
--
ALTER TABLE password_reset_tokens
  ADD PRIMARY KEY (email);

--
-- SQLINES DEMO ***  `personal_access_tokens`
--
ALTER TABLE personal_access_tokens
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY personal_access_tokens_token_unique (token),
  ADD KEY personal_access_tokens_tokenable_type_tokenable_id_index (tokenable_type,tokenable_id);

--
-- SQLINES DEMO ***  `sessions`
--
ALTER TABLE sessions
  ADD PRIMARY KEY (id),
  ADD KEY sessions_user_id_index (user_id),
  ADD KEY sessions_last_activity_index (last_activity);

--
-- SQLINES DEMO ***  `tasks`
--
ALTER TABLE tasks
  ADD PRIMARY KEY (id);

--
-- SQLINES DEMO ***  `task_user`
--
ALTER TABLE task_user
  ADD PRIMARY KEY (task_id,user_id),
  ADD KEY task_user_user_id_foreign (user_id);

--
-- SQLINES DEMO ***  `users`
--
ALTER TABLE users
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY users_email_unique (email);

--
-- SQLINES DEMO *** r dumped tables
--

--
-- SQLINES DEMO *** r table `failed_jobs`
--
ALTER TABLE failed_jobs
  MODIFY id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- SQLINES DEMO *** r table `jobs`
--
ALTER TABLE jobs
  MODIFY id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- SQLINES DEMO *** r table `migrations`
--
ALTER TABLE migrations
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- SQLINES DEMO *** r table `personal_access_tokens`
--
ALTER TABLE personal_access_tokens
  MODIFY id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- SQLINES DEMO *** r table `tasks`
--
ALTER TABLE tasks
  MODIFY id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- SQLINES DEMO *** r table `users`
--
ALTER TABLE users
  MODIFY id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- SQLINES DEMO *** umped tables
--

--
-- SQLINES DEMO *** able `task_user`
--
ALTER TABLE task_user
  ADD CONSTRAINT task_user_task_id_foreign FOREIGN KEY (task_id) REFERENCES tasks (id) ON DELETE CASCADE,
  ADD CONSTRAINT task_user_user_id_foreign FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;
COMMIT;

/* SQLINES DEMO *** CTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/* SQLINES DEMO *** CTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/* SQLINES DEMO *** TION_CONNECTION=@OLD_COLLATION_CONNECTION */;
