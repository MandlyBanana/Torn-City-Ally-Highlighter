// ==UserScript==
// @name         Ally Highlighter
// @namespace    Maus' scripts
// @version      1.3
// @description  Highlights the faction icon on profile page and mini profiles for allied faction members
// @author       Maus [3201874]
// @license      MIT
// @match        https://www.torn.com/*
// @exclude      https://www.torn.com/page.php?sid=attack*
// @run-at       document-idle
// ==/UserScript==

(function () {a
    'use strict';

    // ─── CONFIG ──────────────────────────────────────────────────
    const MY_ALLIANCE     = 'YABA';
    const HIGHLIGHT_COLOR = 'rgba(229, 153, 247, 0.3)';
    // ─────────────────────────────────────────────────────────────

    const ALLIANCES = {
        "Westworld": ["~Twisted~","Abusement Park","Asylum 2.0","AQUA-Poseidon","Aurora Surrealis","Black Lotus Society","White Lotus Society","Bloodline","Combat Ready","CR-ACK","Crashpad","Combat Ready Mayhem","Desert Eagle","Destination Unknown","Destination Unknown:FAFO","Deja","Dopeheads on Mopeds","Druggies in Snuggies","Droogs","Emergency Room","Combat Ready HQ","CRashpad","Desert Phoenix","Evolution","Darkline","FLATLINE","Gladiators","Glory to Heroes","Good Guys","IA Black","Imminent Apocalypse","Imperial MediHaven","Infernum-","Vice","Unicorn Apocalypse","Undead Raven","Undead Hydra","Undead Basilisk","Undead Crows","Occultus","Occul2us","Lex Wolverines","Lifeline","NNGO","Monarch Embassy","Monarch Chrysalis","Monarch Cupid","Monarch HQ","Monarch Mutation","Monarch Research","Monarch Vanguard","Monarch Army of Light","Monarch Leviathan","Monarch Retardation","Monarch Genesis","Monarch Contagion","Mortiferi","The Black Hand of Monarch","Materia","Nub Army","Nub Navy","Nuclear Armageddon","Nuclear Blast","Nuclear Clinic","Nuclear Fusion","Nuclear Therapy","Nuclear Winter","Ionization","Peaky CS","Phoenix Ascent","Ravage","Requiem","REK II","REK Juniors","Romania Elite Kommando","Sentinels","Stompers","S.W.A.T","S.W.A.T Academy","Savage Plague","SMTH - Bright Summit","SMTH - Concord","SMTH - HoYoverse","SMTH - November Chopin","SMTH - Party Animals","SMTH - Phoenix Nirvana","SMTH - Silver Hand","SMTH - Trisolary","SMTH - Healing Pulse","SMTH - Hermit Sage","The Brotherhood of Battle","The Brotherhood of Light","The Hellfire Club","The Inquisition","The Project Syndicate","The Prowl","The Wolverines","Torn Medical","Unity","Valor","Vulpes Vulpes","Warcrimes","WarDogs HQ","WarDogs CM","WarDogs Outpost","WIT-Horizon","WIT-Mayhem","WIT-Premier","Wolf Pack","Wolf Pack Next Generation","Wolverines Resurrected","Wolverines Health Org","Wraith","Wild Guardians","PT-Calculated","PT-Family","PT-Ironhearts","PT-Penguins","PT-ShadowRazers","PT-Torntuga","PT-PimpTuga","PT-Guemedolphinos","PT-erodactyls"],
        "OBN": ["39th Street Reapers","39th Street Healers","39th Street Killers","39th Street Killers X","39th Street Warriors","Arcadia","Arcadia Rising","-Aurora-","Aquarius","Black Statues","-Borealis-","Buttgrass Inc","Carbon","Lithium","Xenon","Dead or Alive","Destructive Anomaly","DP Warriors","Dystopia","HAKA","Iron Rose Cartel","Medic!!","Itsi Bitsi Bikini","In Memory of the Fallen","Natural Selection","Natural Selection II","Natural Selection III","Natural Selection IV","New Sith Order","New Sith Order II","NPO - Endurance","NPO - Peace","NPO - Prosperity","NPO - Strength","NPO - Serenity","NPO - Valour","NS Bomb Shelter","ODB","Project Nimbus","[Redacted]","Rabid Chihuahuas","Razers","Reign of Confusion","Retaliation","Ruthless Reborn","The Resolute","The Resolute PromiseGuard","The Next Level - Ascension","The Next Level","The Next Level - Forge","The Next Level - Mayhem","The Nest","The Night's Watch","WarBirds","White Rabbits","Winter is Coming","WTF","WTF Ducks","WTF Healers","WTF Tribes","Happy Vegemites","Infinite Tim Tams","Mana"],
        "YABA": ["Chain Reaction","Subversive Alliance","Catalysis","Chromatic","Escensio Incursus","Endless fire territory","Sport Club","SA Succession","Blackwatch","Midnight X","The Revenant","The Rifle Company","The Rifle Elites","The Covenant","The Saviors","The Sick Bay","Too sober for this shit","Violent Resolution","Wargasm HQ","Wargasm-DNA","Wargasm Revival Medicare","Naughty Souls","Capacity X","Champagne Killers","Baby Champers","Crime Syndicate","Toxic Reign","Midnight Plague","Overwatch","Get Suffed","The Rifle Medics","The Zoo","Vinneri","TSFTS Microbrewery","The Revenant Reserve","The Revenant Respawn","The Rifle Hotel","Vinneri Shadow Cult","Phoenix X","Med X","Midnight Ghosts","DarkCode","Chromatic Sloths","Chaos Theory","Legitimate Business","Mortal Legends","The Groovy Guardians","Catch 22","Tranquility Base","Naughty Sanctuary","7DS* Pride","FF-Zanarkand","Toxic Spawn","Premature Attackulation","Anarchist of Torn","Knights Radiant"],
        "The Nameless Alliance": ["Aperture Science","-Aurora-","Warband of the Fallen","Blue Rock Cartel","BRC Supreme","-Borealis-","Extinction","The Fellowship of LOL","FLUX","In Memory of the Fallen","Iron Rose Cartel","Iron Rose Legion","Pennywise Clown Posse","Rabid Chihuahuas","Reign of Confusion","Retaliation","Ruthless Reborn","Soulless Mafia","The Almanac","Pennywise Medical","Unbroken Silence","Unbroken Legion","Unbroken Nixies","Unbroken Valkyries","Unbroken Damage","Shrooms of Doom","The War Rig","Disciples of the Fallen","EMU HQ","Viking Emus","EMU-SADERS"],
        "JFK": ["JFK - Misfits","JFK","JFK - Future Killers","JFR","Just Fer Khaos","Order through Chaos","The Drunk Tank","Valhalla - Barna","Valhalla - Pillagers","Valhalla - Laekna","Lingering Insanity"],
        "North West Alliance": ["The Untouchables","Torn Galactic Republic","|HT|","Kingdom of Asgard","TNU - Headquarters","TNU - Underground Academy","The Red Circle","Jokerz","Birds of Passage","The Askelads","HitchHikers","UNiTed Flying Doctors","Warhawks"],
        "Neutrals": ["Damage Inc","7th St Assassins","Also Impulse","Cosmosis","Dog Pen Mafia","Cerberus","Endless Endeavor","Epic Mafia","Kingsmen","Goblin Horde","Houdini","Impulse","Impulse 13","Rhinos's Cartel","School of Devlins","Kentucky Fried Criminals","Shiba Inu","Shiny Hoard Avian Team","DropBears","DropBears Legion","TBA - Rise Above","TBA - Rise Again","The Black Pearl","The Fallen","Skill Issue","Voodoo","The Iron Fist","DarkHearts","Natural Born Killers","Below the Wake","Raccoon Rumpus","Cipher","TC Mafia Chain Gang","Human Factor","Wandering Earth","Jux HQ","Jux Lite","Resilience","Brazillian Unit","The Torn Division","Sagefire Institute","Neon Cartel","SA Infinite","Ducks of Quacken","Pain Inc","SkilledAssassinsRepublic","TGC","Collective Bootcamp","The Collective JTF","The Collective Resistance","The Suicide $quad","Cosa Nostra","The Four Twenty C-K-A","The Four Twenty H-V-F","The Hangout"],
    };

    // ─── SETUP ───────────────────────────────────────────────────

    const allyFactions = ALLIANCES[MY_ALLIANCE];
    if (!allyFactions?.length) {
        console.warn(`[ALLY] Unknown alliance: "${MY_ALLIANCE}"`);
        return;
    }

    const allyRegex = new RegExp(
        allyFactions
        .slice()
        .sort((a, b) => b.length - a.length)
        .map(f => f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .join('|'),
        'i'
    );

    const SELECTOR = [9, 74, 81]
    .flatMap(n => [`[id^="icon${n}-mini-profile-"]`, `[id^="icon${n}-profile-"]`])
    .join(', ');

    const seen = new WeakSet();

    let reactFiberKey = null;

    // ─── FIBER ───────────────────────────────────────────────────

    function getFiberKey(el) {
        if (reactFiberKey) return reactFiberKey;
        const key = Object.keys(el).find(k => k.startsWith('__reactFiber'));
        if (key) reactFiberKey = key;
        return key ?? null;
    }

    function getFactionDescription(el) {
        const fiberKey = getFiberKey(el);
        if (!fiberKey) return null;

        let node = el[fiberKey];
        let depth = 0;
        while (node && depth < 4) {
            const desc = node.memoizedProps?.iconProps?.description;
            if (desc) return desc;
            node = node.return;
            depth++;
        }
        return null;
    }

    // ─── ICON CHECK ──────────────────────────────────────────────

    function checkIcon(icon) {
        if (seen.has(icon)) return;
        seen.add(icon);

        const description = getFactionDescription(icon);
        if (!description) return;

        if (allyRegex.test(description)) {
            icon.style.backgroundColor = HIGHLIGHT_COLOR;
            icon.style.borderRadius = '3px';
        }
    }

    function scanNode(node) {
        if (!(node instanceof HTMLElement)) return;
        if (node.matches(SELECTOR)) checkIcon(node);
        node.querySelectorAll(SELECTOR).forEach(checkIcon);
    }

    // ─── OBSERVER ────────────────────────────────────────────────

    let scheduled = false;
    const pending = [];

    new MutationObserver(mutations => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node instanceof HTMLElement) pending.push(node);
            }
        }

        if (scheduled || !pending.length) return;
        scheduled = true;

        requestAnimationFrame(() => {
            scheduled = false;
            const batch = pending.splice(0, pending.length);
            for (const node of batch) scanNode(node);
        });
    }).observe(document.body, { childList: true, subtree: true });

    // ─── START ───────────────────────────────────────────────────

    document.querySelectorAll(SELECTOR).forEach(checkIcon);
    console.log(`[ALLY] Active — ${allyFactions.length} factions in "${MY_ALLIANCE}"`);
})();