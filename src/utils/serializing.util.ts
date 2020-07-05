/**
 * @description Blacklist an entity when Content-Type is application/json
 * @param blacklist Blacklist properties
 * @param entity Entity to serialize
 */
const filter = (blacklist: string[], entity: any): any => {
  const obj = {} as any;
  Object.keys(entity).map((key) => {
    if (!blacklist.includes(key)) {
      obj[key] = entity[key];
    }
  });
  return obj;
};

/**
 * Serialize entity into paginated format
 * @param entities Entity to be paginated
 * @param page Current page
 * @param perPage Number of data per page
 */
const paginate = (entities: any[], page: number, perPage: number): any => {
  const total = entities.length;
  const totalPages = Math.ceil(total / perPage);
  const skip = (page - 1) * perPage;
  return {
    total,
    totalPages,
    currentPage: page,
    data: entities.slice(skip, skip + perPage),
  };
};
export { filter, paginate };
