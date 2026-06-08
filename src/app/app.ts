import { DOCUMENT } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App implements OnInit, OnDestroy {
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  protected readonly year = new Date().getFullYear();
  protected readonly whatsappUrl = `https://wa.me/5554993225075?text=${encodeURIComponent(
    'Olá, Ícaro! Vim pelo site e tenho interesse na Metodologia Glúteo 3D. Gostaria de saber mais sobre a consultoria!',
  )}`;

  protected readonly resultados = [
    'resultado01.png',
    'resultado02.png',
    'resultado03.png',
    'resultado4.png',
    'resultado5.png',
    'resultado6.png',
    'resultado7.png',
  ];

  protected readonly pilares = [
    {
      title: 'Volume',
      desc: 'Estratégias específicas para estimular a hipertrofia muscular.',
    },
    {
      title: 'Definição',
      desc: 'Treinos planejados para valorizar o contorno e a estética dos glúteos.',
    },
    {
      title: 'Simetria',
      desc: 'Desenvolvimento equilibrado para criar um resultado harmonioso.',
    },
  ];

  protected readonly metodologiaItens = [
    'Avaliação individual',
    'Seleção estratégica de exercícios',
    'Progressão de carga planejada',
    'Correção técnica constante',
    'Acompanhamento próximo da evolução',
  ];

  protected readonly paraQuem = [
    'Desejam desenvolver os glúteos de forma eficiente',
    'Buscam acompanhamento profissional especializado',
    'Estão cansadas de treinar sem ver evolução',
    'Querem um método estruturado e baseado em ciência',
    'Procuram resultados reais com segurança',
  ];

  protected readonly formacao = [
    {
      title: 'Educação Física',
      desc: 'Formado desde 2020.',
    },
    {
      title: 'Pós-Graduação em Treinamento Feminino',
      desc: 'Especialização voltada para as necessidades e particularidades do público feminino.',
    },
    {
      title: 'Pós-Graduação em Bodybuilding Coach',
      desc: 'Atualmente em andamento, aprofundando conhecimentos em hipertrofia e desenvolvimento corporal.',
    },
  ];

  protected readonly currentSlide = signal(0);
  protected readonly menuOpen = signal(false);
  private autoPlayId?: ReturnType<typeof setInterval>;
  private touchStartX = 0;
  private readonly swipeThreshold = 50;

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  ngOnInit(): void {
    this.setShareMeta();
    this.autoPlayId = setInterval(() => this.nextSlide(), 5000);
  }

  private setShareMeta(): void {
    const origin = this.document.defaultView?.location.origin;
    if (!origin) return;

    const imageUrl = `${origin}/foto1.jpeg`;
    const title = 'Ícaro Venâncio | Personal Trainer — Glúteo 3D';
    const description =
      'Personal Trainer especializado em desenvolvimento de glúteos. Criador da Metodologia Glúteo 3D.';

    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:url', content: `${origin}/` });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
  }

  ngOnDestroy(): void {
    if (this.autoPlayId) clearInterval(this.autoPlayId);
  }

  protected prevSlide(): void {
    const total = this.resultados.length;
    this.currentSlide.update((i) => (i - 1 + total) % total);
  }

  protected nextSlide(): void {
    const total = this.resultados.length;
    this.currentSlide.update((i) => (i + 1) % total);
  }

  protected goToSlide(index: number): void {
    this.currentSlide.set(index);
  }

  protected onCarouselTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].clientX;
  }

  protected onCarouselTouchEnd(event: TouchEvent): void {
    const diff = this.touchStartX - event.changedTouches[0].clientX;

    if (Math.abs(diff) < this.swipeThreshold) return;

    if (diff > 0) {
      this.nextSlide();
    } else {
      this.prevSlide();
    }
  }
}
