const createTables = [
    `CREATE TABLE autor (
        id_autor int(11) NOT NULL,
        nombre varchar(250) NOT NULL UNIQUE,
        PRIMARY KEY (id_autor) NOT NULL AUTO_INCREMENT,
      ) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
    );`,
    `CREATE TABLE categoria (
        id_categoria int(11) NOT NULL,
        nombre varchar(250) NOT NULL UNIQUE,
        PRIMARY KEY (id_categoria) NOT NULL AUTO_INCREMENT,
      ) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;`,
    `CREATE TABLE libro (
        id_libro int(11) NOT NULL,
        titulo varchar(250) NOT NULL UNIQUE,
        isbn varchar(10),
        paginas int,
        fechaPublicacion varchar(28),
        imagen varchar(250),
        descripcionCorta varchar(300),
        descripcionLarga text,
        status varchar(10),
        PRIMARY KEY (id_libro) NOT NULL,
      ) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;`,
    `CREATE TABLE libro_autor (
        id_LibroAutor int(11) NOT NULL,
        id_Libro int(11) NOT NULL,
        id_Autor int(11) NOT NULL,
        PRIMARY KEY (id_LibroAutor) NOT NULL AUTO_INCREMENT,
        CONSTRAINT fk_autor FOREIGN KEY (id_Autor) REFERENCES autor (id_autor) ON UPDATE CASCADE,
        CONSTRAINT fk_libro FOREIGN KEY (id_Libro) REFERENCES libro (id_libro) ON UPDATE CASCADE;
      ) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;`,
    `CREATE TABLE libro_categoria (
        id_LibroCategoria int(11) NOT NULL,
        id_Libro int(11) NOT NULL,
        id_Categoria int(11) NOT NULL,
        PRIMARY KEY (id_LibroCategoria) NOT NULL AUTO_INCREMENT,
        CONSTRAINT fk_categoria FOREIGN KEY (id_Categoria) REFERENCES categoria (id_categoria) ON UPDATE CASCADE,
        CONSTRAINT fk_libro FOREIGN KEY (id_Libro) REFERENCES libro (id_libro) ON UPDATE CASCADE,
      ) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;`
    ];
module.exports = {createTables};