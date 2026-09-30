/** Icons used by the home chapters (a subset of the shared IconName union). */
export type HomeCategoryIcon =
  'zap' | 'dumbbell' | 'meditation' | 'trending-up' | 'brain' | 'smile' | 'shield' | 'target';

/** One "chapter" of the home page story. */
export interface HomeCategory {
  readonly number: string;
  readonly title: string;
  /** The reader's inner voice for this chapter ("Quiero empezar."). */
  readonly intent: string;
  readonly description: string;
  /** Base name under /images/home; files exist as `<image>-640|1200.webp|jpg`. */
  readonly image: string;
  readonly imageAlt: string;
  /** CSS object-position that keeps the subject in frame when cropped. */
  readonly imageFocus: string;
  readonly icon: HomeCategoryIcon;
  readonly cta: string;
  readonly link: string;
}

export const HOME_CATEGORIES: readonly HomeCategory[] = [
  {
    number: '01',
    title: 'Encuentra tu propósito',
    intent: 'Quiero saber para qué estoy aquí.',
    description:
      'No se trata solamente de saber a dónde quieres llegar. Se trata de saber por qué.',
    image: 'proposito',
    imageAlt: 'Persona de espaldas contemplando un gran paisaje de montañas',
    imageFocus: '50% 45%',
    icon: 'target',
    cta: 'Descubrir mi propósito',
    link: '/proposito',
  },
  {
    number: '02',
    title: 'Motivación',
    intent: 'Quiero empezar.',
    description: 'Encuentra la fuerza para seguir adelante, incluso cuando no tengas ganas.',
    image: 'motivacion',
    imageAlt: 'Silueta de una persona en la cima de una montaña al amanecer',
    imageFocus: '30% 50%',
    icon: 'zap',
    cta: 'Explorar motivación',
    link: '/motivacion',
  },
  {
    number: '03',
    title: 'Fitness',
    intent: 'Quiero fortalecerme.',
    description: 'Entrena tu cuerpo, fortalece tu mente y alcanza tu máximo potencial.',
    image: 'fitness',
    imageAlt: 'Hombre entrenando con una mancuerna en un gimnasio oscuro',
    imageFocus: '55% 40%',
    icon: 'dumbbell',
    cta: 'Comenzar entrenamiento',
    link: '/entrenamientos',
  },
  {
    number: '04',
    title: 'Meditación',
    intent: 'Quiero encontrar calma.',
    description: 'Aprende a controlar tu mente, vivir el presente y encontrar claridad.',
    image: 'meditacion',
    imageAlt: 'Persona meditando sobre el agua al amanecer',
    imageFocus: '50% 55%',
    icon: 'meditation',
    cta: 'Explorar meditación',
    link: '/meditacion',
  },
  {
    number: '05',
    title: 'Automejora',
    intent: 'Quiero crecer.',
    description: 'Aprende, crece y conviértete cada día en una mejor versión de ti mismo.',
    image: 'automejora',
    imageAlt: 'Hombre escribiendo en un diario a la luz de una vela',
    imageFocus: '50% 30%',
    icon: 'trending-up',
    cta: 'Comenzar',
    link: '/automejora',
  },
  {
    number: '06',
    title: 'Mentalidad',
    intent: 'Quiero pensar diferente.',
    description: 'Piensa diferente, supera tus límites y construye una mente más fuerte.',
    image: 'mentalidad',
    imageAlt: 'Hombre pensativo en penumbra',
    imageFocus: '50% 10%',
    icon: 'brain',
    cta: 'Fortalecer mi mentalidad',
    link: '/mentalidad',
  },
  {
    number: '07',
    title: 'Persona positiva',
    intent: 'Quiero vivir mejor.',
    description: 'Elige la gratitud, la buena energía y rodéate de lo que suma.',
    image: 'positiva',
    imageAlt: 'Persona con los brazos abiertos frente al atardecer en las montañas',
    imageFocus: '50% 45%',
    icon: 'smile',
    cta: 'Descubrir',
    link: '/persona-positiva',
  },
  {
    number: '08',
    title: 'Valentía',
    intent: 'Quiero enfrentar mis miedos.',
    description: 'Enfrenta tus miedos, toma acción y haz que suceda.',
    image: 'valentia',
    imageAlt: 'Escalador subiendo una pared de roca al atardecer',
    imageFocus: '25% 50%',
    icon: 'shield',
    cta: 'Ser más valiente',
    link: '/valentia',
  },
];
