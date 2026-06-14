import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

type BlogCategory = 'Noticias' | 'Eventos' | 'Convocatorias';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string;
  author: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  readonly categories: Array<BlogCategory | 'Todos'> = [
    'Todos',
    'Noticias',
    'Eventos',
    'Convocatorias'
  ];

  selectedCategory: BlogCategory | 'Todos' = 'Todos';

  readonly posts: BlogPost[] = [
    {
      id: 1,
      title: 'Ceremonia de la Luz alumbra el camino de estudiantes de Enfermeria',
      excerpt: 'Una jornada academica y humana que resalta la vocacion de servicio, la etica profesional y el paso del conocimiento teorico a la practica.',
      category: 'Noticias',
      date: '30 abril 2026',
      author: 'Bienestar Institucional',
      image: 'assets/images/saludcomunitaria.jpg.jpg',
      imageAlt: 'Estudiantes participando en una jornada de salud comunitaria',
      featured: true
    },
    {
      id: 2,
      title: 'Profesores investigadores fortalecen la apropiacion social del conocimiento',
      excerpt: 'La investigacion aplicada sigue conectando a docentes, estudiantes y comunidades por medio de resultados utiles para el territorio.',
      category: 'Noticias',
      date: '2 mayo 2026',
      author: 'Investigaciones',
      image: 'assets/images/impacto.jpg.jpg',
      imageAlt: 'Equipo universitario en actividad de impacto social'
    },
    {
      id: 3,
      title: 'Apertura de nuevos espacios de conciliacion y orientacion juridica',
      excerpt: 'Los consultorios y centros de conciliacion amplian el acceso ciudadano a soluciones pacificas, cercanas y guiadas por expertos.',
      category: 'Noticias',
      date: '5 mayo 2026',
      author: 'Facultad de Ciencias Juridicas',
      image: 'assets/images/consultoriojuridico.jpg.jpg',
      imageAlt: 'Consultorio juridico con atencion a la comunidad'
    },
    {
      id: 4,
      title: 'Semana Internacional Uniremington 2026',
      excerpt: 'Agenda cultural, academica y deportiva para que estudiantes y docentes conecten con experiencias globales desde sus sedes.',
      category: 'Eventos',
      date: '12 al 14 mayo 2026',
      author: 'Uniremington Global',
      image: 'assets/images/eventocomunitario.jpg.webp',
      imageAlt: 'Evento comunitario universitario al aire libre'
    },
    {
      id: 5,
      title: 'Encuentro multicampus de semilleros de investigacion',
      excerpt: 'Un espacio para presentar proyectos, compartir hallazgos y fortalecer redes academicas entre jovenes investigadores.',
      category: 'Eventos',
      date: '21 mayo 2026',
      author: 'Semilleros',
      image: 'assets/images/ingenieria.jpg.jpg',
      imageAlt: 'Estudiantes trabajando en proyectos de ingenieria'
    },
    {
      id: 6,
      title: 'Convocatoria de movilidad academica para estudiantes',
      excerpt: 'Oportunidades para vivir experiencias formativas en otras instituciones y enriquecer la ruta profesional.',
      category: 'Convocatorias',
      date: 'Hasta 31 mayo 2026',
      author: 'Relaciones Internacionales',
      image: 'assets/images/asesoriaambientalysostenible.jpg.jpg',
      imageAlt: 'Estudiantes en actividad academica de sostenibilidad'
    }
  ];

  get featuredPost(): BlogPost {
    return this.posts.find(post => post.featured) ?? this.posts[0];
  }

  get filteredPosts(): BlogPost[] {
    return this.posts.filter(post => {
      return post.id !== this.featuredPost.id && (
        this.selectedCategory === 'Todos' || post.category === this.selectedCategory
      );
    });
  }

  selectCategory(category: BlogCategory | 'Todos'): void {
    this.selectedCategory = category;
  }
}
