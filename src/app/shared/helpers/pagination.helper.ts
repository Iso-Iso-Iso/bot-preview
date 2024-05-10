import { PaginationMeta } from "../interfaces/paginationMeta.interface";

export class PaginationHelper {
    static getPaginationMeta(count: number, perPage: number = 20): PaginationMeta {
        const totalPages = Math.ceil(count / perPage);

        return {
            count,
            perPage,
            totalPages,
        };
    }
}
