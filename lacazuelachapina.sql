-- database/schema.sql

-- Crear la base de datos si no existe
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'LaCazuelaChapinaDB')
BEGIN
    CREATE DATABASE LaCazuelaChapinaDB;
END;
GO

USE LaCazuelaChapinaDB;
GO

-- Tabla para Productos (Tamales, Bebidas, Combos)
CREATE TABLE Productos (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(255) NOT NULL,
    Descripcion NVARCHAR(MAX),
    PrecioBase DECIMAL(10, 2) NOT NULL,
    TipoProducto NVARCHAR(50) NOT NULL CHECK (TipoProducto IN ('Tamal', 'Bebida', 'Combo')),
    Activo BIT DEFAULT 1, -- Para bajas lógicas
    FechaCreacion DATETIME DEFAULT GETDATE(),
    FechaActualizacion DATETIME DEFAULT GETDATE()
);
GO

-- Tabla para Atributos (Tipo de Masa, Relleno, Endulzante, etc.)
CREATE TABLE Atributos (
    Id INT PRIMARY KEY IDENTITY(1,1),
    NombreAtributo NVARCHAR(100) NOT NULL, -- Ej: 'Tipo de Masa', 'Relleno', 'Envoltura', 'Nivel de Picante', 'Tipo de Bebida', 'Endulzante', 'Topping'
    TipoAplicacion NVARCHAR(50) NOT NULL CHECK (TipoAplicacion IN ('Tamal', 'Bebida')), -- A qué tipo de producto aplica
    UNIQUE (NombreAtributo)
);
GO

-- Tabla para Valores de Atributo (Maíz Amarillo, Recado Rojo, Panela, etc.)
CREATE TABLE ValoresAtributo (
    Id INT PRIMARY KEY IDENTITY(1,1),
    AtributoId INT NOT NULL,
    Valor NVARCHAR(100) NOT NULL, -- Ej: 'Maíz Amarillo', 'Recado Rojo', 'Panela', 'Sin Chile'
    PrecioAdicional DECIMAL(10, 2) DEFAULT 0.00, -- Si un atributo tiene costo extra
    FOREIGN KEY (AtributoId) REFERENCES Atributos(Id)
);
GO

-- Tabla de unión entre Productos y Atributos (para definir los atributos de cada producto)
CREATE TABLE ProductoAtributo (
    ProductoId INT NOT NULL,
    ValorAtributoId INT NOT NULL,
    PRIMARY KEY (ProductoId, ValorAtributoId),
    FOREIGN KEY (ProductoId) REFERENCES Productos(Id),
    FOREIGN KEY (ValorAtributoId) REFERENCES ValoresAtributo(Id)
);
GO

-- Tabla para Combos (adicional a Productos, para detalles específicos de combos)
-- NOTA: Los combos también estarán en la tabla Productos con TipoProducto='Combo'
-- Esta tabla `Combos` es para los detalles específicos de los combos predefinidos/editables
CREATE TABLE Combos (
    Id INT PRIMARY KEY IDENTITY(1,1),
    ProductoId INT NOT NULL, -- FK a Productos.Id donde TipoProducto='Combo'
    NombreCombo NVARCHAR(255) NOT NULL, -- Ej: "Fiesta Patronal"
    DescripcionCombo NVARCHAR(MAX),
    EsEstacional BIT DEFAULT 0, -- Indica si es un combo estacional
    FechaInicioEstacional DATETIME,
    FechaFinEstacional DATETIME,
    FOREIGN KEY (ProductoId) REFERENCES Productos(Id)
);
GO

-- Tabla para los ítems que componen cada combo
CREATE TABLE ComboItems (
    Id INT PRIMARY KEY IDENTITY(1,1),
    ComboId INT NOT NULL, -- FK a Combos.Id
    ProductoComponenteId INT NOT NULL, -- FK a Productos.Id (para tamales o bebidas individuales)
    Cantidad INT NOT NULL,
    Notas NVARCHAR(255), -- Ej: "surtida de tamales", "termo de barro conmemorativo"
    FOREIGN KEY (ComboId) REFERENCES Combos(Id),
    FOREIGN KEY (ProductoComponenteId) REFERENCES Productos(Id)
);
GO

-- Tabla para Materias Primas, Empaques, Combustible (Inventario)
CREATE TABLE Inventario (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(255) NOT NULL, -- Ej: 'Masa de Maíz Amarillo', 'Hojas de Plátano', 'Cerdo', 'Vasos 12oz', 'Gas Propano'
    TipoItem NVARCHAR(50) NOT NULL CHECK (TipoItem IN ('Materia Prima', 'Empaque', 'Combustible')),
    UnidadMedida NVARCHAR(50) NOT NULL, -- Ej: 'kg', 'unidad', 'litro', 'galón'
    StockActual DECIMAL(18, 2) NOT NULL,
    PuntoCritico DECIMAL(18, 2) DEFAULT 0, -- Nivel para alertar bajo stock
    Activo BIT DEFAULT 1,
    FechaCreacion DATETIME DEFAULT GETDATE(),
    FechaActualizacion DATETIME DEFAULT GETDATE()
);
GO

-- Tabla para Movimientos de Inventario (Entradas, Salidas, Mermas)
CREATE TABLE MovimientosInventario (
    Id INT PRIMARY KEY IDENTITY(1,1),
    InventarioId INT NOT NULL,
    TipoMovimiento NVARCHAR(50) NOT NULL CHECK (TipoMovimiento IN ('Entrada', 'Salida', 'Merma')),
    Cantidad DECIMAL(18, 2) NOT NULL,
    CostoUnitario DECIMAL(10, 2), -- Solo para entradas
    FechaMovimiento DATETIME DEFAULT GETDATE(),
    Notas NVARCHAR(MAX),
    FOREIGN KEY (InventarioId) REFERENCES Inventario(Id)
);
GO

-- Tabla para Sucursales (para la gestión en la app móvil)
CREATE TABLE Sucursales (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(255) NOT NULL,
    Direccion NVARCHAR(MAX) NOT NULL,
    Telefono NVARCHAR(50),
    Activa BIT DEFAULT 1,
    FechaCreacion DATETIME DEFAULT GETDATE(),
    FechaActualizacion DATETIME DEFAULT GETDATE()
);
GO

-- Tabla para Ventas
CREATE TABLE Ventas (
    Id INT PRIMARY KEY IDENTITY(1,1),
    FechaVenta DATETIME DEFAULT GETDATE(),
    TotalVenta DECIMAL(10, 2) NOT NULL,
    TipoVenta NVARCHAR(50) NOT NULL CHECK (TipoVenta IN ('Presencial', 'Online', 'Offline')), -- Para ventas en dispositivo móvil
    SucursalId INT, -- Opcional, si la venta se asocia a una sucursal específica
    HorarioVenta TIME DEFAULT CAST(GETDATE() AS TIME), -- Para informes por franja horaria
    FOREIGN KEY (SucursalId) REFERENCES Sucursales(Id)
);
GO

-- Tabla para el detalle de cada Venta
CREATE TABLE DetalleVenta (
    Id INT PRIMARY KEY IDENTITY(1,1),
    VentaId INT NOT NULL,
    ProductoId INT NOT NULL,
    Cantidad INT NOT NULL,
    PrecioUnitarioVenta DECIMAL(10, 2) NOT NULL,
    NotasPersonalizacion NVARCHAR(MAX), -- Para atributos seleccionados (ej: "Masa: Maíz Amarillo, Relleno: Recado Rojo")
    FOREIGN KEY (VentaId) REFERENCES Ventas(Id),
    FOREIGN KEY (ProductoId) REFERENCES Productos(Id)
);
GO

-- Tabla para Notificaciones Push (para la app móvil)
CREATE TABLE Notificaciones (
    Id INT PRIMARY KEY IDENTITY(1,1),
    TipoNotificacion NVARCHAR(50) NOT NULL CHECK (TipoNotificacion IN ('Venta', 'FinCoccion')),
    Mensaje NVARCHAR(MAX) NOT NULL,
    FechaCreacion DATETIME DEFAULT GETDATE(),
    Enviada BIT DEFAULT 0,
    DestinatarioId NVARCHAR(255) -- Podría ser un ID de usuario o token de dispositivo
);
GO

-- Índices para mejorar el rendimiento de las consultas
CREATE INDEX IX_Productos_TipoProducto ON Productos (TipoProducto);
CREATE INDEX IX_MovimientosInventario_InventarioId ON MovimientosInventario (InventarioId);
CREATE INDEX IX_Ventas_FechaVenta ON Ventas (FechaVenta);
CREATE INDEX IX_Ventas_SucursalId ON Ventas (SucursalId);
CREATE INDEX IX_DetalleVenta_VentaId ON DetalleVenta (VentaId);
CREATE INDEX IX_DetalleVenta_ProductoId ON DetalleVenta (ProductoId);
CREATE INDEX IX_ValoresAtributo_AtributoId ON ValoresAtributo (AtributoId);