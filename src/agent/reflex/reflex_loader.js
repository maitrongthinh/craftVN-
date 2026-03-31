import { readdirSync, existsSync } from 'fs';
import { pathToFileURL } from 'url';
import * as path from 'path';

export class ReflexLoader {
    constructor(agent) {
        this.agent = agent;
        this.botName = agent.name;
        this.reflexes_dir = `./bots/${this.botName}/reflexes`;
        this.active_reflexes = [];
    }

    async loadReflexes() {
        if (!existsSync(this.reflexes_dir)) {
            this.active_reflexes = [];
            return;
        }

        const files = readdirSync(this.reflexes_dir)
            .filter(f => f.endsWith('.js') && f.startsWith('reflex_'));
        
        const newReflexes = [];
        for (const file of files) {
            try {
                const filePath = path.resolve(this.reflexes_dir, file);
                const module = await import(pathToFileURL(filePath).href + '?update=' + Date.now());
                if (typeof module.handleReflex === 'function') {
                    newReflexes.push({
                        name: file,
                        handler: module.handleReflex
                    });
                }
            } catch (err) {
                console.error(`[ReflexLoader] Failed to load reflex ${file}:`, err.message);
            }
        }
        this.active_reflexes = newReflexes;
        console.log(`[ReflexLoader] Loaded ${this.active_reflexes.length} active reflexes.`);
    }

    async executeReflexes(attacker, amount) {
        const bot = this.agent.bot;
        const skills = (await import('../library/skills.js')).default || await import('../library/skills.js');
        const world = (await import('../library/world.js')).default || await import('../library/world.js');
        const Vec3 = (await import('vec3')).Vec3;

        for (const reflex of this.active_reflexes) {
            try {
                // Not using await here as reflexes should be fast fire-and-forget or handled by action manager internally
                reflex.handler(bot, attacker, amount, skills, world, Vec3).catch(err => {
                    console.error(`[Reflex] Reflex ${reflex.name} execution error:`, err.message);
                });
            } catch (err) {
                console.error(`[Reflex] Reflex ${reflex.name} crashed:`, err.message);
            }
        }
    }
}
