CREATE TABLE IF NOT EXISTS Organization(
   org_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
   org_name VARCHAR(100) NOT NULL,
   github_token VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS Users(
   user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
   org_id INT NOT NULL,
   mattermost_username VARCHAR(100) NOT NULL,
   github_username VARCHAR(100) NOT NULL,
   user_role VARCHAR(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS GithubStatistics(
   gs_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
   org_id INT NOT NULL,
   user_id INT,
   repo_name VARCHAR(100),
   date_since DATE NOT NULL,
   since_until DATE NOT NULL,
   commits_number INT NOT NULL,
   pullrequest_number INT NOT NULL,
   codelines_change INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;