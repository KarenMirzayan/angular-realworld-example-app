import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { ArticleListConfig } from "../models/article-list-config.model";
import { Article } from "../models/article.model";

@Injectable({ providedIn: "root" })
export class ArticlesService {
  constructor(private readonly http: HttpClient) {}

  query(
    config: ArticleListConfig,
  ): Observable<{ articles: Article[]; articlesCount: number }> {
    // Convert any filters over to Angular's URLSearchParams
    let params = new HttpParams();

    Object.keys(config.filters).forEach((key) => {
      // @ts-ignore
      params = params.set(key, config.filters[key]);
    });

    return of({ articles: [
      {
        slug: "string",
        title: "string",
        description: "string",
        body: "string",
        tagList: ["string[]"],
        createdAt: "string",
        updatedAt: "string",
        favorited: false,
        favoritesCount: 1,
        author: {
          username: "string",
          bio: "string",
          image: "https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75",
          following: false
        }
      },
      {
        slug: "string",
        title: "string",
        description: "string",
        body: "string",
        tagList: ["string[]"],
        createdAt: "string",
        updatedAt: "string",
        favorited: false,
        favoritesCount: 1,
        author: {
          username: "string",
          bio: "string",
          image: "https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75",
          following: false
        }
      }
    ] as Article[], articlesCount: 1})
  }

  get(slug: string): Observable<Article> {
    return of({
      slug: "string",
      title: "string",
      description: "string",
      body: "string",
      tagList: ["string[]"],
      createdAt: "string",
      updatedAt: "string",
      favorited: false,
      favoritesCount: 1,
      author: {
        username: "string",
        bio: "string",
        image: "https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75",
        following: false
      }
    })
    return this.http
      .get<{ article: Article }>(`/articles/${slug}`)
      .pipe(map((data) => data.article));
  }

  delete(slug: string): Observable<void> {
    return this.http.delete<void>(`/articles/${slug}`);
  }

  create(article: Partial<Article>): Observable<Article> {
    return this.http
      .post<{ article: Article }>("/articles/", { article: article })
      .pipe(map((data) => data.article));
  }

  update(article: Partial<Article>): Observable<Article> {
    return this.http
      .put<{ article: Article }>(`/articles/${article.slug}`, {
        article: article,
      })
      .pipe(map((data) => data.article));
  }

  favorite(slug: string): Observable<Article> {
    return this.http
      .post<{ article: Article }>(`/articles/${slug}/favorite`, {})
      .pipe(map((data) => data.article));
  }

  unfavorite(slug: string): Observable<void> {
    return this.http.delete<void>(`/articles/${slug}/favorite`);
  }
}
