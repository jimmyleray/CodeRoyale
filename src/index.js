// Import functionnal library Ramda
import * as R from 'ramda';

import { Circle } from './class/Circle';
import { Line } from './class/Line';
import {
	massCenter,
	intersectBetweenCircleAndLine,
	nearestPositionFrom,
	distance
} from './scripts/maths';
import { addItem, getBestPotion, getBestItem } from './scripts/item';
import {
	addEntity,
	getMyHeroes,
	getEnemies,
	getNearest,
	getEnemyTower,
	getNearestEnemyHero
} from './scripts/entity';
import { addBushOrSpawn, isBush, isSpawn } from './scripts/bushOrSpawn';

// myTeam number can be 0 or 1
const myTeam = Number(readline());

// useful from wood1, represents the number of bushes
// and the number of places where neutral units can spawn
const bushAndSpawnCount = Number(readline());
const BushOrSpawnList = R.times(addBushOrSpawn, bushAndSpawnCount);
const BushList = R.filter(isBush, BushOrSpawnList);
const SpawnList = R.filter(isSpawn, BushOrSpawnList);

// Items from market useful from wood2
const itemCount = Number(readline());
const ItemList = R.times(addItem, itemCount);

// List of actual heroes
const heroesList = [];
let nameFlag = true;

// Game loop
while (true) {
	// My and ennemy golds count
	const myGold = Number(readline());
	const enemyGold = Number(readline());

	// roundType is positive value will show the
	// number of heroes that await a command
	const roundType = Number(readline());
	const entityCount = Number(readline());
	const EntityList = R.times(addEntity(myTeam), entityCount);

	if (roundType < 0) {
		const name = nameFlag ? 'IRONMAN' : 'DOCTOR_STRANGE';
		nameFlag = false;
		print(name);
	} else {
		const myHeroes = getMyHeroes(EntityList);
		if (heroesList.length === 0) {
			myHeroes.forEach((heroC, idx) => {
				heroesList.push({
					id: heroC.unitId,
					name: idx === 0 ? 'IRONMAN' : 'DOCTOR_STRANGE',
					mainStat: idx === 0 ? 'damage' : 'damage',
					items: []
				});
			});
		}

		const allEnemies = getEnemies(EntityList);
		const enemyTower = getEnemyTower(EntityList)[0];
		const massCenterEnnemies = massCenter(allEnemies);

		myHeroes.forEach(hero => {
			let heroCached = R.defaultTo(
				heroesList[0],
				R.find(heroC => heroC.id === hero.unitId, heroesList)
			);
			let bestItem;
			let bestPotion;
			const nearestEnemy = getNearest(hero)(allEnemies);

			const items = ItemList.filter(item => item.canBuy(myGold));
			if (items.length > 0) {
				bestItem = getBestItem(heroCached.mainStat)(items);
				bestPotion = getBestPotion(items);
			}

			const mainLine = new Line(nearestEnemy, massCenterEnnemies);
			const mainCircle = new Circle(nearestEnemy, hero.range - 1);
			const intersections = intersectBetweenCircleAndLine(mainCircle, mainLine);
			const nearest = nearestPositionFrom(hero.position)(intersections);
			let safeNearest = nearest;
			if (distance(nearest)(enemyTower.position) < enemyTower.range + 1) {
				const enemyTowerLine = new Line(enemyTower.position, hero.position);
				const enemyTowerCircle = new Circle(
					enemyTower.position,
					enemyTower.range + 1
				);
				const enemyTowerIntersections = intersectBetweenCircleAndLine(
					enemyTowerCircle,
					enemyTowerLine
				);
				safeNearest = nearestPositionFrom(nearest)(enemyTowerIntersections);
			}

			if (myTeam === 0) {
				safeNearest.x = R.clamp(0, massCenterEnnemies.x, safeNearest.x);
			} else {
				safeNearest.x = R.clamp(massCenterEnnemies.x, 1920, safeNearest.x);
			}

			const target = {
				x: R.clamp(0, 1920, Math.floor(safeNearest.x)),
				y: R.clamp(0, 750, Math.floor(safeNearest.y))
			};

			const nearestHero = getNearestEnemyHero(hero)(allEnemies);
			let actionFlag = true;
			if (heroCached.name === 'IRONMAN') {
				if (
					hero.mana >= 60 &&
					hero.countDown2 === 0 &&
					nearestHero &&
					nearestHero.isVisible &&
					distance(hero.position)(nearestHero.position) <= 900
				) {
					print(`FIREBALL ${nearestHero.position.x} ${nearestHero.position.y}`);
					actionFlag = false;
				} else if (
					hero.maxMana - hero.mana >= 20 &&
					hero.countDown1 === 0 &&
					((myTeam === 0 && target.x < hero.position.x) ||
						(myTeam === 1 && target.x > hero.position.x)) &&
					distance(hero.position)(target) >= 200
				) {
					print(`BLINK ${target.x} ${target.y}`);
					actionFlag = false;
				}
			} else if (heroCached.name === 'DOCTOR_STRANGE') {
				if (
					hero.mana >= 40 &&
					hero.countDown3 === 0 &&
					nearestHero &&
					nearestHero.isVisible &&
					distance(hero.position)(nearestHero.position) <= 300
				) {
					print(`PULL ${nearestHero.unitId}`);
					actionFlag = false;
				}
			}

			if (actionFlag) {
				if (
					bestItem &&
					heroCached.items.length < 4 &&
					distance(hero)(nearestEnemy) > hero.range
				) {
					heroCached.items.push(bestItem.name);
					print(`BUY ${bestItem.name}`);
				} else if (
					bestPotion &&
					heroCached.items.length < 4 &&
					hero.maxHealth - hero.health >= bestPotion.health
				) {
					print(`BUY ${bestPotion.name}`);
				} else {
					print(`MOVE_ATTACK ${target.x} ${target.y} ${nearestEnemy.unitId}`);
				}
			}
		});
	}
}
