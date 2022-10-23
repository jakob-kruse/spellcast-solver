# Spellcast Solver

Spellcast is a word game in discord. The goal is to find the largest connected word in a grid of letters. The letters are connected if they are adjacent horizontally, vertically, or diagonally. The letters can not be used more than once. The word must be at least 2 letters long.

This program solves the game by finding all the words in the grid and then finding the largest connected word.

## Usage

Clone this repo

Edit the map.txt file to contain the grid of letters. This could be automated in the future.

```bash
pnpm install
```

```bash
pnpm start
```

## Example Output

This is the output of the map.txt file in this repo:

```
A M T V L
R O L A D
I I N I E
N I P G U
K H U S O
```

produces the following output:

```
...

S U P I N A T O R (9)
← ↑ ← ↗️ ↗️ ↖️ ↙️ ←
← ↑ ↖️ → ↗️ ↖️ ↙️ ←
← ↑ ↗️ ← ↗️ ↖️ ↙️ ←

T A I L O R I N G (9)
↘️ ↓ ↖️ ← ← ↘️ → ↘️

S P H I N G I D A E (10)
↖️ ↙️ ↑ ↗️ ↘️ ↑ ↗️ ← ↘️

M O R I N G U I D A E (11)
↓ ← ↘️ → ↘️ → ↖️ ↗️ ← ↘️

```

# Misc

The word list is taken from [here](https://github.com/dwyl/english-words)

> I do not endorse cheating at this game. This is just for fun.
