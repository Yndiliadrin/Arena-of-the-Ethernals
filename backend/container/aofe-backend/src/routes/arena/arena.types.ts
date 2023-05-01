import { ICharacter } from "../../database/user/userSchema.js";

export type FightPlayback = {
    attacker: ICharacter;
    defencer: ICharacter;
    winnder : "attacker" | "defender";
}