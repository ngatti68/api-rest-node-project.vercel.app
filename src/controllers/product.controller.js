import ProductModel from '../models/product.model.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await ProductModel.findById((req.params.id));
        if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar producto' });
    }
};

export const getProductsByCategory = async (req, res) => {
    try {
        const category = req.params.category.toLowerCase();
        const products = await ProductModel.findByCategory(category);
        if (!products.length) return res.status(404).json({ error: 'No se encontraron productos en esa categoría' });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar por categoría' });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, price, category } = req.body;

        if (!name || !price || !category) {
            return res.status(400).json({
                error: 'Faltan campos obligatorios: name, price y category'
            });
        }

        const newProduct = await ProductModel.create({ name, price, category });

        res.status(201).json({
            message: 'Producto creado exitosamente',
            product: newProduct
        });

    } catch (error) {
        console.error('Error en createProduct:', error);
        res.status(500).json({
            error: 'Error interno al crear el producto'
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const id = (req.params.id);
        const { name, price, category } = req.body;

        if (!name || !price || !category) {
            return res.status(400).json({
                error: 'Faltan campos obligatorios: name, price y category'
            });
        }

        const updatedProduct = await ProductModel.updateById(id, { name, price, category });

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json({
            message: 'Producto actualizado exitosamente',
            product: updatedProduct
        });
    } catch (error) {
        console.error('Error en updateProduct:', error);
        res.status(500).json({ error: 'Error interno al actualizar el producto' });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const success = await ProductModel.deleteById((req.params.id));
        if (!success) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
};