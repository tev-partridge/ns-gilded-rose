export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;
    private maxQuality: number = 50;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }


    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            let itemSellIn = this.items[i].sellIn;
            let itemName = this.items[i].name;
            let itemQuality = this.items[i].quality;
            let qualityMultiplier = 1;

            // Next will check if conjured in name
            if (itemName === "Conjured") {
                qualityMultiplier = 2;
            }

            let newQuality = itemQuality - qualityMultiplier;
            let newSellIn = itemSellIn - 1;

            if (itemName === 'Aged Brie') {
                newQuality = itemQuality + 1;
            }
            else if (itemName === 'Backstage passes to a TAFKAL80ETC concert') {
                if (itemSellIn <= 0) newQuality = 0;
                else if (itemSellIn < 6) newQuality = itemQuality + 3;
                else if (itemSellIn < 11) newQuality = itemQuality + 2;
                else newQuality = itemQuality + 1;
            }
            else if (itemName === 'Sulfuras, Hand of Ragnaros') {
                newQuality = itemQuality;
                newSellIn = itemSellIn;
            }
            else if (itemSellIn <= 0){
                newQuality = itemQuality - (2 * qualityMultiplier);
            }

            newQuality = Math.min(this.maxQuality, newQuality);

            this.items[i].quality = newQuality;
            this.items[i].sellIn = newSellIn;
        }

        return this.items;
    }
}
