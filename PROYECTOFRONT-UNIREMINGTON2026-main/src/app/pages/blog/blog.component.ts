import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogPost, BlogService } from '../../services/blog.services';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {
  categories = ['Todos', 'Social', 'Academico', 'Institucional'];
  selectedCategory = 'Todos';
  posts: BlogPost[] = [];
  private postsSubscription?: Subscription;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.postsSubscription = this.blogService.posts$.subscribe((posts) => {
      this.posts = posts;
      this.categories = ['Todos', ...Array.from(new Set(posts.map((post) => post.category)))];

      if (!this.categories.includes(this.selectedCategory)) {
        this.selectedCategory = 'Todos';
      }
    });
  }

  ngOnDestroy(): void {
    this.postsSubscription?.unsubscribe();
  }

  get filteredPosts(): BlogPost[] {
    return this.selectedCategory === 'Todos'
      ? this.posts
      : this.posts.filter((p) => p.category === this.selectedCategory);
  }

  selectCategory(cat: string): void {
    this.selectedCategory = cat;
  }

  toggleFlip(post: BlogPost): void {
    post.isFlipped = !post.isFlipped;
  }
}
