export type ToolCategory =
  | "Calculator"
  | "Reference & Charts"
  | "Engine & Framework"
  | "Decompilation"
  | "Audio & Music"
  | "Utility";

export type ToolItem = {
  id: string;
  name: string;
  category: ToolCategory;
  type: string;
  runtime: string;
  rating: number;
  description: string;
  whyItMatters: string;
  creator: string;
  officialSource: string;
  tags: string[];
  features: string[];
  safetyStatus: string;
  documentationUrl?: string;
  repositoryUrl?: string;
};

export const tools: ToolItem[] = [
  {
    id: "damage-calculator",
    name: "Pokémon Damage Calculator",
    category: "Calculator",
    type: "Web / Utility Tool",
    runtime: "Web / Desktop",
    rating: 9.6,
    description: "An essential calculation tool for calculating exact damage, stat damage variances, EV/IV spreads, weather effects, and battle damage formulas across various custom ROM hack mechanics and modern generation engines.",
    whyItMatters: "Provides high-tier nuzlockers and competitive rom hack players the mathematical certainty needed for boss battle planning.",
    creator: "Community / Honko / Showdown",
    officialSource: "https://calc.pokemonshowdown.com/",
    tags: ["Calculator", "Damage Formula", "Competitive", "Nuzlocke Tool", "Web App"],
    features: [
      "Custom stat modifiers and IV/EV customization",
      "Generation 1 through 9 battle mechanic formulas",
      "Field effects, weather, and terrain multiplier calculations",
      "Critical hit and damage variance percent tables"
    ],
    safetyStatus: "100% Safe Web Utility",
    documentationUrl: "https://calc.pokemonshowdown.com/"
  },
  {
    id: "type-chart-reference",
    name: "Pokémon Type Chart Reference",
    category: "Reference & Charts",
    type: "Interactive Reference",
    runtime: "Web / Mobile",
    rating: 9.4,
    description: "Interactive type chart for quick reference during play, featuring physical/special split tables, Fairy-type interactions, and support for custom ROM hack types (such as Cosmic, Nuclear, and Light).",
    whyItMatters: "Crucial for navigating complex ROM hacks that introduce custom typings or modify classic type match-ups.",
    creator: "ArchiveDex Tools & Research",
    officialSource: "https://pokemondb.net/type",
    tags: ["Type Chart", "Reference", "Fairy Type", "Weaknesses", "Defensive Coverage"],
    features: [
      "Dual-type defensive weakness and resistance matrices",
      "Offensive coverage calculators",
      "Fairy-type and custom fangame type charts",
      "Physical vs Special split quick reference"
    ],
    safetyStatus: "100% Safe Reference Guide",
    documentationUrl: "https://pokemondb.net/type"
  },
  {
    id: "cfru-documentation",
    name: "Complete FireRed Upgrade (CFRU) Documentation",
    category: "Engine & Framework",
    type: "Engine Documentation",
    runtime: "GBA (BPRE / FireRed)",
    rating: 9.9,
    description: "Official comprehensive documentation, API reference, and feature manuals for the Complete FireRed Upgrade (CFRU) engine created by Skeli. CFRU powers masterpieces like Pokémon Unbound, Radical Red, and GS Chronicles.",
    whyItMatters: "The single most revolutionary binary ROM hacking engine in Pokémon history, bringing Gen 1-8 mechanics, Mega Evolution, Z-moves, Dynamax, and competitive AI to FireRed.",
    creator: "Skeli789",
    officialSource: "https://www.pokecommunity.com/threads/complete-firered-upgrade-cfru.424747/",
    tags: ["CFRU", "Engine", "FireRed", "Binary Hacking", "Documentation", "Skeli"],
    features: [
      "Complete battle engine overhaul with Gen 1-8 battle mechanics",
      "Advanced AI decision trees capable of competitive switching",
      "Mega Evolution, Primal Reversion, and Ultra Burst",
      "Extensive configuration defines (`config.h`) for custom hack balance"
    ],
    safetyStatus: "Safe Open Source Framework",
    repositoryUrl: "https://github.com/Skeli789/Complete-Fire-Red-Upgrade"
  },
  {
    id: "cfru-showcase",
    name: "Pokémon CFRU Showcase & Test Bed",
    category: "Engine & Framework",
    type: "Tech Demo & Test ROM",
    runtime: "GBA",
    rating: 9.2,
    description: "A reference test suite ROM demonstrating the technical capabilities and edge cases of the Complete FireRed Upgrade engine, including AI gauntlets and mechanic stress-testing.",
    whyItMatters: "Allows developers and technical players to observe CFRU mechanics in isolation without full campaign dependencies.",
    creator: "Skeli789 & Community",
    officialSource: "https://www.pokecommunity.com/threads/complete-firered-upgrade-cfru.424747/",
    tags: ["CFRU", "Tech Demo", "Mechanics", "AI Showcase"],
    features: [
      "Direct battle tests for all modern abilities and moves",
      "Raid battle and Mega Evolution testing arena",
      "Weather and terrain interaction demos"
    ],
    safetyStatus: "Clean Patch Source",
    documentationUrl: "https://www.pokecommunity.com/threads/complete-firered-upgrade-cfru.424747/"
  },
  {
    id: "decomp-projects",
    name: "Pokémon Decomp Projects Hub",
    category: "Decompilation",
    type: "Disassembly / Decomp Hub",
    runtime: "GBA / C / C++",
    rating: 9.9,
    description: "Comprehensive guide and resource index for Pret's decompilation projects: `pokeemerald`, `pokefirered`, and `pokeruby`. Enables building native GBA ROMs directly from clean, human-readable C source code.",
    whyItMatters: "The gold standard of modern ROM hacking. Eliminates binary patching bugs, allows infinite expansion, and powers contemporary classics like Emerald Seaglass, Emerald Rogue, and Lazarus.",
    creator: "pret (Pokémon Reverse Engineering Team)",
    officialSource: "https://github.com/pret/pokeemerald",
    tags: ["Decomp", "pokeemerald", "pokefirered", "pret", "C Source", "Preservation"],
    features: [
      "Byte-for-byte matching decompilation of original game binaries",
      "Modern Git workflow with version control and pull requests",
      "Native C compilation with GCC / agbcc",
      "Modular expansion branches (`pokeemerald-expansion`)"
    ],
    safetyStatus: "Open Source Preservation Project",
    repositoryUrl: "https://github.com/pret/pokeemerald"
  },
  {
    id: "emerald-battle-engine-upgrade",
    name: "Emerald Battle Engine Upgrade (rh-hideout)",
    category: "Engine & Framework",
    type: "C Decomp Extension",
    runtime: "GBA / pokeemerald",
    rating: 9.8,
    description: "The premier battle engine upgrade for pokeemerald decomp projects, adding modern battle mechanics, Gen 9 moves, abilities, items, and modern animations to Emerald.",
    whyItMatters: "Standardized modern battle mechanics across modern decomp ROM hacks, dramatically lowering the barrier to building high-quality Emerald projects.",
    creator: "RH-Hideout Community & DizzyEgg",
    officialSource: "https://github.com/rh-hideout/pokeemerald-expansion",
    tags: ["Decomp", "pokeemerald", "Battle Engine", "Gen 9", "rh-hideout"],
    features: [
      "Generations 4 through 9 battle mechanics and move effects",
      "Complete Physical/Special split implementation",
      "Integrated Pokémon expansion with Gen 1-9 sprites and stats",
      "Reusable TM system and modernized battle UI"
    ],
    safetyStatus: "Open Source GitHub Repository",
    repositoryUrl: "https://github.com/rh-hideout/pokeemerald-expansion"
  },
  {
    id: "emerald-hack-tools-showcase",
    name: "Emerald Hack Tools & Utility Showcase",
    category: "Utility",
    type: "Tool Suite Reference",
    runtime: "Windows / Linux / macOS",
    rating: 9.0,
    description: "An archival guide to essential developer utilities for GBA hacking: Porymap (map editor), AdvanceMap, TileHelper, Mid2Agb, and Sappy sound injection tools.",
    whyItMatters: "Preserves documentation for legacy and modern mapping, tile-inserting, and event-scripting pipelines.",
    creator: "huderlem & GBA Hacking Community",
    officialSource: "https://github.com/huderlem/porymap",
    tags: ["Porymap", "Map Editor", "Utilities", "Level Design"],
    features: [
      "Porymap map, tileset, and wild encounter editing guide",
      "Event script and connection boundary documentation",
      "Tileset collision and elevation layer inspection"
    ],
    safetyStatus: "Safe Open Source Tools",
    repositoryUrl: "https://github.com/huderlem/porymap"
  },
  {
    id: "rom-hack-decomp-bases",
    name: "Modern Decompilation Bases Directory",
    category: "Decompilation",
    type: "Developer Bases",
    runtime: "GBA (pokeemerald / pokefirered)",
    rating: 9.5,
    description: "Curated directory of starter project templates including vanilla-plus bases, following Pokémon extensions, and graphical overhaul foundations (e.g. Seaglass GBC tileset base).",
    whyItMatters: "Saves creators hundreds of hours by bundling proven QoL and expansion branches into turn-key development repositories.",
    creator: "Community Curated",
    officialSource: "https://github.com/rh-hideout",
    tags: ["Templates", "Starter Kit", "pokeemerald", "Following Pokémon"],
    features: [
      "Pre-configured pokeemerald + RHH expansion template",
      "Pre-integrated following Pokémon engine branch",
      "Automated GitHub Actions build workflow scripts"
    ],
    safetyStatus: "Open Source Templates",
    repositoryUrl: "https://github.com/rh-hideout"
  },
  {
    id: "rom-hack-music-replacement",
    name: "GBA ROM Hack Sound & Music Pipeline",
    category: "Audio & Music",
    type: "Audio Architecture & Docs",
    runtime: "GBA / Sound Engine",
    rating: 9.1,
    description: "Documentation and tools for replacing GBA sound banks, injecting MIDI tracks via `mid2agb` and Sappy, and configuring HQ sound mixers on real hardware.",
    whyItMatters: "Enables custom OSTs and remasters without sound crackling or voice limits on hardware and emulators.",
    creator: "ipatix & Community",
    officialSource: "https://www.pokecommunity.com/threads/directsound-hq-mixer.314981/",
    tags: ["Audio", "Sound Engine", "DirectSound", "HQ Mixer", "Music"],
    features: [
      "ipatix 105kHz HQ DirectSound mixer implementation guide",
      "MIDI instrument voicebank mapping tables",
      "Loop point and track volume balancing specifications"
    ],
    safetyStatus: "Safe Technical Guide",
    documentationUrl: "https://www.pokecommunity.com/threads/directsound-hq-mixer.314981/"
  },
  {
    id: "roulette-ffa-app",
    name: "Pokémon Roulette FFA Battle Utility",
    category: "Utility",
    type: "Stream & Party Utility",
    runtime: "Web / Desktop",
    rating: 8.8,
    description: "A battle format companion utility inspired by popular Pokémon Roulette Free-For-All challenges. Features editable team wheels, draft tracking, and random modifier wheels.",
    whyItMatters: "Greatly streamlines community draft events and multiplayer party challenges without requiring manual spreadsheet manipulation.",
    creator: "Community Stream Tools",
    officialSource: "https://github.com/",
    tags: ["Roulette", "FFA", "Party Game", "Stream Tool", "Draft"],
    features: [
      "Random species and modifier wheel spinning",
      "Draft list tracking for up to 4 players",
      "Custom restriction rulesets and point scoring"
    ],
    safetyStatus: "Safe Web Companion",
    documentationUrl: "https://github.com/"
  }
];

export function getToolById(id: string) {
  return tools.find((t) => t.id === id);
}
