import * as productModel from "../models/product.model.js";

export const getAllProducts = () => {
    return productModel.getAllProducts();
};

export const getProductById = async (id) => {
    if (!id) {
        throw new Error("El ID es obligatorio");
    }
    return productModel.getProductById(id);
};

export const getProductByCategory = async (category) => {
    if (!category || typeof category !== "string") {
        throw new Error("La categoría debe ser un texto válido");
    }
    return productModel.getProductByCategory(category);
};

export const createProduct = async (productData) => {
    const { name, price, category } = productData;

    if (!name || typeof name !== "string") {
        throw new Error("El nombre es obligatorio y debe ser texto");
    }
    if (typeof price !== "number" || price <= 0) {
        throw new Error("El precio debe ser un número mayor a 0");
    }
    if (!category || typeof category !== "string") {
        throw new Error("La categoría es obligatoria y debe ser texto");
    }

    return productModel.create({ name, price, category });
};

export const updateProduct = async (id, data) => {
    if (!id) {
        throw new Error("El ID es obligatorio para actualizar");
    }
    if (!data || Object.keys(data).length === 0) {
        throw new Error("Debe enviar al menos un campo para actualizar");
    }
    if (data.price !== undefined && (typeof data.price !== "number" || data.price <= 0)) {
        throw new Error("El precio debe ser un número mayor a 0");
    }

    return productModel.updateById(id, data);
};

export const deleteProduct = async (req, res) => {
    try {
        const success = await productModel.deleteById(req.params.id);
        if (!success) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
};