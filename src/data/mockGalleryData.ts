// 향기 작품에 대한 인터페이스 정의
export interface ScentWork {
  id: string;
  name: string;
  status: "ai-concept" | "bottled" | "collaboration";
  hasBottle: boolean;
  isCollaborative: boolean;
  imageUrl?: string;
  creator: string;
  colorTheme: "yellow" | "pink" | "blue";
  story: string;
}

// 목업 갤러리 데이터
export const galleryScents: ScentWork[] = [
  {
    id: "1",
    name: "Ephemeral Memory",
    status: "bottled",
    hasBottle: true,
    isCollaborative: false,
    imageUrl: "/images/scent1.jpg",
    creator: "Aria Kim",
    colorTheme: "blue",
    story: `Ephemeral Memory captures the fleeting sensation of a summer rainstorm on warm concrete.

The top notes combine petrichor with fresh ozone, creating an immediate sense of rainfall on hot pavement. As the scent develops, middle notes of wet foliage and green stems emerge, evoking memories of gardens refreshed by sudden precipitation.

The base reveals subtle hints of warm concrete and distant thunderstorms, creating a sensory tapestry that transports you to cherished childhood memories of summer showers.

This scent was developed using AI analysis of emotional responses to rainfall memories, then carefully translated into physical form by master perfumer Aria Kim.`,
  },
  {
    id: "2",
    name: "Digital Bloom",
    status: "ai-concept",
    hasBottle: false,
    isCollaborative: true,
    creator: "AI Synthesis",
    colorTheme: "pink",
    story: `Digital Bloom exists as a mathematical formula, a perfect symphony of scent molecules that has never been physically created.

This theoretical fragrance begins with binary contrasts: sharp electric notes alongside soft floral whispers. The algorithm predicts that human olfactory receptors would perceive an opening of crystalline citrus and metallic aldehydes, followed by an impossible heart of flowers that don't exist in nature.

The base notes are designed to evolve differently with each wearer's skin chemistry, creating a truly personalized experience that can only be predicted by the AI but never experienced in reality.

This concept awaits a daring perfumer to attempt its physical creation, though some molecular combinations may prove challenging to stabilize.`,
  },
  {
    id: "3",
    name: "Ancestral Whispers",
    status: "bottled",
    hasBottle: true,
    isCollaborative: false,
    imageUrl: "/images/scent3.jpg",
    creator: "Jun Park",
    colorTheme: "yellow",
    story: `Ancestral Whispers draws inspiration from traditional Korean herbal medicine and family recipes passed down through generations.

The fragrance opens with hanbang medicinal herbs—subtle pine needles and earthy ginseng—creating an immediate connection to ancient healing traditions. The heart reveals dried persimmon and chrysanthemum tea notes, evoking memories of grandmothers' kitchens and family gatherings.

At its foundation, sandalwood and aged hanji paper create a contemplative base that honors the wisdom of ancestors while remaining thoroughly modern in composition.

This fragrance was created by Jun Park, who trained the AI on family recipes and traditional Korean scent profiles before finalizing the physical formulation.`,
  },
  {
    id: "4",
    name: "Quantum Resonance",
    status: "ai-concept",
    hasBottle: false,
    isCollaborative: true,
    creator: "AI Synthesis",
    colorTheme: "blue",
    story: `Quantum Resonance explores the theoretical concept of what subatomic particles might smell like if human olfactory systems could detect them.

This purely conceptual fragrance would open with sharp, electric notes representing the quantum foam of virtual particles, followed by a constantly shifting heart note pattern that never resolves in the same way twice—mimicking quantum uncertainty.

The imagined base notes include molecular structures designed to interact with different receptors simultaneously, creating a scent that theoretically exists in multiple states at once.

The AI model suggests this would require synthetic molecules yet to be invented and novel delivery systems that could alter their structure over time. Open to collaboration with quantum physicists and avant-garde perfumers.`,
  },
  {
    id: "5",
    name: "Urban Nostalgia",
    status: "collaboration",
    hasBottle: false,
    isCollaborative: true,
    creator: "Community Project",
    colorTheme: "pink",
    story: `Urban Nostalgia began as a collaborative experiment in capturing the essence of city life across different decades.

The AI analyzed thousands of descriptions of urban environments from the 1950s through the 2020s, identifying key scent markers that defined each era: from the industrial notes of mid-century manufacturing to the synthetic materials of the 80s, and the coffee shop culture of recent decades.

The current formula exists only in digital form, with top notes of concrete after rain and printer toner, heart notes of subway steel and street food vendors, and base notes of worn leather seats and ancient books from city libraries.

This project invites perfumers, city planners, and historians to collaborate on transforming this digital concept into a physical time capsule of urban evolution.`,
  },
  {
    id: "6",
    name: "Silent Meditation",
    status: "bottled",
    hasBottle: true,
    isCollaborative: false,
    imageUrl: "/images/scent6.jpg",
    creator: "Zen Collective",
    colorTheme: "blue",
    story: `Silent Meditation was developed as an olfactory aid to mindfulness practice, created through collaboration between AI, neuroscientists, and meditation teachers.

The opening presents a barely-there hint of temple incense, so subtle it requires conscious attention to perceive. The heart reveals gentle notes of hinoki wood and rain-washed stone, selected for their ability to calm the limbic system and reduce mental chatter.

As the scent develops, base notes of clean air and subtle earth anchor the wearer to the present moment without commanding attention.

The physical formulation uses a revolutionary diffusion technology that keeps the fragrance at the threshold of perception, training the mind to remain present with subtle sensory experiences.`,
  },
  {
    id: "7",
    name: "Synthetic Embrace",
    status: "collaboration",
    hasBottle: false,
    isCollaborative: true,
    creator: "AI Synthesis",
    colorTheme: "yellow",
    story: `Synthetic Embrace explores what future intimacy might smell like in an increasingly digital world.

This conceptual fragrance begins with notes of warm electronics—the subtle warmth of devices we hold close to our bodies all day. The heart reveals an impossible accord that simulates human connection through a mathematical model of oxytocin response and cognitive security.

The base notes suggest the comfort of familiar presences without physical form.

This purely theoretical fragrance poses interesting questions about the future of human-AI relationships and how scent might bridge physical and digital realms. The project welcomes collaborators from psychology, human-computer interaction, and perfumery to explore practical applications and physical manifestation.`,
  },
  {
    id: "8",
    name: "Ancient Algorithm",
    status: "bottled",
    hasBottle: true,
    isCollaborative: false,
    imageUrl: "/images/scent8.jpg",
    creator: "Historical AI Project",
    colorTheme: "pink",
    story: `Ancient Algorithm reimagines what the Library of Alexandria might have smelled like, created through analysis of historical texts and archaeological data.

The opening presents papyrus and cedar wood shelving, with subtle hints of olive oil lamps illuminating scrolls of knowledge. As it develops, notes of Mediterranean air and imported spices from trade routes across the ancient world emerge.

The foundation rests on stone floors worn smooth by scholars' feet and the mineral inkpots used to transcribe wisdom.

This fragrance was physically crafted after the AI analyzed thousands of historical documents and archaeological studies, then partnered with historians and perfumers to create a wearable time capsule to a lost center of human knowledge.`,
  },
  {
    id: "9",
    name: "Forgotten Future",
    status: "ai-concept",
    hasBottle: false,
    isCollaborative: true,
    creator: "AI Synthesis",
    colorTheme: "blue",
    story: `Forgotten Future imagines the scent of timelines that never materialized—predictions of the year 2023 made in the 1950s.

This conceptual fragrance opens with metallic notes of the flying cars we don't have, alongside synthetic materials imagined but never invented. The heart reveals clean atomic energy and space colony atmospherics—the optimistic futures predicted but never realized.

Base notes of retrofuturistic plastics and the absence of digital technology create a haunting reminder of paths not taken.

This purely theoretical fragrance exists only as a formula, challenging perfumers to materialize alternate realities through scent. The project welcomes collaborators interested in exploring olfactory retrofuturism and the emotional experience of futures that never arrived.`,
  },
];
