import fileService from '../src/services/fileService.js';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../src/config/firebase.js';

const COLLECTION_NAME = 'products';

const migrateProducts = async () => {
    const products = await fileService.readJson('products.json');

    let migrated = 0;
    let skippedByDuplicate = 0;

    for (const product of products) {
        const normalizedCategory = product.category?.toLowerCase().trim();

        // Verificar duplicados por nombre + categoría
        const q = query(
            collection(db, COLLECTION_NAME),
            where('name', '==', product.name),
            where('category', '==', normalizedCategory)
        );
        const existingByNameCategory = await getDocs(q);
        if (!existingByNameCategory.empty) {
            console.log(`Producto duplicado por nombre/categoría. Omitido: ${product.name} (${normalizedCategory})`);
            skippedByDuplicate++;
            continue;
        }

        const normalizedProduct = {
            ...product,
            category: normalizedCategory
        };

        const ref = await addDoc(collection(db, COLLECTION_NAME), normalizedProduct);
        console.log(`Producto migrado: ${product.name} → ID generado: ${ref.id}`);
        migrated++;
    }

    console.log('\nResumen de migración:');
    console.log(`Migrados: ${migrated}`);
    console.log(`Omitidos por nombre/categoría duplicada: ${skippedByDuplicate}`);
    console.log('Migración finalizada');
};

migrateProducts();