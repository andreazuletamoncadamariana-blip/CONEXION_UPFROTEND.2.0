import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  image: string;
  content: string;
  isFlipped: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly storageKey = 'uniremington-blog-posts';

  private readonly defaultPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Uniremington al Parque: Tamesis 2026',
      category: 'Social',
      image: 'assets/images/compromiso.jpg.jpg',
      content: 'Una jornada de integracion donde la comunidad academica sale a los espacios publicos para ofrecer servicios gratuitos, orientacion profesional y actividades ludicas para toda la familia.',
      isFlipped: false
    },
    {
      id: 2,
      title: 'Derechos Humanos y Paz',
      category: 'Social',
      image: 'assets/images/asesoriadeclaracionderenta.jpg.jpg',
      content: 'Proyecto enfocado en la sensibilizacion y formacion de lideres sociales. Trabajamos de la mano con las comunidades para promover la reconciliacion y el respeto por los derechos fundamentales.',
      isFlipped: false
    },
    {
      id: 3,
      title: 'Brigada de Salud',
      category: 'Social',
      image: 'assets/images/brigadajuri.jpg.jpg',
      content: 'Nuestros estudiantes de medicina y enfermeria brindan atencion primaria, toma de presion y asesorias nutricionales totalmente gratuitas para las familias mas vulnerables del municipio.',
      isFlipped: false
    },
    {
      id: 4,
      title: 'Uniremington Reforesta',
      category: 'Social',
      image: 'assets/images/medioambiente.jpg.jpg',
      content: 'Iniciativa de sostenibilidad ambiental enfocada en la siembra de arboles nativos y limpieza de cuencas hidrograficas locales con el apoyo de nuestros estudiantes.',
      isFlipped: false
    },
    {
      id: 5,
      title: 'Consultorio Juridico',
      category: 'Social',
      image: 'assets/images/consultoriojuridico.jpg.jpg',
      content: 'Brindamos asesoria legal gratuita en temas de derecho civil, laboral y familiar para personas que no cuentan con los recursos para pagar un abogado privado.',
      isFlipped: false
    },
    {
      id: 6,
      title: 'Alianzas Estrategicas',
      category: 'Academico',
      image: 'assets/images/compromiso.jpg.jpg',
      content: 'Fortalecemos nuestro impacto firmando nuevos convenios con universidades internacionales y empresas lideres para garantizar mejores practicas de aprendizaje.',
      isFlipped: false
    }
  ];

  private posts = this.loadPosts();
  private postsSubject = new BehaviorSubject<BlogPost[]>(this.getPosts());
  posts$ = this.postsSubject.asObservable();

  getPosts(): BlogPost[] {
    return this.posts.map((post) => ({ ...post }));
  }

  agregarNoticia(post: Omit<BlogPost, 'id' | 'isFlipped'>): void {
    const nuevaNoticia: BlogPost = { ...post, id: Date.now(), isFlipped: false };
    this.posts = [nuevaNoticia, ...this.posts];
    this.publish();
  }

  quitarNoticia(id: number): void {
    this.posts = this.posts.filter((p) => p.id !== id);
    this.publish();
  }

  modificarNoticia(id: number, nuevosDatos: Partial<Omit<BlogPost, 'id' | 'isFlipped'>>): void {
    this.posts = this.posts.map((post) => post.id === id ? { ...post, ...nuevosDatos, isFlipped: false } : post);
    this.publish();
  }

  anexarContenido(id: number, contenidoExtra: string): void {
    const post = this.posts.find((item) => item.id === id);

    if (post && contenidoExtra.trim()) {
      this.modificarNoticia(id, { content: `${post.content}\n\n${contenidoExtra.trim()}` });
    }
  }

  private publish(): void {
    this.savePosts();
    this.postsSubject.next(this.getPosts());
  }

  private loadPosts(): BlogPost[] {
    const savedPosts = localStorage.getItem(this.storageKey);

    if (!savedPosts) {
      return this.defaultPosts;
    }

    try {
      const parsedPosts = JSON.parse(savedPosts) as BlogPost[];
      return Array.isArray(parsedPosts) && parsedPosts.length ? parsedPosts : this.defaultPosts;
    } catch {
      return this.defaultPosts;
    }
  }

  private savePosts(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.posts));
  }
}
