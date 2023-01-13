-- CreateTable
CREATE TABLE "DishCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "DishCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dish" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weight" INTEGER,
    "price" INTEGER NOT NULL,
    "ingredients" TEXT,
    "description" TEXT,
    "image" TEXT,
    "categoryId" INTEGER,

    CONSTRAINT "Dish_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DishCategory_name_key" ON "DishCategory"("name");

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "DishCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
