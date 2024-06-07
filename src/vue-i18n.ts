import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    dateInfo: {
      title: "Date and Time Information",
      buy: "Buy",
      HorarioF: "Show Times",
      availableSeats: "Available Seats",
      checkSeats: "Check Seats",
      occupiedSeats: "Occupied Seats",
      availableSeatsInfo: "Available Seats"
    },
    CompraEntradas: {
      title: "Buy Tickets",
      buy: "Buy",
      Escenario: "Scenery",
      Precio: "Total price",
      Fecha: "Date:",
      Detalles: "Price details",
      Butacas: "Select seats"
    },
    adminPanel: {
      title: "Admin Panel - Theater Functions",
      authors: "Authors",
      duration: "Duration",
      minutes: "minutes",
      actors: "Actors",
      dates: "Dates",
      functionImageAlt: "Image of the function",
      delete: "Delete",
      edit: "Edit",
      cancel: "Cancel",
      editSessions: "Edit Sessions",
      cancelEditSessions: "Cancel Edit Sessions",
      name: "Name",
      description: "Description",
      dateOne: "Date 1",
      dateTwo: "Date 2",
      dateThree: "Date 3",
      poster: "Poster",
      save: "Save",
      addNewFunction: "Add New Function",
      images: "Images",
      editSessionsTitle: "Edit Sessions",
      deleteSession: "Delete Session",
      addSession: "Add New Session"
    },
    functionDetails: {
      Comprar: "Buy Tickets",
      Info: "Function Info",
      Reparto: "Cast",
      Horarios: "Schedules",
      HorarioF: "Waiting for Godot"
    },
    navigation: {
      program: 'Program',
      information: 'Information',
      otherActivities: 'Activities',
      contact: 'Contact',
      login: 'Login',
      searchPlaceholder: 'Search...',
      searchButton: 'Search'
    },
    performance: {
      available: 'Available:',
      buyTickets: 'Buy Tickets',
      previous: 'Previous',
      next: 'Next'
    },
    error: {
      searchError: 'Error searching. Please try again.'
    },
    functions: {
      'Esperando a Godot': {
        name: 'Waiting for Godot',
        description: 'An absurd play that follows two characters, Vladimir and Estragon, as they wait in a desolate place for someone named Godot, exploring themes of existence, alienation, and hope.'
      },
      'El Fantasma de la Ópera': {
        name: 'The Phantom of the Opera',
        description: 'An iconic musical play that tells the story of a mysterious and disfigured man known as the Phantom, who lives in the passages of the Paris Opera House and becomes obsessed with a young and talented soprano, Christine.'
      },
      'Esto No Es Un Show': {
        name: 'This Is Not A Show',
        description: 'A bold show that defies conventions, combining elements of theater, dance, and performance art. The plot follows an eclectic group of artists as they explore themes of identity, reality, and perception through avant-garde performances.'
      },
      'Hamlet': {
        name: 'Hamlet',
        description: 'One of William Shakespeare’s most emblematic tragedies, centered on the story of Prince Hamlet of Denmark, who seeks to avenge his father’s death. The play explores complex themes such as madness, betrayal, revenge, and morality.'
      },
      'El Rey León': {
        name: 'The Lion King',
        description: 'A spectacular musical based on the famous Disney animated film. The story follows the adventures of Simba, a young lion who must face numerous challenges to reclaim his place as the rightful king of the savannah. The musical is known for its impressive use of costumes, puppets, and visual effects to recreate the African environment.'
      },
      'Bodas de sangre': {
        name: 'Blood Wedding',
        description: 'A contemporary romantic comedy that follows the story of several couples preparing for their respective weddings. The play weaves a plot full of romantic entanglements, comedic misunderstandings, and moments of reflection on relationships and marriage.'
      },
      'B-Vocal': {
        name: 'B-Vocal',
        description: 'An acclaimed vocal group known for their ability to fuse a cappella and comedy in their performances. B-Vocal captivates the audience with their unique blend of music, humor, and the surprising ability to create instrumental sounds with their voices, exploring various musical genres from pop to classical.'
      }
    },
    showPoster: {
      buyTickets: 'Buy Tickets'
    },
    contact: {
      title: "Contact",
      postalCode: "Postal Code",
      address: "Address",
      phone: "Phone",
      email: "Email"
    },
    activities: {
      title: "Other Activities",
      guidedToursTitle: "Guided Tours",
      guidedToursDescription: "Discover the secrets behind the scenes with our exciting guided tours at UrbanTheater. Join us to explore the hidden corners of this iconic cultural space. Our expert guides will take you through the backstage, revealing the rich history of the theater and sharing fascinating anecdotes about the productions that have illuminated our stage over the years. From the dressing rooms to the main curtain, you will experience the magic of theater from a unique perspective. Immerse yourself in the history and charm that make our theater a truly special place!"
    },
    information: {
      title: "Information",
      ticketOfficeHoursTitle: "Ticket Office Hours",
      ticketOfficeHoursDescription: "We are pleased to announce that our opening hours for ticket purchases are especially convenient for our visitors. From Monday to Friday, our ticket offices are open from 8:00 a.m. to 7:00 p.m., allowing both early risers and those who prefer the afternoon to purchase their tickets without inconvenience. On weekends, we extend our hours: we open at 9:00 a.m. and close at 8:00 p.m., ensuring that even those who enjoy a well-deserved morning rest can plan their visit. Additionally, for added convenience, our website offers the ability to purchase tickets online 24 hours a day, every day of the week, further facilitating access to our events and shows.",
      customerServiceTitle: "Customer Service",
      customerServiceDescription: "In our commitment to providing exceptional service, our customer service team is available to answer all your queries and needs. From Monday to Friday, you can contact us from 9:00 a.m. to 6:00 p.m., where we will be happy to assist you.",
      facilityConditionsTitle: "Facility Conditions",
      facilityConditionsDescription: "While enjoying the facilities of UrbanTheater, we ask that you follow certain conditions to ensure a pleasant experience for everyone. Please follow the staff's instructions when entering and exiting, and maintain courteous and respectful behavior at all times to preserve the atmosphere of the place. Smoking, consuming unauthorized food or beverages, and any activity that may interfere with overall enjoyment are strictly prohibited. Additionally, out of respect for the artists and the audience, we request that you refrain from taking photographs and recordings during the performances. We appreciate your cooperation in creating a harmonious environment and fully enjoying your experience at our theater."
    }
  },
  es: {
    dateInfo: {
      title: "Información de Fechas y Horas",
      buy: "Comprar",
      HorarioF: "Horarios de la Función",
      availableSeats: "Asientos Disponibles",
      checkSeats: "Ver Asientos",
      occupiedSeats: "Asientos Ocupados",
      availableSeatsInfo: "Asientos Disponibles"
    },
    CompraEntradas: {
      title: "Comprar Entradas",
      buy: "Comprar",
      Escenario: "Escenario",
      Precio: "Precio Total",
      Fecha: "Fecha:",
      Detalles: "Detalles Compra",
      Butacas: "Butacas Seleccionadas"
    },
    adminPanel: {
      title: "Panel de Administrador - Funciones de Teatro",
      authors: "Autores",
      duration: "Duración",
      minutes: "minutos",
      actors: "Actores",
      dates: "Fechas",
      functionImageAlt: "Imagen de la función",
      delete: "Eliminar",
      edit: "Editar",
      cancel: "Cancelar",
      editSessions: "Editar Sesiones",
      cancelEditSessions: "Cancelar Edición Sesiones",
      name: "Nombre",
      description: "Descripción",
      dateOne: "Fecha 1",
      dateTwo: "Fecha 2",
      dateThree: "Fecha 3",
      poster: "Cartel",
      save: "Guardar",
      addNewFunction: "Agregar Nueva Función",
      images: "Imágenes",
      editSessionsTitle: "Editar Sesiones",
      deleteSession: "Eliminar Sesión",
      addSession: "Agregar Nueva Sesión"
    },
    functionDetails: {
      Comprar: "Comprar Entradas",
      Info: "Información de la Función",
      Reparto: "Reparto",
      Horarios: "Horarios",
      HorarioF: "Esperando a Godot"
    },
    navigation: {
      program: 'Programación',
      information: 'Información',
      otherActivities: 'Actividades',
      contact: 'Contacto',
      login: 'Login',
      searchPlaceholder: 'Buscar...',
      searchButton: 'Buscar'
    },
    performance: {
      available: 'Disponibles:',
      buyTickets: 'Comprar Entradas',
      previous: 'Anterior',
      next: 'Siguiente'
    },
    error: {
      searchError: 'Error al buscar. Por favor, inténtalo de nuevo.'
    },
    functions: {
      'Esperando a Godot': {
        name: 'Esperando a Godot',
        description: 'Una obra teatral absurda que sigue a dos personajes, Vladimir y Estragon, mientras esperan en un lugar desolado a alguien llamado Godot, explorando temas de la existencia, la alienación y la esperanza.'
      },
      'El Fantasma de la Ópera': {
        name: 'El Fantasma de la Ópera',
        description: 'Una icónica obra de teatro musical que narra la historia de un misterioso y desfigurado hombre conocido como el Fantasma, que vive en los pasadizos de la Ópera de París y se obsesiona con una joven y talentosa soprano, Christine.'
      },
      'Esto No Es Un Show': {
        name: 'Esto No Es Un Show',
        description: 'Un audaz espectáculo que desafía las convenciones, combinando elementos de teatro, danza y performance art. La trama sigue a un grupo ecléctico de artistas mientras exploran temas de identidad, realidad y percepción a través de actuaciones vanguardistas.'
      },
      'Hamlet': {
        name: 'Hamlet',
        description: 'Una de las tragedias más emblemáticas de William Shakespeare, centrada en la historia del príncipe Hamlet de Dinamarca, quien busca vengar la muerte de su padre. La obra explora temas complejos como la locura, la traición, la venganza y la moralidad.'
      },
      'El Rey León': {
        name: 'El Rey León',
        description: 'Un musical espectacular basado en la famosa película animada de Disney. La historia sigue las aventuras de Simba, un joven león que debe enfrentar numerosos desafíos para reclamar su lugar como el legítimo rey de la sabana. El musical es conocido por su impresionante uso de disfraces, marionetas y efectos visuales para recrear el ambiente de África.'
      },
      'Bodas de sangre': {
        name: 'Bodas de sangre',
        description: 'Una comedia romántica contemporánea que sigue la historia de varias parejas que se preparan para sus respectivas bodas. La obra teje una trama llena de enredos amorosos, malentendidos cómicos y momentos de reflexión sobre las relaciones y el matrimonio.'
      },
      'B-Vocal': {
        name: 'B-Vocal',
        description: 'Un aclamado grupo vocal que destaca por su habilidad para fusionar a cappella y comedia en sus actuaciones. B-Vocal cautiva al público con su mezcla única de música, humor y la sorprendente habilidad de crear sonidos instrumentales con sus voces, explorando diversos géneros musicales desde el pop hasta el clásico.'
      }
    },
    showPoster: {
      buyTickets: 'Comprar Entradas'
    },
    contact: {
      title: "Contacto",
      postalCode: "Código Postal",
      address: "Dirección",
      phone: "Teléfono",
      email: "Correo Electrónico"
    },
    activities: {
      title: "Otras Actividades",
      guidedToursTitle: "Visitas Guiadas",
      guidedToursDescription: "Descubre los secretos detrás del escenario con nuestras emocionantes visitas guiadas al teatro Al UrbanTheater. Únete a nosotros para explorar los rincones ocultos de este icónico espacio cultural. Nuestros guías expertos te llevarán a través de los bastidores, revelando la rica historia del teatro y compartiendo anécdotas fascinantes sobre las producciones que han iluminado nuestro escenario a lo largo de los años. Desde los camerinos hasta el telón principal, experimentarás la magia del teatro desde una perspectiva única. ¡Sumérgete en la historia y el encanto que hacen de nuestro teatro un lugar verdaderamente especial!"
    },
    information: {
      title: "Información",
      ticketOfficeHoursTitle: "Horarios de taquilla",
      ticketOfficeHoursDescription: "Nos complace anunciar que nuestro horario de apertura para la compra de entradas es especialmente conveniente para nuestros visitantes. De lunes a viernes, nuestras taquillas están abiertas desde las 8:00 a.m. hasta las 7:00 p.m., permitiendo así que tanto los madrugadores como los que prefieren las tardes puedan adquirir sus entradas sin inconvenientes. Los fines de semana, extendemos nuestro horario: abrimos a las 9:00 a.m. y cerramos a las 8:00 p.m., asegurándonos de que incluso aquellos que disfrutan de un merecido descanso en la mañana puedan planificar su visita. Además, para mayor comodidad, nuestra página web ofrece la posibilidad de comprar entradas en línea las 24 horas del día, todos los días de la semana, facilitando aún más el acceso a nuestros eventos y espectáculos.",
      customerServiceTitle: "Atención al cliente",
      customerServiceDescription: "En nuestro compromiso por brindar un servicio excepcional, nuestro equipo de atención al cliente está disponible para responder a todas sus consultas y necesidades. De lunes a viernes, puede contactarnos de 9:00 a.m. a 6:00 p.m., donde estaremos encantados.",
      facilityConditionsTitle: "Condiciones en las instalaciones",
      facilityConditionsDescription: "Al disfrutar de las instalaciones del teatro UrbanTheater, te pedimos que sigas ciertas condiciones para garantizar una experiencia agradable para todos. Por favor, respeta las indicaciones del personal al entrar y salir, y mantén un comportamiento cortés y respetuoso en todo momento para preservar la atmósfera del lugar. Se prohíbe estrictamente fumar, consumir alimentos o bebidas no autorizadas, así como cualquier actividad que pueda interferir con el disfrute general. Asimismo, por respeto a los artistas y al público, solicitamos abstenerse de realizar fotografías y grabaciones durante las funciones. Agradecemos tu colaboración para crear un ambiente armonioso y disfrutar al máximo de tu experiencia en nuestro teatro."
    }
  }
};

const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'en', 
  messages
});

export default i18n;