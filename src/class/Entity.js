export class Entity {
	constructor(
		myTeam,
		unitId,
		team,
		unitType,
		x,
		y,
		range,
		health,
		maxHealth,
		shield,
		damage,
		moveSpeed,
		stunDuration,
		goldValue,
		countDown1,
		countDown2,
		countDown3,
		mana,
		maxMana,
		manaRegen,
		heroType,
		isVisible,
		itemsOwned
	) {
		this.myTeam = Number(myTeam)
		this.unitId = Number(unitId)
		this.team = Number(team)
		this.unitType = unitType
		this.x = Number(x)
		this.y = Number(y)
		this.range = Number(range)
		this.health = Number(health)
		this.maxHealth = Number(maxHealth)
		this.shield = Number(shield)
		this.damage = Number(damage)
		this.moveSpeed = Number(moveSpeed)
		this.stunDuration = Number(stunDuration)
		this.goldValue = Number(goldValue)
		this.countDown1 = Number(countDown1)
		this.countDown2 = Number(countDown2)
		this.countDown3 = Number(countDown3)
		this.mana = Number(mana)
		this.maxMana = Number(maxMana)
		this.manaRegen = Number(manaRegen)
		this.heroType = heroType
		this.isVisible = Boolean(isVisible)
		this.itemsOwned = Number(itemsOwned)
	}

	isHero() {
		return this.unitType === 'HERO'
	}

	isAlly() {
		return this.team === this.myTeam
	}

	isTower() {
		return this.unitType === 'TOWER'
	}

	get position() {
		return { x: this.x, y: this.y }
	}
}
