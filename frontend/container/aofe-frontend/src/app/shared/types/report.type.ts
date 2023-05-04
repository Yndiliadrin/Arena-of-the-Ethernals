import { Item } from "./user.type";

export type fightReport = {
  atk: string;
  def: string;
  dmg: number;
  winner: string;
  loot: Item | null;
};
