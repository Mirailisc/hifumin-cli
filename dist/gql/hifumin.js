"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagesById = void 0;
exports.getPagesById = `
query GET_PAGES_BY_ID($id: Int!) {
  nhentai {
    by(id: $id) {
      id
      numPages
      mediaId
      uploadDate
      title {
        english
        japanese
      }
      tags {
        name
      }
      images {
        pages {
          t
          w
          h
        }
      }
    }
  }
}`;
