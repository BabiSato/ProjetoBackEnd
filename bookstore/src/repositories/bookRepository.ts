import { Pool } from 'pg';
import pool from '../config/database';
import { Book } from '../models/bookModel';

export class BookRepository {
  private pool: Pool = pool;

  async getAllBooks(): Promise<Book[]> {
    // Seleciona apenas as colunas necessárias
    const { rows } = await this.pool.query('SELECT id, title, author, price FROM books');
    return rows;
  }

  async addBook(title: string, author: string, price: number): Promise<Book> {
    // Retorna apenas as colunas que você precisa
    const query = 'INSERT INTO books (title, author, price) VALUES ($1, $2, $3) RETURNING id, title, author, price';
    const { rows } = await this.pool.query(query, [title, author, price]);
    return rows[0];
  }
}