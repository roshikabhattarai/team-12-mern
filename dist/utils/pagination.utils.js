"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagination = void 0;
const getPagination = (count, perPage, currPage) => {
    const total_page = Math.ceil(count / perPage);
    return {
        total_page,
        total_count: count,
        current_page: currPage,
        next_page: currPage < total_page ? currPage + 1 : null,
        prev_page: currPage === 1 ? null : currPage - 1,
    };
};
exports.getPagination = getPagination;
