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
            let qualityChange = -1;
            let sellInChange = -1;
            let itemSellIn = this.items[i].sellIn;
            let itemName = this.items[i].name;
            let itemQuality = this.items[i].quality;

            if (itemName === 'Aged Brie') {
                qualityChange = 1;
            }
            else if (itemName === 'Backstage passes to a TAFKAL80ETC concert') {
                if (itemSellIn <= 0) qualityChange = -this.items[i].quality;
                else if (itemSellIn < 6) qualityChange = 3;
                else if (itemSellIn < 11) qualityChange = 2;
                else qualityChange = 1;
            }
            else if (itemName === 'Sulfuras, Hand of Ragnaros') {
                qualityChange = 0;
                sellInChange = 0;
            }
            else if (itemSellIn <= 0){
                qualityChange = -2;
            }

            let nextQuality = Math.min(this.maxQuality, itemQuality + qualityChange);

            this.items[i].quality = nextQuality;
            this.items[i].sellIn = itemSellIn + sellInChange;


        }

        return this.items;
    }
}
