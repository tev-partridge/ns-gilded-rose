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

describe('Items', () => {
    it('Quality never exceeds 50', () => {
        const gildedRose = new GildedRose([new Item('Aged Brie', 10, 50)]);
        gildedRose.updateQuality()
        expect(gildedRose.items[0].quality).to.equal(50);
    })
})

describe('AgedBrie', () => {
    it('Aged Brie increases in quality over time', () => {
        const gildedRose = new GildedRose([new Item('Aged Brie', 10, 10)]);
        gildedRose.updateQuality()
        expect(gildedRose.items[0].quality).to.equal(11);
    })
})

describe('Sulfuras', () => {
    it('Sulfuras quality doesn\'t decrease', () => {
        const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 10, 10)]);

        for(let i = 0; i < 100; i++) {
            gildedRose.updateQuality()
        }

        expect(gildedRose.items[0].quality).to.equal(10);
    })

    it('Sulfuras sellIn doesn\'t decrease', () => {
        const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 10, 10)]);

        for(let i = 0; i < 100; i++) {
            gildedRose.updateQuality()
        }

        expect(gildedRose.items[0].sellIn).to.equal(10);
    })
})

describe('Backstage passes', ()=> {
    it('Increases in quality by 1', ()=> {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 12, 10)])
        gildedRose.updateQuality()
        expect(gildedRose.items[0].quality).to.equal(11);
    })

    it('Increases in quality by 2 when 10 days or less', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)])
        gildedRose.updateQuality()
        expect(gildedRose.items[0].quality).to.equal(12);
    })

    it('Increases in quality by 3 when 5 days or less', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)])
        gildedRose.updateQuality()
        expect(gildedRose.items[0].quality).to.equal(13);
    })

    it('Quality goes to 0 after the concert', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)])
        gildedRose.updateQuality()
        expect(gildedRose.items[0].quality).to.equal(0);
    })
})

describe('Conjured', () => {
    it('Regular items degrade by 2', () => {
        const gildedRose = new GildedRose([new Item('Conjured', 10, 10)]);
        gildedRose.updateQuality()
        expect(gildedRose.items[0].quality).to.equal(8);
    })
    it('Regular items degrade by 4 past sell by date', () => {
        const gildedRose = new GildedRose([new Item('Conjured', 0, 10)]);
        gildedRose.updateQuality()
        expect(gildedRose.items[0].quality).to.equal(6);
    })
})