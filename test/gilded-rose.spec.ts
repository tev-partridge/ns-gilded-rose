import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Golden Master Test', () => {
    it('One update', () => {
        const gildedRose = new GildedRose([
            new Item('Aged Brie', 10, 10),
            new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20),
            new Item('Sulfuras, Hand of Ragnaros', 10, 20),
            new Item('Apple pie', 10, 20)
        ]);

        gildedRose.updateQuality()

        expect(gildedRose.items[0].quality).to.equal(11);
        expect(gildedRose.items[1].quality).to.equal(22);
        expect(gildedRose.items[2].quality).to.equal(20);
        expect(gildedRose.items[3].quality).to.equal(19);

        expect(gildedRose.items[0].sellIn).to.equal(9);
        expect(gildedRose.items[1].sellIn).to.equal(9);
        expect(gildedRose.items[2].sellIn).to.equal(10);
        expect(gildedRose.items[3].sellIn).to.equal(9);
    })

    it('Five updates', () => {
        const gildedRose = new GildedRose([
            new Item('Aged Brie', 10, 10),
            new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20),
            new Item('Sulfuras, Hand of Ragnaros', 10, 20),
            new Item('Apple pie', 10, 20)
        ]);

        for(let i = 0; i < 5; i++) {
            gildedRose.updateQuality()
        }

        expect(gildedRose.items[0].quality).to.equal(15);
        expect(gildedRose.items[1].quality).to.equal(30);
        expect(gildedRose.items[2].quality).to.equal(20);
        expect(gildedRose.items[3].quality).to.equal(15);

        expect(gildedRose.items[0].sellIn).to.equal(5);
        expect(gildedRose.items[1].sellIn).to.equal(5);
        expect(gildedRose.items[2].sellIn).to.equal(10);
        expect(gildedRose.items[3].sellIn).to.equal(5);
    })
})