const firebaseConfig = {
  apiKey: 'AIzaSyCBeFZHDdt2av9I4d0EN_fFSugZ7f9prKQ',
  authDomain: 'bestiario-9a59a.firebaseapp.com',
  databaseURL: 'https://bestiario-9a59a-default-rtdb.firebaseio.com',
  projectId: 'bestiario-9a59a',
  storageBucket: 'bestiario-9a59a.firebasestorage.app',
  messagingSenderId: '877990974200',
  appId: '1:877990974200:web:f94f40c25ea9c7fb52210d',
  measurementId: 'G-V3TK3ZS1VQ',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.database();
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const charactersRef = database.ref('characters');
const camposRef = database.ref('campos');
const userDecksRef = database.ref('userDecks');
const usersRef = database.ref('users');
const onlineUsersRef = database.ref('onlineUsers');
const battleChallengesRef = database.ref('battleChallenges');
const battleSessionsRef = database.ref('battleSessions');
const battleHistoryRef = database.ref('battleHistory');
const battleOutcomeMarkersRef = database.ref('battleOutcomeMarkers');
const historyTypesRef = database.ref('historyTypes');


const BOT_UID = 'bot-desarrollo';
const BOT_NAME = 'DESARROLLO';
const BOT_USER = {
  uid: BOT_UID,
  name: BOT_NAME,
  photoURL: '',
};
let botTurnInFlightSessionId = '';


const buttons = document.querySelectorAll('.menu-btn');
const panels = document.querySelectorAll('.panel');
const personajesPanel = document.querySelector('#personajes');
const addCharacterButton = document.querySelector('.add-character-btn');
const randomCharacterButton = document.querySelector('.random-character-btn');
const loginGoogleButton = document.querySelector('#login-google-btn');
const logoutButton = document.querySelector('#logout-btn');
const authPanel = document.querySelector('#auth-panel');
const authUserPanel = document.querySelector('#auth-user-panel');
const gameLayout = document.querySelector('#game-layout');
const userName = document.querySelector('#user-name');
const userUid = document.querySelector('#user-uid');
const userPhoto = document.querySelector('#user-photo');
const battleUsersList = document.querySelector('#battle-users-list');
const battleChallengeModal = document.querySelector('#battle-challenge-modal');
const challengeMessage = document.querySelector('#challenge-message');
const acceptChallengeButton = document.querySelector('#accept-challenge-btn');
const rejectChallengeButton = document.querySelector('#reject-challenge-btn');
const battleArenaModal = document.querySelector('#battle-arena-modal');
const battleArenaCloseButton = document.querySelector('#battle-arena-close-btn');
const battleArenaSurrenderButton = document.querySelector('#battle-arena-surrender-btn');
const battleTurnLabel = document.querySelector('#battle-turn-label');
const battleSideMiddle = document.querySelector('.battle-side-middle');
const battleHand = document.querySelector('#battle-hand');
const battleOpponentSlots = document.querySelector('#battle-opponent-slots');
const battlePlayerSlots = document.querySelector('#battle-player-slots');
const battleCardActionModal = document.querySelector('#battle-card-action-modal');
const battleActionPlaceButton = document.querySelector('#battle-action-place');
const battleActionFaceDownButton = document.querySelector('#battle-action-facedown');
const battleActionCancelButton = document.querySelector('#battle-action-cancel');
const battleSurrenderVictoryModal = document.querySelector('#battle-surrender-victory-modal');
const battleSurrenderVictoryText = document.querySelector('#battle-surrender-victory-text');
const battleSurrenderVictoryCloseButton = document.querySelector('#battle-surrender-victory-close-btn');
const battleMessageModal = document.querySelector('#battle-message-modal');
const battleMessageText = document.querySelector('#battle-message-text');
const battleMessageCloseButton = document.querySelector('#battle-message-close-btn');
const battleExperienceOutcomeModal = document.querySelector('#battle-experience-outcome-modal');
const battleExperienceOutcomeText = document.querySelector('#battle-experience-outcome-text');
const battleExperienceOutcomeCard = document.querySelector('#battle-experience-outcome-card');
const battleExperienceOutcomeCloseButton = document.querySelector('#battle-experience-outcome-close-btn');
const battleHistoryList = document.querySelector('#battle-history-list');
const historyTypesList = document.querySelector('#history-types-list');
const historyClansList = document.querySelector('#history-clans-list');
const personajesGallery = document.querySelector('#personajes-gallery');
const artefactosGallery = document.querySelector('#artefactos-gallery');
const camposGallery = document.querySelector('#campos-gallery');
const addArtefactButton = document.querySelector('#add-artefact-btn');
const addCampoButton = document.querySelector('#add-campo-btn');

const characterTypes = [
  { type: 'Brujas', clans: ['Luna Carmesí', 'Hijas del Caldero', 'Las Espinas Negras', 'Coven Eclipse'] },
  { type: 'Vampiros', clans: ['Sangre Antigua', 'Noctis', 'Dracul Vesper', 'Hijos del Último Colmillo'] },
  { type: 'Fantasmas', clans: ['Ecos Vacíos', 'Los Errantes', 'Susurro Gris', 'Cadena Eterna'] },
  { type: 'Demonios', clans: ['Fuego Abisal', 'Devoralmas', 'Cuernos Rojos', 'Trono Infernal'] },
  { type: 'Ángeles', clans: ['Corona Celeste', 'Alas del Alba', 'Virtud Suprema', 'Los Vigilantes'] },
  { type: 'Licántropos', clans: ['Colmillo Lunar', 'Manada Gris', 'Sangre Salvaje', 'Hijos del Bosque Negro'] },
  { type: 'Nigromantes', clans: ['Mano Sepulcral', 'Reyes del Osario', 'Culto del Fin', 'Los Resucitados'] },
  { type: 'Dragones', clans: ['Escama Dorada', 'Furia Volcánica', 'Alas Eternas', 'Trono Dracónido'] },
  { type: 'Sirenas', clans: ['Marea Azul', 'Canto Mortal', 'Hijas del Coral Negro', 'Las Ahogadoras'] },
  { type: 'Cazadores', clans: ['Orden Plateada', 'Los Exiliados', 'Cruz de Hierro', 'Ojo del Cuervo'] },
  { type: 'Hadas', clans: ['Polvo Lunar', 'Jardín Viviente', 'Corte Esmeralda', 'Alas de Cristal'] },
  { type: 'Titanes', clans: ['Rompemontes', 'Hijos del Trueno', 'Colosos del Norte', 'Sangre de Piedra'] },
  { type: 'Espíritus', clans: ['Llama Serena', 'Los Transparentes', 'Viento Antiguo', 'Ceniza Blanca'] },
  { type: 'Elfos Oscuros', clans: ['Sombras de Ébano', 'Corte Nocturna', 'Dagas Violetas', 'Veneno Silente'] },
  { type: 'Paladines', clans: ['Sol Inmortal', 'Martillo Sagrado', 'Juramento Real', 'Guardia del Alba'] },
  { type: 'Asesinos', clans: ['Diente Negro', 'La Última Sombra', 'Silencio Carmesí', 'Manos Invisibles'] },
  { type: 'Magos', clans: ['Torre Arcana', 'Ojo Astral', 'Biblioteca Prohibida', 'Hijos del Vacío'] },
  { type: 'Elementales', clans: ['Clan Ígneo', 'Hijos del Tifón', 'Corazón Glacial', 'Raíz Primordial'] },
  { type: 'Gárgolas', clans: ['Piedra Viva', 'Vigías Eternos', 'Alas de Mármol', 'Guardianes de Catedral'] },
  { type: 'Reapers', clans: ['La Guadaña', 'Fin Absoluto', 'Custodios del Umbral', 'Hueso Negro'] },
  { type: 'Orcos', clans: ['Mandíbula Roja', 'Hacha Salvaje', 'Cráneo Partido', 'Guerreros del Pantano'] },
  { type: 'Goblins', clans: ['Dedos Largos', 'Ratas Verdes', 'Dinamita Negra', 'Los Chatarreros'] },
  { type: 'Alquimistas', clans: ['Oro Filosofal', 'Frascos Prohibidos', 'Vapor Esmeralda', 'Elixir Supremo'] },
  { type: 'Caballeros Malditos', clans: ['Armadura Vacía', 'Cruz Sangrienta', 'Los Caídos', 'Hierro Profano'] },
  { type: 'Bestias Mutantes', clans: ['Carne Tóxica', 'Colmillos Rotos', 'Laboratorio X', 'Hijos del Error'] },
  { type: 'Monjes', clans: ['Puño Celestial', 'Camino Silente', 'Lotus Negro', 'Respiración Divina'] },
  { type: 'Piratas', clans: ['Marea Roja', 'Kraken Negro', 'La Calavera Azul', 'Tempestad Salvaje'] },
  { type: 'Androides', clans: ['Código Omega', 'Titanio Vivo', 'Unidad Eclipse', 'Protocolos Negros'] },
  { type: 'Cyborgs', clans: ['Carne Mecánica', 'Acero Neural', 'División Hex', 'Núcleo Fantasma'] },
  { type: 'Mutantes', clans: ['ADN Caos', 'Hijos Gamma', 'Sangre Rota', 'Evolución X'] },
  { type: 'Samuráis', clans: ['Flor Carmesí', 'Acero Blanco', 'Dragón del Este', 'Luna Cortante'] },
  { type: 'Ninjas', clans: ['Niebla Negra', 'Serpiente Silente', 'Clan Kage', 'Ojos Rojos'] },
  { type: 'Dioses Antiguos', clans: ['Panteón Perdido', 'Los Primordiales', 'Trono Estelar', 'Ojo Cósmico'] },
  { type: 'Marionetistas', clans: ['Hilos Malditos', 'Teatro Sangriento', 'Sonrisa de Madera', 'Dedos Eternos'] },
  { type: 'Payasos Oscuros', clans: ['Circo Infernal', 'Carcajada Muerta', 'Máscara Rota', 'Fiesta Macabra'] },
  { type: 'Espantapájaros', clans: ['Campo Muerto', 'Paja Maldita', 'Ojos de Cuervo', 'Harvest Doom'] },
  { type: 'Científicos Locos', clans: ['Laboratorio Omega', 'Cerebros Rotos', 'Proyecto Caos', 'Neo Frankenstein'] },
  { type: 'Ángeles Caídos', clans: ['Alas Negras', 'Exilio Divino', 'Pecado Celestial', 'Trono Quebrado'] },
  { type: 'Parásitos', clans: ['Hambre Eterna', 'Carne Ajena', 'Enjambre Negro', 'Los Infectados'] },
  { type: 'Brujos del Tiempo', clans: ['Arena Infinita', 'Reloj Carmesí', 'Hijos del Segundo Final', 'Eclipse Temporal'] },
  { type: 'Gladiadores', clans: ['Arena Roja', 'Coloso Imperial', 'Bestias del Coliseo', 'Cadena de Oro'] },
  { type: 'Djinns', clans: ['Lámpara Negra', 'Deseo Maldito', 'Arena Azul', 'Fuego del Desierto'] },
  { type: 'Robots Bélicos', clans: ['Unidad Ragnarok', 'Hierro Brutal', 'Omega Titan', 'Guerra Nuclear'] },
  { type: 'Revenants', clans: ['Los Regresados', 'Tumba Vacía', 'Sangre del Más Allá', 'Venganza Eterna'] },
  { type: 'Druidas', clans: ['Bosque Viviente', 'Colmillo Verde', 'Raíz Antigua', 'Hijos del Roble'] },
  { type: 'Inquisidores', clans: ['Cruz Blanca', 'Fuego Purificador', 'Veredicto Final', 'Los Penitentes'] },
  { type: 'Arlequines', clans: ['Sonrisa Escarlata', 'Cartas del Caos', 'Danza Torcida', 'Teatro Lunar'] },
  { type: 'Serafines', clans: ['Séptima Luz', 'Corona Dorada', 'Alas Eternas', 'Juicio Celestial'] },
  { type: 'Quimeras', clans: ['Carne Fusionada', 'Bestia Alfa', 'Proyecto Génesis', 'Mil Fauces'] },
  { type: 'Hijos del Vacío', clans: ['Eclipse Negro', 'La Nada Viva', 'Estrellas Muertas', 'Fin del Cosmos'] },
];

const typeColorGroups = {
  red: ['#ff4d4d', '#e53935', '#c62828', '#8e0000'],
  blue: ['#64b5f6', '#1e88e5'],
  green: ['#2ecc71'],
  white: ['#ffffff', '#ecf0f1'],
  yellow: ['#ffe066', '#f1c40f', '#d4ac0d', '#b7950b'],
  black: ['#111111'],
  orange: ['#ffb347', '#ff9800', '#f57c00', '#d35400', '#b85c00', '#a04000', '#8e3200', '#6e2600'],
  sky: ['#b3ecff', '#7ad8ff', '#42c7ff'],
  violet: ['#d2a8ff', '#b57fe8', '#9b59b6', '#7d3c98', '#5b2c6f', '#4a235a'],
  pink: ['#ff8ad6'],
};

const preferredTypeTones = {
  Vampiros: typeColorGroups.red[0],
  Espíritus: typeColorGroups.red[1],
  Demonios: typeColorGroups.red[2],
  Revenants: typeColorGroups.red[3],

  Brujas: typeColorGroups.blue[0],
  Magos: typeColorGroups.blue[1],

  Titanes: typeColorGroups.green[0],

  Ángeles: typeColorGroups.white[0],
  'Dioses Antiguos': typeColorGroups.white[1],
  Serafines: typeColorGroups.white[1],

  Licántropos: typeColorGroups.yellow[0],
  Dragones: typeColorGroups.yellow[1],
  Mutantes: typeColorGroups.yellow[2],
  'Bestias Mutantes': typeColorGroups.yellow[3],
  Quimeras: typeColorGroups.yellow[1],

  'Brujos del Tiempo': typeColorGroups.black[0],

  Samuráis: typeColorGroups.orange[0],
  Asesinos: typeColorGroups.orange[1],
  Gladiadores: typeColorGroups.orange[2],
  Paladines: typeColorGroups.orange[3],
  Ninjas: typeColorGroups.orange[4],
  Piratas: typeColorGroups.orange[5],
  Cazadores: typeColorGroups.orange[6],
  Monjes: typeColorGroups.orange[7],

  Cyborgs: typeColorGroups.sky[0],
  Androides: typeColorGroups.sky[1],
  'Robots Bélicos': typeColorGroups.sky[2],

  'Elfos Oscuros': typeColorGroups.violet[0],
  Sirenas: typeColorGroups.violet[1],
  Hadas: typeColorGroups.violet[2],
  Orcos: typeColorGroups.violet[3],
  Elementales: typeColorGroups.violet[4],
  Goblins: typeColorGroups.violet[5],

  Djinns: typeColorGroups.pink[0],
};

const fallbackTypeColor = '#7f8c8d';
const characterTypeColors = Object.fromEntries(
  characterTypes.map((entry) => [entry.type, preferredTypeTones[entry.type] || fallbackTypeColor]),
);



const artifactTypes = ['Amuleto', 'Arma', 'Escudo', 'Armadura'];
const artifactTargets = ['Propio', 'Especifico', 'Rival'];
const artifactEffectKinds = ['Aumenta', 'Disminuye', 'Destruye', 'Revive'];
let artifactFilePreview = '';
let artifactEffects = [];

function createEmptyArtifactEffect() {
  return {
    targetCharacter: 'Propio',
    targetCharacters: [],
    targetTypeMode: 'Propio',
    targetTypes: [],
    effectKind: 'Aumenta',
    stats: { magic: '', strength: '', intelligence: '', speed: '' },
    durationMode: 'turns',
    turns: 1,
  };
}

function getCurrentArtifacts() {
  if (!currentUserId) return [];
  return (users[currentUserId]?.artifacts || []);
}

function artifactEffectSummary(effect) {
  const direction = effect.effectKind;
  let statSummary = '';
  if (direction === 'Aumenta' || direction === 'Disminuye') {
    const stats = Object.entries(effect.stats).filter(([, v]) => Number(v) > 0).map(([k, v]) => `${direction === 'Aumenta' ? '+' : '-'}${v} en ${k}`);
    statSummary = stats.length ? stats.join(', ') : `${direction.toLowerCase()} atributos`;
  } else {
    statSummary = direction;
  }
  const target = effect.targetTypeMode === 'Especifico' ? `a Tipos ${effect.targetTypes.join(', ') || 'específicos'}` : `a ${effect.targetTypeMode}`;
  const duration = effect.durationMode === 'perpetuo' ? 'perpetuamente' : `durante ${effect.turns} turnos`;
  return `${statSummary} ${target} ${duration}`;
}

function renderArtifactCard(artifact) {
  const summary = (artifact.effects || []).length
    ? artifact.effects.map(artifactEffectSummary).join(' · ')
    : 'Sin efectos definidos';
  return renderSharedCharacterCard({
    id: artifact.id,
    name: artifact.name,
    type: artifact.type,
    clan: 'Artefacto',
    image: artifact.image,
    strength: '-', speed: '-', magic: '-', intelligence: '-',
  }, {
    staticCard: true,
    extraClasses: 'deck-card character-size-compact artifact-card',
    customFooter: `<span class="artifact-rules">${escapeHtml(summary)}</span>`,
  });
}

const storageKey = 'cronicas-personajes';
const migrationKey = 'cronicas-personajes-firebase-migrated';
const localCharacters = JSON.parse(localStorage.getItem(storageKey) || '[]');
let characters = [];
let campos = [];
let filePreview = '';
let activeProfileId = null;
let hasReceivedFirebaseData = false;
let currentUserId = null;
let selectedDeckIds = [];
let deckOrder = [];
let savedDeck = { characterIds: [], mainIds: [] };
let selectedCampoIds = [];
let onlineUsers = {};
let users = {};
let activeChallenge = null;
let activeBattleSession = null;
let battleSessions = [];
let pendingChallenges = [];
let battleArenaDismissed = true;
let surrenderInFlightUserId = null;
let selectedHandCardId = null;
let pendingPlacementMode = null;
let pendingAttack = null;
let selectedBattlePreview = null;
let battleRealtimeListenerRef = null;
let battleRealtimeListener = null;
let battlePollingIntervalId = null;
let lastRenderedBattleSnapshot = '';
let battleHistoryByOpponent = {};
let battleTurnTransitionTimeoutId = null;
const shownSurrenderVictoryBySessionId = new Set();
const previousBattleStatusBySessionId = {};
let historyTypesData = {};
let selectedHistoryTypeId = '';

let historyTypeContextMenuState = null;
let experienceModalState = null;
const CHARACTER_DEVELOPMENT_MODE = {
  PENDING: 'pending-battle',
  READY_TO_EDIT: 'ready-to-edit',
};
const POSITIVE_EVENT_TAGS = ['Amigo', 'Objeto', 'Habilidad', 'Misión', 'Clan'];
const NEGATIVE_EVENT_TAGS = ['Enemigo', 'Maldición', 'Miedo', 'Debilidad'];

function getCharacterStatValue(character, attribute) {
  return Number.parseInt(character?.[attribute] ?? '0', 10) || 0;
}

function isCharacterAtMaxBaseStats(character) {
  return ['magic', 'strength', 'intelligence', 'speed'].every((attribute) => getCharacterStatValue(character, attribute) >= 100);
}

function getCharacterDevelopmentProgress(userId, character) {
  const cardExperience = users[userId]?.experiencePoints?.byCharacter?.[character.id] || {};
  return cardExperience.developmentMode || null;
}

function closeHistoryTypeContextMenu() {
  if (!historyTypeContextMenuState) return;
  historyTypeContextMenuState.menu.remove();
  historyTypeContextMenuState = null;
}

function openHistoryTypeContextMenu(typeId, posX, posY) {
  closeHistoryTypeContextMenu();
  const typeEntry = historyTypesData[typeId];
  if (!typeEntry) return;

  const menu = document.createElement('div');
  menu.className = 'history-type-context-menu';
  menu.innerHTML = `
    <button type="button" data-action="edit">Editar tipo</button>
    <button type="button" data-action="delete">Eliminar tipo</button>
  `;

  const placeMenu = () => {
    const margin = 8;
    const menuWidth = menu.offsetWidth;
    const menuHeight = menu.offsetHeight;
    const boundedX = Math.min(posX, window.innerWidth - menuWidth - margin);
    const boundedY = Math.min(posY, window.innerHeight - menuHeight - margin);
    menu.style.left = `${Math.max(margin, boundedX)}px`;
    menu.style.top = `${Math.max(margin, boundedY)}px`;
  };

  menu.addEventListener('click', async (event) => {
    const actionBtn = event.target.closest('[data-action]');
    if (!actionBtn) return;

    const action = actionBtn.dataset.action;
    closeHistoryTypeContextMenu();

    if (action === 'edit') {
      const newName = prompt('Nuevo nombre del tipo', typeEntry.name || '');
      if (!newName || !newName.trim()) return;
      await historyTypesRef.child(typeId).update({ name: newName.trim() });
      return;
    }

    if (action === 'delete') {
      const confirmed = window.confirm(`¿Eliminar el tipo "${typeEntry.name}" y todos sus clanes asociados?`);
      if (!confirmed) return;
      await historyTypesRef.child(typeId).remove();
      if (selectedHistoryTypeId === typeId) {
        selectedHistoryTypeId = '';
      }
    }
  });

  document.body.append(menu);
  placeMenu();
  historyTypeContextMenuState = { menu, typeId };
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.target;

    buttons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    panels.forEach((panel) => {
      panel.classList.toggle('active', panel.id === targetId);
    });
  });
});

function getCharacterRef(characterId) {
  return database.ref(`characters/${characterId}`);
}

function getTimestamp() {
  return new Date().toISOString();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomCharacterTypeEntry() {
  return characterTypes[getRandomInt(0, characterTypes.length - 1)];
}

function setSyncStatus(message, type = 'loading') {
  const status = document.querySelector('.firebase-status');
  if (!status) {
    return;
  }

  status.textContent = message;
  status.dataset.status = type;
}

function normalizeCharacter(character, fallbackId) {
  const now = getTimestamp();

  return {
    id: character.id || fallbackId || crypto.randomUUID(),
    name: character.name || '',
    type: character.type || '',
    clan: character.clan || '',
    magic: character.magic || '',
    strength: character.strength || '',
    intelligence: character.intelligence || '',
    speed: character.speed || '',
    story: character.story || '',
    image: character.image || '',
    createdAt: character.createdAt || now,
    updatedAt: character.updatedAt || now,
  };
}

async function saveCharacter(character) {
  const timestamp = getTimestamp();
  const characterToSave = normalizeCharacter({
    ...character,
    createdAt: character.createdAt || timestamp,
    updatedAt: timestamp,
  });

  await getCharacterRef(characterToSave.id).set(characterToSave);
}

async function migrateLocalCharacters() {
  if (localStorage.getItem(migrationKey) === 'true' || !localCharacters.length || characters.length) {
    return;
  }

  await Promise.all(localCharacters.map((character) => saveCharacter(normalizeCharacter(character))));
  localStorage.setItem(migrationKey, 'true');
}

function createOption(value, text) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = text;
  return option;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return entities[character];
  });
}

function hexToRgb(hexColor) {
  const normalizedHex = hexColor.replace('#', '');
  const colorNumber = Number.parseInt(normalizedHex, 16);

  return {
    red: (colorNumber >> 16) & 255,
    green: (colorNumber >> 8) & 255,
    blue: colorNumber & 255,
  };
}

function mixColor(hexColor, targetColor, weight) {
  const base = hexToRgb(hexColor);
  const target = hexToRgb(targetColor);
  const mixed = ['red', 'green', 'blue'].map((channel) => {
    const value = Math.round(base[channel] * (1 - weight) + target[channel] * weight);
    return value.toString(16).padStart(2, '0');
  });

  return `#${mixed.join('')}`;
}

function getTypeColorStyles(type) {
  const typeColor = characterTypeColors[type] || '#b4862e';
  const typeColorDark = mixColor(typeColor, '#000000', 0.45);
  const typeColorLight = mixColor(typeColor, '#ffffff', 0.35);

  return [
    `--type-color: ${typeColor}`,
    `--type-color-dark: ${typeColorDark}`,
    `--type-color-light: ${typeColorLight}`,
  ].join('; ');
}

function updateTypeColorPreview() {
  const typeSelect = document.querySelector('#character-type');
  const colorPreview = document.querySelector('.type-color-preview');
  const selectedColor = characterTypeColors[typeSelect.value];

  if (!selectedColor) {
    colorPreview.style.cssText = '';
    colorPreview.textContent = 'Selecciona un tipo para ver su color asignado.';
    return;
  }

  colorPreview.style.cssText = getTypeColorStyles(typeSelect.value);
  colorPreview.innerHTML = `Color asignado: <strong>${typeSelect.value}</strong>`;
}

function renderSharedCharacterCard(character, options = {}) {
  const {
    dataAttribute = 'data-character-id',
    dataValue = character.id,
    extraClasses = '',
    ariaLabel = `Abrir perfil de ${character.name}`,
    tagsText = `${character.type} · ${character.clan}`,
    footerPrefix = '',
    inlineStyle = '',
    staticCard = false,
  } = options;

  const safeName = escapeHtml(character.name || 'Carta');
  const developmentProgress = currentUserId ? getCharacterDevelopmentProgress(currentUserId, character) : null;
  const isInDevelopmentMode = Boolean(developmentProgress);
  const safeImage = escapeHtml(character.image || '');
  const safeDataValue = escapeHtml(dataValue || '');
  const imageMarkup = character.image
    ? `<img class="character-card-image" src="${safeImage}" alt="Imagen de ${safeName}">`
    : '<div class="character-card-image placeholder-image">Sin imagen</div>';

  const tagName = staticCard ? 'div' : 'button';
  const interactiveAttributes = staticCard
    ? ''
    : `type="button" ${dataAttribute}="${safeDataValue}" aria-label="${escapeHtml(ariaLabel)}"`;
  const footerContent = options.customFooter || `
          <span class="stats-list" aria-label="Atributos de ${safeName}">
            <span><strong>F</strong>: ${escapeHtml(character.strength)}</span>
            <span><strong>V</strong>: ${escapeHtml(character.speed)}</span>
            <span><strong>M</strong>: ${escapeHtml(character.magic)}</span>
            <span><strong>I</strong>: ${escapeHtml(character.intelligence)}</span>
          </span>
  `;

  return `
    <${tagName} class="character-card character-gallery-card ${extraClasses} ${isInDevelopmentMode ? 'is-development-mode' : ''}" ${interactiveAttributes} style="${getTypeColorStyles(character.type)}${inlineStyle}">
      ${footerPrefix}
      <span class="character-card-layout">
        <span class="character-card-header">${safeName}</span>
        <span class="character-card-right">${imageMarkup}</span>
        <span class="character-card-footer">
          <span class="character-card-tags">
            <span class="character-type-clan-tag">${escapeHtml(character.type)}</span>
            ${character.clan ? `<span class="character-type-clan-tag">${escapeHtml(character.clan)}</span>` : ''}
          </span>
          ${footerContent}
        </span>
      </span>
    </${tagName}>
  `;
}

function renderCharacterExperienceBadge(character) {
  if (!currentUserId) return '';
  const { positive, negative } = getCharacterExperience(character.id);
  const balance = positive - negative;
  const toneClass = balance > 0 ? 'is-positive' : balance < 0 ? 'is-negative' : 'is-neutral';
  const sign = balance > 0 ? '+' : balance < 0 ? '-' : '±';
  return `<span class="character-xp-badge ${toneClass}" title="Experiencia: +${positive} / -${negative}">${sign}${Math.abs(balance)}</span>`;
}

function renderCharacterCard(character) {
  return renderSharedCharacterCard(character, {
    extraClasses: 'character-size-personajes',
    footerPrefix: renderCharacterExperienceBadge(character),
  });
}

function renderGallery() {
  if (!personajesGallery) return;
  personajesGallery.innerHTML = characters.length
    ? characters.map(renderCharacterCard).join('')
    : '<p class="empty-gallery">Todavía no hay personajes guardados.</p>';
  renderArtefactosGallery();
  renderCamposGallery();
}

function renderArtefactosGallery() {
  if (!artefactosGallery) return;
  artefactosGallery.innerHTML = characters.length
    ? characters.map(renderCharacterCard).join('')
    : '<p class="empty-gallery">Todavía no hay artefactos guardados.</p>';
}

function renderCamposGallery() {
  if (!camposGallery) return;
  camposGallery.innerHTML = campos.length
    ? campos.map(renderCharacterCard).join('')
    : '<p class="empty-gallery">Todavía no hay campos guardados.</p>';
}

function renderDeckBuilder() {
  const container = document.querySelector('#deck-builder');
  if (!container) return;

  if (!currentUserId) {
    container.innerHTML = '<p>Inicia sesión para gestionar tu mazo.</p>';
    return;
  }

  const hasSavedDeck = savedDeck.characterIds.length === 20;
  const hasBlockingBattle = currentUserId
    && (battleSessions.some((session) => (session.players || []).includes(currentUserId) && session.status === 'active')
      || pendingChallenges.some((challenge) => (
        challenge?.status === 'pending'
        && (challenge?.fromUid === currentUserId || challenge?.toUid === currentUserId)
      )));
  const canEditDeck = !hasBlockingBattle;
  const availableCharacters = hasSavedDeck
    ? characters.filter((character) => savedDeck.characterIds.includes(character.id))
    : characters;
  const selectedSet = new Set(selectedDeckIds);
  const selectedCamposSet = new Set(selectedCampoIds);
  const orderMap = new Map(deckOrder.map((id, index) => [id, index + 1]));
  const mainSet = new Set(savedDeck.mainIds);

  container.innerHTML = `
    <p class="deck-description">
      ${hasSavedDeck
        ? 'Tu mazo principal está guardado. Elige 5 personajes principales.'
        : 'Selecciona 20 personajes para tu mazo principal.'}
    </p>
    <div class="deck-count">${hasSavedDeck ? `Mazo guardado: ${savedDeck.characterIds.length}/20` : `Seleccionados: ${selectedDeckIds.length}/20`}</div>
    <button id="edit-deck-btn" class="save-character-btn" type="button" ${canEditDeck ? '' : 'disabled'}>
      Editar Mazo
    </button>
    ${canEditDeck ? '' : '<p class="deck-lock-note">No puedes editar el mazo mientras haya batallas pendientes o en curso.</p>'}
    ${(!hasSavedDeck && selectedDeckIds.length === 20) ? '<button id="save-deck-btn" class="save-character-btn" type="button">Guardar Mazo</button>' : ''}
    <p class="deck-description">Campos en mazo (opcional): ${selectedCampoIds.length}/3</p>
    <section class="deck-grid">
      ${campos.map((campo) => renderSharedCharacterCard(campo, {
    dataAttribute: 'data-deck-campo-id',
    extraClasses: `deck-card character-size-compact ${selectedCamposSet.has(campo.id) ? 'is-picked' : ''}`,
    ariaLabel: `Seleccionar ${campo.name} para el mazo`,
  })).join('')}
    </section>
    <section class="deck-grid">
      ${availableCharacters.map((character) => {
    const isSelected = selectedSet.has(character.id);
    const order = orderMap.get(character.id);
    const isMain = mainSet.has(character.id);
    return `
          ${renderSharedCharacterCard(character, {
    dataAttribute: 'data-deck-character-id',
    extraClasses: `deck-card character-size-compact ${isSelected ? 'is-picked' : ''} ${isMain ? 'is-main' : ''}`,
    footerPrefix: `${order ? `<span class="pick-order">${order}</span>` : ''}${isMain ? '<span class="main-badge">Principal</span>' : ''}`,
    ariaLabel: `Seleccionar ${character.name} para el mazo`,
  })}
        `;
  }).join('')}
    </section>
  `;

  const saveDeckBtn = document.querySelector('#save-deck-btn');
  if (saveDeckBtn) {
    saveDeckBtn.addEventListener('click', saveDeck);
  }

  const editDeckBtn = document.querySelector('#edit-deck-btn');
  const addArtifactBtn = document.querySelector('#add-artifact-btn');
  if (addArtifactBtn) addArtifactBtn.addEventListener('click', openArtifactForm);

  if (editDeckBtn) {
    editDeckBtn.addEventListener('click', () => {
      if (!canEditDeck) return;
      savedDeck = { characterIds: [], mainIds: [] };
      selectedDeckIds = [];
      selectedCampoIds = [];
      deckOrder = [];
      renderDeckBuilder();
    });
  }
}

function renderOnlineUsers() {
  if (!battleUsersList) return;

  if (!currentUserId) {
    battleUsersList.innerHTML = '<p>Inicia sesión para ver perfiles autenticados.</p>';
    return;
  }

  const authenticatedUsers = [
    ...Object.entries(users).map(([uid, entry]) => ({ uid, ...(entry || {}) })).filter((entry) => entry.uid !== currentUserId),
    BOT_USER,
  ];
  if (!authenticatedUsers.length) {
    battleUsersList.innerHTML = '<p>No hay otros perfiles autenticados disponibles por ahora.</p>';
    return;
  }

  battleUsersList.innerHTML = authenticatedUsers
    .map((user) => {
      const openBattle = getOpenBattleWithUser(user.uid);
      const hasOpenBattle = Boolean(openBattle);
      const isOnline = isBotUid(user.uid) || Boolean(onlineUsers[user.uid]);
      const isSurrendering = surrenderInFlightUserId === user.uid;
      const hasPendingOutgoingChallenge = pendingChallenges.some((challenge) => (
        challenge?.status === 'pending'
        && challenge?.fromUid === currentUserId
        && challenge?.toUid === user.uid
      ));
      const actionLabel = hasOpenBattle ? 'Abrir Batalla' : (hasPendingOutgoingChallenge ? 'Esperando Respuesta' : 'Retar a batalla');
      const isActionDisabled = !hasOpenBattle && hasPendingOutgoingChallenge;
      return `
      <article class="battle-user-card">
        <p class="battle-user-name">${escapeHtml(user.name || 'Usuario sin nombre')}</p>
        <p class="battle-user-status">${isOnline ? 'En línea' : 'Desconectado'}</p>
        <div class="battle-user-actions">
          <button class="save-character-btn challenge-user-btn" type="button" data-challenge-user-id="${escapeHtml(user.uid)}" data-challenge-user-name="${escapeHtml(user.name || 'Usuario')}" ${isActionDisabled ? 'disabled' : ''}>
            ${actionLabel}
          </button>
          ${hasOpenBattle ? `<button class="cancel-character-btn surrender-battle-btn" type="button" data-surrender-user-id="${escapeHtml(user.uid)}" ${isSurrendering ? 'disabled' : ''}>${isSurrendering ? 'Procesando...' : 'Rendirse'}</button>` : ''}
        </div>
      </article>
    `;
    })
    .join('');
}

function renderBattleHistory() {
  if (!battleHistoryList) return;
  if (!currentUserId) {
    battleHistoryList.innerHTML = '<p>Inicia sesión para ver tu historial.</p>';
    return;
  }

  const historyEntries = Object.entries(battleHistoryByOpponent)
    .map(([opponentUid, summary]) => ({ opponentUid, ...(summary || {}) }))
    .sort((a, b) => (b.battles || 0) - (a.battles || 0));

  if (!historyEntries.length) {
    battleHistoryList.innerHTML = '<p>Aún no tienes batallas registradas.</p>';
    return;
  }

  battleHistoryList.innerHTML = historyEntries
    .map((entry) => {
      const opponent = users[entry.opponentUid] || {};
      return `
        <article class="battle-history-card">
          <div>
            <p class="battle-user-name">${escapeHtml(opponent.name || 'Usuario desconocido')}</p>
            <p class="battle-user-status">UID: ${escapeHtml(entry.opponentUid)}</p>
          </div>
          <p class="battle-history-stats">
            Batallas: <strong>${entry.battles || 0}</strong> ·
            Victorias: <strong>${entry.wins || 0}</strong> ·
            Derrotas: <strong>${entry.losses || 0}</strong>
          </p>
        </article>
      `;
    })
    .join('');
}

async function surrenderBattleAgainst(targetUserId) {
  if (surrenderInFlightUserId) return;
  const session = getOpenBattleWithUser(targetUserId);
  if (!session || !currentUserId) return;
  const opponentUid = (session.players || []).find((uid) => uid !== currentUserId);
  if (!opponentUid) return;

  surrenderInFlightUserId = targetUserId;
  renderOnlineUsers();
  try {
    await battleSessionsRef.child(session.id).update({
      status: 'finished',
      winnerUid: opponentUid,
      loserUid: currentUserId,
      endedAt: getTimestamp(),
      updatedAt: getTimestamp(),
    });
    renderOnlineUsers();
  } finally {
    surrenderInFlightUserId = null;
  }

  battleArenaDismissed = false;
  setSyncStatus('Te rendiste. La batalla fue otorgada al contrincante.', 'success');
}

function getOpenBattleWithUser(targetUserId) {
  if (!currentUserId || !targetUserId) return null;
  return battleSessions.find((session) => {
    const players = getBattlePlayers(session);
    const includesMe = players.includes(currentUserId);
    const includesTarget = players.includes(targetUserId);
    return includesMe && includesTarget && session.status === 'active';
  }) || null;
}



async function registerBattleOutcome(session) {
  if (!session?.id || session.status !== 'finished' || !session.winnerUid || !session.loserUid) return;

  const markerRef = battleOutcomeMarkersRef.child(session.id);
  const markerResult = await markerRef.transaction((currentValue) => {
    if (currentValue) return;
    return getTimestamp();
  });

  if (!markerResult.committed) {
    return;
  }

  const winnerVsLoserRef = battleHistoryRef.child(session.winnerUid).child(session.loserUid);
  const loserVsWinnerRef = battleHistoryRef.child(session.loserUid).child(session.winnerUid);

  const updates = [
    winnerVsLoserRef.transaction((currentValue) => ({
      battles: (currentValue?.battles || 0) + 1,
      wins: (currentValue?.wins || 0) + 1,
      losses: currentValue?.losses || 0,
      createdAt: currentValue?.createdAt || getTimestamp(),
      updatedAt: getTimestamp(),
    })),
    loserVsWinnerRef.transaction((currentValue) => ({
      battles: (currentValue?.battles || 0) + 1,
      wins: currentValue?.wins || 0,
      losses: (currentValue?.losses || 0) + 1,
      createdAt: currentValue?.createdAt || getTimestamp(),
      updatedAt: getTimestamp(),
    })),
  ];
  let winnerExperienceResult = null;
  let loserExperienceResult = null;
  if (!isBotUid(session.winnerUid)) {
    updates.push(
      usersRef.child(session.winnerUid).child('battleSummary').transaction((currentValue) => ({
        wins: (currentValue?.wins || 0) + 1,
        losses: currentValue?.losses || 0,
        updatedAt: getTimestamp(),
      })),
    );
    winnerExperienceResult = await registerExperiencePointForUser(session.winnerUid, true);
  }
  if (!isBotUid(session.loserUid)) {
    updates.push(
      usersRef.child(session.loserUid).child('battleSummary').transaction((currentValue) => ({
        wins: currentValue?.wins || 0,
        losses: (currentValue?.losses || 0) + 1,
        updatedAt: getTimestamp(),
      })),
    );
    loserExperienceResult = await registerExperiencePointForUser(session.loserUid, false);
  }
  await Promise.all(updates);
  if (winnerExperienceResult?.forcedCardId && loserExperienceResult?.selectedCardId) {
    await createCharacterEventForDevelopment({
      developmentCharacterId: winnerExperienceResult.forcedCardId,
      rivalUid: session.loserUid,
      rivalName: users[session.loserUid]?.name,
      rivalCardId: loserExperienceResult.selectedCardId,
      didWin: true,
    });
  }
  if (loserExperienceResult?.forcedCardId && winnerExperienceResult?.selectedCardId) {
    await createCharacterEventForDevelopment({
      developmentCharacterId: loserExperienceResult.forcedCardId,
      rivalUid: session.winnerUid,
      rivalName: users[session.winnerUid]?.name,
      rivalCardId: winnerExperienceResult.selectedCardId,
      didWin: false,
    });
  }
  if (currentUserId === session.winnerUid && winnerExperienceResult?.selectedCardId) {
    const character = characters.find((entry) => entry.id === winnerExperienceResult.selectedCardId);
    showExperienceOutcomeModal({ character, isPositive: true });
  }
  if (currentUserId === session.loserUid && loserExperienceResult?.selectedCardId) {
    const character = characters.find((entry) => entry.id === loserExperienceResult.selectedCardId);
    showExperienceOutcomeModal({ character, isPositive: false });
  }
}

async function ensureBattleHistoryPair(userAUid, userBUid) {
  if (!userAUid || !userBUid || userAUid === userBUid) return;
  const now = getTimestamp();
  await Promise.all([
    battleHistoryRef.child(userAUid).child(userBUid).transaction((currentValue) => ({
      battles: currentValue?.battles || 0,
      wins: currentValue?.wins || 0,
      losses: currentValue?.losses || 0,
      createdAt: currentValue?.createdAt || now,
      updatedAt: now,
    })),
    battleHistoryRef.child(userBUid).child(userAUid).transaction((currentValue) => ({
      battles: currentValue?.battles || 0,
      wins: currentValue?.wins || 0,
      losses: currentValue?.losses || 0,
      createdAt: currentValue?.createdAt || now,
      updatedAt: now,
    })),
  ]);
}

async function cleanupFinishedBattlesForUser(userId) {
  if (!userId) return;
  const finishedSessions = battleSessions.filter((session) => (
    session
    && session.status === 'finished'
    && (session.players || []).includes(userId)
    && session.id
  ));
  if (!finishedSessions.length) return;

  for (const session of finishedSessions) {
    await registerBattleOutcome(session);
    await battleSessionsRef.child(session.id).remove();
  }
}

async function sendBattleChallenge(targetUserId, targetUserName) {
  if (!currentUserId || !targetUserId || targetUserId === currentUserId) return;
  await battleChallengesRef.child(targetUserId).set({
    fromUid: currentUserId,
    fromName: userName.textContent || 'Usuario sin nombre',
    toUid: targetUserId,
    toName: targetUserName || 'Usuario',
    status: 'pending',
    createdAt: getTimestamp(),
    updatedAt: getTimestamp(),
  });
  setSyncStatus(`Desafío enviado a ${targetUserName || 'usuario'}.`, 'success');
}

function showChallengeModal(challengeData) {
  activeChallenge = challengeData;
  challengeMessage.textContent = `${challengeData.fromName || 'Un usuario'} te ha retado.`;
  battleChallengeModal.classList.remove('hidden');
}

function hideChallengeModal() {
  activeChallenge = null;
  battleChallengeModal.classList.add('hidden');
}

function showSurrenderVictoryModal() {
  if (battleSurrenderVictoryText) {
    battleSurrenderVictoryText.textContent = 'FELICIDADES HAS VENCIDO! TU CONTRINCANTE SE HA RENDIDO';
  }
  battleSurrenderVictoryModal?.classList.remove('hidden');
}

function hideSurrenderVictoryModal() {
  battleSurrenderVictoryModal?.classList.add('hidden');
}

function showBattleMessage(message) {
  if (!battleMessageModal || !battleMessageText) return;
  battleMessageText.textContent = message;
  battleMessageModal.classList.remove('hidden');
}

function hideBattleMessage() {
  battleMessageModal?.classList.add('hidden');
}

function showExperienceOutcomeModal({ character, isPositive }) {
  if (!battleExperienceOutcomeModal || !battleExperienceOutcomeText || !battleExperienceOutcomeCard || !character) return;
  const pointsLabel = isPositive ? 'positivos (+1)' : 'negativos (-1)';
  battleExperienceOutcomeText.textContent = `${character.name} ganó puntos de experiencia ${pointsLabel}.`;
  battleExperienceOutcomeCard.innerHTML = renderSharedCharacterCard(character, {
    staticCard: true,
    extraClasses: 'character-size-compact experience-outcome-card-preview',
  });
  battleExperienceOutcomeModal.classList.remove('hidden');
}

function hideExperienceOutcomeModal() {
  battleExperienceOutcomeModal?.classList.add('hidden');
}

async function respondToChallenge(status) {
  if (!currentUserId || !activeChallenge || isRespondingToChallenge) return;
  isRespondingToChallenge = true;
  const challengeToRespond = { ...activeChallenge };
  const challengerName = challengeToRespond?.fromName || 'otro usuario';
  try {
    if (status === 'accepted') {
      await createBattleSessionForChallenge(challengeToRespond);
    }
    await battleChallengesRef.child(currentUserId).remove();
    hideChallengeModal();
    renderOnlineUsers();
    setSyncStatus(
      status === 'accepted'
        ? `Aceptaste el reto de ${challengerName}.`
        : `Rechazaste el reto de ${challengerName}.`,
      'success',
    );
  } finally {
    isRespondingToChallenge = false;
  }
}

async function loadDeckForUser(userId) {
  const snapshot = await userDecksRef.child(userId).once('value');
  const data = snapshot.val();
  if (!data) {
    savedDeck = { characterIds: [], mainIds: [] };
    selectedDeckIds = [];
    selectedCampoIds = [];
    deckOrder = [];
    renderDeckBuilder();
    return;
  }

  savedDeck = {
    characterIds: Array.isArray(data.characterIds) ? data.characterIds : [],
    mainIds: Array.isArray(data.mainIds) ? data.mainIds : [],
  };
  selectedDeckIds = [...savedDeck.characterIds];
  selectedCampoIds = Array.isArray(data.campoIds) ? data.campoIds.slice(0, 3) : [];
  deckOrder = [...savedDeck.characterIds];
  renderDeckBuilder();
}

async function saveDeck() {
  savedDeck = { characterIds: [...selectedDeckIds], mainIds: [] };
  await userDecksRef.child(currentUserId).set({ ...savedDeck, campoIds: [...selectedCampoIds] });
  setSyncStatus('Mazo guardado correctamente.', 'success');
  renderDeckBuilder();
}

async function toggleMainCharacter(characterId) {
  if (!savedDeck.characterIds.includes(characterId)) return;
  const alreadyMain = savedDeck.mainIds.includes(characterId);
  if (!alreadyMain && savedDeck.mainIds.length >= 5) return;

  savedDeck.mainIds = alreadyMain
    ? savedDeck.mainIds.filter((id) => id !== characterId)
    : [...savedDeck.mainIds, characterId];
  await userDecksRef.child(currentUserId).set(savedDeck);
  renderDeckBuilder();
}

async function registerExperiencePointForUser(userId, isPositive) {
  if (!userId) return null;
  const deckSnapshot = await userDecksRef.child(userId).once('value');
  const deckData = deckSnapshot.val() || {};
  const mainIds = Array.isArray(deckData.mainIds) ? deckData.mainIds.filter(Boolean) : [];
  if (!mainIds.length) return null;

  const forcedCard = characters.find((entry) => {
    const development = getCharacterDevelopmentProgress(userId, entry);
    return development?.status === CHARACTER_DEVELOPMENT_MODE.PENDING;
  });
  const selectedCardId = forcedCard?.id || mainIds[Math.floor(Math.random() * mainIds.length)];
  if (!selectedCardId) return null;
  const selectedCharacter = characters.find((entry) => entry.id === selectedCardId) || null;
  const shouldActivateDevelopmentMode = selectedCharacter
    && isCharacterAtMaxBaseStats(selectedCharacter)
    && !forcedCard;
  const pointDelta = forcedCard ? 5 : 1;

  await usersRef.child(userId).child('experiencePoints').transaction((currentValue) => {
    const current = currentValue || {};
    const byCharacter = current.byCharacter || {};
    const currentCard = byCharacter[selectedCardId] || { positive: 0, negative: 0, total: 0 };
    const positive = (current.positive || 0) + (isPositive ? 1 : 0);
    const negative = (current.negative || 0) + (isPositive ? 0 : 1);
    const cardPositive = currentCard.positive || 0;
    const cardNegative = currentCard.negative || 0;
    if ((cardPositive + cardNegative) >= 5) {
      return current;
    }
    const updatedCard = {
      positive: cardPositive + (isPositive ? 1 : 0),
      negative: cardNegative + (isPositive ? 0 : 1),
      total: (currentCard.total || 0) + (isPositive ? 1 : -1),
    };
    return {
      positive,
      negative,
      byCharacter: {
        ...byCharacter,
        [selectedCardId]: updatedCard,
      },
      updatedAt: getTimestamp(),
    };
  });

  if (shouldActivateDevelopmentMode) {
    await userDecksRef.child(userId).child('mainIds').set([selectedCardId]);
  }
  return { selectedCardId, forcedCardId: forcedCard?.id || null, isPositive };
}

async function createCharacterEventForDevelopment({ developmentCharacterId, rivalUid, rivalName, rivalCardId, didWin }) {
  if (!developmentCharacterId || !rivalUid || !rivalCardId) return;
  const tagPool = didWin ? POSITIVE_EVENT_TAGS : NEGATIVE_EVENT_TAGS;
  const tag = tagPool[Math.floor(Math.random() * tagPool.length)];
  const rivalCard = characters.find((entry) => entry.id === rivalCardId);
  const eventId = crypto.randomUUID();
  await getCharacterRef(developmentCharacterId).child('events').child(eventId).set({
    id: eventId,
    tag,
    isPositive: didWin,
    rivalUid,
    rivalName: rivalName || users[rivalUid]?.name || 'Rival desconocido',
    rivalCardId,
    rivalCardName: rivalCard?.name || 'Carta desconocida',
    rivalCardImage: rivalCard?.image || '',
    story: '',
    image: '',
    locked: false,
    createdAt: getTimestamp(),
  });
}

function shuffleList(values) {
  const list = [...values];
  for (let index = list.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [list[index], list[randomIndex]] = [list[randomIndex], list[index]];
  }
  return list;
}

function getBattlePlayers(session) {
  return session.players || [];
}

function isBotUid(uid) {
  return uid === BOT_UID;
}

function getBotDeckCharacterIds() {
  if (!characters.length) return [];
  return shuffleList(characters.map((entry) => entry.id)).slice(0, 20);
}

function getBotPreferredAttack(session, botUid) {
  const botSlots = (session.fieldSlots || []).filter((slot) => slot.ownerUid === botUid && slot.cardId);
  const rivalSlots = (session.fieldSlots || []).filter((slot) => slot.ownerUid !== botUid && slot.cardId);
  if (!botSlots.length || !rivalSlots.length) return null;

  let bestPlay = null;
  botSlots.forEach((attackerSlot) => {
    const availableAttributes = getAvailableAttackAttributesForCard(session, attackerSlot.cardId, attackerSlot.ownerUid);
    const bestAttribute = availableAttributes.reduce((best, attribute) => {
      const value = getEffectiveStatValue(session, attackerSlot.cardId, attribute, attackerSlot.ownerUid);
      if (!best || value > best.value) {
        return { attribute, value };
      }
      return best;
    }, null);

    if (!bestAttribute || bestAttribute.value <= 0) return;

    const validTargets = rivalSlots
      .map((targetSlot) => {
        if (targetSlot.faceDown) {
          return { targetSlot, defenderValue: null };
        }
        const defenderValue = getEffectiveStatValue(session, targetSlot.cardId, bestAttribute.attribute, targetSlot.ownerUid);
        if (defenderValue < bestAttribute.value) {
          return { targetSlot, defenderValue };
        }
        return null;
      })
      .filter(Boolean);

    if (!validTargets.length) return;

    validTargets.sort((a, b) => {
      const aValue = a.defenderValue === null ? Number.POSITIVE_INFINITY : a.defenderValue;
      const bValue = b.defenderValue === null ? Number.POSITIVE_INFINITY : b.defenderValue;
      return aValue - bValue;
    });

    const selectedTarget = validTargets[0];
    const attackScore = bestAttribute.value - (selectedTarget.defenderValue ?? 0);

    if (!bestPlay || attackScore > bestPlay.score) {
      bestPlay = {
        attackerSlotId: attackerSlot.id,
        targetSlotId: selectedTarget.targetSlot.id,
        attribute: bestAttribute.attribute,
        score: attackScore,
      };
    }
  });

  return bestPlay;
}

function selectBestTarget(availableCards, attackerAttributes = null) {
  if (!Array.isArray(availableCards) || !availableCards.length) return null;

  const faceUpCards = availableCards.filter((entry) => !entry.slot.faceDown);
  const targetPool = faceUpCards.length ? faceUpCards : availableCards;
  const isFaceUpTargetPool = faceUpCards.length > 0;

  if (!isFaceUpTargetPool) {
    const hiddenTarget = targetPool[0] || null;
    if (!hiddenTarget) return null;
    return {
      ...hiddenTarget,
      attribute: attackerAttributes?.[0]?.attribute || battleAttributes[0],
      score: 0,
    };
  }

  let bestTarget = null;
  targetPool.forEach((targetEntry) => {
    const attackerBest = (attackerAttributes || []).reduce((best, attributeEntry) => {
      const defenderValue = getEffectiveStatValue(
        targetEntry.session,
        targetEntry.slot.cardId,
        attributeEntry.attribute,
        targetEntry.slot.ownerUid,
      );
      if (attributeEntry.value <= defenderValue) return best;
      const score = attributeEntry.value - defenderValue;
      if (!best || score > best.score) {
        return {
          attribute: attributeEntry.attribute,
          attackerValue: attributeEntry.value,
          defenderValue,
          score,
        };
      }
      return best;
    }, null);

    if (!attackerBest) return;

    if (!bestTarget || attackerBest.score > bestTarget.score) {
      bestTarget = {
        ...targetEntry,
        attribute: attackerBest.attribute,
        score: attackerBest.score,
        defenderValue: attackerBest.defenderValue,
      };
    }
  });

  return bestTarget;
}

function botActionLogic(session, botUid) {
  const botState = getPlayerState(session, botUid);
  const allBotSlots = (session.fieldSlots || []).filter((slot) => slot.ownerUid === botUid);
  const botSlotsWithCard = allBotSlots.filter((slot) => slot.cardId && !slot.faceDown);
  const rivalSlotsWithCard = (session.fieldSlots || []).filter((slot) => slot.ownerUid !== botUid && slot.cardId);
  const isFull = allBotSlots.length > 0 && allBotSlots.every((slot) => slot.cardId);
  const emptyBotSlot = allBotSlots.find((slot) => !slot.cardId) || null;

  let bestAttackPlan = null;
  botSlotsWithCard.forEach((attackerSlot) => {
    const availableAttributes = getAvailableAttackAttributesForCard(session, attackerSlot.cardId, attackerSlot.ownerUid)
      .map((attribute) => ({
        attribute,
        value: getEffectiveStatValue(session, attackerSlot.cardId, attribute, attackerSlot.ownerUid),
      }))
      .sort((a, b) => b.value - a.value);

    if (!availableAttributes.length) return;
    const potentialTargets = rivalSlotsWithCard.map((slot) => ({ slot, session }));
    const selectedTarget = selectBestTarget(potentialTargets, availableAttributes);
    if (!selectedTarget) return;

    const attackScore = selectedTarget.score ?? 0;
    if (!bestAttackPlan || attackScore > bestAttackPlan.score) {
      bestAttackPlan = {
        action: 'attack',
        attackerSlotId: attackerSlot.id,
        targetSlotId: selectedTarget.slot.id,
        attribute: selectedTarget.attribute,
        score: attackScore,
      };
    }
  });

  const hasPlacementOption = botState.hand.length > 0 && Boolean(emptyBotSlot);
  if (isFull && bestAttackPlan) {
    return bestAttackPlan;
  }

  const shouldAttemptAttackByProbability = Math.random() < 0.8;
  if (shouldAttemptAttackByProbability && bestAttackPlan) {
    return bestAttackPlan;
  }

  if (hasPlacementOption) {
    return {
      action: Math.random() < 0.5 ? 'place-faceup' : 'place-facedown',
      emptySlotId: emptyBotSlot.id,
    };
  }

  if (bestAttackPlan) return bestAttackPlan;
  return { action: 'pass' };
}

function getPlayerState(session, uid) {
  const state = (session.playerStates || {})[uid] || {};
  const hand = Array.isArray(state.hand) ? state.hand : [];
  const deck = Array.isArray(state.deck) ? state.deck : [];
  return { ...state, hand, deck };
}

function refillHandFromDeck(hand = [], deck = [], handSize = 3) {
  const nextHand = [...hand];
  const nextDeck = [...deck];
  while (nextHand.length < handSize && nextDeck.length) {
    nextHand.push(nextDeck.shift());
  }
  return { hand: nextHand, deck: nextDeck };
}

function getStatValue(character, attribute) {
  return Number.parseInt(character?.[attribute] ?? '0', 10) || 0;
}

function getBattleCardKey(ownerUid, cardId) {
  return `${ownerUid || 'unknown'}::${cardId || ''}`;
}

function getEffectiveStatValue(session, cardId, attribute, ownerUid = '') {
  const card = characters.find((entry) => entry.id === cardId);
  const baseValue = getStatValue(card, attribute);
  const battleModifiers = session?.battleModifiers || {};
  const cardKey = getBattleCardKey(ownerUid, cardId);
  const cardModifiers = battleModifiers[cardKey] || {};
  const modifierValue = Number.parseInt(cardModifiers[attribute] ?? '0', 10) || 0;
  return Math.max(0, baseValue + modifierValue);
}

function getHighestAttributeForCard(session, cardId, ownerUid = '') {
  return battleAttributes.reduce((best, attribute) => {
    const value = getEffectiveStatValue(session, cardId, attribute, ownerUid);
    if (!best || value > best.value) {
      return { attribute, value };
    }
    return best;
  }, null)?.attribute || 'strength';
}

function getUsedAttackAttributesForCard(session, cardId, ownerUid = '') {
  const cycleByCard = session?.attackAttributeCycleByCard || {};
  const cardKey = getBattleCardKey(ownerUid, cardId);
  const used = cycleByCard[cardKey];
  return Array.isArray(used) ? used.filter((attribute) => battleAttributes.includes(attribute)) : [];
}

function getAvailableAttackAttributesForCard(session, cardId, ownerUid = '') {
  const used = getUsedAttackAttributesForCard(session, cardId, ownerUid);
  const available = battleAttributes.filter((attribute) => !used.includes(attribute));
  return available.length ? available : [...battleAttributes];
}

function getNextAttackAttributeCycleByCard(session, cardId, usedAttribute, ownerUid = '') {
  const currentCycle = { ...(session?.attackAttributeCycleByCard || {}) };
  const used = getUsedAttackAttributesForCard(session, cardId, ownerUid);
  if (!battleAttributes.includes(usedAttribute) || used.includes(usedAttribute)) {
    return currentCycle;
  }
  const nextUsed = [...used, usedAttribute];
  const cardKey = getBattleCardKey(ownerUid, cardId);
  currentCycle[cardKey] = nextUsed.length >= battleAttributes.length ? [] : nextUsed;
  return currentCycle;
}

async function resolveAttack(session, attackerSlotId, targetSlotId, attackerAttribute, defenderAttribute = attackerAttribute) {
  const attackerSlot = (session.fieldSlots || []).find((slot) => slot.id === attackerSlotId);
  const targetSlot = (session.fieldSlots || []).find((slot) => slot.id === targetSlotId);
  if (!attackerSlot || !targetSlot || !attackerSlot.cardId || !targetSlot.cardId) return;
  if (attackerSlot.faceDown) {
    showBattleMessage('Las cartas boca abajo no pueden iniciar un ataque.');
    return;
  }

  const attackerCard = characters.find((entry) => entry.id === attackerSlot.cardId);
  const targetCard = characters.find((entry) => entry.id === targetSlot.cardId);
  if (!attackerCard || !targetCard) return;
  const availableAttackAttributes = getAvailableAttackAttributesForCard(session, attackerSlot.cardId, attackerSlot.ownerUid);
  if (!availableAttackAttributes.includes(attackerAttribute)) {
    showBattleMessage(`No puedes repetir ${attackerAttribute.toUpperCase()} con ${attackerCard.name} hasta completar el ciclo de 4 atributos.`);
    return;
  }

  const attackerValue = getEffectiveStatValue(session, attackerSlot.cardId, attackerAttribute, attackerSlot.ownerUid);
  const targetValue = getEffectiveStatValue(session, targetSlot.cardId, defenderAttribute, targetSlot.ownerUid);
  const wasTargetFaceDown = Boolean(targetSlot.faceDown);
  const updatedSlots = [...session.fieldSlots];
  const defenderIndex = updatedSlots.findIndex((slot) => slot.id === targetSlotId);
  if (defenderIndex >= 0 && updatedSlots[defenderIndex].faceDown) {
    updatedSlots[defenderIndex] = { ...updatedSlots[defenderIndex], faceDown: false };
  }
  const updatedPlayerStates = { ...(session.playerStates || {}) };
  const updatedModifiers = { ...(session.battleModifiers || {}) };
  const players = getBattlePlayers(session);
  const nextTurnUid = players.find((uid) => uid !== session.currentTurnUid) || session.currentTurnUid;
  let loserCardId = '';
  const destroyedCardIds = new Set();
  let statPenaltyMessage = '';
  let attackerDestroyedByExhaustion = false;
  let targetSurvived = true;
  const updatedAttributeCycleByCard = getNextAttackAttributeCycleByCard(session, attackerSlot.cardId, attackerAttribute, attackerSlot.ownerUid);

  const attackerCardKey = getBattleCardKey(attackerSlot.ownerUid, attackerSlot.cardId);
  const attackerModifiers = { ...(updatedModifiers[attackerCardKey] || {}) };
  const previousAttackPenalty = Number.parseInt(attackerModifiers[attackerAttribute] ?? '0', 10) || 0;
  const attackPenalty = 5;
  attackerModifiers[attackerAttribute] = previousAttackPenalty - attackPenalty;
  updatedModifiers[attackerCardKey] = attackerModifiers;
  const attackerResultingValue = getStatValue(attackerCard, attackerAttribute) + attackerModifiers[attackerAttribute];
  statPenaltyMessage = ` ${attackerCard.name} pierde ${attackPenalty} puntos en ${attackerAttribute} por atacar y queda en ${Math.max(0, attackerResultingValue)} durante la batalla.`;

  if (wasTargetFaceDown && targetValue > attackerValue) {
    const defenseReduction = Math.floor(targetValue / 2);
    attackerModifiers[attackerAttribute] = (Number.parseInt(attackerModifiers[attackerAttribute] ?? '0', 10) || 0) - defenseReduction;
    updatedModifiers[attackerCardKey] = attackerModifiers;
    const reducedAttackValue = Math.max(0, getStatValue(attackerCard, attackerAttribute) + attackerModifiers[attackerAttribute]);
    statPenaltyMessage += ` ${targetCard.name} se defendió exitosamente boca abajo y reduce ${attackerAttribute} de ${attackerCard.name} en ${defenseReduction} (${targetValue}/2). ${attackerAttribute} queda en ${reducedAttackValue} durante la batalla.`;
    targetSurvived = true;
  } else if (wasTargetFaceDown && targetValue === attackerValue) {
    targetSurvived = true;
    statPenaltyMessage += ` ${targetCard.name} se defendió boca abajo con el mismo valor de ${attackerAttribute}. La carta defensora queda boca arriba sin cambios de puntos.`;
  } else if (attackerValue < targetValue) {
    loserCardId = attackerSlot.cardId;
    destroyedCardIds.add(attackerSlot.cardId);
    const attackerIndex = updatedSlots.findIndex((slot) => slot.id === attackerSlotId);
    if (attackerIndex >= 0) {
      updatedSlots[attackerIndex] = { ...updatedSlots[attackerIndex], cardId: '', faceDown: false };
    }
  } else if (targetValue < attackerValue) {
    loserCardId = targetSlot.cardId;
    destroyedCardIds.add(targetSlot.cardId);
    const loserIndex = updatedSlots.findIndex((slot) => slot.id === targetSlotId);
    updatedSlots[loserIndex] = { ...updatedSlots[loserIndex], cardId: '', faceDown: false };
  }

  if (attackerResultingValue <= 0) {
    attackerDestroyedByExhaustion = true;
    const attackerIndex = updatedSlots.findIndex((slot) => slot.id === attackerSlotId);
    if (attackerIndex >= 0 && updatedSlots[attackerIndex].cardId) {
      updatedSlots[attackerIndex] = { ...updatedSlots[attackerIndex], cardId: '', faceDown: false };
    }
    if (!loserCardId) {
      loserCardId = attackerSlot.cardId;
    }
    destroyedCardIds.add(attackerSlot.cardId);
  }

  if (!loserCardId) {
    await battleSessionsRef.child(session.id).update({
      fieldSlots: updatedSlots,
      battleModifiers: updatedModifiers,
      attackAttributeCycleByCard: updatedAttributeCycleByCard,
      currentTurnUid: nextTurnUid,
      pendingDefense: null,
      updatedAt: getTimestamp(),
    });
    showBattleMessage(`Ataque (${attackerAttribute}) vs defensa (${defenderAttribute}): ${attackerCard.name} (${attackerValue}) vs ${targetCard.name} (${targetValue}). Ninguna carta desaparece y el turno pasa al rival.${statPenaltyMessage}`);
    return;
  }

  Object.keys(updatedPlayerStates).forEach((uid) => {
    const state = updatedPlayerStates[uid] || { hand: [], deck: [] };
    const filteredHand = (state.hand || []).filter((id) => !destroyedCardIds.has(id));
    const filteredDeck = (state.deck || []).filter((id) => !destroyedCardIds.has(id));
    const replenishedState = refillHandFromDeck(filteredHand, filteredDeck);
    updatedPlayerStates[uid] = {
      ...state,
      hand: replenishedState.hand,
      deck: replenishedState.deck,
    };
  });

  await battleSessionsRef.child(session.id).update({
    fieldSlots: updatedSlots,
    playerStates: updatedPlayerStates,
    battleModifiers: updatedModifiers,
    attackAttributeCycleByCard: updatedAttributeCycleByCard,
    currentTurnUid: nextTurnUid,
    pendingDefense: null,
    updatedAt: getTimestamp(),
  });

  const exhaustionNote = attackerDestroyedByExhaustion ? ` ${attackerCard.name} también fue destruida al quedarse sin ${attackerAttribute}.` : '';
  showBattleMessage(`Ataque (${attackerAttribute}) vs defensa (${defenderAttribute}): ${attackerCard.name} (${attackerValue}) vs ${targetCard.name} (${targetValue}). La carta derrotada desapareció del mazo y de la mano.${statPenaltyMessage}${exhaustionNote} El turno pasa al rival.`);
}


function getBattleCardWithEffectiveStats(session, cardId, ownerUid = '') {
  const card = characters.find((entry) => entry.id === cardId);
  if (!card) return null;
  return {
    ...card,
    strength: getEffectiveStatValue(session, cardId, 'strength', ownerUid) || 0,
    intelligence: getEffectiveStatValue(session, cardId, 'intelligence', ownerUid) || 0,
    magic: getEffectiveStatValue(session, cardId, 'magic', ownerUid) || 0,
    speed: getEffectiveStatValue(session, cardId, 'speed', ownerUid) || 0,
  };
}


function getBattleRenderSnapshot(session) {
  const compactSlots = (session.fieldSlots || []).map((slot) => ({
    id: slot.id,
    ownerUid: slot.ownerUid,
    cardId: slot.cardId || '',
    faceDown: Boolean(slot.faceDown),
  }));
  const compactStates = Object.fromEntries(
    Object.entries(session.playerStates || {}).map(([uid, state]) => [uid, {
      hand: (state.hand || []).slice(0, 3),
      deckSize: (state.deck || []).length,
      discardSize: (state.discard || []).length,
    }]),
  );

  return JSON.stringify({
    id: session.id,
    currentTurnUid: session.currentTurnUid || '',
    pendingDefense: session.pendingDefense || null,
    status: session.status || '',
    slots: compactSlots,
    states: compactStates,
  });
}

function stopBattleRealtimeSync() {
  if (battleRealtimeListenerRef && battleRealtimeListener) {
    battleRealtimeListenerRef.off('value', battleRealtimeListener);
  }
  battleRealtimeListenerRef = null;
  battleRealtimeListener = null;
  if (battlePollingIntervalId) {
    clearInterval(battlePollingIntervalId);
    battlePollingIntervalId = null;
  }
}

function startBattleRealtimeSync(sessionId) {
  if (!sessionId || !currentUserId) return;
  stopBattleRealtimeSync();

  const sessionRef = battleSessionsRef.child(sessionId);
  battleRealtimeListenerRef = sessionRef;
  battleRealtimeListener = (snapshot) => {
    const latest = snapshot.val();
    if (!latest || latest.status !== 'active') return;
    const snapshotKey = getBattleRenderSnapshot(latest);
    if (snapshotKey === lastRenderedBattleSnapshot) return;

    const previousTurnUid = activeBattleSession?.currentTurnUid || '';
    const turnChanged = Boolean(previousTurnUid) && latest.currentTurnUid && previousTurnUid !== latest.currentTurnUid;

    if (turnChanged) {
      if (battleTurnTransitionTimeoutId) clearTimeout(battleTurnTransitionTimeoutId);
      if (battleTurnLabel) battleTurnLabel.textContent = 'Resolviendo acciones y cambiando turno...';
      battleTurnTransitionTimeoutId = window.setTimeout(() => {
        activeBattleSession = latest;
        renderBattleArena();
        animateBattleTurnTransition();
        battleTurnTransitionTimeoutId = null;
      }, 550);
      return;
    }

    activeBattleSession = latest;
    renderBattleArena();
  };

  sessionRef.on('value', battleRealtimeListener);
  battlePollingIntervalId = window.setInterval(async () => {
    if (battleArenaModal.classList.contains('hidden') || !activeBattleSession?.id) return;
    const fallbackSnapshot = await sessionRef.once('value');
    const fallback = fallbackSnapshot.val();
    if (!fallback || fallback.status !== 'active') return;
    const snapshotKey = getBattleRenderSnapshot(fallback);
    if (snapshotKey === lastRenderedBattleSnapshot) return;
    const previousTurnUid = activeBattleSession?.currentTurnUid || '';
    activeBattleSession = fallback;
    renderBattleArena();
    if (previousTurnUid && fallback.currentTurnUid && previousTurnUid !== fallback.currentTurnUid) {
      animateBattleTurnTransition();
    }
  }, 3000);
}

function getActiveBattleOpponentUid() {
  if (!activeBattleSession || !currentUserId) return '';
  return (activeBattleSession.players || []).find((uid) => uid !== currentUserId) || '';
}

function animateBattleTurnTransition() {
  const battleArenaCard = document.querySelector('.battle-arena-card');
  if (!battleArenaCard) return;
  battleArenaCard.classList.remove('turn-transition-active');
  void battleArenaCard.offsetWidth;
  battleArenaCard.classList.add('turn-transition-active');
}

function renderBattleArena() {
  if (!activeBattleSession || !currentUserId) return;
  const session = activeBattleSession;
  lastRenderedBattleSnapshot = getBattleRenderSnapshot(session);
  const currentTurnUid = session.currentTurnUid;
  const myTurn = currentTurnUid === currentUserId;
  const players = getBattlePlayers(session);
  const opponentUid = players.find((uid) => uid !== currentUserId);

  if (battleArenaSurrenderButton) {
    battleArenaSurrenderButton.disabled = !opponentUid || surrenderInFlightUserId === opponentUid;
    battleArenaSurrenderButton.textContent = surrenderInFlightUserId === opponentUid ? 'Procesando...' : 'Rendirse';
  }
  const myState = getPlayerState(session, currentUserId);

  battleTurnLabel.textContent = myTurn ? 'Es tu turno.' : 'Turno del contrincante.';
  const handCardsMarkup = myState.hand.slice(0, 3).map((cardId) => {
    const card = getBattleCardWithEffectiveStats(session, cardId, currentUserId);
    const selectedClass = selectedHandCardId === cardId ? 'is-picked' : '';
    if (!card) return '';
    return renderSharedCharacterCard(card, {
      dataAttribute: 'data-battle-hand-id',
      dataValue: cardId,
      extraClasses: `deck-card battle-hand-card character-size-compact battle-vertical-card ${selectedClass}`,
      ariaLabel: `Carta en mano ${card.name}`,
    });
  }).join('');
  battleHand.innerHTML = `<span class="battle-slot-empty lane-padding" aria-hidden="true"></span>${handCardsMarkup || '<p>No tienes cartas en mano.</p>'}`;

  const renderSlots = (ownerUid, slotsContainer, isPlayer) => {
    const slots = (session.fieldSlots || [])
      .filter((slot) => slot.ownerUid === ownerUid)
      .slice(0, 5);
    const slotMarkup = slots.map((slot) => {
      const card = slot.cardId ? getBattleCardWithEffectiveStats(session, slot.cardId, slot.ownerUid) : null;
      const hiddenForOpponent = slot.faceDown && !isPlayer;
      const obscuredForOwner = slot.faceDown && isPlayer;
      const canPlace = isPlayer && !slot.cardId && Boolean(selectedHandCardId) && Boolean(pendingPlacementMode) && shouldUseCardActionModal();
      const canInspect = Boolean(slot.cardId);
      const content = slot.cardId
        ? renderBattleCharacterCard(card, { hidden: hiddenForOpponent, obscured: obscuredForOwner })
        : '<span class="battle-slot-empty">Vacío</span>';;
      return `<button class="battle-slot ${slot.cardId ? 'occupied' : ''} ${slot.faceDown ? 'facedown' : ''}" data-battle-slot-id="${slot.id}" ${(!canPlace && !canInspect) ? 'disabled' : ''}>${content}</button>`;
    }).join('');
    slotsContainer.innerHTML = `<span class="battle-slot-empty lane-padding" aria-hidden="true"></span>${slotMarkup}`;

  };

  renderSlots(opponentUid, battleOpponentSlots, false);
  renderSlots(currentUserId, battlePlayerSlots, true);
  renderBattlePreviewCard();
  battleArenaModal.classList.remove('hidden');
}

function renderBattlePreviewCard() {
  if (!battleSideMiddle) return;
  if (!selectedBattlePreview || selectedBattlePreview.hidden) {
    battleSideMiddle.innerHTML = '<p class="battle-preview-empty">Haz click en una carta para verla aquí.</p>';
    return;
  }
  const card = getBattleCardWithEffectiveStats(activeBattleSession, selectedBattlePreview.cardId, selectedBattlePreview.ownerUid || '');
  if (!card) {
    battleSideMiddle.innerHTML = '<p class="battle-preview-empty">Haz click en una carta para verla aquí.</p>';
    return;
  }
  battleSideMiddle.innerHTML = renderSharedCharacterCard(card, {
    extraClasses: 'battle-preview-card battle-vertical-card',
    staticCard: true,
  });
}

function renderBattleCharacterCard(card, { hidden = false, obscured = false } = {}) {
  if (hidden) {
    return '<span class="battle-facedown-plate" aria-label="Carta boca abajo"></span>';
  }
  if (!card) {
    return '<span class="battle-slot-empty">Carta</span>';
  }
  return renderSharedCharacterCard(card, {
    extraClasses: `battle-field-card character-size-compact battle-vertical-card ${obscured ? 'battle-facedown-owner' : ''}`,
    staticCard: true,
  });
}

function showCardActionModal(cardId) {
  selectedHandCardId = cardId;
  pendingPlacementMode = null;
  battleCardActionModal.classList.remove('hidden');
}

function hideCardActionModal() {
  battleCardActionModal.classList.add('hidden');
}

function shouldUseCardActionModal() {
  return window.matchMedia('(pointer: coarse)').matches;
}

async function placeHandCardInNextAvailableSlot(session, cardId, mode) {
  if (!session || !currentUserId || !cardId) return;
  const myState = getPlayerState(session, currentUserId);
  if (!myState.hand.includes(cardId)) return;

  const mySlots = (session.fieldSlots || []).filter((slot) => slot.ownerUid === currentUserId);
  const emptySlot = mySlots.find((slot) => !slot.cardId);
  if (!emptySlot) {
    showBattleMessage('No tienes espacios vacíos para colocar cartas.');
    return;
  }

  const faceDown = mode === 'facedown';
  const fieldSlots = (session.fieldSlots || []).map((slot) => (slot.id === emptySlot.id ? { ...slot, cardId, faceDown } : slot));
  const updatedState = refillHandFromDeck(
    myState.hand.filter((id) => id !== cardId),
    [...myState.deck],
  );
  const opponentUid = session.players.find((uid) => uid !== currentUserId);
  await battleSessionsRef.child(session.id).update({
    fieldSlots,
    currentTurnUid: opponentUid,
    [`playerStates/${currentUserId}/hand`]: updatedState.hand,
    [`playerStates/${currentUserId}/deck`]: updatedState.deck,
    updatedAt: getTimestamp(),
  });
  selectedHandCardId = null;
  pendingPlacementMode = null;
}

function isDeckBattleReady(deckData) {
  const characterIds = Array.isArray(deckData?.characterIds) ? deckData.characterIds.filter(Boolean) : [];
  const mainIds = Array.isArray(deckData?.mainIds) ? deckData.mainIds.filter(Boolean) : [];
  return characterIds.length === 20 && mainIds.length === 5;
}

async function createBattleSessionForChallenge(challengeData) {
  const botAccepterDeck = getBotDeckCharacterIds();
  const accepterDeckData = isBotUid(challengeData.toUid)
    ? {
      characterIds: botAccepterDeck,
      mainIds: botAccepterDeck.slice(0, 5),
    }
    : ((await userDecksRef.child(challengeData.toUid).once('value')).val() || {});
  if (!isDeckBattleReady(accepterDeckData)) throw new Error('Debes tener mazo de 20 cartas y 5 principales para aceptar.');

  const botChallengerDeck = getBotDeckCharacterIds();
  const challengerDeckData = isBotUid(challengeData.fromUid)
    ? {
      characterIds: botChallengerDeck,
      mainIds: botChallengerDeck.slice(0, 5),
    }
    : ((await userDecksRef.child(challengeData.fromUid).once('value')).val() || {});
  if (!isDeckBattleReady(challengerDeckData)) throw new Error('El contrincante no tiene mazo válido (20 cartas y 5 principales).');

  const accepterDeck = accepterDeckData.characterIds;
  const challengerDeck = challengerDeckData.characterIds;

  const id = battleSessionsRef.push().key;
  const challengerShuffled = shuffleList(challengerDeck);
  const accepterShuffled = shuffleList(accepterDeck);
  const players = [challengeData.fromUid, challengeData.toUid];
  const fieldSlots = [
    ...Array.from({ length: 5 }, (_, i) => ({ id: `opponent-${i + 1}`, ownerUid: challengeData.fromUid, cardId: '', faceDown: false })),
    ...Array.from({ length: 5 }, (_, i) => ({ id: `player-${i + 1}`, ownerUid: challengeData.toUid, cardId: '', faceDown: false })),
  ];

  await ensureBattleHistoryPair(challengeData.fromUid, challengeData.toUid);

  await battleSessionsRef.child(id).set({
    id,
    status: 'active',
    players,
    currentTurnUid: challengeData.fromUid,
    fieldSlots,
    playerStates: {
      [challengeData.fromUid]: { hand: challengerShuffled.slice(0, 3), deck: challengerShuffled.slice(3) },
      [challengeData.toUid]: { hand: accepterShuffled.slice(0, 3), deck: accepterShuffled.slice(3) },
    },
    createdAt: getTimestamp(),
    updatedAt: getTimestamp(),
  });
  return id;
}

function playerHasNoHandCards(session, uid) {
  const state = getPlayerState(session, uid);
  return (state.hand || []).length === 0;
}

async function finishBattleIfPlayerOutOfCards(session) {
  if (!session?.id || session.status !== 'active') return false;
  const players = getBattlePlayers(session);
  if (players.length !== 2) return false;
  const [playerAUid, playerBUid] = players;
  const playerAOut = playerHasNoHandCards(session, playerAUid);
  const playerBOut = playerHasNoHandCards(session, playerBUid);
  if (!playerAOut && !playerBOut) return false;

  const loserUid = playerAOut ? playerAUid : playerBUid;
  const winnerUid = loserUid === playerAUid ? playerBUid : playerAUid;
  await battleSessionsRef.child(session.id).update({
    status: 'finished',
    winnerUid,
    loserUid,
    endedAt: getTimestamp(),
    updatedAt: getTimestamp(),
  });
  return true;
}

async function executeBotTurn(session) {
  if (!session?.id || session.status !== 'active') return;
  if (session.currentTurnUid !== BOT_UID) return;
  if (botTurnInFlightSessionId === session.id) return;
  botTurnInFlightSessionId = session.id;

  try {
    const botState = getPlayerState(session, BOT_UID);
    const decision = botActionLogic(session, BOT_UID);

    if (decision.action === 'place-faceup' || decision.action === 'place-facedown') {
      const emptyBotSlot = (session.fieldSlots || []).find((slot) => slot.id === decision.emptySlotId);
      if (!emptyBotSlot) return;
      const cardId = botState.hand[0];
      const updatedState = refillHandFromDeck(
        botState.hand.slice(1),
        [...botState.deck],
      );
      const faceDown = decision.action === 'place-facedown';
      const fieldSlots = (session.fieldSlots || []).map((slot) => (
        slot.id === emptyBotSlot.id ? { ...slot, cardId, faceDown } : slot
      ));
      const nextTurnUid = session.players.find((uid) => uid !== BOT_UID) || BOT_UID;
      await battleSessionsRef.child(session.id).update({
        fieldSlots,
        currentTurnUid: nextTurnUid,
        [`playerStates/${BOT_UID}/hand`]: updatedState.hand,
        [`playerStates/${BOT_UID}/deck`]: updatedState.deck,
        updatedAt: getTimestamp(),
      });
      return;
    }

    if (decision.action === 'attack') {
      const targetSlot = (session.fieldSlots || []).find((slot) => slot.id === decision.targetSlotId);
      if (targetSlot?.faceDown) {
        await battleSessionsRef.child(session.id).update({
          pendingDefense: {
            attackerSlotId: decision.attackerSlotId,
            targetSlotId: decision.targetSlotId,
            attackerAttribute: decision.attribute,
            defenderUid: targetSlot.ownerUid,
            createdAt: getTimestamp(),
          },
          updatedAt: getTimestamp(),
        });
        return;
      }
      await resolveAttack(
        session,
        decision.attackerSlotId,
        decision.targetSlotId,
        decision.attribute,
        decision.attribute,
      );
      return;
    }

    const nextTurnUid = session.players.find((uid) => uid !== BOT_UID) || BOT_UID;
    await battleSessionsRef.child(session.id).update({
      currentTurnUid: nextTurnUid,
      updatedAt: getTimestamp(),
    });
  } finally {
    botTurnInFlightSessionId = '';
  }
}

function closeProfile() {
  activeProfileId = null;
  document.querySelector('.character-profile').classList.add('hidden');
  document.querySelector('#personajes-gallery').classList.remove('hidden');
  addCharacterButton.classList.remove('hidden');
}

async function deleteCharacter(characterId) {
  if (!characterId) {
    return;
  }

  const character = characters.find((entry) => entry.id === characterId);
  if (!character) {
    return;
  }

  const shouldDelete = window.confirm(`¿Seguro que quieres eliminar a ${character.name}? Esta acción no se puede deshacer.`);
  if (!shouldDelete) {
    return;
  }

  try {
    await getCharacterRef(characterId).remove();
    setSyncStatus('Personaje eliminado correctamente.', 'success');
    closeProfile();
  } catch (error) {
    console.error('No se pudo eliminar el personaje en Firebase:', error);
    setSyncStatus('No se pudo eliminar el personaje. Revisa la conexión o las reglas de Firebase.', 'error');
  }
}




function getCharacterExperience(characterId) {
  const experiencePoints = users[currentUserId]?.experiencePoints || {};
  const cardExperience = experiencePoints.byCharacter?.[characterId] || {};
  const positive = Number.parseInt(cardExperience.positive ?? '0', 10) || 0;
  const negative = Number.parseInt(cardExperience.negative ?? '0', 10) || 0;
  const total = Number.parseInt(cardExperience.total ?? String(positive - negative), 10) || 0;
  const available = positive + negative;
  const canSpend = available >= 5;
  return { positive, negative, total, available, canSpend };
}

function closeExperienceModal() {
  if (!experienceModalState) return;
  experienceModalState.overlay.remove();
  experienceModalState = null;
}

function openExperienceModal(character) {
  closeExperienceModal();
  const { positive, negative, total, available, canSpend } = getCharacterExperience(character.id);

  const overlay = document.createElement('div');
  overlay.className = 'challenge-modal';
  overlay.innerHTML = `
    <div class="challenge-modal-card">
      <h3>PUNTOS DE EXPERIENCIA</h3>
      <p>${escapeHtml(character.name)}</p>
      <p><strong class="xp-positive">Puntos positivos: +${positive}</strong></p>
      <p><strong class="xp-negative">Puntos negativos: -${negative}</strong></p>
      <p><strong>Total acumulado: ${total}</strong></p>
      <p><strong>Puntos disponibles para desbloquear edición: ${available}/5</strong></p>
      <p>${canSpend ? "Puedes usar estos puntos para editar atributos ahora." : "Necesitas 5 puntos (positivos+negativos) para habilitar edición."}</p>
      <div class="challenge-actions">
        <button class="save-character-btn" data-close-experience-modal type="button">Cerrar</button>
      </div>
    </div>
  `;
  document.body.append(overlay);
  experienceModalState = { overlay };
}


function getAvailableTypeEntries() {
  const historyEntries = Object.values(historyTypesData || {})
    .map((entry) => ({
      type: (entry?.name || '').trim(),
      clans: Object.values(entry?.clans || {})
        .map((clan) => (clan?.name || '').trim())
        .filter(Boolean),
    }))
    .filter((entry) => entry.type);

  return historyEntries.length ? historyEntries : characterTypes;
}

function repopulateCreateTypeOptions() {
  const typeSelect = document.querySelector('#character-type');
  if (!typeSelect) return;

  const previousValue = typeSelect.value;
  const typeEntries = getAvailableTypeEntries();
  typeSelect.innerHTML = '';
  typeSelect.append(createOption('', 'Selecciona un tipo'));
  typeEntries.forEach((entry) => typeSelect.append(createOption(entry.type, entry.type)));

  if (typeEntries.some((entry) => entry.type === previousValue)) {
    typeSelect.value = previousValue;
  }

  updateClanOptions();
}
function updateProfileClanOptions(selectedClan = '') {
  const typeSelect = document.querySelector('#profile-character-type');
  const clanSelect = document.querySelector('#profile-character-clan');
  const selectedType = getAvailableTypeEntries().find((entry) => entry.type === typeSelect.value);

  clanSelect.innerHTML = '';
  if (!selectedType) {
    clanSelect.append(createOption('', 'Selecciona primero un tipo'));
    clanSelect.disabled = true;
    return;
  }

  clanSelect.disabled = false;
  clanSelect.append(createOption('', 'Sin clan'));
  selectedType.clans.forEach((clan) => clanSelect.append(createOption(clan, clan)));
  clanSelect.value = selectedClan;
}

function updateProfileImagePreview(imageSource) {
  const preview = document.querySelector('#profile-image-preview');
  const currentImageInput = document.querySelector('#profile-image-current');

  currentImageInput.value = imageSource;
  preview.src = imageSource;
  preview.classList.toggle('hidden', !imageSource);
}

function getCharacterExperienceState(characterId) {
  const experiencePoints = users[currentUserId]?.experiencePoints || {};
  const cardExperience = experiencePoints.byCharacter?.[characterId] || {};
  const positive = Number.parseInt(cardExperience.positive ?? '0', 10) || 0;
  const negative = Number.parseInt(cardExperience.negative ?? '0', 10) || 0;
  const total = Number.parseInt(cardExperience.total ?? String(positive - negative), 10) || 0;
  return { positive, negative, total };
}

function canEditProfileIdentityByExperience(totalExperience) {
  return totalExperience > 0 && totalExperience < 5;
}

function renderProfile(character) {
  const profile = document.querySelector('.character-profile');
  const developmentProgress = currentUserId ? getCharacterDevelopmentProgress(currentUserId, character) : null;
  const canOvercapStats = developmentProgress?.status === CHARACTER_DEVELOPMENT_MODE.READY_TO_EDIT;
  const profileStatMax = canOvercapStats ? 999 : 100;
  const imagePreview = character.image
    ? `<img id="profile-image-preview" class="preview-image" src="${escapeHtml(character.image)}" alt="Imagen actual de ${escapeHtml(character.name)}">`
    : '<img id="profile-image-preview" class="preview-image hidden" alt="Imagen actual del personaje">';

  activeProfileId = character.id;
  const { total: availableExperience } = getCharacterExperienceState(character.id);
  const canEditIdentityFields = canEditProfileIdentityByExperience(availableExperience);
  const identityLockMessage = canEditIdentityFields
    ? ''
    : '<p class="deck-lock-note">Nombre, Tipo, Clan, Historia e imagen se habilitan al gastar el primer punto de experiencia y se vuelven a bloquear al gastar el último de los 5 puntos.</p>';
  const events = Object.values(character.events || {}).sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  profile.innerHTML = `
    <button class="back-to-gallery-btn" type="button">← Volver a personajes</button>
    <form class="profile-form" style="${getTypeColorStyles(character.type)}">
      ${(() => { const xp = getCharacterExperience(character.id); return `<p class="profile-kicker">${xp.canSpend ? `Edición desbloqueada: reparte +${xp.positive} y -${xp.negative}.` : "Rasgos bloqueados: elimina el personaje o consigue 5 puntos de experiencia."}</p>`; })()}
      <div class="profile-heading">
        <div>
          <p class="profile-kicker">Perfil del personaje</p>
          <h2>${escapeHtml(character.name)}</h2>
        </div>
        <span class="character-type-pill">${escapeHtml(character.type)}</span>
      </div>
      <div class="profile-grid">
        <div class="profile-fields">
          <label>
            Nombre del personaje
            <input name="name" type="text" required value="${escapeHtml(character.name)}" disabled>
          </label>
          <label>
            Tipo
            <select id="profile-character-type" name="type" required disabled></select>
          </label>
          <label>
            Clan
            <select id="profile-character-clan" name="clan" disabled></select>
          </label>
          <div class="stats-grid">
            <label>
              Puntos de magia
              <input name="magic" type="number" min="1" max="100" required value="${escapeHtml(character.magic)}" disabled>
            </label>
            <label>
              Puntos de fuerza
              <input name="strength" type="number" min="1" max="100" required value="${escapeHtml(character.strength)}" disabled>
            </label>
            <label>
              Puntos de inteligencia
              <input name="intelligence" type="number" min="1" max="100" required value="${escapeHtml(character.intelligence)}" disabled>
            </label>
            <label>
              Puntos de velocidad
              <input name="speed" type="number" min="1" max="100" required value="${escapeHtml(character.speed)}" disabled>
            </label>
          </div>
          <label>
            Historia del personaje
            <textarea name="story" rows="8" required ${canEditIdentityFields ? '' : 'disabled'}>${escapeHtml(character.story)}</textarea>
          </label>
          ${identityLockMessage}
        </div>
        <aside class="profile-image-panel" aria-label="Imagen del personaje">
          ${imagePreview}
          <input id="profile-image-current" type="hidden" value="${escapeHtml(character.image)}">
          <label>
            URL de imagen de perfil
            <input id="profile-character-image-url" name="imageUrl" type="url" value="${character.image && !character.image.startsWith('data:') ? escapeHtml(character.image) : ''}" placeholder="https://ejemplo.com/imagen.jpg" ${canEditIdentityFields ? '' : 'disabled'}>
          </label>
          <label>
            Reemplazar con imagen del dispositivo
            <input id="profile-character-image-file" name="imageFile" type="file" accept="image/*" ${canEditIdentityFields ? '' : 'disabled'}>
          </label>
        </aside>
      </div>
      <div class="stats-grid xp-adjustments">
        <label>+ Magia <input name="addMagic" type="number" min="0" value="0"></label>
        <label>+ Fuerza <input name="addStrength" type="number" min="0" value="0"></label>
        <label>+ Inteligencia <input name="addIntelligence" type="number" min="0" value="0"></label>
        <label>+ Velocidad <input name="addSpeed" type="number" min="0" value="0"></label>
        <label>- Magia <input name="subMagic" type="number" min="0" value="0"></label>
        <label>- Fuerza <input name="subStrength" type="number" min="0" value="0"></label>
        <label>- Inteligencia <input name="subIntelligence" type="number" min="0" value="0"></label>
        <label>- Velocidad <input name="subSpeed" type="number" min="0" value="0"></label>
      </div>
      <div class="form-actions">
        ${developmentProgress ? `<p class="deck-lock-note">MODO DESARROLLO DE PERSONAJE: ${developmentProgress.status === CHARACTER_DEVELOPMENT_MODE.PENDING ? 'en espera de la próxima batalla (carta principal única).' : 'resultado aplicado, ahora debes editar atributos.'}</p>` : ''}
        <button class="save-character-btn" type="button" data-open-experience>PUNTOS DE EXPERIENCIA</button>
        <button class="save-character-btn" type="button" data-open-events>ACONTECIMIENTOS</button>
        <button class="cancel-character-btn" type="button">Cancelar</button>
        <button class="delete-character-btn" type="button">Eliminar</button>
        <button class="save-character-btn" type="submit">Guardar cambios</button>
      </div>
    </form>
    <section class="events-panel hidden">
      <div class="history-section-header">
        <h3>Acontecimientos</h3>
        <button class="cancel-character-btn" type="button" data-close-events>Volver al perfil</button>
      </div>
      ${events.length ? `<div class="events-grid">${events.map((entry) => `<article class="event-card">
        <div class="event-thumb">${entry.rivalCardImage ? `<img src="${escapeHtml(entry.rivalCardImage)}" alt="Rival ${escapeHtml(entry.rivalCardName || '')}">` : '<span>Sin imagen</span>'}</div>
        <span class="event-tag ${entry.isPositive ? 'positive' : 'negative'}">${escapeHtml(entry.tag || '')}</span>
        <p><strong>Rival:</strong> ${escapeHtml(entry.rivalName || 'Desconocido')}</p>
        <p><strong>Carta principal rival:</strong> ${escapeHtml(entry.rivalCardName || 'No disponible')}</p>
        ${entry.locked ? `<p>${escapeHtml(entry.story || 'Sin historia registrada.')}</p>${entry.image ? `<img class="event-story-image" src="${escapeHtml(entry.image)}" alt="Imagen del acontecimiento">` : ''}` : `<form class="event-form" data-event-id="${escapeHtml(entry.id)}">
          <label>Historia <textarea name="story" rows="4" required placeholder="Redacta la historia...">${escapeHtml(entry.story || '')}</textarea></label>
          <label>URL de imagen <input name="imageUrl" type="url" value="${escapeHtml(entry.image || '')}" placeholder="https://ejemplo.com/imagen.jpg"></label>
          <label>o imagen del dispositivo <input name="imageFile" type="file" accept="image/*"></label>
          <button class="save-character-btn" type="submit">Guardar acontecimiento</button>
          <p class="deck-lock-note">Una vez guardado no se puede editar ni eliminar.</p>
        </form>`}
      </article>`).join('')}</div>` : '<p>Este personaje todavía no tiene acontecimientos.</p>'}
    </section>
    <section class="artifact-section">
      <div class="history-section-header">
        <h3>Artefactos</h3>
        <button id="add-artifact-btn" class="save-character-btn" type="button">Agregar Artefacto</button>
      </div>
      <div class="deck-grid">${getCurrentArtifacts().map(renderArtifactCard).join('') || '<p>No hay artefactos creados.</p>'}</div>
      <div id="artifact-form-shell" class="hidden"></div>
    </section>
  `;

  document.querySelector('#personajes-gallery').classList.add('hidden');
  document.querySelector('.character-creator').classList.add('hidden');
  addCharacterButton.classList.add('hidden');
  profile.classList.remove('hidden');

  const profileTypeSelect = document.querySelector('#profile-character-type');
  getAvailableTypeEntries().forEach((entry) => profileTypeSelect.append(createOption(entry.type, entry.type)));
  profileTypeSelect.value = character.type;
  updateProfileClanOptions(character.clan);
  profileTypeSelect.addEventListener('change', () => updateProfileClanOptions());

  document.querySelector('.back-to-gallery-btn').addEventListener('click', closeProfile);
  document.querySelector('.profile-form .cancel-character-btn').addEventListener('click', closeProfile);
  document.querySelector('[data-open-experience]')?.addEventListener('click', () => openExperienceModal(character));
  const eventsPanel = profile.querySelector('.events-panel');
  const profileForm = profile.querySelector('.profile-form');
  profile.querySelector('[data-open-events]')?.addEventListener('click', () => {
    profileForm.classList.add('hidden');
    eventsPanel?.classList.remove('hidden');
  });
  profile.querySelector('[data-close-events]')?.addEventListener('click', () => {
    eventsPanel?.classList.add('hidden');
    profileForm.classList.remove('hidden');
  });
  profile.querySelectorAll('.event-form').forEach((eventForm) => {
    eventForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const eventId = eventForm.dataset.eventId;
      const latestCharacter = characters.find((entry) => entry.id === character.id);
      const currentEvent = latestCharacter?.events?.[eventId];
      if (!eventId || !currentEvent || currentEvent.locked) return;
      const formData = new FormData(eventForm);
      const story = String(formData.get('story') || '').trim();
      const imageUrl = String(formData.get('imageUrl') || '').trim();
      if (!story) return;
      const saveEvent = async (imageValue) => {
        await getCharacterRef(character.id).child(`events/${eventId}`).update({ story, image: imageValue || '', locked: true, savedAt: getTimestamp() });
      };
      const file = formData.get('imageFile');
      if (file && file.size) {
        const reader = new FileReader();
        reader.addEventListener('load', async () => saveEvent(reader.result));
        reader.readAsDataURL(file);
      } else {
        await saveEvent(imageUrl);
      }
    });
  });
  document.querySelector('.profile-form .delete-character-btn').addEventListener('click', () => {
    deleteCharacter(activeProfileId);
  });
  document.querySelector('#profile-character-image-url').addEventListener('input', (event) => {
    updateProfileImagePreview(event.target.value.trim());
  });
  document.querySelector('#profile-character-image-file').addEventListener('change', (event) => {
    const [file] = event.target.files;
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', () => updateProfileImagePreview(reader.result));
    reader.readAsDataURL(file);
  });
  document.querySelector('.profile-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const profileImage = document.querySelector('#profile-image-current').value.trim();
    const characterToUpdate = characters.find((entry) => entry.id === activeProfileId);
    if (!characterToUpdate) {
      return;
    }

    const updatedMagic = Number.parseInt(formData.get('magic'), 10) || 0;
    const updatedStrength = Number.parseInt(formData.get('strength'), 10) || 0;
    const updatedIntelligence = Number.parseInt(formData.get('intelligence'), 10) || 0;
    const updatedSpeed = Number.parseInt(formData.get('speed'), 10) || 0;
    const previousMagic = Number.parseInt(characterToUpdate.magic, 10) || 0;
    const previousStrength = Number.parseInt(characterToUpdate.strength, 10) || 0;
    const previousIntelligence = Number.parseInt(characterToUpdate.intelligence, 10) || 0;
    const previousSpeed = Number.parseInt(characterToUpdate.speed, 10) || 0;
    const spentPoints = Math.max(0, updatedMagic - previousMagic)
      + Math.max(0, updatedStrength - previousStrength)
      + Math.max(0, updatedIntelligence - previousIntelligence)
      + Math.max(0, updatedSpeed - previousSpeed);
    const { total: availablePoints } = getCharacterExperienceState(characterToUpdate.id);
    if (spentPoints > availablePoints) {
      setSyncStatus(`No tienes suficientes puntos de experiencia. Disponibles: ${availablePoints}.`, 'error');
      return;
    }

    try {
      const xp = getCharacterExperience(characterToUpdate.id);
      if (!xp.canSpend) {
        window.alert('Necesitas 5 puntos de experiencia (positivos + negativos) para editar este personaje.');
        return;
      }
      const add = {
        magic: Number(formData.get('addMagic') || 0),
        strength: Number(formData.get('addStrength') || 0),
        intelligence: Number(formData.get('addIntelligence') || 0),
        speed: Number(formData.get('addSpeed') || 0),
      };
      const sub = {
        magic: Number(formData.get('subMagic') || 0),
        strength: Number(formData.get('subStrength') || 0),
        intelligence: Number(formData.get('subIntelligence') || 0),
        speed: Number(formData.get('subSpeed') || 0),
      };
      const addTotal = Object.values(add).reduce((a,b)=>a+b,0);
      const subTotal = Object.values(sub).reduce((a,b)=>a+b,0);
      if (addTotal !== xp.positive || subTotal !== xp.negative) {
        window.alert(`Debes usar exactamente +${xp.positive} y -${xp.negative} puntos.`);
        return;
      }
      const next = {
        magic: Number(characterToUpdate.magic) + add.magic - sub.magic,
        strength: Number(characterToUpdate.strength) + add.strength - sub.strength,
        intelligence: Number(characterToUpdate.intelligence) + add.intelligence - sub.intelligence,
        speed: Number(characterToUpdate.speed) + add.speed - sub.speed,
      };
      if (Object.values(next).some((value) => value < 1 || value > 100)) {
        window.alert('Los atributos resultantes deben quedar entre 1 y 100.');
        return;
      }
      await saveCharacter({
        ...characterToUpdate,
        magic: String(next.magic),
        strength: String(next.strength),
        intelligence: String(next.intelligence),
        speed: String(next.speed),
        story: formData.get('story').trim(),
        image: profileImage || formData.get('imageUrl').trim(),
        clan: formData.get('clan'),
      });
      await usersRef.child(currentUserId).child(`experiencePoints/byCharacter/${characterToUpdate.id}`).set({ positive: 0, negative: 0, total: 0, updatedAt: getTimestamp() });
      closeProfile();
    } catch (error) {
      console.error('No se pudo guardar el personaje en Firebase:', error);
      setSyncStatus('No se pudieron guardar los cambios. Revisa la conexión o las reglas de Firebase.', 'error');
    }
  });
}

function openProfile(characterId) {
  const character = characters.find((entry) => entry.id === characterId);
  if (character) {
    renderProfile(character);
  }
}

function updateClanOptions() {
  const typeSelect = document.querySelector('#character-type');
  const clanSelect = document.querySelector('#character-clan');
  const selectedType = getAvailableTypeEntries().find((entry) => entry.type === typeSelect.value);

  updateTypeColorPreview();
  clanSelect.innerHTML = '';
  if (!selectedType) {
    clanSelect.append(createOption('', 'Selecciona primero un tipo'));
    clanSelect.disabled = true;
    return;
  }

  clanSelect.disabled = false;
  clanSelect.append(createOption('', 'Sin clan'));
  selectedType.clans.forEach((clan) => clanSelect.append(createOption(clan, clan)));
}

function updatePreview() {
  const urlInput = document.querySelector('#character-image-url');
  const urlPreview = document.querySelector('#url-preview');
  const filePreviewImage = document.querySelector('#file-preview');

  urlPreview.src = urlInput.value.trim();
  urlPreview.classList.toggle('hidden', !urlInput.value.trim());

  filePreviewImage.src = filePreview;
  filePreviewImage.classList.toggle('hidden', !filePreview);
}


function renderArtifactEffectsEditor() {
  const list = document.querySelector('#artifact-effects-list');
  if (!list) return;
  list.innerHTML = artifactEffects.map((effect, index) => `
    <article class="history-item selected">
      <h4>Efecto ${index + 1}</h4>
      <label>A quien afecta
        <select data-effect-index="${index}" data-field="targetCharacter">${artifactTargets.map((v) => `<option value="${v}" ${effect.targetCharacter===v?'selected':''}>${v}</option>`).join('')}</select>
      </label>
      <label>Cómo lo afecta
        <select data-effect-index="${index}" data-field="effectKind">${artifactEffectKinds.map((v) => `<option value="${v}" ${effect.effectKind===v?'selected':''}>${v}</option>`).join('')}</select>
      </label>
    </article>`).join('');
}

function openArtifactForm() {
  const shell = document.querySelector('#artifact-form-shell');
  if (!shell) return;
  artifactEffects = [createEmptyArtifactEffect()];
  shell.classList.remove('hidden');
  shell.innerHTML = `<form id="artifact-form" class="character-form"><h3>Nuevo Artefacto</h3>
    <label>Nombre del Artefacto<input name="name" required></label>
    <label>Tipo de artefacto<select name="type">${artifactTypes.map((t)=>`<option value="${t}">${t}</option>`).join('')}</select></label>
    <label>URL de imagen<input name="imageUrl" type="url"></label>
    <label>O imagen desde dispositivo<input id="artifact-image-file" type="file" accept="image/*"></label>
    <button id="add-artifact-effect-btn" type="button" class="save-character-btn">Agregar Efectos</button>
    <section id="artifact-effects-list"></section>
    <div class="form-actions"><button type="button" class="cancel-character-btn" id="cancel-artifact-btn">Cancelar</button><button class="save-character-btn" type="submit">Guardar Artefacto</button></div>
  </form>`;
  renderArtifactEffectsEditor();
  shell.querySelector('#add-artifact-effect-btn').addEventListener('click',()=>{ artifactEffects.push(createEmptyArtifactEffect()); renderArtifactEffectsEditor(); });
  shell.querySelector('#cancel-artifact-btn').addEventListener('click',()=>{ shell.classList.add('hidden'); shell.innerHTML=''; });
  shell.querySelector('#artifact-effects-list').addEventListener('change',(event)=>{ const el=event.target.closest('[data-effect-index]'); if(!el) return; const i=Number(el.dataset.effectIndex); artifactEffects[i][el.dataset.field]=el.value; });
  shell.querySelector('#artifact-image-file').addEventListener('change',(event)=>{ const [file]=event.target.files; if(!file){artifactFilePreview='';return;} const reader=new FileReader(); reader.onload=()=>{artifactFilePreview=reader.result;}; reader.readAsDataURL(file); });
  shell.querySelector('#artifact-form').addEventListener('submit',async(event)=>{ event.preventDefault(); const fd=new FormData(event.currentTarget); const newArtifact={ id:crypto.randomUUID(), name:String(fd.get('name')||'').trim(), type:String(fd.get('type')||'Amuleto'), image:artifactFilePreview||String(fd.get('imageUrl')||''), effects:artifactEffects };
    const userArtifacts=[...getCurrentArtifacts(), newArtifact]; await usersRef.child(currentUserId).update({ artifacts: userArtifacts }); shell.classList.add('hidden'); shell.innerHTML=''; renderDeckBuilder();
  });
}

function resetForm() {
  const form = document.querySelector('.character-form');
  form.reset();
  filePreview = '';
  updateClanOptions();
  updatePreview();
}

function closeForm() {
  document.querySelector('.character-creator').classList.add('hidden');
  addCharacterButton.classList.remove('hidden');
  resetForm();
}

function openForm() {
  document.querySelector('.character-creator').classList.remove('hidden');
  addCharacterButton.classList.add('hidden');
  document.querySelector('#character-name').focus();
}

function buildRandomCharacter(nameNumber) {
  const selectedType = getRandomCharacterTypeEntry();
  const selectedClan = selectedType.clans[getRandomInt(0, selectedType.clans.length - 1)];

  return {
    id: crypto.randomUUID(),
    name: String(nameNumber),
    type: selectedType.type,
    clan: selectedClan,
    magic: String(getRandomInt(1, 100)),
    strength: String(getRandomInt(1, 100)),
    intelligence: String(getRandomInt(1, 100)),
    speed: String(getRandomInt(1, 100)),
    story: 'Generado automáticamente',
    image: '',
  };
}

async function createRandomCharacters() {
  const quantityInput = document.querySelector('#random-character-quantity');
  const quantity = Number.parseInt(quantityInput.value, 10);

  if (Number.isNaN(quantity) || quantity < 1 || quantity > 20) {
    setSyncStatus('Selecciona una cantidad válida entre 1 y 20 para crear personajes automáticos.', 'error');
    return;
  }

  const randomCharacters = Array.from({ length: quantity }, (_, index) => buildRandomCharacter(index + 1));

  try {
    await Promise.all(randomCharacters.map((character) => saveCharacter(character)));
    setSyncStatus(`Se crearon ${quantity} personaje(s) aleatoriamente y se guardaron en Firebase.`, 'success');
  } catch (error) {
    console.error('No se pudieron crear personajes aleatorios en Firebase:', error);
    setSyncStatus('No se pudieron crear los personajes aleatorios. Revisa la conexión o las reglas de Firebase.', 'error');
  }
}

function createCharacterForm() {
  personajesPanel.insertAdjacentHTML(
    'beforeend',
    `
      <p class="firebase-status" data-status="loading">Conectando con Firebase...</p>
      <div class="character-creator hidden" aria-label="Formulario para crear personaje">
        <form class="character-form">
          <button class="close-character-form" type="button" aria-label="Cerrar formulario">×</button>
          <h2>Crear personaje</h2>
          <label>
            Nombre del personaje
            <input id="character-name" name="name" type="text" required placeholder="Ej. Lyra Nocturna">
          </label>
          <label>
            Tipo
            <select id="character-type" name="type" required>
              <option value="">Selecciona un tipo</option>
            </select>
          </label>
          <div class="type-color-preview" aria-live="polite">Selecciona un tipo para ver su color asignado.</div>
          <label>
            Clan
            <select id="character-clan" name="clan" disabled>
              <option value="">Selecciona primero un tipo</option>
            </select>
          </label>
          <div class="stats-grid">
            <label>
              Puntos de magia
              <input name="magic" type="number" min="1" max="100" required placeholder="1-100">
            </label>
            <label>
              Puntos de fuerza
              <input name="strength" type="number" min="1" max="100" required placeholder="1-100">
            </label>
            <label>
              Puntos de inteligencia
              <input name="intelligence" type="number" min="1" max="100" required placeholder="1-100">
            </label>
            <label>
              Puntos de velocidad
              <input name="speed" type="number" min="1" max="100" required placeholder="1-100">
            </label>
          </div>
          <label>
            Historia del personaje
            <textarea name="story" rows="5" required placeholder="Cuenta el origen, hazañas y secretos del personaje"></textarea>
          </label>
          <label>
            URL de imagen de perfil
            <input id="character-image-url" name="imageUrl" type="url" placeholder="https://ejemplo.com/imagen.jpg">
          </label>
          <label>
            O selecciona una imagen desde tu dispositivo
            <input id="character-image-file" name="imageFile" type="file" accept="image/*">
          </label>
          <div class="form-actions">
            <button class="cancel-character-btn" type="button">Cancelar</button>
            <button class="save-character-btn" type="submit">Guardar</button>
          </div>
        </form>
        <aside class="preview-pane" aria-label="Vista previa de imágenes">
          <h3>Vista previa</h3>
          <div class="preview-grid">
            <div class="preview-box">
              <span>Desde URL</span>
              <img id="url-preview" class="preview-image hidden" alt="Vista previa de imagen por URL">
            </div>
            <div class="preview-box">
              <span>Desde archivo</span>
              <img id="file-preview" class="preview-image hidden" alt="Vista previa de imagen seleccionada">
            </div>
          </div>
          <p class="preview-note">Si cargas una imagen desde archivo, se usará esa imagen al guardar; si no, se usará la URL.</p>
        </aside>
      </div>
      <section id="personajes-gallery" class="character-gallery" aria-label="Galería de personajes"></section>
      <section class="character-profile hidden" aria-label="Perfil del personaje"></section>
    `,
  );

  const typeSelect = document.querySelector('#character-type');
  repopulateCreateTypeOptions();
  typeSelect.addEventListener('change', updateClanOptions);

  document.querySelector('#character-image-url').addEventListener('input', updatePreview);
  document.querySelector('#character-image-file').addEventListener('change', (event) => {
    const [file] = event.target.files;
    if (!file) {
      filePreview = '';
      updatePreview();
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      filePreview = reader.result;
      updatePreview();
    });
    reader.readAsDataURL(file);
  });

  document.querySelector('.cancel-character-btn').addEventListener('click', closeForm);
  document.querySelector('.close-character-form').addEventListener('click', closeForm);
  document.querySelector('#personajes-gallery').addEventListener('click', (event) => {
    const card = event.target.closest('.character-card');
    if (card) {
      openProfile(card.dataset.characterId);
    }
  });

  document.querySelector('.character-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const character = {
      id: crypto.randomUUID(),
      name: formData.get('name').trim(),
      type: formData.get('type'),
      clan: formData.get('clan'),
      magic: formData.get('magic'),
      strength: formData.get('strength'),
      intelligence: formData.get('intelligence'),
      speed: formData.get('speed'),
      story: formData.get('story').trim(),
      image: filePreview || formData.get('imageUrl').trim(),
    };

    try {
      await saveCharacter(character);
      closeForm();
    } catch (error) {
      console.error('No se pudo guardar el personaje en Firebase:', error);
      setSyncStatus('No se pudo guardar el personaje. Revisa la conexión o las reglas de Firebase.', 'error');
    }
  });
}


function normalizeHistoryTypes(rawData) {
  if (rawData && Object.keys(rawData).length) return rawData;
  const seeded = {};
  characterTypes.forEach((entry) => {
    const typeId = crypto.randomUUID();
    seeded[typeId] = {
      name: entry.type,
      description: '',
      clans: Object.fromEntries(entry.clans.map((clan) => [crypto.randomUUID(), { name: clan, story: '' }])),
    };
  });
  historyTypesRef.set(seeded).catch(() => {});
  return seeded;
}

function openCampoProfile(campoId) {
  const campo = campos.find((entry) => entry.id === campoId);
  if (!campo) return;
  const operation = campo.effect?.operation === 'increase' ? '+' : '-';
  const effectValue = Number(campo.effect?.value) || 50;
  window.alert(`${campo.name}\nEfecto: ${operation}${effectValue} en ${campo.effect?.attribute || 'atributo'}\nTipos: ${(campo.affectedTypes || []).join(', ') || 'Todos'}`);
}

function openCampoForm() {
  const overlay = document.createElement('div');
  overlay.className = 'challenge-modal';
  overlay.innerHTML = `
    <div class="challenge-modal-card">
      <h3>Agregar Campos</h3>
      <form class="character-form" id="campo-form">
        <label>Nombre de Campo<input name="name" type="text" required></label>
        <label>URL de imagen<input name="imageUrl" type="url" placeholder="https://ejemplo.com/imagen.jpg"></label>
        <label>o Imagen desde Dispositivo<input name="imageFile" type="file" accept="image/*"></label>
        <label>Modificador
          <select name="effectOperation" required>
            <option value="increase">Aumenta +50</option>
            <option value="decrease">Disminuye -50</option>
          </select>
        </label>
        <label>Atributo afectado
          <select name="effectAttribute" required>
            <option value="">Selecciona un atributo</option>
            <option value="magic">Magia</option>
            <option value="strength">Fuerza</option>
            <option value="intelligence">Inteligencia</option>
            <option value="speed">Velocidad</option>
          </select>
        </label>
        <label>Tipos afectados (acumulables, separados por coma)
          <input name="affectedTypes" type="text" placeholder="Vampiros, Brujas, Dragones">
        </label>
        <div class="challenge-actions">
          <button class="cancel-character-btn" data-close-campo type="button">Cancelar</button>
          <button class="save-character-btn" type="submit">Guardar Campo</button>
        </div>
      </form>
    </div>
  `;
  document.body.append(overlay);
  overlay.querySelector('[data-close-campo]')?.addEventListener('click', () => overlay.remove());
  overlay.querySelector('#campo-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fieldId = crypto.randomUUID();
    const saveCampo = async (imageValue) => {
      await camposRef.child(fieldId).set({
        id: fieldId,
        name: String(formData.get('name') || '').trim(),
        image: imageValue || String(formData.get('imageUrl') || '').trim(),
        type: 'Campo',
        clan: 'Campo',
        magic: '0',
        strength: '0',
        intelligence: '0',
        speed: '0',
        story: 'Carta de campo',
        effect: {
          operation: String(formData.get('effectOperation') || 'increase'),
          value: 50,
          attribute: String(formData.get('effectAttribute') || ''),
        },
        affectedTypes: String(formData.get('affectedTypes') || '').split(',').map((entry) => entry.trim()).filter(Boolean),
      });
    };
    const file = formData.get('imageFile');
    if (file && file.size) {
      const reader = new FileReader();
      reader.addEventListener('load', async () => {
        await saveCampo(reader.result);
        overlay.remove();
      });
      reader.readAsDataURL(file);
    } else {
      await saveCampo('');
      overlay.remove();
    }
  });
}

function renderHistoryClans() {
  if (!historyClansList) return;
  if (!selectedHistoryTypeId) {
    historyClansList.innerHTML = '';
    return;
  }

  const typeEntry = historyTypesData[selectedHistoryTypeId];
  const clans = Object.entries(typeEntry?.clans || {});
  historyClansList.innerHTML = `
    <div class="history-section-header">
      <button class="cancel-character-btn" id="back-to-types-btn" type="button">← Volver al listado</button>
      <h3>${escapeHtml(typeEntry?.name || '')}</h3>
      <button id="add-clan-btn" class="save-character-btn" type="button">Agregar clan</button>
    </div>
    <article class="history-item selected">
      <h4>Descripción del tipo</h4>
      <textarea data-history-type-description-id="${escapeHtml(selectedHistoryTypeId)}" placeholder="Descripción del tipo">${escapeHtml(typeEntry?.description || '')}</textarea>
      <button class="save-character-btn" data-save-type-description-id="${escapeHtml(selectedHistoryTypeId)}" type="button">Guardar descripción</button>
    </article>
    <h4>Clanes</h4>
    ${clans.length ? `<ul class="history-simple-list">${clans.map(([clanId, clan]) => `<li class="history-item">
      <p><strong>${escapeHtml(clan.name)}</strong></p>
      <textarea data-history-clan-story-id="${escapeHtml(clanId)}" placeholder="Descripción del clan">${escapeHtml(clan.story || '')}</textarea>
      <div class="history-inline-actions">
        <button class="save-character-btn" data-save-clan-story-id="${escapeHtml(clanId)}" type="button">Guardar descripción</button>
        <button class="delete-character-btn" data-delete-clan-id="${escapeHtml(clanId)}" type="button">Eliminar clan</button>
      </div>
    </li>`).join('')}</ul>` : '<p>Sin clanes.</p>'}
  `;
}

function renderHistoryTypes() {
  if (!historyTypesList) return;
  const types = Object.entries(historyTypesData);

  if (selectedHistoryTypeId) {
    historyTypesList.innerHTML = '';
    closeHistoryTypeContextMenu();
    renderHistoryClans();
    return;
  }

  historyClansList.innerHTML = '';
  closeHistoryTypeContextMenu();
  historyTypesList.innerHTML = types.length
    ? `<ul class="history-simple-list">${types.map(([typeId, type]) => `<li><button class="menu-btn history-link-btn" type="button" data-history-type-id="${escapeHtml(typeId)}">${escapeHtml(type.name)}</button></li>`).join('')}</ul>`
    : '<p>No hay tipos cargados.</p>';
}


async function signInWithGoogle() {
  try {
    await auth.signInWithPopup(googleProvider);
  } catch (error) {
    console.error('Error al iniciar sesión con Google:', error);
    if (error?.code === 'auth/unauthorized-domain') {
      setSyncStatus(
        'Este dominio no está autorizado en Firebase Auth. Agrega el dominio actual en Firebase Console > Authentication > Settings > Authorized domains.',
        'error'
      );
      return;
    }
    setSyncStatus('No se pudo iniciar sesión con Google. Inténtalo de nuevo.', 'error');
  }
}

async function logout() {
  try {
    await auth.signOut();
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
}

function toggleAuthenticatedUi(user) {
  const isLogged = Boolean(user);
  authPanel.classList.toggle('hidden', isLogged);
  authUserPanel.classList.toggle('hidden', !isLogged);
  gameLayout.classList.toggle('hidden', !isLogged);

  if (!isLogged) {
    const previousUserId = currentUserId;
    currentUserId = null;
    savedDeck = { characterIds: [], mainIds: [] };
    selectedDeckIds = [];
    selectedCampoIds = [];
    deckOrder = [];
    userName.textContent = '';
    userUid.textContent = '';
    userPhoto.removeAttribute('src');
    if (previousUserId) {
      onlineUsersRef.child(previousUserId).remove().catch(() => {});
    }
    onlineUsers = {};
    renderOnlineUsers();
    battleHistoryByOpponent = {};
    renderBattleHistory();
    return;
  }

  currentUserId = user.uid;
  battleArenaDismissed = true;

  userName.textContent = user.displayName || 'Usuario sin nombre';
  userUid.textContent = `UID: ${user.uid}`;
  if (user.photoURL) {
    userPhoto.src = user.photoURL;
  } else {
    userPhoto.removeAttribute('src');
  }

  const presenceRef = onlineUsersRef.child(user.uid);
  usersRef.child(user.uid).update({
    uid: user.uid,
    name: user.displayName || 'Usuario sin nombre',
    photoURL: user.photoURL || '',
    lastSeen: getTimestamp(),
  }).catch((error) => {
    console.error('No se pudo actualizar el perfil del usuario:', error);
  });
  const connectedRef = database.ref('.info/connected');
  connectedRef.on('value', (snapshot) => {
    if (snapshot.val() !== true) return;
    presenceRef.onDisconnect().remove();
    presenceRef.set({
      uid: user.uid,
      name: user.displayName || 'Usuario sin nombre',
      photoURL: user.photoURL || '',
      lastSeen: getTimestamp(),
    });
  });
}

loginGoogleButton.addEventListener('click', signInWithGoogle);
logoutButton.addEventListener('click', logout);
auth.onAuthStateChanged((user) => {
  toggleAuthenticatedUi(user);
  if (user) {
    renderBattleHistory();
    loadDeckForUser(user.uid).catch((error) => {
      console.error('No se pudo cargar el mazo del usuario:', error);
    });
  } else {
    renderDeckBuilder();
    renderBattleHistory();
  }
});

addCharacterButton.textContent = 'Crear personaje';
addCharacterButton.addEventListener('click', openForm);
randomCharacterButton.addEventListener('click', createRandomCharacters);
createCharacterForm();

addArtefactButton?.addEventListener('click', () => {
  openArtifactForm();
});

addCampoButton?.addEventListener('click', () => {
  openCampoForm();
});

artefactosGallery?.addEventListener('click', (event) => {
  const card = event.target.closest('.character-card');
  if (card) openProfile(card.dataset.characterId);
});

camposGallery?.addEventListener('click', (event) => {
  const card = event.target.closest('.character-card');
  if (card) openCampoProfile(card.dataset.characterId);
});

historyTypesList?.addEventListener('click', async (event) => {
  const typeBtn = event.target.closest('[data-history-type-id]');
  if (typeBtn) {
    selectedHistoryTypeId = typeBtn.dataset.historyTypeId;
    renderHistoryTypes();
  }
});

historyTypesList?.addEventListener('contextmenu', (event) => {
  const typeBtn = event.target.closest('[data-history-type-id]');
  if (!typeBtn) return;
  event.preventDefault();
  openHistoryTypeContextMenu(typeBtn.dataset.historyTypeId, event.clientX, event.clientY);
});

document.addEventListener('click', (event) => {
  if (!historyTypeContextMenuState) return;
  if (historyTypeContextMenuState.menu.contains(event.target)) return;
  closeHistoryTypeContextMenu();
});

document.addEventListener('scroll', closeHistoryTypeContextMenu, true);
window.addEventListener('resize', closeHistoryTypeContextMenu);

historyClansList?.addEventListener('click', async (event) => {
  const backBtn = event.target.closest('#back-to-types-btn');
  const addClanBtn = event.target.closest('#add-clan-btn');
  const saveTypeDescBtn = event.target.closest('[data-save-type-description-id]');
  const saveStoryBtn = event.target.closest('[data-save-clan-story-id]');
  const delClanBtn = event.target.closest('[data-delete-clan-id]');
  const typeEntry = historyTypesData[selectedHistoryTypeId];
  if (!typeEntry) return;
  if (backBtn) {
    selectedHistoryTypeId = '';
    renderHistoryTypes();
    return;
  }
  if (addClanBtn) {
    const name = prompt('Nombre del clan');
    if (!name) return;
    await historyTypesRef.child(`${selectedHistoryTypeId}/clans/${crypto.randomUUID()}`).set({ name: name.trim(), story: '' });
  }
  if (saveTypeDescBtn) {
    const typeId = saveTypeDescBtn.dataset.saveTypeDescriptionId;
    const textarea = historyClansList.querySelector(`[data-history-type-description-id="${typeId}"]`);
    await historyTypesRef.child(typeId).update({ description: textarea.value.trim() });
  }
  if (saveStoryBtn) {
    const clanId = saveStoryBtn.dataset.saveClanStoryId;
    const textarea = historyClansList.querySelector(`[data-history-clan-story-id="${clanId}"]`);
    await historyTypesRef.child(`${selectedHistoryTypeId}/clans/${clanId}`).update({ story: textarea.value.trim() });
  }
  if (delClanBtn) {
    const clanId = delClanBtn.dataset.deleteClanId;
    const clanName = typeEntry.clans?.[clanId]?.name || '';
    const linked = characters.some((c) => c.type === typeEntry.name && c.clan === clanName);
    if (linked) { alert('No se puede eliminar: tiene personajes designados.'); return; }
    await historyTypesRef.child(`${selectedHistoryTypeId}/clans/${clanId}`).remove();
  }
});
renderGallery();
renderDeckBuilder();
renderOnlineUsers();
renderBattleHistory();
setSyncStatus('Conectando con Firebase...', 'loading');

onlineUsersRef.on('value', (snapshot) => {
  onlineUsers = snapshot.val() || {};
  renderOnlineUsers();
});

camposRef.on('value', (snapshot) => {
  const data = snapshot.val() || {};
  campos = Object.values(data).filter(Boolean);
  renderCamposGallery();
  renderDeckBuilder();
});

usersRef.on('value', (snapshot) => {
  users = snapshot.val() || {};
  renderOnlineUsers();
  renderBattleHistory();
});


historyTypesRef.on('value', (snapshot) => {
  historyTypesData = normalizeHistoryTypes(snapshot.val() || {});
  renderHistoryTypes();
  repopulateCreateTypeOptions();
});

battleHistoryRef.on('value', (snapshot) => {
  if (!currentUserId) return;
  battleHistoryByOpponent = snapshot.child(currentUserId).val() || {};
  renderBattleHistory();
});

battleChallengesRef.on('value', (snapshot) => {
  if (!currentUserId) return;
  pendingChallenges = Object.values(snapshot.val() || {});
  const challengeData = snapshot.child(currentUserId).val();
  if (challengeData && challengeData.status === 'pending') {
    showChallengeModal(challengeData);
    return;
  }

  if (!challengeData && activeChallenge) {
    hideChallengeModal();
  }
  renderDeckBuilder();
});

charactersRef.on(
  'value',
  async (snapshot) => {
    const data = snapshot.val() || {};
    characters = Object.entries(data)
      .map(([id, character]) => normalizeCharacter(character, id))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    hasReceivedFirebaseData = true;
    renderGallery();
    renderDeckBuilder();
    setSyncStatus('Personajes sincronizados con Firebase y visibles en otros dispositivos.', 'success');

    try {
      await migrateLocalCharacters();
    } catch (error) {
      console.error('No se pudieron migrar personajes locales a Firebase:', error);
      setSyncStatus('Firebase está conectado, pero no se pudieron migrar personajes locales anteriores.', 'error');
    }
  },
  (error) => {
    console.error('No se pudo leer Firebase:', error);
    setSyncStatus('No se pudo conectar con Firebase. Revisa la conexión o las reglas de la base de datos.', 'error');

    if (!hasReceivedFirebaseData && localCharacters.length) {
      characters = localCharacters.map((character) => normalizeCharacter(character));
      renderGallery();
      renderDeckBuilder();
    }
  },
);

const battleAttackModal = document.querySelector('#battle-attack-modal');
const battleAttackText = document.querySelector('#battle-attack-text');
const battleAttackOptions = document.querySelector('#battle-attack-options');
const battleAttackCancelButton = document.querySelector('#battle-attack-cancel');
const battleAttributes = ['magic', 'strength', 'intelligence', 'speed'];
let pendingAttributePick = null;
let isRespondingToChallenge = false;

function openAttributePicker(mode, card, onPick, options = {}) {
  pendingAttributePick = { mode, onPick, ...options };
  const attributes = (options.allowedAttributes || battleAttributes).filter((attribute) => battleAttributes.includes(attribute));
  battleAttackText.textContent = mode === 'defense' ? `Elige atributo para defender con ${card.name}.` : `Elige atributo para atacar con ${card.name}.`;
  battleAttackOptions.innerHTML = attributes.map((attribute) => (
    `<button class="save-character-btn battle-attribute-btn" data-battle-attribute="${attribute}" type="button">${attribute.toUpperCase()} (${escapeHtml(card[attribute])})</button>`
  )).join('');
  battleAttackModal.classList.remove('hidden');
}

function hideAttributePicker() {
  battleAttackModal.classList.add('hidden');
  pendingAttributePick = null;
}

document.addEventListener('click', (event) => {
  const closeExperienceButton = event.target.closest('[data-close-experience-modal]');
  if (closeExperienceButton) {
    closeExperienceModal();
    return;
  }

  if (experienceModalState && event.target === experienceModalState.overlay) {
    closeExperienceModal();
    return;
  }

  const deckCard = event.target.closest('[data-deck-character-id]');
  if (deckCard && currentUserId) {
    const characterId = deckCard.dataset.deckCharacterId;
    const hasSavedDeck = savedDeck.characterIds.length === 20;
    if (hasSavedDeck) {
      toggleMainCharacter(characterId).catch((error) => console.error('No se pudo actualizar personaje principal:', error));
      return;
    }

    const isSelected = selectedDeckIds.includes(characterId);
    if (isSelected) {
      selectedDeckIds = selectedDeckIds.filter((id) => id !== characterId);
      deckOrder = deckOrder.filter((id) => id !== characterId);
    } else if (selectedDeckIds.length < 20) {
      selectedDeckIds.push(characterId);
      deckOrder.push(characterId);
    }
    renderDeckBuilder();
    return;
  }

  const campoDeckCard = event.target.closest('[data-deck-campo-id]');
  if (campoDeckCard && currentUserId) {
    const campoId = campoDeckCard.dataset.deckCampoId;
    const isSelected = selectedCampoIds.includes(campoId);
    if (isSelected) {
      selectedCampoIds = selectedCampoIds.filter((id) => id !== campoId);
    } else if (selectedCampoIds.length < 3) {
      selectedCampoIds.push(campoId);
    }
    renderDeckBuilder();
    return;
  }

  const attributeButton = event.target.closest('[data-battle-attribute]');
  if (attributeButton && pendingAttributePick) {
    pendingAttributePick.onPick(attributeButton.dataset.battleAttribute);
    hideAttributePicker();
    return;
  }

  const handCard = event.target.closest('[data-battle-hand-id]');
  if (handCard) {
    if (!activeBattleSession || !currentUserId) return;
    if (activeBattleSession.currentTurnUid !== currentUserId) return;
    selectedBattlePreview = { cardId: handCard.dataset.battleHandId, hidden: false, ownerUid: currentUserId };
    renderBattlePreviewCard();
    if (shouldUseCardActionModal()) {
      showCardActionModal(handCard.dataset.battleHandId);
    } else {
      placeHandCardInNextAvailableSlot(activeBattleSession, handCard.dataset.battleHandId, 'faceup')
        .catch((error) => console.error('No se pudo colocar la carta boca arriba:', error));
    }
    return;
  }


  const challengeButton = event.target.closest('[data-challenge-user-id]');
  if (challengeButton) {
    const challengedUid = challengeButton.dataset.challengeUserId;
    const challengedName = challengeButton.dataset.challengeUserName || 'Usuario';
    if (!challengedUid || !currentUserId || challengedUid === currentUserId) return;

    const existingBattle = getOpenBattleWithUser(challengedUid);
    if (existingBattle) {
      activeBattleSession = existingBattle;
      battleArenaDismissed = false;
      renderBattleArena();
      startBattleRealtimeSync(existingBattle.id);
      return;
    }

    const hasDeckReady = savedDeck.characterIds.length === 20 && savedDeck.mainIds.length === 5;
    if (!hasDeckReady) {
      showBattleMessage('Debes tener un mazo de 20 personajes y elegir 5 principales antes de retar.');
      return;
    }

    if (isBotUid(challengedUid)) {
      createBattleSessionForChallenge({
        fromUid: currentUserId,
        fromName: users[currentUserId]?.name || userName.textContent || 'Usuario',
        toUid: BOT_UID,
        toName: BOT_NAME,
      }).catch((error) => console.error('No se pudo iniciar batalla contra el BOT:', error));
      return;
    }

    sendBattleChallenge(challengedUid, challengedName)
      .catch((error) => console.error('No se pudo enviar el desafío:', error));
    return;
  }

  const surrenderButton = event.target.closest('[data-surrender-user-id]');
  if (surrenderButton) {
    surrenderBattleAgainst(surrenderButton.dataset.surrenderUserId).catch((error) => {
      console.error('No se pudo rendir la batalla:', error);
    });
    return;
  }

  const targetSlot = event.target.closest('[data-battle-slot-id]');
  if (!targetSlot || !activeBattleSession || !currentUserId) return;

  const slotId = targetSlot.dataset.battleSlotId;
  const session = activeBattleSession;
  const pendingDefenseData = session.pendingDefense;
  if (session.currentTurnUid !== currentUserId) {
    const canPickDefenseFromSlot = pendingDefenseData?.defenderUid === currentUserId && pendingDefenseData?.targetSlotId === slotId;
    if (!canPickDefenseFromSlot) return;
  }

  const clickedSlot = (session.fieldSlots || []).find((slot) => slot.id === slotId);
  if (!clickedSlot) return;
  if (clickedSlot.cardId) {
    const isOpponentFaceDown = clickedSlot.faceDown && clickedSlot.ownerUid !== currentUserId;
    selectedBattlePreview = { cardId: clickedSlot.cardId, hidden: isOpponentFaceDown, ownerUid: clickedSlot.ownerUid };
    renderBattlePreviewCard();
  }

  if (pendingDefenseData?.defenderUid === currentUserId && pendingDefenseData?.targetSlotId === clickedSlot.id) {
    const defenderCard = clickedSlot.cardId
      ? getBattleCardWithEffectiveStats(session, clickedSlot.cardId, clickedSlot.ownerUid)
      : null;
    if (!defenderCard) return;
    openAttributePicker('defense', defenderCard, (selectedAttribute) => {
      resolveAttack(
        session,
        pendingDefenseData.attackerSlotId,
        pendingDefenseData.targetSlotId,
        pendingDefenseData.attackerAttribute,
        selectedAttribute,
      ).catch((error) => console.error('No se pudo resolver defensa elegida:', error));
    });
    return;
  }

  if (!clickedSlot.cardId) {
    return;
  }

  if (clickedSlot.ownerUid === currentUserId) {
    if (clickedSlot.faceDown) {
      showBattleMessage('Las cartas boca abajo no pueden atacar ni voltearse manualmente.');
      return;
    }
    const attackerCard = getBattleCardWithEffectiveStats(session, clickedSlot.cardId, clickedSlot.ownerUid);
    if (!attackerCard) return;
    const allowedAttributes = getAvailableAttackAttributesForCard(session, clickedSlot.cardId, clickedSlot.ownerUid);
    openAttributePicker('attack', attackerCard, (selectedAttribute) => {
      pendingAttack = { attackerSlotId: clickedSlot.id, attribute: selectedAttribute };
      showBattleMessage('Atributo elegido. Ahora selecciona una carta del campo rival para atacarla.');
    }, { allowedAttributes });
    return;
  }

  if (!pendingAttack) return;
  const targetCard = characters.find((entry) => entry.id === clickedSlot.cardId);
  if (!targetCard) return;

  if (!clickedSlot.faceDown) {
    resolveAttack(session, pendingAttack.attackerSlotId, clickedSlot.id, pendingAttack.attribute, pendingAttack.attribute).catch((error) => console.error('No se pudo resolver el ataque:', error));
    pendingAttack = null;
    return;
  }

  battleSessionsRef.child(session.id).update({
    pendingDefense: {
      attackerSlotId: pendingAttack.attackerSlotId,
      targetSlotId: clickedSlot.id,
      attackerAttribute: pendingAttack.attribute,
      defenderUid: clickedSlot.ownerUid,
      createdAt: getTimestamp(),
    },
    updatedAt: getTimestamp(),
  }).then(() => {
    showBattleMessage('Ataque lanzado contra carta boca abajo. El defensor debe elegir un atributo para defender.');
  }).catch((error) => console.error('No se pudo iniciar la defensa de carta boca abajo:', error));
  pendingAttack = null;
});

battleAttackCancelButton?.addEventListener('click', hideAttributePicker);
acceptChallengeButton.addEventListener('click', () => {
  respondToChallenge('accepted').catch((error) => {
    console.error('No se pudo aceptar el desafío:', error);
  });
});

rejectChallengeButton.addEventListener('click', () => {
  respondToChallenge('rejected').catch((error) => {
    console.error('No se pudo rechazar el desafío:', error);
  });
});

battleArenaCloseButton.addEventListener('click', () => {
  battleArenaDismissed = true;
  selectedBattlePreview = null;
  battleArenaModal.classList.add('hidden');
  stopBattleRealtimeSync();
});

battleArenaSurrenderButton?.addEventListener('click', () => {
  const opponentUid = getActiveBattleOpponentUid();
  if (!opponentUid) return;
  surrenderBattleAgainst(opponentUid).catch((error) => {
    console.error('No se pudo rendir la batalla:', error);
  });
});

battleSurrenderVictoryCloseButton?.addEventListener('click', hideSurrenderVictoryModal);
battleMessageCloseButton?.addEventListener('click', hideBattleMessage);
battleExperienceOutcomeCloseButton?.addEventListener('click', hideExperienceOutcomeModal);

battleSessionsRef.on('value', (snapshot) => {
  if (!currentUserId) return;
  const sessions = snapshot.val() || {};
  battleSessions = Object.values(sessions);
  cleanupFinishedBattlesForUser(currentUserId).catch((error) => {
    console.error('No se pudieron limpiar batallas terminadas:', error);
  });
  const current = Object.values(sessions).find((session) => (session.players || []).includes(currentUserId) && session.status === 'active');
  if (!current) {
    activeBattleSession = null;
    selectedBattlePreview = null;
    battleArenaDismissed = false;
    battleArenaModal.classList.add('hidden');
    stopBattleRealtimeSync();
    renderOnlineUsers();
    renderDeckBuilder();
    return;
  }
  finishBattleIfPlayerOutOfCards(current).catch((error) => {
    console.error('No se pudo finalizar la batalla por falta de cartas:', error);
  });
  if (current.currentTurnUid === BOT_UID) {
    executeBotTurn(current).catch((error) => {
      console.error('No se pudo ejecutar turno del BOT:', error);
    });
  }
  const previousBattleId = activeBattleSession?.id;
  activeBattleSession = current;
  if (previousBattleId !== current.id) {
    battleArenaDismissed = true;
  }
  if (!battleArenaDismissed || current.currentTurnUid === BOT_UID || current.pendingDefense) {
    battleArenaDismissed = false;
    renderBattleArena();
    startBattleRealtimeSync(current.id);
  } else {
    battleArenaModal.classList.add('hidden');
    stopBattleRealtimeSync();
  }
  const pendingDefenseData = current.pendingDefense;
  if (pendingDefenseData?.defenderUid === BOT_UID) {
    const defenderSlot = (current.fieldSlots || []).find((slot) => slot.id === pendingDefenseData.targetSlotId);
    if (defenderSlot?.cardId) {
      const bestDefenseAttribute = getHighestAttributeForCard(current, defenderSlot.cardId, defenderSlot.ownerUid);
      resolveAttack(
        current,
        pendingDefenseData.attackerSlotId,
        pendingDefenseData.targetSlotId,
        pendingDefenseData.attackerAttribute,
        bestDefenseAttribute,
      ).catch((error) => console.error('No se pudo resolver defensa automática del BOT:', error));
    }
    renderOnlineUsers();
    renderDeckBuilder();
    return;
  }
  if (pendingDefenseData?.defenderUid === currentUserId) {
    const defenderSlot = (current.fieldSlots || []).find((slot) => slot.id === pendingDefenseData.targetSlotId);
    const shouldPromptDefense = !pendingAttributePick
      || pendingAttributePick.mode !== 'defense'
      || pendingAttributePick.targetSlotId !== pendingDefenseData.targetSlotId
      || pendingAttributePick.sessionId !== current.id;
    if (shouldPromptDefense && defenderSlot?.cardId) {
      const defenderCard = getBattleCardWithEffectiveStats(current, defenderSlot.cardId, defenderSlot.ownerUid);
      if (defenderCard) {
        openAttributePicker('defense', defenderCard, (selectedAttribute) => {
          resolveAttack(
            current,
            pendingDefenseData.attackerSlotId,
            pendingDefenseData.targetSlotId,
            pendingDefenseData.attackerAttribute,
            selectedAttribute,
          ).catch((error) => console.error('No se pudo resolver defensa elegida:', error));
        }, { targetSlotId: pendingDefenseData.targetSlotId, sessionId: current.id });
      }
    }
    renderOnlineUsers();
    renderDeckBuilder();
    return;
  }
  renderOnlineUsers();
  renderDeckBuilder();
});


battleActionPlaceButton?.addEventListener('click', () => {
  if (!activeBattleSession || !selectedHandCardId) return;
  placeHandCardInNextAvailableSlot(activeBattleSession, selectedHandCardId, 'faceup')
    .catch((error) => console.error('No se pudo colocar la carta boca arriba:', error))
    .finally(() => {
      hideCardActionModal();
      renderBattleArena();
    });
});
battleActionFaceDownButton?.addEventListener('click', () => {
  if (!activeBattleSession || !selectedHandCardId) return;
  placeHandCardInNextAvailableSlot(activeBattleSession, selectedHandCardId, 'facedown')
    .catch((error) => console.error('No se pudo colocar la carta boca abajo:', error))
    .finally(() => {
      hideCardActionModal();
      renderBattleArena();
    });
});
battleActionCancelButton?.addEventListener('click', () => { selectedHandCardId = null; pendingPlacementMode = null; hideCardActionModal(); renderBattleArena(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { battleArenaDismissed = true; battleArenaModal.classList.add('hidden'); hideCardActionModal(); stopBattleRealtimeSync(); } });

document.addEventListener('contextmenu', (event) => {
  const handCard = event.target.closest('[data-battle-hand-id]');
  if (!handCard || shouldUseCardActionModal()) return;
  if (!activeBattleSession || !currentUserId) return;
  if (activeBattleSession.currentTurnUid !== currentUserId) return;
  event.preventDefault();
  selectedBattlePreview = { cardId: handCard.dataset.battleHandId, hidden: false, ownerUid: currentUserId };
  renderBattlePreviewCard();
  placeHandCardInNextAvailableSlot(activeBattleSession, handCard.dataset.battleHandId, 'facedown')
    .catch((error) => console.error('No se pudo colocar la carta boca abajo:', error));
});
