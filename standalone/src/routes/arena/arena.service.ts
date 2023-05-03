import { IItem } from "../../database/item/itemSchema.js";
import { INpc, Npc } from "../../database/npc/npcSchema.js";
import { Character, ICharacter, User } from "../../database/user/userSchema.js";
import { FightPlayback } from "./arena.types.js";

/**
 * Thanks to DefinitelyNotBandee the fight gona look like the folowing.
 *
 * - The attacker has the first move.
 * - The attack calculated by the following formula: (2/3)*DEX+(1/2)INT+d{6,8}
 *      The damage is the WEAPON+1
 * - The defend is: DEX+ARMOR+d{6,8}
 * - If the attack is strictly higher than the defend, then it will deal damage
 * - The characters takes turns to attack
 * - The fight lasts until one of them is down to 0 HP.
 *
 * @param req request object
 * @param res response object
 * @returns The playback of the fight.
 */
export const fight = async (req, res) => {
  let playback = [];
  let characters: Array<{ _id: string; character: ICharacter }> = [];

  const mapNpcObjects = (
    element: INpc
  ): { _id: string; character: ICharacter } => {
    return {
      _id: element.name,
      character: element as ICharacter,
    };
  };

  try {
    characters.push(
      await User.findById(req.body.attacker, { character: 1 }).populate(
        "character.equipment"
      )
    );
    characters.push(
      await User.findById(req.body.defender, { character: 1 }).populate(
        "character.equipment"
      )
    );

    console.log(characters[0].character.equipment);

    // If the array's length is shorter than 2 than it's an indicator that the users
    // fights againts an NPC
    if (characters.length > 2) {
      let npcsTemp = await Npc.find({
        _id: { $in: [req.body.attacker, req.body.defender] },
      }).populate("equipment");

      console.log(npcsTemp.map(mapNpcObjects));
    }

    let roundCounter = 1;
    while (true) {
      let winner = "";
      if (roundCounter % 2 == 1)
        winner = simulateFightRound(characters[0], characters[1]);
      else if (roundCounter % 2 == 0)
        winner = simulateFightRound(characters[1], characters[0]);

      if (characters[0].character.hp <= 0) {
        console.log(winner);
        break;
      } else if (characters[1].character.hp <= 0) {
        console.log(winner);
        break;
      }
      roundCounter++;
    }
  } catch (error) {
    console.error(error);
    return res.status(200).json([]);
  }

  return res.status(200).json(playback);
};

const simulateFightRound = (
  attacker: { _id: string; character: ICharacter },
  defender: { _id: string; character: ICharacter }
) => {
  const attackScore =
    (2 / 3) * attacker.character.dexterity +
    (1 / 2) * attacker.character.intelligence +
    d6();

  const defendScore =
    defender.character.dexterity +
    getDefendItemBonus(defender.character) +
    d8();

  if (attackScore > defendScore) {
    defender.character.hp -=
      attacker.character.strength + getAttackItemBonus(attacker.character);
    return attacker._id;
  }
  return defender._id;
};

// Generates a random number between [1,6]
const d6 = () => Math.floor(Math.random() * 6 + 1);
// Generates a random number between [1,8]
const d8 = () => Math.floor(Math.random() * 8 + 1);

const getDefendItemBonus = (c: ICharacter): number => {
  const items = c.equipment.filter((e: any) => e.defense > 0);

  //get the sum of the defend property of the elements of the items list
  return items.length > 0
    ? items
        .map((e: any) => e.defense)
        .reduce((acc: number, curr: number) => {
          return acc + curr;
        })
    : 0;
};

const getAttackItemBonus = (c: ICharacter): number => {
  const items = c.equipment.filter((e: any) => e.damage > 0);

  //get the sum of the damage property of the elements of the items list
  return items.length > 0
    ? items
        .map((e: any) => e.defense)
        .reduce((acc: number, curr: number) => {
          return acc + curr;
        })
    : 0;
};


/**
 * a: 5 | 3
 * b: 5 | 7
 */