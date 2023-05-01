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
export const fight = (req, res): Array<FightPlayback> => {
    let playback = [];

    try {
    } catch (error) {
        
    }

    return playback;
}