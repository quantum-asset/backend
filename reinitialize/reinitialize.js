export const reinitializeSQL = "`SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0; SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0; SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';   DROP SCHEMA IF EXISTS `mydb` ;   CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ; USE `mydb` ;   DROP TABLE IF EXISTS `mydb`.`FOTO` ;  CREATE TABLE IF NOT EXISTS `mydb`.`FOTO` (   `ID_FOTO` INT NOT NULL AUTO_INCREMENT,   `FOTO` BLOB NOT NULL,   `FECHA_CREACION` DATETIME NOT NULL,   `ULTIMA_MODIFICACION` DATETIME NOT NULL,   `ESTADO` TINYINT NOT NULL DEFAULT '1',   PRIMARY KEY (`ID_FOTO`)) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;    DROP TABLE IF EXISTS `mydb`.`TIPO_LOCACION` ;  CREATE TABLE IF NOT EXISTS `mydb`.`TIPO_LOCACION` (   `ID_TIPO_LOCACION` INT NOT NULL AUTO_INCREMENT,   `DENOMINACION` VARCHAR(45) NOT NULL,   `ESTADO` TINYINT NOT NULL DEFAULT '1',   PRIMARY KEY (`ID_TIPO_LOCACION`)) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;   DROP TABLE IF EXISTS `mydb`.`LOCACION` ;  CREATE TABLE IF NOT EXISTS `mydb`.`LOCACION` (   `ID_LOCACION` INT NOT NULL AUTO_INCREMENT,   `DIRECCION` VARCHAR(100) NULL DEFAULT NULL,   `ID_TIPO_LOCACION` INT NOT NULL,   `DENOMINACION` VARCHAR(45) NOT NULL,   `DESCRIPCION` VARCHAR(60) NULL,   `ESTADO` TINYINT NOT NULL DEFAULT '1',   PRIMARY KEY (`ID_LOCACION`),   INDEX `fk_LOCACION_TIPO_LOCACION1_idx` (`ID_TIPO_LOCACION` ASC) VISIBLE,   UNIQUE INDEX `ID_LOCACION_UNIQUE` (`ID_LOCACION` ASC) VISIBLE,   CONSTRAINT `fk_LOCACION_TIPO_LOCACION1`     FOREIGN KEY (`ID_TIPO_LOCACION`)     REFERENCES `mydb`.`TIPO_LOCACION` (`ID_TIPO_LOCACION`)) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;   DROP TABLE IF EXISTS `mydb`.`ROL` ;  CREATE TABLE IF NOT EXISTS `mydb`.`ROL` (   `ID_ROL` INT NOT NULL AUTO_INCREMENT,   `DENOMINACION` VARCHAR(45) NOT NULL,   `DESCRIPCION` VARCHAR(45) NULL,   PRIMARY KEY (`ID_ROL`)) ENGINE = InnoDB;   DROP TABLE IF EXISTS `mydb`.`USUARIO` ;  CREATE TABLE IF NOT EXISTS `mydb`.`USUARIO` (   `ID_USUARIO` INT NOT NULL,   `ID_LOCACION` INT NULL,   `ID_FOTO` INT NOT NULL,   `ID_ROL` INT NOT NULL,   `CORREO` VARCHAR(50) NOT NULL,   `CONTRASENIA` VARCHAR(20) NOT NULL,   `NOMBRES` VARCHAR(70) NOT NULL,   `APELLIDO_PATERNO` VARCHAR(45) NOT NULL,   `APELLIDO_MATERNO` VARCHAR(45) NOT NULL,   `TIPO_DOCUMENTO_IDENTIDAD` VARCHAR(15) NOT NULL,   `NUM_DOCUMENTO_IDENTIDAD` VARCHAR(15) NOT NULL,   `FECHA_CREACION` DATETIME NOT NULL,   `ULTIMA_MODIFICACION` DATETIME NOT NULL,   `ESTADO` TINYINT NOT NULL DEFAULT '1',   PRIMARY KEY (`ID_USUARIO`),   INDEX `fk_USUARIO_LOCACION1_idx` (`ID_LOCACION` ASC) VISIBLE,   INDEX `fk_USUARIO_ROL1_idx` (`ID_ROL` ASC) VISIBLE,   INDEX `fk_USUARIO_FOTO1_idx` (`ID_FOTO` ASC) VISIBLE,   CONSTRAINT `fk_USUARIO_LOCACION1`     FOREIGN KEY (`ID_LOCACION`)     REFERENCES `mydb`.`LOCACION` (`ID_LOCACION`)     ON DELETE NO ACTION     ON UPDATE NO ACTION,   CONSTRAINT `fk_USUARIO_ROL1`     FOREIGN KEY (`ID_ROL`)     REFERENCES `mydb`.`ROL` (`ID_ROL`)     ON DELETE NO ACTION     ON UPDATE NO ACTION,   CONSTRAINT `fk_USUARIO_FOTO1`     FOREIGN KEY (`ID_FOTO`)     REFERENCES `mydb`.`FOTO` (`ID_FOTO`)     ON DELETE NO ACTION     ON UPDATE NO ACTION) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;   DROP TABLE IF EXISTS `mydb`.`TAG` ;  CREATE TABLE IF NOT EXISTS `mydb`.`TAG` (   `ID_TAG` INT NOT NULL AUTO_INCREMENT,   `CODIGO` VARCHAR(45) NOT NULL,   `ID_LOCACION` INT NOT NULL,   `ID_USUARIO` INT NOT NULL,   `FECHA_CREACION` DATETIME NOT NULL,   `ULTIMA_MODIFICACION` DATETIME NOT NULL,   `ESTADO` TINYINT NOT NULL DEFAULT '1',   PRIMARY KEY (`ID_TAG`),   INDEX `fk_TAG_LOCACION1_idx` (`ID_LOCACION` ASC) VISIBLE,   INDEX `fk_TAG_USUARIO1_idx` (`ID_USUARIO` ASC) VISIBLE,   CONSTRAINT `fk_TAG_LOCACION1`     FOREIGN KEY (`ID_LOCACION`)     REFERENCES `mydb`.`LOCACION` (`ID_LOCACION`),   CONSTRAINT `fk_TAG_USUARIO1`     FOREIGN KEY (`ID_USUARIO`)     REFERENCES `mydb`.`USUARIO` (`ID_USUARIO`)     ON DELETE NO ACTION     ON UPDATE NO ACTION) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;   DROP TABLE IF EXISTS `mydb`.`TIPO_ACTIVO` ;  CREATE TABLE IF NOT EXISTS `mydb`.`TIPO_ACTIVO` (   `ID_TIPO_ACTIVO` INT NOT NULL AUTO_INCREMENT,   `DENOMINACION` VARCHAR(45) NOT NULL,   `ESTADO` TINYINT NOT NULL DEFAULT '1',   PRIMARY KEY (`ID_TIPO_ACTIVO`)) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;   DROP TABLE IF EXISTS `mydb`.`AREA_RESPONSABLE` ;  CREATE TABLE IF NOT EXISTS `mydb`.`AREA_RESPONSABLE` (   `ID_AREA_RESPONSABLE` INT NOT NULL AUTO_INCREMENT,   `DENOMINACION` VARCHAR(45) NOT NULL,   `ESTADO` TINYINT NOT NULL DEFAULT '1',   PRIMARY KEY (`ID_AREA_RESPONSABLE`),   UNIQUE INDEX `ID_AREA_RESPONSABLE_UNIQUE` (`ID_AREA_RESPONSABLE` ASC) VISIBLE) ENGINE = InnoDB;   DROP TABLE IF EXISTS `mydb`.`ACTIVO` ;  CREATE TABLE IF NOT EXISTS `mydb`.`ACTIVO` (   `ID_ACTIVO` INT NOT NULL AUTO_INCREMENT,   `ID_TAG` INT NOT NULL,   `ID_FOTO` INT NULL,   `ID_TIPO_ACTIVO` INT NOT NULL,   `ID_LOCACION` INT NOT NULL,   `ID_AREA_RESPONSABLE` INT NOT NULL,   `DENOMINACION` VARCHAR(45) NOT NULL,   `CARACTERISTICAS` VARCHAR(100) NULL DEFAULT NULL,   `OBSERVCIONES` VARCHAR(100) NULL DEFAULT NULL,   `SERIE` VARCHAR(45) NULL DEFAULT NULL,   `COLOR` VARCHAR(45) NULL DEFAULT NULL,   `MODELO` VARCHAR(45) NULL DEFAULT NULL,   `MARCA` VARCHAR(45) NULL DEFAULT NULL,   `COSTO_ADQUISICION` DECIMAL(10,0) NOT NULL,   `NUM_GUIA_REMISION` VARCHAR(10) NOT NULL,   `NUM_FACTURA` VARCHAR(10) NOT NULL,   `PROVEEDOR_RUC` VARCHAR(45) NOT NULL,   `PROVEEDOR_RAZON_SOCIAL` VARCHAR(10) NOT NULL,   `CENTRO_COSTO` VARCHAR(20) NOT NULL,   `FECHA_DE_ALTA` DATETIME NULL,   `FECHA_CREACION` DATETIME NOT NULL,   `ULTIMA_MODIFICACION` DATETIME NOT NULL,   `ESTADO` TINYINT NOT NULL DEFAULT '1',   PRIMARY KEY (`ID_ACTIVO`),   INDEX `fk_ACTIVO_TAG1_idx` (`ID_TAG` ASC) VISIBLE,   INDEX `fk_ACTIVO_FOTO1_idx` (`ID_FOTO` ASC) VISIBLE,   INDEX `fk_ACTIVO_TIPO_ACTIVO1_idx` (`ID_TIPO_ACTIVO` ASC) VISIBLE,   INDEX `fk_ACTIVO_LOCACION1_idx` (`ID_LOCACION` ASC) VISIBLE,   INDEX `fk_ACTIVO_AREA_RESPONSABLE1_idx` (`ID_AREA_RESPONSABLE` ASC) VISIBLE,   CONSTRAINT `fk_ACTIVO_FOTO1`     FOREIGN KEY (`ID_FOTO`)     REFERENCES `mydb`.`FOTO` (`ID_FOTO`),   CONSTRAINT `fk_ACTIVO_LOCACION1`     FOREIGN KEY (`ID_LOCACION`)     REFERENCES `mydb`.`LOCACION` (`ID_LOCACION`),   CONSTRAINT `fk_ACTIVO_TAG1`     FOREIGN KEY (`ID_TAG`)     REFERENCES `mydb`.`TAG` (`ID_TAG`),   CONSTRAINT `fk_ACTIVO_TIPO_ACTIVO1`     FOREIGN KEY (`ID_TIPO_ACTIVO`)     REFERENCES `mydb`.`TIPO_ACTIVO` (`ID_TIPO_ACTIVO`),   CONSTRAINT `fk_ACTIVO_AREA_RESPONSABLE1`     FOREIGN KEY (`ID_AREA_RESPONSABLE`)     REFERENCES `mydb`.`AREA_RESPONSABLE` (`ID_AREA_RESPONSABLE`)     ON DELETE NO ACTION     ON UPDATE NO ACTION) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;   DROP TABLE IF EXISTS `mydb`.`TOMA_INVENTARIO` ;  CREATE TABLE IF NOT EXISTS `mydb`.`TOMA_INVENTARIO` (   `ID_TOMA_INVENTARIO` INT NOT NULL AUTO_INCREMENT,   `OBSERVACIONES` VARCHAR(300) NULL,   `FECHA_INICIO` DATETIME NOT NULL,   `ES_MUESTREO` TINYINT NOT NULL,   `FECHA_FIN` DATETIME NULL,   `CANT_LOCACIONES` INT NOT NULL,   `POR_PROCESAR` TINYINT NOT NULL DEFAULT 1,   PRIMARY KEY (`ID_TOMA_INVENTARIO`)) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;   DROP TABLE IF EXISTS `mydb`.`TRANSACCION` ;  CREATE TABLE IF NOT EXISTS `mydb`.`TRANSACCION` (   `ID_TRANSACCION` INT NOT NULL,   `DENOMINACION` VARCHAR(45) NOT NULL,   PRIMARY KEY (`ID_TRANSACCION`)) ENGINE = InnoDB;   DROP TABLE IF EXISTS `mydb`.`PERMISO` ;  CREATE TABLE IF NOT EXISTS `mydb`.`PERMISO` (   `ID_PERMISO` INT NOT NULL AUTO_INCREMENT,   `DENOMINACION` VARCHAR(45) NOT NULL,   `ESTADO` TINYINT NOT NULL DEFAULT 1,   PRIMARY KEY (`ID_PERMISO`)) ENGINE = InnoDB;   DROP TABLE IF EXISTS `mydb`.`TOMA_INVENTARIO_X_LOCACION` ;  CREATE TABLE IF NOT EXISTS `mydb`.`TOMA_INVENTARIO_X_LOCACION` (   `ID_TOMA_INVENTARIO` INT NOT NULL,   `ID_LOCACION` INT NOT NULL,   `FECHA` DATETIME NOT NULL,   `OBSERVACIONES` VARCHAR(200) NULL,   PRIMARY KEY (`ID_TOMA_INVENTARIO`, `ID_LOCACION`),   INDEX `fk_TOMA_INVENTARIO_has_LOCACION_LOCACION1_idx` (`ID_LOCACION` ASC) VISIBLE,   INDEX `fk_TOMA_INVENTARIO_has_LOCACION_TOMA_INVENTARIO1_idx` (`ID_TOMA_INVENTARIO` ASC) VISIBLE,   CONSTRAINT `fk_TOMA_INVENTARIO_has_LOCACION_TOMA_INVENTARIO1`     FOREIGN KEY (`ID_TOMA_INVENTARIO`)     REFERENCES `mydb`.`TOMA_INVENTARIO` (`ID_TOMA_INVENTARIO`)     ON DELETE NO ACTION     ON UPDATE NO ACTION,   CONSTRAINT `fk_TOMA_INVENTARIO_has_LOCACION_LOCACION1`     FOREIGN KEY (`ID_LOCACION`)     REFERENCES `mydb`.`LOCACION` (`ID_LOCACION`)     ON DELETE NO ACTION     ON UPDATE NO ACTION) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;   DROP TABLE IF EXISTS `mydb`.`TOMA_INVENTARIO_X_LOCACION_X_ACTIVO` ;  CREATE TABLE IF NOT EXISTS `mydb`.`TOMA_INVENTARIO_X_LOCACION_X_ACTIVO` (   `ID_TOMA_INVENTARIO` INT NOT NULL,   `ID_LOCACION` INT NOT NULL,   `ID_ACTIVO` INT NOT NULL,   `ID_USUARIO` INT NOT NULL,   `FECHA` DATETIME NOT NULL,   `OBSERVACION` VARCHAR(300) NULL DEFAULT NULL,   `ENCONTRADO` TINYINT NOT NULL,   PRIMARY KEY (`ID_TOMA_INVENTARIO`, `ID_LOCACION`, `ID_ACTIVO`),   INDEX `fk_TOMA_INVENTARIO_X_LOCACION_has_ACTIVO_ACTIVO1_idx` (`ID_ACTIVO` ASC) VISIBLE,   INDEX `fk_TOMA_INVENTARIO_X_LOCACION_has_ACTIVO_TOMA_INVENTARIO_X__idx` (`ID_TOMA_INVENTARIO` ASC, `ID_LOCACION` ASC) VISIBLE,   INDEX `fk_TOMA_INVENTARIO_X_LOCACION_X_ACTIVO_USUARIO1_idx` (`ID_USUARIO` ASC) VISIBLE,   CONSTRAINT `fk_TOMA_INVENTARIO_X_LOCACION_has_ACTIVO_TOMA_INVENTARIO_X_LO1`     FOREIGN KEY (`ID_TOMA_INVENTARIO` , `ID_LOCACION`)     REFERENCES `mydb`.`TOMA_INVENTARIO_X_LOCACION` (`ID_TOMA_INVENTARIO` , `ID_LOCACION`)     ON DELETE NO ACTION     ON UPDATE NO ACTION,   CONSTRAINT `fk_TOMA_INVENTARIO_X_LOCACION_has_ACTIVO_ACTIVO1`     FOREIGN KEY (`ID_ACTIVO`)     REFERENCES `mydb`.`ACTIVO` (`ID_ACTIVO`)     ON DELETE NO ACTION     ON UPDATE NO ACTION,   CONSTRAINT `fk_TOMA_INVENTARIO_X_LOCACION_X_ACTIVO_USUARIO1`     FOREIGN KEY (`ID_USUARIO`)     REFERENCES `mydb`.`USUARIO` (`ID_USUARIO`)     ON DELETE NO ACTION     ON UPDATE NO ACTION) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;   DROP TABLE IF EXISTS `mydb`.`EVIDENCIA` ;  CREATE TABLE IF NOT EXISTS `mydb`.`EVIDENCIA` (   `ID_EVIDENCIA` INT NOT NULL AUTO_INCREMENT,   `ID_TOMA_INVENTARIO` INT NOT NULL,   `ID_LOCACION` INT NOT NULL,   `ID_ACTIVO` INT NOT NULL,   `FOTO` BLOB NULL,   PRIMARY KEY (`ID_EVIDENCIA`),   INDEX `fk_EVIDENCIA_TOMA_INVENTARIO_X_LOCACION_X_ACTIVO1_idx` (`ID_TOMA_INVENTARIO` ASC, `ID_LOCACION` ASC, `ID_ACTIVO` ASC) VISIBLE,   CONSTRAINT `fk_EVIDENCIA_TOMA_INVENTARIO_X_LOCACION_X_ACTIVO1`     FOREIGN KEY (`ID_TOMA_INVENTARIO` , `ID_LOCACION` , `ID_ACTIVO`)     REFERENCES `mydb`.`TOMA_INVENTARIO_X_LOCACION_X_ACTIVO` (`ID_TOMA_INVENTARIO` , `ID_LOCACION` , `ID_ACTIVO`)     ON DELETE NO ACTION     ON UPDATE NO ACTION) ENGINE = InnoDB;   DROP TABLE IF EXISTS `mydb`.`USUARIO_X_TOMA_INVENTARIO` ;  CREATE TABLE IF NOT EXISTS `mydb`.`USUARIO_X_TOMA_INVENTARIO` (   `ID_USUARIO` INT NOT NULL,   `ID_TOMA_INVENTARIO` INT NOT NULL,   PRIMARY KEY (`ID_USUARIO`, `ID_TOMA_INVENTARIO`),   INDEX `fk_USUARIO_has_TOMA_INVENTARIO_TOMA_INVENTARIO1_idx` (`ID_TOMA_INVENTARIO` ASC) VISIBLE,   INDEX `fk_USUARIO_has_TOMA_INVENTARIO_USUARIO1_idx` (`ID_USUARIO` ASC) VISIBLE,   CONSTRAINT `fk_USUARIO_has_TOMA_INVENTARIO_USUARIO1`     FOREIGN KEY (`ID_USUARIO`)     REFERENCES `mydb`.`USUARIO` (`ID_USUARIO`)     ON DELETE NO ACTION     ON UPDATE NO ACTION,   CONSTRAINT `fk_USUARIO_has_TOMA_INVENTARIO_TOMA_INVENTARIO1`     FOREIGN KEY (`ID_TOMA_INVENTARIO`)     REFERENCES `mydb`.`TOMA_INVENTARIO` (`ID_TOMA_INVENTARIO`)     ON DELETE NO ACTION     ON UPDATE NO ACTION) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;   DROP TABLE IF EXISTS `mydb`.`USUARIO_X_PERMISO` ;  CREATE TABLE IF NOT EXISTS `mydb`.`USUARIO_X_PERMISO` (   `ID_USUARIO` INT NOT NULL,   `ID_PERMISO` INT NOT NULL,   `INICIO` DATETIME NOT NULL,   `EXPIRACION` DATETIME NOT NULL,   `FECHA_REGISTRO` DATETIME NOT NULL,   `ESTADO` TINYINT NOT NULL DEFAULT 1,   PRIMARY KEY (`ID_USUARIO`, `ID_PERMISO`),   INDEX `fk_USUARIO_has_PERMISO_PERMISO1_idx` (`ID_PERMISO` ASC) VISIBLE,   INDEX `fk_USUARIO_has_PERMISO_USUARIO1_idx` (`ID_USUARIO` ASC) VISIBLE,   CONSTRAINT `fk_USUARIO_has_PERMISO_USUARIO1`     FOREIGN KEY (`ID_USUARIO`)     REFERENCES `mydb`.`USUARIO` (`ID_USUARIO`)     ON DELETE NO ACTION     ON UPDATE NO ACTION,   CONSTRAINT `fk_USUARIO_has_PERMISO_PERMISO1`     FOREIGN KEY (`ID_PERMISO`)     REFERENCES `mydb`.`PERMISO` (`ID_PERMISO`)     ON DELETE NO ACTION     ON UPDATE NO ACTION) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;  DROP TABLE IF EXISTS `mydb`.`TRAZABILIDAD` ;  CREATE TABLE IF NOT EXISTS `mydb`.`TRAZABILIDAD` (   `ID_USUARIO` INT NOT NULL,   `ID_TRANSACCION` INT NOT NULL,   `FECHA` DATE NOT NULL,   `DESCRIPCION` VARCHAR(45) NOT NULL,   PRIMARY KEY (`ID_USUARIO`, `ID_TRANSACCION`),   INDEX `fk_USUARIO_has_TRANSACCION_TRANSACCION1_idx` (`ID_TRANSACCION` ASC) VISIBLE,   INDEX `fk_USUARIO_has_TRANSACCION_USUARIO1_idx` (`ID_USUARIO` ASC) VISIBLE,   CONSTRAINT `fk_USUARIO_has_TRANSACCION_USUARIO1`     FOREIGN KEY (`ID_USUARIO`)     REFERENCES `mydb`.`USUARIO` (`ID_USUARIO`)     ON DELETE NO ACTION     ON UPDATE NO ACTION,   CONSTRAINT `fk_USUARIO_has_TRANSACCION_TRANSACCION1`     FOREIGN KEY (`ID_TRANSACCION`)     REFERENCES `mydb`.`TRANSACCION` (`ID_TRANSACCION`)     ON DELETE NO ACTION     ON UPDATE NO ACTION) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;   DROP TABLE IF EXISTS `mydb`.`NECESIDAD_TAG` ;  CREATE TABLE IF NOT EXISTS `mydb`.`NECESIDAD_TAG` (   `ID_NECESIDAD_TAG` INT NOT NULL AUTO_INCREMENT,   `ID_LOCACION` INT NOT NULL,   `CANTIDAD` INT NOT NULL,   `FECHA_SOLICITUD` DATETIME NOT NULL,   `FECHA_ATENCION` DATETIME NULL,   `ATENDIDO` TINYINT NOT NULL DEFAULT 0,   PRIMARY KEY (`ID_NECESIDAD_TAG`),   INDEX `fk_NECESIDAD_TAG_LOCACION1_idx` (`ID_LOCACION` ASC) VISIBLE,   CONSTRAINT `fk_NECESIDAD_TAG_LOCACION1`     FOREIGN KEY (`ID_LOCACION`)     REFERENCES `mydb`.`LOCACION` (`ID_LOCACION`)     ON DELETE NO ACTION     ON UPDATE NO ACTION) ENGINE = InnoDB;   SET SQL_MODE=@OLD_SQL_MODE; SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS; SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS; `";
   
   
   
