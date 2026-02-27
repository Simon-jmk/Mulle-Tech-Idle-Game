CREATE DATABASE IF NOT EXISTS IdleGameLogger;
USE IdleGameLogger;

CREATE TABLE users (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email         VARCHAR(255) NOT NULL,
  username      VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY (email),
  UNIQUE KEY (username)
);

CREATE TABLE game_state (
  id                     BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id                BIGINT UNSIGNED NOT NULL,
  score                  BIGINT NOT NULL DEFAULT 0,
  sleep_streak           INT NOT NULL DEFAULT 0,
  nutrition_streak       INT NOT NULL DEFAULT 0,
  passive_score_per_hour BIGINT NOT NULL DEFAULT 0,
  current_multiplier     DECIMAL(8,4) NOT NULL DEFAULT 1.0,
  last_login_date        DATE DEFAULT NULL,
  last_logged_date       DATE DEFAULT NULL,
  last_seen_at           DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY (user_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE streak_milestones (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  streak_days INT NOT NULL,
  multiplier  DECIMAL(8,4) NOT NULL,
  description VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY (streak_days)
);

CREATE TABLE sleep_logs (
  id        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id   BIGINT UNSIGNED NOT NULL,
  hours     DECIMAL(4,2) NOT NULL,
  quality   TINYINT UNSIGNED NOT NULL CHECK (quality BETWEEN 1 AND 5),
  logged_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE nutrition_logs (
  id        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id   BIGINT UNSIGNED NOT NULL,
  calories  DECIMAL(7,2) NOT NULL DEFAULT 0,
  carbs_g   DECIMAL(6,2) NOT NULL DEFAULT 0,
  fat_g     DECIMAL(6,2) NOT NULL DEFAULT 0,
  protein_g DECIMAL(6,2) NOT NULL DEFAULT 0,
  logged_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE goals (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id       BIGINT UNSIGNED NOT NULL,
  type          ENUM('sleep_hours', 'sleep_quality', 'calories', 'carbs_g', 'fat_g', 'protein_g') NOT NULL,
  target_value  DECIMAL(10,2) NOT NULL,
  current_value DECIMAL(10,2) NOT NULL DEFAULT 0,
  completed_at  DATETIME DEFAULT NULL,
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE shop_items (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name        VARCHAR(255) NOT NULL,
  description TEXT DEFAULT NULL,
  cost        BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE user_purchases (
  id           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id      BIGINT UNSIGNED NOT NULL,
  item_id      BIGINT UNSIGNED NOT NULL,
  purchased_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (item_id) REFERENCES shop_items(id) ON DELETE RESTRICT
);

CREATE TABLE score_log (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id    BIGINT UNSIGNED NOT NULL,
  amount     BIGINT NOT NULL,
  reason     ENUM('sleep_logged', 'nutrition_logged', 'goal_completed', 'streak_bonus', 'passive_income', 'click') NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Seed streak milestones
INSERT INTO streak_milestones (streak_days, multiplier, description) VALUES
(3,  1.25, '3 day streak'),
(7,  1.50, '1 week streak'),
(14, 2.00, '2 week streak'),
(30, 3.00, '1 month streak'),
(60, 4.00, '2 month streak'),
(90, 5.00, '3 month streak');