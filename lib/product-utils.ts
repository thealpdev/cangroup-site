// Helper function for getting localized product names
export function getLocalizedProductName(product: any, locale: string): string {
    const nameKey = `name_${locale}`;
    return product[nameKey] ||
        product.name_de ||
        product.name_tr ||
        product.name_en ||
        product.name_fr ||
        product.name ||
        'Unnamed Product';
}

// Helper for  descriptions
export function getLocalizedProductDescription(product: any, locale: string): string {
    const descKey = `description_${locale}`;
    return product[descKey] ||
        product.description_de ||
        product.description_tr ||
        product.description_en ||
        product.description_fr ||
        product.description ||
        '';
}

// Helper for specs
export function getLocalizedProductSpecs(product: any, locale: string): string {
    const specsKey = `specs_${locale}`;
    return product[specsKey] ||
        product.specs_de ||
        product.specs_tr ||
        product.specs_en ||
        product.specs_fr ||
        product.specs ||
        '';
}
