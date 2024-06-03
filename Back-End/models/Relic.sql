CREATE TABLE stat (
    id SERIAL PRIMARY KEY,
    stat VARCHAR(255) NOT NULL,
    value NUMERIC NOT NULL
);

CREATE TABLE relic (
    id SERIAL PRIMARY KEY,
    level INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    main_stat_id INTEGER REFERENCES stat(id)
);

CREATE TABLE relic_sub_stat (
    relic_id INTEGER REFERENCES relic(id),
    stat_id INTEGER REFERENCES stat(id),
    PRIMARY KEY (relic_id, stat_id)
);