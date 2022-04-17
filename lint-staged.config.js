module.exports = {
	"apps/**/*.{js,ts,jsx,tsx}": ["prettier --write", "eslint --fix"],
	"*.json": ["prettier --write"],
	"packages/prisma/schema.prisma": ["prisma format"],
};
