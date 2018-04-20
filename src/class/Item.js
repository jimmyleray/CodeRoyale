export class Item {
	constructor(
		name,
		cost,
		damage,
		health,
		maxHealth,
		mana,
		maxMana,
		moveSpeed,
		manaRegen,
		isPotion
	) {
		this.name = name
		this.cost = Number(cost)
		this.damage = Number(damage)
		this.health = Number(health)
		this.maxHealth = Number(maxHealth)
		this.mana = Number(mana)
		this.maxMana = Number(maxMana)
		this.moveSpeed = Number(moveSpeed)
		this.manaRegen = Number(manaRegen)
		this.isPotion = !isPotion
	}

	canBuy(totalGold) {
		return this.cost <= totalGold
	}
}
