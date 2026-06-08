import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App implements OnInit, OnDestroy {
  protected readonly year = new Date().getFullYear();
  protected readonly whatsappUrl = `https://wa.me/5554993225075?text=${encodeURIComponent(
    'Olá, Ícaro! Vim pelo site e tenho interesse na Metodologia Glúteo 3D. Gostaria de saber mais sobre a consultoria!',
  )}`;

  protected readonly resultados = [
    'resultado1.png',
    'resultado2.png',
    'resultado3.png',
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
  private autoPlayId?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.autoPlayId = setInterval(() => this.nextSlide(), 5000);
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
}
