export type Item = {
  name: string;
  slot: string;
  defense: number;
  damage: number;
  rarity: number;
};

export type Character = {
  hp: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  equipment: Array<Item>;
  inventory: Array<Item>;
  level: number;
  exp: number;
};

export type User = {
  _id: string;
  username: string;
  accessLevel: number;
  character: Character;
};
