export const getSortCriteria = (sortBy) => {
    let sortCriteria = {};
    
    switch (sortBy) {
      case 'latest':
        sortCriteria = { createdAt: -1 };  
        break;
      case 'price-asc':
        sortCriteria = { price: 1 };  
        break;
      case 'price-desc':
        sortCriteria = { price: -1 };  
        break;
      default:
        sortCriteria = { createdAt: -1 };  
        break;
    }
    
    return sortCriteria;
  };
  