import { test, expect } from '@playwright/test';
import path from 'path';

const fileUrl = `file://${path.resolve('tetris.html')}`;

test.describe('Tetris Game', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(fileUrl);
    });

    test('should initialize with overlay', async ({ page }) => {
        await expect(page.locator('#status-text')).toHaveText('NEON TETRIS');
        await expect(page.locator('#start-btn')).toBeVisible();
    });

    test('should start game on button click', async ({ page }) => {
        await page.click('#start-btn');
        const isHidden = await page.locator('#overlay').evaluate(el => el.classList.contains('hidden'));
        expect(isHidden).toBe(true);
    });

    test('logic: collision detection', async ({ page }) => {
        const collision = await page.evaluate(() => {
            const { game } = window as any;
            const arena = game.arena.map((row: any) => [...row]);
            // Fill bottom row
            arena[arena.length - 1].fill(1);
            const player = {
                matrix: [[1]],
                pos: { x: 0, y: arena.length - 1 }
            };
            return game.collide(arena, player);
        });
        expect(collision).toBe(true);
    });

    test('logic: rotation', async ({ page }) => {
        const rotated = await page.evaluate(() => {
            const { game } = window as any;
            const matrix = [[1, 1, 0], [0, 1, 0], [0, 1, 0]]; 
            game.rotate(matrix, 1);
            return matrix;
        });
        // Initial:
        // [1, 1, 0]
        // [0, 1, 0]
        // [0, 1, 0]
        // After Rotate:
        // [0, 0, 1]
        // [0, 1, 1]
        // [0, 0, 0]
        // Wait, let's verify the expectation. 
        // Transpose:
        // [1, 0, 0]
        // [1, 1, 1]
        // [0, 0, 0]
        // Reverse rows (Clockwise):
        // [0, 0, 1]
        // [1, 1, 1]
        // [0, 0, 0]
        expect(rotated[0]).toEqual([0, 0, 1]);
        expect(rotated[1]).toEqual([1, 1, 1]);
    });

    test('UI: movement controls', async ({ page }) => {
        await page.click('#start-btn');
        const initialX = await page.evaluate(() => (window as any).game.player.pos.x);
        
        await page.keyboard.press('ArrowLeft');
        const leftX = await page.evaluate(() => (window as any).game.player.pos.x);
        expect(leftX).toBe(initialX - 1);

        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        const rightX = await page.evaluate(() => (window as any).game.player.pos.x);
        expect(rightX).toBe(initialX + 1);
    });
});
