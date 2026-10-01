import { HomeContent } from '../app/features/home/domain/home-content';

/**
 * All text on the home page (Inicio), top to bottom. Edit here, push, done.
 *
 * - Chapters are numbered by their order in the list: move one to reorder it.
 * - `ContentLines` arrays render one entry per line.
 * - Images are files in `public/images/home/` (`<image>-640|1200.webp|jpg`).
 */
export const HOME_CONTENT = {
  hero: {
    kicker: 'Tu guía hacia una vida mejor',
    title: 'Lifeguide',
    slogan: ['Mejores hábitos.', 'Un tú más fuerte.'],
    text: 'Tu guía hacia un cuerpo más sano, una mente más fuerte y una vida mejor.',
    cta: { label: 'Comienza ahora', link: '/registro' },
    accent: ['Disciplina hoy,', 'resultados mañana'],
    imageAlt: 'Hombre de espaldas en un gimnasio oscuro',
  },

  intro: {
    eyebrow: 'Construye tu mejor versión',
    title: 'El cambio comienza',
    titleEmphasis: 'contigo.',
    text: [
      'No necesitas cambiar toda tu vida de un día para otro.',
      'Necesitas empezar con pequeños pasos.',
    ],
  },

  chapters: [
    {
      title: 'Encuentra tu propósito',
      intent: 'Quiero saber para qué estoy aquí.',
      description:
        'No se trata solamente de saber a dónde quieres llegar. Se trata de saber por qué.',
      image: 'proposito',
      imageAlt: 'Persona de espaldas contemplando un gran paisaje de montañas',
      imageFocus: '50% 45%',
      icon: 'target',
      cta: { label: 'Descubrir mi propósito', link: '/proposito' },
    },
    {
      title: 'Motivación',
      intent: 'Quiero empezar.',
      description: 'Encuentra la fuerza para seguir adelante, incluso cuando no tengas ganas.',
      image: 'motivacion',
      imageAlt: 'Silueta de una persona en la cima de una montaña al amanecer',
      imageFocus: '30% 50%',
      icon: 'zap',
      cta: { label: 'Explorar motivación', link: '/motivacion' },
    },
    {
      title: 'Fitness',
      intent: 'Quiero fortalecerme.',
      description: 'Entrena tu cuerpo, fortalece tu mente y alcanza tu máximo potencial.',
      image: 'fitness',
      imageAlt: 'Hombre entrenando con una mancuerna en un gimnasio oscuro',
      imageFocus: '55% 40%',
      icon: 'dumbbell',
      cta: { label: 'Comenzar entrenamiento', link: '/entrenamientos' },
    },
    {
      title: 'Meditación',
      intent: 'Quiero encontrar calma.',
      description: 'Aprende a controlar tu mente, vivir el presente y encontrar claridad.',
      image: 'meditacion',
      imageAlt: 'Persona meditando sobre el agua al amanecer',
      imageFocus: '50% 55%',
      icon: 'meditation',
      cta: { label: 'Explorar meditación', link: '/meditacion' },
    },
    {
      title: 'Automejora',
      intent: 'Quiero crecer.',
      description: 'Aprende, crece y conviértete cada día en una mejor versión de ti mismo.',
      image: 'automejora',
      imageAlt: 'Hombre escribiendo en un diario a la luz de una vela',
      imageFocus: '50% 30%',
      icon: 'trending-up',
      cta: { label: 'Comenzar', link: '/automejora' },
    },
    {
      title: 'Mentalidad',
      intent: 'Quiero pensar diferente.',
      description: 'Piensa diferente, supera tus límites y construye una mente más fuerte.',
      image: 'mentalidad',
      imageAlt: 'Hombre pensativo en penumbra',
      imageFocus: '50% 10%',
      icon: 'brain',
      cta: { label: 'Fortalecer mi mentalidad', link: '/mentalidad' },
    },
    {
      title: 'Persona positiva',
      intent: 'Quiero vivir mejor.',
      description: 'Elige la gratitud, la buena energía y rodéate de lo que suma.',
      image: 'positiva',
      imageAlt: 'Persona con los brazos abiertos frente al atardecer en las montañas',
      imageFocus: '50% 45%',
      icon: 'smile',
      cta: { label: 'Descubrir', link: '/persona-positiva' },
    },
    {
      title: 'Valentía',
      intent: 'Quiero enfrentar mis miedos.',
      description: 'Enfrenta tus miedos, toma acción y haz que suceda.',
      image: 'valentia',
      imageAlt: 'Escalador subiendo una pared de roca al atardecer',
      imageFocus: '25% 50%',
      icon: 'shield',
      cta: { label: 'Ser más valiente', link: '/valentia' },
    },
  ],

  finalCta: {
    eyebrow: 'Ahora empieza.',
    title: 'Tu mejor versión te espera.',
    text: ['Empieza hoy.', 'Pequeños hábitos. Grandes cambios.'],
    cta: { label: 'Comienza ahora', link: '/registro' },
    accent: ['El cambio', 'empieza en ti'],
  },
} as const satisfies HomeContent;
